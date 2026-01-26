all: fastapi frontend

fastapi:
	@echo "Starting backend..."
	cd backend && uv sync
	cd backend && uv run python main.py

frontend:
	@echo "Starting frontend..."
	npm i
	npm run dev