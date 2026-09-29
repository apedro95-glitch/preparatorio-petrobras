export default function Home() {
  return (
    <>
      <header className="header">
        <div><h1>Seu painel de preparação</h1><p>Plano atualizado com o conteúdo já estudado e os próximos reforços.</p></div>
        <span className="badge">Objetivo principal: Petrobras</span>
      </header>

      <section className="hero">
        <div className="heroTop">
          <div>
            <span className="badge">Foco atual</span>
            <h2 style={{marginTop:10}}>Conhecimentos Específicos · Circuitos elétricos</h2>
            <p>Consolidação de Lei de Ohm, potência, série, paralelo e circuitos mistos.</p>
            <div className="heroMeta">
              <span className="chip">⚡ Manutenção Elétrica</span><span className="chip">🧮 Cálculos</span><span className="chip">📝 Questões</span>
            </div>
          </div>
          <a className="btn primary" href="/aulas">📚 Ver conteúdos</a>
        </div>
      </section>

      <section className="grid metrics" style={{marginTop:14}}>
        <div className="metric"><small>Objetivo</small><strong>Petrobras</strong></div>
        <div className="metric"><small>Prova intermediária</small><strong>Transpetro</strong></div>
        <div className="metric"><small>Data Transpetro</small><strong>05/12/2026</strong></div>
        <div className="metric"><small>Status</small><strong>Em evolução</strong></div>
      </section>

      <section className="grid two">
        <div className="card">
          <h2>Próximas atividades</h2>
          <div className="list">
            <div className="studyItem"><div className="studyIcon">⚡</div><div><strong>Circuitos série, paralelo e mistos</strong><div className="muted">Corrente, tensão e resistência equivalente</div></div><span className="status green">Prioridade</span></div>
            <div className="studyItem"><div className="studyIcon">🧮</div><div><strong>Matemática de apoio</strong><div className="muted">Equações, proporção, regra de três e porcentagem</div></div><span className="status">Praticar</span></div>
            <div className="studyItem"><div className="studyIcon">📖</div><div><strong>Português</strong><div className="muted">Interpretação, conectivos, concordância e regência</div></div><span className="status">Revisar</span></div>
          </div>
        </div>
        <div className="card">
          <h2>Conteúdo consolidado até aqui</h2>
          <div className="list">
            <div className="row"><span>Lei de Ohm e potência elétrica</span><span className="status green">Estudado</span></div>
            <div className="row"><span>Circuitos série e paralelo</span><span className="status green">Estudado</span></div>
            <div className="row"><span>Equações e porcentagem</span><span className="status green">Estudado</span></div>
            <div className="row"><span>Conectivos e interpretação</span><span className="status green">Estudado</span></div>
          </div>
          <div className="notice" style={{marginTop:16}}>Métricas percentuais voltarão quando houver dados confiáveis registrados no banco.</div>
        </div>
      </section>

      <section className="grid three">
        <div className="card"><h2>🔁 Revisões</h2><p className="muted">Reforce fórmulas, cálculos e pontos com maior chance de erro.</p><a className="btn ghost" href="/revisoes">Ver revisões</a></div>
        <div className="card"><h2>❌ Caderneta</h2><p className="muted">Acompanhe os erros e dificuldades já identificados.</p><a className="btn ghost" href="/erros">Abrir caderneta</a></div>
        <div className="card"><h2>📚 Histórico</h2><p className="muted">Veja os assuntos já trabalhados no plano.</p><a className="btn ghost" href="/aulas">Minhas aulas</a></div>
      </section>
    </>
  );
}
