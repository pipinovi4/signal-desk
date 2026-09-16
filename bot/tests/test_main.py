import pytest

from bot.main import run_bot


@pytest.mark.asyncio
async def test_run_bot_requires_telegram_token(monkeypatch: pytest.MonkeyPatch) -> None:
    monkeypatch.delenv("TELEGRAM_BOT_TOKEN", raising=False)

    with pytest.raises(RuntimeError, match="TELEGRAM_BOT_TOKEN is required"):
        await run_bot()
