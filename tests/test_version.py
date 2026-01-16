import pytest

from app import APP_VERSION, get_version, validate_version


def test_get_version_returns_current_version():
    assert get_version() == APP_VERSION


def test_validate_version_rejects_invalid_format():
    """測試無效的版本格式會被拒絕。"""
    # 缺少 v 前綴
    with pytest.raises(ValueError, match="缺少 v 前綴"):
        validate_version("1.0.0")

    # 格式錯誤
    with pytest.raises(ValueError, match="需為 vMAJOR.MINOR.PATCH"):
        validate_version("v1.0")

    # 非數字
    with pytest.raises(ValueError, match="需為 vMAJOR.MINOR.PATCH"):
        validate_version("v1.0.beta")
