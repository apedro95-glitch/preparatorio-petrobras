const aulas = [
  ["Elétrica", "Grandezas elétricas: tensão, corrente, resistência e potência", "Estudado"],
  ["Elétrica", "Lei de Ohm e potência elétrica", "Estudado"],
  ["Elétrica", "Circuitos em série: Req, corrente e quedas de tensão", "Estudado"],
  ["Elétrica", "Circuitos em paralelo: corrente total e divisão de corrente", "Estudado"],
  ["Elétrica", "Circuitos mistos e resistência equivalente", "Em consolidação"],
  ["Matemática", "Equações de 1º grau", "Estudado"],
  ["Matemática", "Proporção, regra de três e porcentagem", "Estudado"],
  ["Português", "Interpretação de texto e conectivos", "Estudado"],
  ["Português", "Concordância e regência", "Revisar"],
];

export default function Aulas(){
  return <><header className="header"><div><h1>Minhas Aulas</h1><p>Conteúdos já trabalhados no plano Petrobras/Transpetro.</p></div></header>
  <div className="card"><div className="list">{aulas.map((a,i)=><div className="row" key={i}><div><strong>{a[1]}</strong><div className="muted">{a[0]}</div></div><span className="status">{a[2]}</span></div>)}</div></div></>
}
