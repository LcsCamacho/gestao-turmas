"use client";
import { Button, Input, Spinner } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { FormEvent, useRef, useState } from "react";
import { AuthService } from "../../services";
import { signIn } from "next-auth/react";
import { NotificationError } from "@/components/notification-error";
import { NotificationSuccess } from "@/components/notification-success";

export const SignUpForm = () => {
  const refEmail = useRef<HTMLInputElement>(null);
  const refPassword = useRef<HTMLInputElement>(null);
  const refPasswordConfirm = useRef<HTMLInputElement>(null);
  const refNome = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [error, setError] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [senhaDiferente, setSenhaDiferente] = useState<boolean>(false);
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const email = refEmail.current?.value;
    const password = refPassword.current?.value;
    const passwordConfirm = refPasswordConfirm.current?.value;
    const nome = refNome.current?.value;
    try {
      if (password !== passwordConfirm) {
        setSenhaDiferente(true);
        return;
      }
      if (email && password && nome) {
        const responseAuth = await AuthService.register({
          email,
          password,
          nome,
        });
        if (responseAuth?.data.error) {
          console.log(responseAuth.data.error);
          setError(true);
          setTimeout(() => {
            setError(false);
          }, 5000);
          return;
        }
        await signIn("credentials", {
          email,
          password,
          redirect: false,
        });
        setSuccess(true);
        setTimeout(() => {
          router.replace("/turmas");
          setSuccess;
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col gap-4 w-full justify-center  mt-4 items-center">
      {error && <NotificationError text="Erro fazer cadastro" />}
      {success && <NotificationSuccess text="Cadastro feito com sucesso!" />}
      <form onSubmit={handleLogin} className="form-auth">
        <label
          className="font-semibold text-xs text-white"
          htmlFor="usernameField"
        >
          Nome
        </label>
        <Input
          ref={refNome}
          type="text"
          variant="underlined"
          color="primary"
          className="text-white"
        />
        <label
          className="font-semibold text-xs text-white"
          htmlFor="usernameField"
        >
          Email
        </label>
        <Input
          ref={refEmail}
          type="text"
          variant="underlined"
          color="primary"
          className="text-white"
        />
        <label
          className="font-semibold text-xs mt-3 text-white"
          htmlFor="passwordField"
        >
          Senha
        </label>
        <Input
          ref={refPassword}
          type="password"
          variant="underlined"
          color="primary"
          className="text-white"
        />
        <label
          className="font-semibold text-xs mt-3 text-white"
          htmlFor="passwordField"
        >
          Confirmar Senha
        </label>
        <Input
          ref={refPasswordConfirm}
          type="password"
          variant="underlined"
          color="primary"
          className="text-white"
        />
        {senhaDiferente && (
          <p className="text-red-600">As senhas não são iguais</p>
        )}
        <footer className="flex flex-col gap-4 mt-2">
          <Button type="submit" color="primary" className="mt-3 bg-purple">
            {loading ? <Spinner /> : "Cadastrar"}
          </Button>
        </footer>
      </form>
    </div>
  );
};
