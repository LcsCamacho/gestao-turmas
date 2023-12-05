"use client";

import { useEffect } from "react";
import { Button } from "@nextui-org/button";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex gap-4 w-screen h-screen items-center justify-center ">
      <h2>Oh não! Algum erro aconteceu... tente novamente por favor!</h2>
      <Button onClick={() => reset()}>Voltar a página inicial</Button>
    </div>
  );
}
