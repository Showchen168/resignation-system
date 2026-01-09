from html.parser import HTMLParser
from pathlib import Path


class NavLabelParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self._current_label = None
        self.top_labels = []
        self.side_labels = []

    def handle_starttag(self, tag, attrs):
        if tag != "button":
            return
        attrs_dict = dict(attrs)
        test_id = attrs_dict.get("data-testid", "")
        if test_id.startswith("top-nav-"):
            self._current_label = "top"
        elif test_id.startswith("side-nav-"):
            self._current_label = "side"
        else:
            self._current_label = None

    def handle_endtag(self, tag):
        if tag == "button":
            self._current_label = None

    def handle_data(self, data):
        label = data.strip()
        if not label or not self._current_label:
            return
        if self._current_label == "top":
            self.top_labels.append(label)
        elif self._current_label == "side":
            self.side_labels.append(label)


def test_left_nav_matches_top_nav():
    html_path = Path(__file__).resolve().parents[2] / "index.html"
    parser = NavLabelParser()
    parser.feed(html_path.read_text(encoding="utf-8"))

    assert parser.top_labels, "找不到上方選單標籤"
    assert parser.side_labels, "找不到左側選單標籤"
    assert parser.side_labels == parser.top_labels
