"use client";
import { Button } from "@nextui-org/button";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export type ColorsNextUi =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | undefined;

export default function LogoutButton({
  className,
  color,
}: {
  className?: string;
  color?: ColorsNextUi;
}) {
  const router = useRouter();

  const logout = async () => {
    await signOut({
      redirect: true,
    });
    router.replace("/");
  };

  return (
    <Button
      className={`text-small ${className}`}
      size="sm"
      color={color}
      onClick={logout}
    >
      Sair
    </Button>
  );
}
