from typing import Optional

from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from fastapi import APIRouter, Depends, HTTPException, Request, status
from fastapi.security import OAuth2PasswordRequestForm
from passlib.context import CryptContext
from sqlalchemy import Boolean, Integer, String, select
from sqlalchemy.orm import Mapped, Session, mapped_column

from .db import Base, get_db
from .schemas import RegisterIn, TokenOut, UserCreate, UserInfoOut, UserOut, UserUpdate

bearer_scheme = HTTPBearer()

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
def get_current_user(
    request: Request,
    db: Session = Depends(get_db),
    creds: HTTPAuthorizationCredentials = Depends(bearer_scheme),
) -> User:
    token = creds.credentials  # extracted from "Authorization: Bearer <token>"

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

@router.put("/users/{user_id}", response_model=UserInfoOut)
def update_user(
    user_id: int,
    data: UserUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),  # protected
):
    user = db.query(User).filter(User.id == user_id).first()
 
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if data.email:
        email = data.email.lower()
        existing = get_user_by_email(db, email)
        if existing and existing.id != user.id:
            raise HTTPException(status_code=400, detail="Email already exists")
        user.email = email
 
    # Update remaining fields if provided
    for field, value in data.dict(exclude_unset=True).items():
        if field != "email":
            setattr(user, field, value)
 
    db.commit()
    db.refresh(user)
    return user
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