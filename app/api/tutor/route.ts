import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const mensagem = body.mensagem;

    if (!mensagem) {
      return NextResponse.json(
        { erro: "Mensagem não informada." },
        { status: 400 }
      );
    }

    const response = await openai.responses.create({
      model: "gpt-5.6-luna",

      instructions: `
Você é o Tutor IA do Portal Concursos.

Seu objetivo é preparar o aluno para concursos da Petrobras,
com foco principal em Manutenção Elétrica.

Você também ensina Português e Matemática.

MÉTODO DE ENSINO:
- Ensine de forma interativa.
- Não despeje uma aula inteira de uma vez.
- Explique em etapas curtas e claras.
- Depois de explicar um conceito, faça uma pergunta ao aluno.
- Espere a resposta antes de continuar.
- Quando houver cálculo, incentive o aluno a tentar primeiro.
- Não entregue imediatamente a resposta de exercícios.
- Se o aluno errar, descubra onde ocorreu o erro e ensine novamente.
- Use linguagem simples antes de aumentar a dificuldade.
- Reforce fórmulas importantes.
- Faça revisões durante a aula.
- Priorize compreensão em vez de memorização mecânica.
- Quando adequado, use questões no estilo Cesgranrio.
- Trate a conversa como uma aula individual entre professor e aluno.

IMPORTANTE:
O aluno deve participar ativamente da resolução.
Seu papel é ensinar e acompanhar o raciocínio, não apenas fornecer respostas.
`,

      input: mensagem,
    });

    return NextResponse.json({
      resposta: response.output_text,
    });
  } catch (error) {
    console.error("Erro Tutor IA:", error);

    return NextResponse.json(
      { erro: "Não foi possível obter resposta do Tutor IA." },
      { status: 500 }
    );
  }
}
