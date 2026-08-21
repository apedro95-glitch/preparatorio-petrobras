"use client";
import { useState } from "react";

const cards = [
  { front: "Lei de Ohm", back: "V = I × R" },
  { front: "Corrente elétrica", back: "I = V / R" },
  { front: "Potência elétrica", back: "P = V × I" },
  { front: "Unidade da resistência", back: "Ohm (Ω)" }
];

export default function Flashcards() {
  const [i, setI] = useState(0);
  const [back, setBack] = useState(false);
  const card = cards[i];

  return (
    <>
      <header className="pageHeader">
        <div><h1>Flashcards</h1><p>Revisão rápida de conceitos e fórmulas.</p></div>
        <span className="badge">{i+1}/{cards.length}</span>
      </header>

      <div className="card flashcard" onClick={()=>setBack(!back)}>
        <div>
          <div className="big">{back ? card.back : card.front}</div>
          <div className="hint">Toque no cartão para virar</div>
        </div>
      </div>

      <div className="actions" style={{maxWidth:840}}>
        <button className="btn" onClick={()=>{setI((i-1+cards.length)%cards.length); setBack(false)}}>Anterior</button>
        <button className="btn primary" onClick={()=>{setI((i+1)%cards.length); setBack(false)}}>Próximo</button>
      </div>
    </>
  );
}
