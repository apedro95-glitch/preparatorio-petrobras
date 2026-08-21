const errors = [
  {
    date: "Exemplo",
    subject: "Potência elétrica",
    question: "Relação entre tensão, corrente e potência",
    status: "Revisar"
  }
];

export default function Erros() {
  return (
    <>
      <header className="pageHeader">
        <div><h1>Caderneta de erros</h1><p>Questões erradas ficam separadas para revisão dirigida.</p></div>
      </header>
      <div className="card">
        <table>
          <thead><tr><th>Data</th><th>Assunto</th><th>Questão</th><th>Status</th></tr></thead>
          <tbody>
            {errors.map((e,i)=>(
              <tr key={i}><td>{e.date}</td><td>{e.subject}</td><td>{e.question}</td><td><span className="pill">{e.status}</span></td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
