import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/database/prisma-connect";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const professor = await prisma.professor.findUnique({
    where: {
      email,
    },
  });
  if (!professor)
    return NextResponse.json(
      { error: "Email não encontrado" },
      { status: 404 }
    );
  if (professor.password !== password)
    return NextResponse.json(
      { error: "Credenciais inválidas" },
      { status: 401 }
    );
  return NextResponse.json({
    id: professor.id,
    name: professor.nome,
    email: professor.email,
  });
}
