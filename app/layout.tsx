import "./globals.css";
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Portal Concursos",
  description: "Preparação inteligente para concursos",
  manifest: "/manifest.webmanifest"
};

export const viewport: Viewport = {
  themeColor: "#07111f",
  width: "device-width",
  initialScale: 1
};

const nav = [
  ["/", "🏠", "Dashboard"],
  ["/cronograma", "🗓️", "Cronograma"],
  ["/sala", "🎓", "Sala de Aula"],
  ["/quiz", "📝", "Questões & Simulados"],
  ["/flashcards", "🧠", "Flashcards"],
  ["/erros", "❌", "Caderneta de Erros"],
  ["/aulas", "📚", "Minhas Aulas"],
  ["/revisoes", "🔁", "Revisões"],
  ["/desempenho", "📈", "Desempenho"]
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <div className="shell">
          <aside className="sidebar">
            <div className="brand">
              <span className="brandMark">PC</span>
              <div><strong>Portal Concursos</strong><small>Preparação inteligente</small></div>
            </div>
            <nav className="nav">
              {nav.map(([href, icon, label]) => <a key={href} href={href}>{icon} {label}</a>)}
            </nav>
            <div className="sidebarFooter"><span className="dot" /> Supabase conectado</div>
          </aside>
          <main className="main">{children}</main>
          <nav className="bottomNav">
            <a href="/"><span>🏠</span>Início</a>
            <a href="/cronograma"><span>🗓️</span>Agenda</a>
            <a href="/sala"><span>🎓</span>Aula</a>
            <a href="/quiz"><span>📝</span>Questões</a>
            <a href="/desempenho"><span>📈</span>Progresso</a>
          </nav>
        </div>
      </body>
    </html>
  );
}
