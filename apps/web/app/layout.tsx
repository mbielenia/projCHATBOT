import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

export const metadata = {
  title: "Chatbot SWPS",
  description: "Projekt zaliczeniowy - prosty chatbot AI"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  );
}
