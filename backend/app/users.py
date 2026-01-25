from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Request, status
from fastapi.security import OAuth2PasswordRequestForm
from passlib.context import CryptContext
from sqlalchemy import Boolean, Integer, String, select
from sqlalchemy.orm import Mapped, Session, mapped_column

from .db import Base, get_db
from .schemas import RegisterIn, TokenOut, UserCreate, UserInfoOut, UserOut

router = APIRouter(tags=["auth"])

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)

    # auth-related fields (existing)
    email: Mapped[str] = mapped_column(String, unique=True, index=True, nullable=False)
    name: Mapped[str] = mapped_column(String, nullable=False)
    last_name: Mapped[str] = mapped_column(String, nullable=False)
    password_hash: Mapped[str] = mapped_column(String, nullable=False)

    # ---- New fields for /users create/list ----
    age: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    matriculation_number: Mapped[Optional[str]] = mapped_column(String, nullable=True)
    married: Mapped[Optional[bool]] = mapped_column(Boolean, nullable=True)
    phone_number: Mapped[Optional[str]] = mapped_column(String, nullable=True)


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(password: str, password_hash: str) -> bool:
    return pwd_context.verify(password, password_hash)


def get_user_by_email(db: Session, email: str) -> Optional[User]:
    stmt = select(User).where(User.email == email.lower())
    return db.execute(stmt).scalars().first()


# -----------------------------
# NEW: JWT Bearer protection dependency
# -----------------------------
def get_current_user(request: Request, db: Session = Depends(get_db)) -> User:
    auth = request.headers.get("Authorization", "")
    if not auth.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
            headers={"WWW-Authenticate": "Bearer"},
        )

    token = auth.removeprefix("Bearer ").strip()

    # validates JWT and returns the subject (we stored email in "sub")
    email = request.app.state.decode_token(token)

    user = get_user_by_email(db, email)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user


@router.post("/auth/register", response_model=UserOut, status_code=201)
def register(data: RegisterIn, db: Session = Depends(get_db)):
    print("Registering user:", data)
    email = data.email.lower()
    if get_user_by_email(db, email):
        raise HTTPException(status_code=400, detail="Email already registered")

    user = User(
        email=email,
        name=data.name,
        last_name=data.last_name,
        password_hash=hash_password(data.password),
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


@router.post("/auth/login", response_model=TokenOut)
def login(
    request: Request,
    form: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    user = get_user_by_email(db, form.username)
    if not user or not verify_password(form.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Incorrect username or password")

    token = request.app.state.create_access_token(user.email)
    return TokenOut(access_token=token)


@router.get("/users/me", response_model=UserOut)
def me(current_user: User = Depends(get_current_user)):
    # reusing the same dependency = protected route
    return current_user


# -----------------------------
# Protected endpoints: /users (list/create)
# -----------------------------

@router.get("/users", response_model=list[UserInfoOut])
def list_users(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),  # <-- protect
):
    stmt = select(User).order_by(User.id.asc())
    return db.execute(stmt).scalars().all()


@router.post("/users", response_model=UserInfoOut, status_code=201)
def create_user(
    data: UserCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),  # <-- protect
):
    email = data.email.lower()
    if get_user_by_email(db, email):
        raise HTTPException(status_code=400, detail="Email already exists")

    user = User(
        email=email,
        name=data.name,
        last_name="",
        password_hash=hash_password("defaultpassword"),
        age=data.age,
        matriculation_number=data.matriculation_number,
        married=data.married,
        phone_number=data.phone_number,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user