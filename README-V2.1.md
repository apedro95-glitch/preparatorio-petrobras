# Portal Concursos V2.1 — Integração Supabase

## Arquivos para adicionar/substituir no GitHub

Substituir:
- package.json

Adicionar:
- lib/supabase/client.ts
- lib/supabase/server.ts
- middleware.ts
- app/login/page.tsx
- app/api/health/route.ts

## Depois do commit
A Vercel fará novo deploy automaticamente.

## Teste
Abra:
- /api/health

Resultado esperado:
{"ok":true,"supabaseConfigured":true}

Depois abra:
- /login

Você verá a tela de login por e-mail.
