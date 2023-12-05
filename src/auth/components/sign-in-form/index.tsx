"use client";
import { Button, Input, Spinner } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { FormEvent, useRef, useState } from "react";
import { AuthService } from "../../services";
import { NotificationError } from "@/components/notification-error";
import { NotificationSuccess } from "@/components/notification-success";
import { AxiosError } from "axios";

export const SignInForm = () => {
  const refEmail = useRef<HTMLInputElement>(null);
  const refPassword = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [error, setError] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const email = refEmail.current?.value;
    const password = refPassword.current?.value;
    try {
      if (email && password) {
        const responseAuth = await AuthService.login({
          email,
          password,
          redirect: false,
        });
        if (responseAuth?.error) {
          console.log(responseAuth.error);
          setErrorText(
            responseAuth.status === 401
              ? "Email ou senha incorretos"
              : responseAuth.error
          );
          setError(true);
          setTimeout(() => {
            setError(false);
          }, 5000);
          return;
        }
        setSuccess(true);
        router.replace("/turmas");
        setTimeout(() => {
          setSuccess(false);
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        setError(true);
        setErrorText(error.response?.data?.message);
        setTimeout(() => {
          setError(false);
        }, 5000);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col gap-4 w-full justify-center mt-4 items-center">
      {error && <NotificationError text={errorText} />}
      {success && (
        <NotificationSuccess
          text={"Autenticação realizada! Redirecionando..."}
        />
      )}
      <form onSubmit={handleLogin} className="form-auth ">
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
        <footer className="flex flex-col gap-4 mt-2">
          <Button type="submit" color="primary" className="mt-3 bg-purple">
            {loading ? <Spinner /> : "Entrar"}
          </Button>
        </footer>
      </form>
    </div>
  );
};
