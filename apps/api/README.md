# Backend

Backend jest napisany we Flasku i udostępnia dwa endpointy:

- `GET /health` - szybki test działania serwera.
- `POST /chat` - rozmowa z chatbotem.

Wariant projektu jest podstawowy, więc `RAG_ENABLED=false`. Bot korzysta z wiedzy zapisanej w:

```text
knowledge/general.md
```

## Test endpointu

```bash
curl -X POST http://localhost:5001/chat \
  -H 'Content-Type: application/json' \
  -d '{"message":"Jak mogę lepiej organizować naukę?"}'
```
