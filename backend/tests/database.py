from sqlalchemy.engine import make_url


def require_test_database_url(database_url: str) -> str:
    url = make_url(database_url)
    database_name = url.database

    if database_name is None or not database_name.endswith("_test"):
        raise RuntimeError("Test database name must end with '_test'")

    return database_url
