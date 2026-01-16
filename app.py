"""
版本資訊模組。

使用方式：
    from app import APP_VERSION, get_version
    print(APP_VERSION)
"""

APP_VERSION = "v1.1.8"


def validate_version(version: str) -> None:
    """檢查版本字串格式（符合 SemVer 標準）。"""
    if not version.startswith("v"):
        raise ValueError("版本格式錯誤：缺少 v 前綴。")
    parts = version[1:].split(".")
    if len(parts) != 3 or not all(p.isdigit() for p in parts):
        raise ValueError("版本格式錯誤：需為 vMAJOR.MINOR.PATCH。")
    major, minor, patch = (int(p) for p in parts)
    if major < 0 or minor < 0 or patch < 0:
        raise ValueError("版本格式錯誤：版號不得為負數。")


def get_version() -> str:
    """回傳目前系統版本。"""
    validate_version(APP_VERSION)
    return APP_VERSION


if __name__ == "__main__":
    print(get_version())
