const errors = [
  { subject: "Equações", question: "Troca de sinais e isolamento da incógnita", status: "Praticar" },
  { subject: "Porcentagem", question: "Identificar corretamente o percentual pedido antes do cálculo", status: "Revisar" },
  { subject: "Circuitos", question: "Distinguir resistência equivalente (Ω) de corrente (A)", status: "Revisar" },
  { subject: "Circuitos mistos", question: "Separar corretamente trechos em série e paralelo", status: "Praticar" },
];

export default function Erros() {
  return <><header className="pageHeader"><div><h1>Caderneta de erros</h1><p>Pontos de atenção identificados durante as práticas.</p></div></header>
  <div className="card"><table><thead><tr><th>Área</th><th>Ponto de atenção</th><th>Status</th></tr></thead>
  <tbody>{errors.map((e,i)=><tr key={i}><td>{e.subject}</td><td>{e.question}</td><td><span className="pill">{e.status}</span></td></tr>)}</tbody></table></div></>
}
