const events = [
  ["21/08/2026", "Português", "Interpretação de texto + concordância", "Em andamento"],
  ["22/08/2026", "Conhecimentos Específicos", "Circuitos elétricos e Lei de Ohm", "Planejado"],
  ["24/08/2026", "Revisão", "Conteúdo do sábado anterior", "Planejado"],
  ["26/08/2026", "Português + Matemática", "Gramática + equações básicas", "Planejado"],
  ["28/08/2026", "Revisão", "Questões e caderneta de erros", "Planejado"]
];

export default function Cronograma() {
  return (
    <>
      <header className="pageHeader">
        <div><h1>Cronograma</h1><p>Planejamento das sessões e acompanhamento de execução.</p></div>
      </header>
      <div className="card">
        <table>
          <thead><tr><th>Data</th><th>Área</th><th>Conteúdo</th><th>Status</th></tr></thead>
          <tbody>
            {events.map((e) => (
              <tr key={e[0]+e[1]}><td>{e[0]}</td><td>{e[1]}</td><td>{e[2]}</td><td><span className="pill">{e[3]}</span></td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
