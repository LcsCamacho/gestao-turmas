import { Spinner } from "@nextui-org/react";
export default function Loading() {
  return (
    <div className="flex gap-4 w-screen h-screen items-center justify-center ">
      <p>Carregando </p>{" "}
      <span>
        <Spinner />
      </span>
    </div>
  );
}
