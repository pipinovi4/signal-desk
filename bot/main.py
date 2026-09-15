"""SignalDesk Telegram bot entry point."""

import asyncio
import logging
import os

from aiogram import Bot, Dispatcher

logger = logging.getLogger(__name__)


async def run_bot() -> None:
    """Start Telegram long polling with the configured bot token."""
    token = os.environ.get("TELEGRAM_BOT_TOKEN")
    if not token:
        raise RuntimeError("TELEGRAM_BOT_TOKEN is required")

    dispatcher = Dispatcher()
    async with Bot(token=token) as bot:
        logger.info("Telegram bot polling started")
        await dispatcher.start_polling(bot)


def main() -> None:
    """Configure logging and run the Telegram bot."""
    logging.basicConfig(level=logging.INFO)
    asyncio.run(run_bot())


if __name__ == "__main__":
    main()
