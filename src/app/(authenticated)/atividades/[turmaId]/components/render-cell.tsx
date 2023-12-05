import { AtividadeWithIndice } from "./table";
interface RenderCellProps {
  atividade: AtividadeWithIndice;
  columnKey: string;
}
export const renderCell = ({ atividade, columnKey }: RenderCellProps) => {
  const cells = {
    indice: <p className="">{atividade.indice}</p>,
    titulo: <p className="">{atividade.titulo}</p>,
    descricao: <p className="">{atividade.descricao}</p>,
    createdAt: (
      <p className="">{new Date(atividade.createdAt).toLocaleDateString()}</p>
    ),
  };
  const cell = cells[columnKey as keyof typeof cells];
  if (!cell) return <></>;
  return cell;
};
