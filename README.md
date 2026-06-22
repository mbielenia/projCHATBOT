# CHATBOT SWPS

Prosty projekt zaliczeniowy: polski chatbot AI z własną bazą wiedzy w pliku Markdown.

To jest wariant podstawowy na ocenę 4. Bot nie korzysta z zewnętrznego repozytorium ani RAG. Wiedza jest brana z pliku:

```text
apps/api/knowledge/general.md
```

## Co jest w projekcie

- `apps/web` - frontend w Next.js, React i Bootstrap.
- `apps/api` - backend we Flasku.
- `apps/api/knowledge/general.md` - moja baza wiedzy dla chatbota.
- `apps/api/app/claude.py` - prompt systemowy i komunikacja z Claude.

## Uruchomienie

```bash
yarn install
cp apps/api/.env.example apps/api/.env
```

W pliku `apps/api/.env` wklej klucz:

```text
ANTHROPIC_API_KEY=sk-ant-...
RAG_ENABLED=false
```

Potem uruchom:

```bash
yarn dev
```

Jeżeli na komputerze nie ma jeszcze `yarn`, można najpierw spróbować:

```bash
corepack enable
```

Awaryjnie projekt da się też uruchomić przez `npm`:

```bash
npm install
npm run dev
```

Frontend działa pod adresem:

```text
http://localhost:3000
```

Backend działa pod adresem:

```text
http://localhost:5001
```

## Jak działa

1. Użytkownik wpisuje pytanie w oknie czatu.
2. Frontend wysyła pytanie do endpointu `POST /chat`.
3. Backend wczytuje bazę wiedzy z `general.md`.
4. Claude dostaje instrukcję, historię rozmowy i wiedzę z pliku.
5. Odpowiedź wraca do przeglądarki.

## Co można zmienić

- Charakter bota: `apps/api/app/claude.py`.
- Wiedzę bota: `apps/api/knowledge/general.md`.
- Wygląd czatu: `apps/web/app/chat.tsx`.
- Tytuł strony: `apps/web/app/page.tsx`.
