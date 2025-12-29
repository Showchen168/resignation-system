"""
版本資訊模組。

使用方式：
    from app import APP_VERSION, get_version
    print(APP_VERSION)
"""

APP_VERSION = "v1.0.16"


def get_version() -> str:
    """回傳目前系統版本。"""
    return APP_VERSION


if __name__ == "__main__":
    print(get_version())
