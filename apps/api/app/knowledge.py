from pathlib import Path


KNOWLEDGE_PATH = Path(__file__).resolve().parent.parent / "knowledge" / "general.md"


def load_general_knowledge() -> str:
    if not KNOWLEDGE_PATH.exists():
        return "Brak pliku wiedzy."

    return KNOWLEDGE_PATH.read_text(encoding="utf-8").strip()
