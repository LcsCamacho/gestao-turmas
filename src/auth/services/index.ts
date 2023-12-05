import { AxiosResponse } from "axios";
import { UseApiPrivate } from "../../services/apiPrivate";
import { AuthPayload } from "../types";
import { signIn, SignInOptions } from "next-auth/react";

interface ResponseRegister {
  error: string;
  message: string;
}

export const AuthService = {
  register: (authPayload: AuthPayload) =>
    UseApiPrivate().post<ResponseRegister>("/auth/sign-up", authPayload),
  login: (authPayload: SignInOptions) => signIn("credentials", authPayload),
};
