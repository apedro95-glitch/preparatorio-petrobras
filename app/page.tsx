export default function Home() {
  return (
    <>
      <header className="header">
        <div><h1>Seu painel de preparação</h1><p>Estude, revise e acompanhe sua evolução em um só lugar.</p></div>
        <span className="badge">Objetivo principal: Petrobras</span>
      </header>

      <section className="hero">
        <div className="heroTop">
          <div>
            <span className="badge">Aula de hoje</span>
            <h2 style={{marginTop:10}}>Português · Interpretação de Texto</h2>
            <p>Sessão guiada com Tutor IA, exercícios e registro automático de desempenho.</p>
            <div className="heroMeta">
              <span className="chip">⏱ 1h30</span><span className="chip">🎯 Compreensão textual</span><span className="chip">📝 Mini teste no final</span>
            </div>
          </div>
          <a className="btn primary" href="/sala">▶ Começar aula</a>
        </div>
      </section>

      <section className="grid metrics" style={{marginTop:14}}>
        <div className="metric"><small>Progresso geral</small><strong>11%</strong></div>
        <div className="metric"><small>Horas estudadas</small><strong>7h30</strong></div>
        <div className="metric"><small>Questões respondidas</small><strong>34</strong></div>
        <div className="metric"><small>Taxa de acerto</small><strong>76%</strong></div>
      </section>

      <section className="grid two">
        <div className="card">
          <h2>Próximas atividades</h2>
          <div className="list">
            <div className="studyItem"><div className="studyIcon">📖</div><div><strong>Interpretação de Texto</strong><div className="muted">Português · hoje</div></div><span className="status green">Hoje</span></div>
            <div className="studyItem"><div className="studyIcon">⚡</div><div><strong>Circuitos elétricos</strong><div className="muted">Conhecimentos Específicos</div></div><span className="status">Sábado</span></div>
            <div className="studyItem"><div className="studyIcon">🔁</div><div><strong>Revisão de fórmulas</strong><div className="muted">Lei de Ohm e potência</div></div><span className="status orange">Pendente</span></div>
          </div>
        </div>
        <div className="card">
          <h2>Seu foco agora</h2>
          <div className="statLine"><span>Conhecimentos Específicos</span><strong>18%</strong></div><div className="progress"><span style={{width:"18%"}} /></div>
          <div className="statLine"><span>Português</span><strong>8%</strong></div><div className="progress"><span style={{width:"8%"}} /></div>
          <div className="statLine"><span>Matemática</span><strong>3%</strong></div><div className="progress"><span style={{width:"3%"}} /></div>
          <div className="notice" style={{marginTop:16}}>A próxima versão calculará estes números diretamente do Supabase.</div>
        </div>
      </section>

      <section className="grid three">
        <div className="card"><h2>🔁 Revisões</h2><p className="muted">3 revisões programadas para os próximos 7 dias.</p><a className="btn ghost" href="/revisoes">Ver revisões</a></div>
        <div className="card"><h2>❌ Erros recentes</h2><p className="muted">Revise questões que tiveram erro ou dúvida.</p><a className="btn ghost" href="/erros">Abrir caderneta</a></div>
        <div className="card"><h2>📚 Histórico</h2><p className="muted">Consulte aulas anteriores e retome onde parou.</p><a className="btn ghost" href="/aulas">Minhas aulas</a></div>
      </section>
    </>
  );
}
