.PHONY: format lint format-check typecheck test check

format:
	ruff check . --fix
	ruff format .

lint:
	ruff check .

format-check:
	ruff format --check .

typecheck:
	mypy .

test:
	pytest

check: lint format-check typecheck test
