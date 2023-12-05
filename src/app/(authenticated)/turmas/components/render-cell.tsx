import { Button, Link } from "@nextui-org/react";
import { Turma } from "@prisma/client";
import { FaEye, FaTrash } from "react-icons/fa";
interface RenderCellProps {
  turma: Turma;
  columnKey: string;
  onDelete?: (id: number) => void;
  loading?: boolean;
}
export const renderCell = ({
  turma,
  columnKey,
  onDelete,
  loading,
}: RenderCellProps) => {
  const cells = {
    id: <p className="">{turma.id}</p>,
    nome: <p className="">{turma.nome}</p>,
    actions: (
      <div className="relative flex justify-end items-center gap-2 w-full">
        <Link href={"/atividades/" + turma.id}>
          <Button isLoading={loading} isIconOnly variant="light">
            <FaEye color="#0070f0" />
          </Button>
        </Link>

        <Button
          isLoading={loading}
          onClick={() => onDelete && onDelete(turma.id)}
          isIconOnly
          variant="light"
        >
          <FaTrash color="#f31260" />
        </Button>
      </div>
    ),
    createdAt: (
      <p className="">{new Date(turma.createdAt).toLocaleDateString()}</p>
    ),
  };
  const cell = cells[columnKey as keyof typeof cells];
  if (!cell) return <></>;
  return cell;
};
