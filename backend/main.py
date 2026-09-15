"""SignalDesk backend application entry point."""

from fastapi import FastAPI

app = FastAPI(title="SignalDesk API", version="0.1.0", root_path="/api")


@app.get("/health", tags=["system"])
async def health() -> dict[str, str]:
    """Report that the API process is ready to receive requests."""
    return {"status": "ok"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
