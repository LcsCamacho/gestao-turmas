import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/database/prisma-connect";
import { Prisma } from "@prisma/client";

export async function POST(req: NextRequest) {
  const { nome, email } = await req.json();
  const turma = await prisma.turma.create({
    data: {
      nome,
      Professor: {
        connect: {
          email,
        },
      },
    },
  });
  if (!turma) {
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
      id: turma.id,
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
  const email = req.nextUrl.searchParams.get("email");
  if (email) {
    data.where = {
      Professor: {
        email: email,
      },
    };
  }
  const turmas = await prisma.turma.findMany({
    ...data,
    orderBy: {
      createdAt: "desc",
    },
  });
  if (!turmas)
    return NextResponse.json({
      result: null,
      status: "error",
      code: 404,
    });
  return NextResponse.json(
    {
      result: turmas,
      status: "success",
      code: 200,
    },
    {
      status: 200,
    }
  );
}

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  try {
    if (!id)
      return NextResponse.json(
        {
          status: "error",
          code: 400,
          message: "Id não informado",
        },
        { status: 400 }
      );
    const turma = await prisma.turma.delete({
      where: {
        id: Number(id),
      },
    });
    if (!turma) {
      return NextResponse.json(
        {
          status: "error",
          code: 500,
          message: "Não foi possível deletar a turma",
        },
        {
          status: 500,
        }
      );
    }
    return NextResponse.json({
      id: turma.id,
      status: "success",
      message: "Turma deletada com sucesso",
      code: 204,
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2003"
    ) {
      return NextResponse.json(
        {
          status: "error",
          code: 500,
          message: "Turma tem atividades associadas, não pode ser excluída.",
        },
        {
          status: 500,
        }
      );
    }
    return NextResponse.json(
      {
        status: "error",
        code: 500,
        message: "Não foi possível deletar a turma",
      },
      {
        status: 500,
      }
    );
  }
}
