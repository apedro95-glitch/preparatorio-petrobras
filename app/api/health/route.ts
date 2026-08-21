import { NextResponse } from "next/server";

export async function GET() {
  const ok =
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);

  return NextResponse.json({
    ok,
    supabaseConfigured: ok
  });
}
