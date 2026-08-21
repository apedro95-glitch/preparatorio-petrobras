const subjects = [
  { name: "Conhecimentos Específicos", value: 18 },
  { name: "Português", value: 8 },
  { name: "Matemática", value: 3 }
];

export default function Home() {
  return (
    <>
      <header className="pageHeader">
        <div>
          <h1>Seu painel de preparação</h1>
          <p>Acompanhe cronograma, desempenho, revisões e simulados em um só lugar.</p>
        </div>
        <span className="badge">Objetivo: Petrobras</span>
      </header>

      <section className="grid metrics">
        <div className="metric"><small>Progresso geral</small><strong>11%</strong></div>
        <div className="metric"><small>Horas estudadas</small><strong>7h30</strong></div>
        <div className="metric"><small>Questões respondidas</small><strong>34</strong></div>
        <div className="metric"><small>Taxa de acerto</small><strong>76%</strong></div>
      </section>

      <section className="grid twoCol">
        <div className="card">
          <h2>Progresso por disciplina</h2>
          <div className="list">
            {subjects.map((s) => (
              <div key={s.name}>
                <div className="row">
                  <span>{s.name}</span>
                  <span className="muted">{s.value}%</span>
                </div>
                <div className="progressTrack">
                  <div className="progressFill" style={{ width: `${s.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h2>Próximas sessões</h2>
          <div className="list">
            <div className="row">
              <div><strong>Português</strong><div className="muted">Interpretação + gramática</div></div>
              <span className="pill">Hoje</span>
            </div>
            <div className="row">
              <div><strong>Conhecimentos Específicos</strong><div className="muted">Circuitos elétricos</div></div>
              <span className="pill green">Sábado</span>
            </div>
            <div className="row">
              <div><strong>Revisão</strong><div className="muted">Fórmulas e caderneta de erros</div></div>
              <span className="pill">Próxima semana</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
