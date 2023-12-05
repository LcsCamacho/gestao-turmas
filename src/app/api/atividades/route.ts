import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/database/prisma-connect";

export async function POST(req: NextRequest) {
  const { titulo, turmaId, descricao } = await req.json();
  const atividade = await prisma.atividade.create({
    data: {
      titulo,
      turmaId: Number(turmaId),
      descricao,
    },
  });
  if (!atividade) {
    return NextResponse.json(
      {
        status: "error",
        code: 500,
      },
      {
        status: 500,
      }
    );
  }
  return NextResponse.json(
    {
      id: atividade.id,
      status: "success",
      code: 201,
    },
    {
      status: 201,
    }
  );
}

export async function GET(req: NextRequest) {
  const data: {
    where?: {};
  } = {};
  try {
    const id = req.nextUrl.searchParams.get("turmaId");
    if (id) {
      data.where = {
        id: Number(id),
      };
    }
    const turma = await prisma.turma.findMany({
      ...data,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        Atividades: true,
      },
    });
    if (!turma || turma.length === 0)
      return NextResponse.json(
        {
          turma: {
            nome: "null",
          },
          result: [],
          status: "sem turma com esse id",
          code: 404,
        },
        {
          status: 404,
        }
      );
    return NextResponse.json(
      {
        turma: {
          nome: turma[0].nome || "null",
        },
        result: turma[0].Atividades,
        status: "success",
        code: 200,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        turma: {
          nome: "null",
        },
        result: [],
        status: "error",
        code: 400,
      },
      {
        status: 400,
      }
    );
  }
}
