"use client";
import { useState } from "react";

type Msg = { role: "ai" | "user"; text: string };

export default function SalaPage() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "ai", text: "Olá! Hoje vamos trabalhar Interpretação de Texto. Antes de avançarmos, quero entender como você identifica a ideia principal de um texto. Em suas palavras: o que é a ideia principal?" }
  ]);
  const [text, setText] = useState("");

  function send() {
    const value = text.trim();
    if (!value) return;
    setMessages([...messages, { role: "user", text: value }]);
    setText("");
  }

  return (
    <div className="chatShell">
      <div className="chatTop">
        <div><span className="badge">Aula em andamento</span><h1 style={{margin:"10px 0 4px"}}>Interpretação de Texto</h1><div className="muted">Português · Tutor IA · 1h30 prevista</div></div>
        <button className="btn ghost">Finalizar aula</button>
      </div>
      <div className="chatBox">{messages.map((m,i)=><div key={i} className={`msg ${m.role}`}>{m.text}</div>)}</div>
      <div className="chatComposer">
        <textarea value={text} onChange={(e)=>setText(e.target.value)} placeholder="Digite sua resposta..." />
        <button className="btn primary" onClick={send}>Enviar</button>
      </div>
      <div className="notice" style={{marginTop:12}}>Nesta etapa a interface já funciona. No próximo passo, o botão Enviar será ligado à rota <strong>/api/tutor</strong> e as mensagens serão registradas no Supabase.</div>
    </div>
  );
}
