import BackIcon from "./components/back-icon";
import TableAtividades from "./components/table";
import { AtividadesServices } from "./services";
import { redirect } from "next/navigation";

interface AtividadePorTurmaProps {
  params: {
    turmaId: string;
  };
}
export default async function AtividadePorTurma({
  params,
}: AtividadePorTurmaProps) {
  const { turmaId } = params;

  const atividades = await AtividadesServices.getAtividadesByTurmaId(
    turmaId
  ).catch((error) => {
    if (error.response?.status === 404) {
      redirect("/turmas?error=Turma não encontrada.");
    }
  });
  return (
    <div className="w-full h-full gap-4 flex flex-col custom-container">
      <h1 className="text-4xl text-center">{atividades.turma.nome}</h1>
      <BackIcon />
      <div className="wrapper-table-turmas w-full h-full">
        <TableAtividades atividades={atividades.result} turmaId={turmaId} />
      </div>
    </div>
  );
}
