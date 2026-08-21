import "./globals.css";
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Portal Concursos",
  description: "Portal PWA de preparação para concursos",
  manifest: "/manifest.webmanifest"
};

export const viewport: Viewport = {
  themeColor: "#0b1220",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <div className="appShell">
          <aside className="sidebar">
            <div className="brand">
              <span className="brandMark">PC</span>
              <div>
                <strong>Portal Concursos</strong>
                <small>Preparação inteligente</small>
              </div>
            </div>

            <nav>
              <a href="/">🏠 Dashboard</a>
              <a href="/cronograma">🗓️ Cronograma</a>
              <a href="/quiz">📝 Questões & Simulados</a>
              <a href="/flashcards">🧠 Flashcards</a>
              <a href="/erros">❌ Caderneta de Erros</a>
            </nav>

            <div className="sidebarFooter">
              <span className="statusDot" /> Base local • MVP
            </div>
          </aside>

          <main className="content">{children}</main>
        </div>
      </body>
    </html>
  );
}
