import os
from typing import Any

from anthropic import Anthropic

from .knowledge import load_general_knowledge


_INSTRUCTIONS_BASE = """
Jesteś prostym chatbotem edukacyjnym przygotowanym jako projekt zaliczeniowy SWPS.
Odpowiadasz po polsku, spokojnym i zrozumiałym językiem.

Korzystasz przede wszystkim z bazy wiedzy podanej w promptcie. Jeżeli pytanie
wykracza poza bazę wiedzy, powiedz to wprost i odpowiedz ogólnie, bez udawania,
że masz dodatkowe źródła.

Nie diagnozujesz użytkownika i nie zastępujesz psychologa ani lekarza. Przy
pytaniach o poważny kryzys psychiczny zachęć do kontaktu ze specjalistą,
telefonem zaufania albo numerem alarmowym 112, jeśli istnieje bezpośrednie
zagrożenie życia lub zdrowia.
""".strip()


def _to_anthropic_history(history: list[dict[str, Any]]) -> list[dict[str, str]]:
    allowed_roles = {"user", "assistant"}
    prepared = []

    for item in history[-12:]:
        role = item.get("role")
        content = str(item.get("content", "")).strip()

        if role in allowed_roles and content:
            prepared.append({"role": role, "content": content})

    while prepared and prepared[0]["role"] != "user":
        prepared.pop(0)

    cleaned = []
    for item in prepared:
        if cleaned and cleaned[-1]["role"] == item["role"]:
            cleaned[-1]["content"] = f'{cleaned[-1]["content"]}\n\n{item["content"]}'
        else:
            cleaned.append(item)

    return cleaned


def answer_message(message: str, history: list[dict[str, Any]] | None = None) -> str:
    api_key = os.getenv("ANTHROPIC_API_KEY")
    if not api_key:
        raise RuntimeError("Brakuje ANTHROPIC_API_KEY w apps/api/.env.")

    knowledge = load_general_knowledge()
    model = os.getenv("ANTHROPIC_MODEL", "claude-3-5-sonnet-latest")

    system_prompt = f"""
{_INSTRUCTIONS_BASE}

BAZA WIEDZY PROJEKTU:
{knowledge}
""".strip()

    messages = _to_anthropic_history(history or [])
    messages.append({"role": "user", "content": message})

    client = Anthropic(api_key=api_key)
    response = client.messages.create(
        model=model,
        max_tokens=900,
        temperature=0.4,
        system=system_prompt,
        messages=messages,
    )

    parts = []
    for block in response.content:
        if block.type == "text":
            parts.append(block.text)

    return "\n".join(parts).strip()
