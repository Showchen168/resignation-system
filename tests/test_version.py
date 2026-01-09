import pytest

from app import APP_VERSION, get_version, validate_version


def test_get_version_returns_current_version():
    assert get_version() == APP_VERSION


def test_validate_version_rejects_invalid_patch():
    with pytest.raises(ValueError, match="PATCH 必須為 0-9"):
        validate_version("v1.0.10")
