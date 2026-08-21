"use client";
import { useMemo, useState } from "react";

const questions = [
  {
    text: "Um circuito possui tensão de 120 V e resistência de 40 Ω. Qual é a corrente elétrica?",
    options: ["1 A", "2 A", "3 A", "4 A", "5 A"],
    correct: 2,
    subject: "Lei de Ohm"
  },
  {
    text: "Qual expressão representa corretamente a Lei de Ohm?",
    options: ["V = I × R", "P = V / I", "R = I / V", "I = V × R", "P = R / V"],
    correct: 0,
    subject: "Lei de Ohm"
  },
  {
    text: "Um equipamento opera em 220 V com corrente de 10 A. Qual é sua potência elétrica?",
    options: ["22 W", "220 W", "1.100 W", "2.200 W", "22.000 W"],
    correct: 3,
    subject: "Potência elétrica"
  }
];

export default function Quiz() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));
  const [finished, setFinished] = useState(false);

  const score = useMemo(() =>
    answers.reduce((acc, a, i) => acc + (a === questions[i].correct ? 1 : 0), 0),
  [answers]);

  function choose(value: number) {
    const next = [...answers];
    next[index] = value;
    setAnswers(next);
  }

  if (finished) {
    return (
      <>
        <header className="pageHeader">
          <div><h1>Resultado do mini simulado</h1><p>Correção registrada para análise de desempenho.</p></div>
        </header>
        <div className="card quizCard">
          <div className="grid metrics" style={{gridTemplateColumns:"repeat(3, minmax(0, 1fr))"}}>
            <div className="metric"><small>Acertos</small><strong>{score}/{questions.length}</strong></div>
            <div className="metric"><small>Percentual</small><strong>{Math.round(score/questions.length*100)}%</strong></div>
            <div className="metric"><small>Erros</small><strong>{questions.length-score}</strong></div>
          </div>
          <div className="list" style={{marginTop:16}}>
            {questions.map((q,i)=>(
              <div className="row" key={q.text}>
                <div><strong>Questão {i+1}</strong><div className="muted">{q.subject}</div></div>
                <span className={answers[i]===q.correct ? "pill green" : "pill"}>{answers[i]===q.correct ? "Correta" : "Revisar"}</span>
              </div>
            ))}
          </div>
          <button className="btn primary" onClick={()=>{setAnswers(Array(questions.length).fill(null)); setIndex(0); setFinished(false)}}>Refazer</button>
        </div>
      </>
    )
  }

  const q = questions[index];

  return (
    <>
      <header className="pageHeader">
        <div><h1>Mini simulado</h1><p>Modo prova: a correção aparece somente ao finalizar.</p></div>
        <span className="badge">Questão {index+1} de {questions.length}</span>
      </header>

      <div className="card quizCard">
        <span className="pill">{q.subject}</span>
        <div className="question">{q.text}</div>

        <div className="options">
          {q.options.map((opt, i) => (
            <label className="option" key={opt}>
              <input
                type="radio"
                name={`question-${index}`}
                checked={answers[index] === i}
                onChange={() => choose(i)}
              />
              <strong>{String.fromCharCode(65+i)})</strong> {opt}
            </label>
          ))}
        </div>

        <div className="answerGrid">
          {questions.map((_,i)=>(
            <button className="answerCell" key={i} onClick={()=>setIndex(i)}>
              {String(i+1).padStart(2,"0")} {answers[i] === null ? "—" : String.fromCharCode(65+answers[i]!)}
            </button>
          ))}
        </div>

        <div className="actions">
          <button className="btn" disabled={index===0} onClick={()=>setIndex(Math.max(0,index-1))}>Anterior</button>
          {index < questions.length-1 ? (
            <button className="btn primary" onClick={()=>setIndex(index+1)}>Próxima</button>
          ) : (
            <button className="btn primary" onClick={()=>setFinished(true)}>Finalizar prova</button>
          )}
        </div>
      </div>
    </>
  );
}
