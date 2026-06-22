import Chat from "./chat";

export default function Home() {
  return (
    <main className="page-shell">
      <section className="container py-4 py-md-5">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10 col-xl-9">
            <div className="mb-4">
              <p className="text-uppercase small fw-semibold text-primary mb-2">
                Projekt zaliczeniowy SWPS
              </p>
              <h1 className="display-6 fw-bold mb-2">Chatbot psychologiczny</h1>
              <p className="lead text-secondary mb-0">
                Prosty asystent AI odpowiadający po polsku na podstawie mojej
                własnej bazy wiedzy w pliku Markdown.
              </p>
            </div>
            <Chat />
          </div>
        </div>
      </section>
    </main>
  );
}
