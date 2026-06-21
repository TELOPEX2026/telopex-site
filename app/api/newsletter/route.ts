import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const email = body?.email;

  if (!email || typeof email !== "string" || !email.includes("@")) {
    return NextResponse.json({ error: "Adresse email invalide." }, { status: 400 });
  }

  // TODO: brancher Resend ou Brevo ici pour ajouter l'email à la liste.
  console.log("Nouvelle inscription newsletter :", email);

  return NextResponse.json({ success: true });
}
