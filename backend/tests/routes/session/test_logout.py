from types import SimpleNamespace
from unittest.mock import AsyncMock

import pytest
from app.routes.session import logout as logout_module
from app.services.session.tokens.manager import Tokens
from fastapi import Request, Response


def make_request(*, refresh_token: str | None = None) -> Request:
    headers: list[tuple[bytes, bytes]] = []

    if refresh_token is not None:
        headers.append((b"cookie", f"refresh_token={refresh_token}".encode()))

    return Request(
        {
            "type": "http",
            "method": "POST",
            "path": "/v1/session/logout",
            "headers": headers,
        }
    )


def assert_auth_cookies_cleared(response: Response) -> None:
    set_cookie_headers = response.headers.getlist("set-cookie")

    assert len(set_cookie_headers) == 2
    assert any(header.startswith("access_token=") for header in set_cookie_headers)
    assert any(header.startswith("refresh_token=") for header in set_cookie_headers)

    for header in set_cookie_headers:
        assert "Max-Age=0" in header
        assert "HttpOnly" in header


@pytest.mark.asyncio
async def test_logout_revokes_session_and_clears_auth_cookies(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    session = SimpleNamespace(revoked_at=None)
    verify_refresh_token = AsyncMock(return_value=session)
    monkeypatch.setattr(Tokens, "verify_refresh_token", verify_refresh_token)

    db = SimpleNamespace(commit=AsyncMock())
    response = Response()

    result = await logout_module.logout(
        request=make_request(refresh_token="raw-refresh-token"),
        response=response,
        db=db,
    )

    assert result is response
    verify_refresh_token.assert_awaited_once_with(
        refresh_token="raw-refresh-token",
        db=db,
    )
    db.commit.assert_awaited_once_with()
    assert session.revoked_at is not None
    assert session.revoked_at.tzinfo is not None
    assert_auth_cookies_cleared(response)


@pytest.mark.asyncio
async def test_logout_without_refresh_cookie_only_clears_auth_cookies(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    verify_refresh_token = AsyncMock()
    monkeypatch.setattr(Tokens, "verify_refresh_token", verify_refresh_token)

    db = SimpleNamespace(commit=AsyncMock())
    response = Response()

    result = await logout_module.logout(
        request=make_request(),
        response=response,
        db=db,
    )

    assert result is response
    verify_refresh_token.assert_not_awaited()
    db.commit.assert_not_awaited()
    assert_auth_cookies_cleared(response)
