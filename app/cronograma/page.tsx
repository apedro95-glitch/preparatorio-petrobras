const events = [
  ["29/09/2026", "Revisão", "Lei de Ohm, potência e circuitos série/paralelo", "Atual"],
  ["30/09/2026", "Matemática", "Equações, proporção, regra de três e porcentagem", "Planejado"],
  ["02/10/2026", "Conhecimentos Específicos", "Prática curta: fórmulas e circuitos", "Planejado"],
  ["03/10/2026", "Conhecimentos Específicos", "Circuitos mistos + mini simulado", "Planejado"],
  ["05/10/2026", "Revisão", "Erros da semana e retenção", "Planejado"],
  ["Semanal", "Rotina", "Práticas curtas: segunda, quarta e sexta", "Recorrente"],
  ["Sábados", "Aula principal", "Conhecimentos Específicos + teste de retenção", "Recorrente"],
  ["05/12/2026", "Transpetro", "Prova — experiência com a banca e aplicação da preparação", "Marco"]
];

export default function Cronograma() {
  return (
    <>
      <header className="pageHeader">
        <div><h1>Cronograma</h1><p>Plano atualizado: Petrobras como objetivo principal e Transpetro como marco intermediário.</p></div>
      </header>
      <div className="card">
        <table>
          <thead><tr><th>Data</th><th>Área</th><th>Conteúdo</th><th>Status</th></tr></thead>
          <tbody>{events.map((e,i)=><tr key={i}><td>{e[0]}</td><td>{e[1]}</td><td>{e[2]}</td><td><span className="pill">{e[3]}</span></td></tr>)}</tbody>
        </table>
      </div>
      <div className="notice" style={{marginTop:14}}>Terças e quintas ficam preservadas para o curso técnico. O cronograma do portal prioriza revisão, prática e Conhecimentos Específicos nos demais dias.</div>
    </>
  );
}
