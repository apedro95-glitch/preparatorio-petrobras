"use client";

import { useEffect, useMemo, useState } from "react";

type Question = {
  id: string;
  text: string;
  options: string[];
  correct: number;
  subject: string;
  discipline: string;
  difficulty: string;
  explanation: string;
  origin: string;
};

type Mode = "prova" | "estudo";

export default function QuizPage() {
  const [stage, setStage] = useState<"setup" | "quiz" | "result">("setup");
  const [mode, setMode] = useState<Mode>("prova");
  const [discipline, setDiscipline] = useState("Conhecimentos Específicos");
  const [topic, setTopic] = useState("Lei de Ohm");
  const [difficulty, setDifficulty] = useState("Média");
  const [count, setCount] = useState(10);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [marked, setMarked] = useState<boolean[]>([]);
  const [index, setIndex] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (stage !== "quiz") return;
    const timer = window.setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => window.clearInterval(timer);
  }, [stage]);

  const score = useMemo(
    () =>
      answers.reduce<number>(
        (total, answer, i) =>
          total + (answer === questions[i]?.correct ? 1 : 0),
        0
      ),
    [answers, questions]
  );

  const answered = answers.filter((a) => a !== null).length;

  function formatTime(value: number) {
    const h = Math.floor(value / 3600);
    const m = Math.floor((value % 3600) / 60);
    const s = value % 60;

    return h > 0
      ? `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
      : `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  }

  async function generateQuiz() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/quiz/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          discipline,
          topic,
          difficulty,
          count,
          mode
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Não foi possível gerar o simulado.");
      }

      const generated: Question[] = data.questions;

      if (!Array.isArray(generated) || generated.length === 0) {
        throw new Error("O Tutor IA não retornou questões válidas.");
      }

      setQuestions(generated);
      setAnswers(Array(generated.length).fill(null));
      setMarked(Array(generated.length).fill(false));
      setIndex(0);
      setSeconds(0);
      setStage("quiz");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao gerar simulado.");
    } finally {
      setLoading(false);
    }
  }

  function choose(optionIndex: number) {
    const next = [...answers];
    next[index] = optionIndex;
    setAnswers(next);
  }

  function toggleMarked() {
    const next = [...marked];
    next[index] = !next[index];
    setMarked(next);
  }

  function finish() {
    setStage("result");
  }

  function reset() {
    setQuestions([]);
    setAnswers([]);
    setMarked([]);
    setIndex(0);
    setSeconds(0);
    setStage("setup");
  }

  if (stage === "setup") {
    return (
      <>
        <header className="header">
          <div>
            <h1>Questões & Simulados</h1>
            <p>Monte uma sessão personalizada e deixe o Tutor IA gerar questões inéditas.</p>
          </div>
          <span className="badge">Tutor IA</span>
        </header>

        <div className="quizSetupGrid">
          <section className="card quizSetupCard">
            <h2>Configurar sessão</h2>

            <label className="quizField">
              <span>Modo</span>
              <select value={mode} onChange={(e) => setMode(e.target.value as Mode)}>
                <option value="prova">Modo Prova</option>
                <option value="estudo">Modo Estudo</option>
              </select>
            </label>

            <label className="quizField">
              <span>Disciplina</span>
              <select value={discipline} onChange={(e) => setDiscipline(e.target.value)}>
                <option>Conhecimentos Específicos</option>
                <option>Português</option>
                <option>Matemática</option>
              </select>
            </label>

            <label className="quizField">
              <span>Assunto</span>
              <input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Ex.: Lei de Ohm, interpretação de texto..."
              />
            </label>

            <label className="quizField">
              <span>Dificuldade</span>
              <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                <option>Fácil</option>
                <option>Média</option>
                <option>Difícil</option>
                <option>Mista</option>
              </select>
            </label>

            <label className="quizField">
              <span>Quantidade de questões</span>
              <select value={count} onChange={(e) => setCount(Number(e.target.value))}>
                <option value={5}>5 questões</option>
                <option value={10}>10 questões</option>
                <option value={15}>15 questões</option>
                <option value={20}>20 questões</option>
              </select>
            </label>

            {error && <div className="quizError">{error}</div>}

            <button
              type="button"
              className="btn primary quizStartBtn"
              onClick={generateQuiz}
              disabled={loading || !topic.trim()}
            >
              {loading ? "Gerando questões..." : "✨ Gerar com Tutor IA"}
            </button>
          </section>

          <aside className="card quizInfoCard">
            <h2>Como funciona</h2>
            <div className="quizInfoItem">
              <strong>🧠 Tutor IA</strong>
              <span>Cria questões inéditas sobre o assunto escolhido.</span>
            </div>
            <div className="quizInfoItem">
              <strong>⏱ Cronômetro</strong>
              <span>O tempo começa assim que a sessão é iniciada.</span>
            </div>
            <div className="quizInfoItem">
              <strong>📝 Modo Prova</strong>
              <span>Sem correção durante a resolução. Resultado apenas no final.</span>
            </div>
            <div className="quizInfoItem">
              <strong>📚 Modo Estudo</strong>
              <span>Mostra correção e explicação após cada resposta.</span>
            </div>
            <div className="quizInfoItem">
              <strong>🏛 Provas anteriores</strong>
              <span>Entrarão depois pelo banco real; a IA nunca fingirá que uma questão é oficial.</span>
            </div>
          </aside>
        </div>
      </>
    );
  }

  if (stage === "result") {
    const percentage = questions.length
      ? Math.round((score / questions.length) * 100)
      : 0;

    return (
      <>
        <header className="header">
          <div>
            <h1>Resultado</h1>
            <p>{discipline} · {topic}</p>
          </div>
          <span className="badge">
            {mode === "prova" ? "Modo Prova" : "Modo Estudo"}
          </span>
        </header>

        <section className="grid metrics">
          <div className="metric"><small>Acertos</small><strong>{score}/{questions.length}</strong></div>
          <div className="metric"><small>Aproveitamento</small><strong>{percentage}%</strong></div>
          <div className="metric"><small>Tempo total</small><strong>{formatTime(seconds)}</strong></div>
          <div className="metric"><small>Marcadas p/ revisão</small><strong>{marked.filter(Boolean).length}</strong></div>
        </section>

        <section className="card quizResultCard">
          <h2>Correção</h2>

          <div className="quizReviewList">
            {questions.map((q, i) => {
              const isCorrect = answers[i] === q.correct;

              return (
                <div className="quizReviewItem" key={q.id}>
                  <div className="quizReviewTop">
                    <strong>Questão {i + 1}</strong>
                    <span className={`status ${isCorrect ? "green" : "orange"}`}>
                      {isCorrect ? "Correta" : "Revisar"}
                    </span>
                  </div>

                  <div className="muted">
                    {q.subject} · {q.difficulty} · {q.origin}
                  </div>

                  <p>{q.text}</p>

                  <div className="quizExplanation">
                    <strong>Explicação:</strong> {q.explanation}
                  </div>
                </div>
              );
            })}
          </div>

          <button className="btn primary" type="button" onClick={reset}>
            Criar nova sessão
          </button>
        </section>
      </>
    );
  }

  const q = questions[index];
  const selected = answers[index];
  const studyAnswered = mode === "estudo" && selected !== null;
  const isSelectedCorrect = selected === q.correct;

  return (
    <>
      <header className="quizExamHeader">
        <div>
          <div className="quizExamBadges">
            <span className="badge">
              {mode === "prova" ? "Modo Prova" : "Modo Estudo"}
            </span>
            <span className="status">{q.origin}</span>
          </div>

          <h1>{discipline}</h1>
          <p>{topic}</p>
        </div>

        <div className="quizTimer">
          <small>Tempo</small>
          <strong>⏱ {formatTime(seconds)}</strong>
        </div>
      </header>

      <div className="quizProgressWrap">
        <div className="quizProgressText">
          <span>Questão {index + 1} de {questions.length}</span>
          <span>{answered} respondidas</span>
        </div>

        <div className="progress">
          <span
            style={{
              width: `${((index + 1) / questions.length) * 100}%`
            }}
          />
        </div>
      </div>

      <section className="card quizQuestionCard">
        <div className="quizQuestionMeta">
          <span className="status">{q.subject}</span>
          <span className="status">{q.difficulty}</span>
        </div>

        <h2 className="quizQuestionText">{q.text}</h2>

        <div className="quizOptions">
          {q.options.map((option, optionIndex) => {
            const letter = String.fromCharCode(65 + optionIndex);
            const checked = selected === optionIndex;

            let extraClass = "";

            if (studyAnswered) {
              if (optionIndex === q.correct) extraClass = " quizOptionCorrect";
              else if (checked) extraClass = " quizOptionWrong";
            }

            return (
              <label
                className={`quizOption${checked ? " quizOptionSelected" : ""}${extraClass}`}
                key={`${q.id}-${optionIndex}`}
              >
                <input
                  type="radio"
                  name={`question-${index}`}
                  checked={checked}
                  onChange={() => choose(optionIndex)}
                />

                <span className="quizOptionLetter">{letter}</span>
                <span>{option}</span>
              </label>
            );
          })}
        </div>

        {studyAnswered && (
          <div
            className={`quizFeedback ${
              isSelectedCorrect ? "ok" : "bad"
            }`}
          >
            <strong>
              {isSelectedCorrect ? "Boa!" : "Vamos revisar."}
            </strong>
            <p>{q.explanation}</p>
          </div>
        )}

        <div className="quizQuestionTools">
          <button
            type="button"
            className={`btn ghost${marked[index] ? " quizMarked" : ""}`}
            onClick={toggleMarked}
          >
            {marked[index]
              ? "★ Marcada para revisão"
              : "☆ Marcar para revisão"}
          </button>
        </div>
      </section>

      <section className="card quizAnswerSheet">
        <div className="quizAnswerSheetTop">
          <strong>Cartão de respostas</strong>
          <span className="muted">{answered}/{questions.length}</span>
        </div>

        <div className="quizAnswerGrid">
          {questions.map((_, i) => (
            <button
              type="button"
              key={i}
              onClick={() => setIndex(i)}
              className={[
                "quizAnswerCell",
                i === index ? "active" : "",
                answers[i] !== null ? "answered" : "",
                marked[i] ? "marked" : ""
              ].join(" ")}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </section>

      <div className="quizNav">
        <button
          className="btn"
          type="button"
          disabled={index === 0}
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
        >
          ← Anterior
        </button>

        {index < questions.length - 1 ? (
          <button
            className="btn primary"
            type="button"
            onClick={() => setIndex((i) => i + 1)}
          >
            Próxima →
          </button>
        ) : (
          <button className="btn primary" type="button" onClick={finish}>
            Finalizar
          </button>
        )}
      </div>
    </>
  );
}
