export default function Revisoes(){
  return <><header className="header"><div><h1>Revisões</h1><p>Fila atual de reforço baseada nos conteúdos já estudados.</p></div></header>
  <div className="grid two">
    <div className="card"><h2>Prioridade alta</h2><div className="list">
      <div className="row"><span>Circuitos mistos e Req</span><span className="status orange">Revisar</span></div>
      <div className="row"><span>Corrente e quedas de tensão</span><span className="status orange">Revisar</span></div>
      <div className="row"><span>Equações de 1º grau</span><span className="status">Praticar</span></div>
    </div></div>
    <div className="card"><h2>Manutenção</h2><div className="list">
      <div className="row"><span>Lei de Ohm e potência</span><span className="status green">Manter</span></div>
      <div className="row"><span>Porcentagem e regra de três</span><span className="status">Revisar</span></div>
      <div className="row"><span>Conectivos, concordância e regência</span><span className="status">Revisar</span></div>
    </div></div>
  </div></>
}
