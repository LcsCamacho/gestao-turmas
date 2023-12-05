import TabsRegisterAndLogin from "@/auth/components/tabs-register-and-login";
import { nextAuthOptions } from "@/auth/next-auth/options";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import backgroundImage from "/public/images/bg-signin.jpg";
import { SignInForm } from "@/auth/components/sign-in-form";

export default async function Home() {
  const session = await getServerSession(nextAuthOptions);

  if (session) {
    redirect("/turmas");
  }

  return (
    <div className="dark-linear-gradient relative w-screen h-full">
      <Image
        src={backgroundImage}
        alt="imagem de fundo"
        className="opacity-10 "
        fill
      />
      <main className="flex min-h-screen flex-col items-center justify-center p-24 max-[600px]:p-6 z-10 relative ">
        <div className="form-container w-full max-w-[600px]">
          <TabsRegisterAndLogin />
        </div>
      </main>
    </div>
  );
}
