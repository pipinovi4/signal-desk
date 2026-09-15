"""SignalDesk AI worker process entry point."""

import asyncio
import logging
import signal

logger = logging.getLogger(__name__)


async def run_worker() -> None:
    """Keep the worker alive until processing consumers are implemented."""
    stop_event = asyncio.Event()
    loop = asyncio.get_running_loop()

    for shutdown_signal in (signal.SIGINT, signal.SIGTERM):
        loop.add_signal_handler(shutdown_signal, stop_event.set)

    logger.info("AI worker started; no consumers are configured yet")
    await stop_event.wait()
    logger.info("AI worker stopped")


def main() -> None:
    """Configure logging and start the worker lifecycle."""
    logging.basicConfig(level=logging.INFO)
    asyncio.run(run_worker())


if __name__ == "__main__":
    main()
