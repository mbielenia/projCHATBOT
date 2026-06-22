"use client";

import { FormEvent, useMemo, useState } from "react";

type Role = "user" | "assistant";

type ChatMessage = {
  role: Role;
  content: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5001";

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Cześć! Jestem prostym chatbotem SWPS. Zapytaj mnie o stres, emocje, uczenie się albo higienę cyfrową."
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const history = useMemo(
    () =>
      messages
        .filter((message) => message.content.trim().length > 0)
        .map((message) => ({
          role: message.role,
          content: message.content
        })),
    [messages]
  );

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const text = input.trim();
    if (!text || isLoading) {
      return;
    }

    const nextMessages: ChatMessage[] = [
      ...messages,
      {
        role: "user",
        content: text
      }
    ];

    setMessages(nextMessages);
    setInput("");
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: text,
          history
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Nie udało się pobrać odpowiedzi.");
      }

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: data.reply
        }
      ]);
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Wystąpił nieznany błąd."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="chat-panel">
      <div className="chat-header">
        <div>
          <h2 className="h5 mb-1">Okno czatu</h2>
          <p className="text-secondary mb-0">
            Wariant podstawowy: wiedza z pliku <code>general.md</code>.
          </p>
        </div>
      </div>

      <div className="chat-messages" aria-live="polite">
        {messages.map((message, index) => (
          <div
            className={`message-row ${message.role === "user" ? "user" : "assistant"}`}
            key={`${message.role}-${index}`}
          >
            <div className="message-bubble">
              <span className="message-author">
                {message.role === "user" ? "Ty" : "Bot"}
              </span>
              <p>{message.content}</p>
            </div>
          </div>
        ))}
        {isLoading ? (
          <div className="message-row assistant">
            <div className="message-bubble">
              <span className="message-author">Bot</span>
              <p>Myślę nad odpowiedzią...</p>
            </div>
          </div>
        ) : null}
      </div>

      {error ? <div className="alert alert-danger mx-3 mb-0">{error}</div> : null}

      <form className="chat-form" onSubmit={sendMessage}>
        <input
          aria-label="Wiadomość"
          className="form-control"
          disabled={isLoading}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Napisz pytanie..."
          value={input}
        />
        <button className="btn btn-primary" disabled={isLoading || !input.trim()}>
          Wyślij
        </button>
      </form>
    </div>
  );
}
