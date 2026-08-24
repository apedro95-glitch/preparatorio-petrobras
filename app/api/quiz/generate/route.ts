import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function cleanJson(text: string) {
  return text
    .trim()
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const discipline = String(body.discipline || "").trim();
    const topic = String(body.topic || "").trim();
    const difficulty = String(body.difficulty || "Média").trim();
    const mode = String(body.mode || "prova").trim();
    const rawCount = Number(body.count || 10);
    const count = Math.min(Math.max(rawCount, 1), 20);

    if (!discipline || !topic) {
      return NextResponse.json(
        { error: "Disciplina e assunto são obrigatórios." },
        { status: 400 }
      );
    }

    const prompt = `
Crie exatamente ${count} questões inéditas de múltipla escolha para estudo de concurso.

Disciplina: ${discipline}
Assunto: ${topic}
Dificuldade: ${difficulty}
Modo da sessão: ${mode}
Objetivo: preparação para Petrobras/Transpetro, com estilo de cobrança compatível com concursos técnicos.

REGRAS OBRIGATÓRIAS:
- As questões são GERADAS PELO TUTOR IA; nunca diga que são questões oficiais ou retiradas de prova real.
- Cada questão deve ter exatamente 5 alternativas.
- Deve existir exatamente 1 alternativa correta.
- Varie raciocínio, aplicação e conceitos; evite repetir a mesma pergunta.
- Em cálculo, confira fórmula, unidades e resultado.
- Em Português, evite ambiguidades e garanta apenas uma resposta defensável.
- Explique o gabarito de maneira didática e curta.
- Faça uma verificação final de cada gabarito antes de responder.
- Retorne SOMENTE JSON válido. Nada antes ou depois.

Formato exato:
{
  "questions": [
    {
      "id": "q1",
      "text": "enunciado",
      "options": ["opção A", "opção B", "opção C", "opção D", "opção E"],
      "correct": 0,
      "subject": "subassunto",
      "discipline": "${discipline}",
      "difficulty": "${difficulty}",
      "explanation": "explicação curta do gabarito",
      "origin": "Gerada pelo Tutor IA"
    }
  ]
}

O campo "correct" é índice numérico de 0 a 4.
`;

    const response = await openai.responses.create({
      model: "gpt-5.6-luna",
      input: prompt
    });

    const parsed = JSON.parse(cleanJson(response.output_text));

    if (!Array.isArray(parsed.questions)) {
      throw new Error("Formato de questões inválido.");
    }

    const questions = parsed.questions
      .slice(0, count)
      .map((q: any, i: number) => ({
        id: String(q.id || `q${i + 1}`),
        text: String(q.text || ""),
        options: Array.isArray(q.options)
          ? q.options.map(String).slice(0, 5)
          : [],
        correct: Number(q.correct),
        subject: String(q.subject || topic),
        discipline: String(q.discipline || discipline),
        difficulty: String(q.difficulty || difficulty),
        explanation: String(q.explanation || ""),
        origin: "Gerada pelo Tutor IA"
      }))
      .filter(
        (q: any) =>
          q.text &&
          q.options.length === 5 &&
          Number.isInteger(q.correct) &&
          q.correct >= 0 &&
          q.correct <= 4 &&
          q.explanation
      );

    if (questions.length !== count) {
      throw new Error(
        "O Tutor IA retornou uma quantidade inválida de questões."
      );
    }

    return NextResponse.json({ questions });
  } catch (error) {
    console.error("Erro ao gerar quiz:", error);

    return NextResponse.json(
      {
        error:
          "Não foi possível gerar as questões agora. Tente novamente."
      },
      { status: 500 }
    );
  }
}
