import TableTurmas from "./components/table";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/auth/next-auth/options";
import { TurmasServices } from "./services";
import { NotificationError } from "@/components/notification-error";

export default async function Turmas({
  searchParams,
}: {
  searchParams: {
    error?: string;
  };
}) {
  const session = await getServerSession(nextAuthOptions);
  const turmas = await TurmasServices.getTurmasByProfessorEmail(
    session?.user?.email!
  );

  return (
    <div className="w-full h-full gap-4 flex flex-col">
      <h1 className="text-4xl text-center">Turmas</h1>
      {searchParams.error && (
        <NotificationError portal={false} text={searchParams.error} />
      )}
      <div className="wrapper-table-turmas custom-container w-full h-full">
        <TableTurmas turmas={turmas.result} />
      </div>
    </div>
  );
}
