import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/database/prisma-connect";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  const { email, password, nome } = await req.json();
  const user = await prisma.professor.create({
    data: {
      email,
      password: await bcrypt.hash(password, 10),
      nome,
    },
  });
  return NextResponse.json({
    message: "Success",
    user: {
      id: user.id,
      email: user.email,
    },
  });
}
