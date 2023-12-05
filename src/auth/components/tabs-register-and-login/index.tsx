"use client";

import { Tab, Tabs } from "@nextui-org/react";
import { SignInForm } from "../sign-in-form";
import { SignUpForm } from "../sign-up-form";

export default function TabsRegisterAndLogin() {
  return (
    <div className="w-full h-[400px]">
      <Tabs
        className="w-full"
        fullWidth
        classNames={{
          tabList: "flex justify-center gap-4 max-w-[600px]",
        }}
      >
        <Tab className="w-full" title="Entrar">
          <SignInForm />
        </Tab>
        <Tab className="w-full" title="Cadastrar">
          <SignUpForm />
        </Tab>
      </Tabs>
    </div>
  );
}
