'use client'
import { NextUIProvider as Provider } from "@nextui-org/react";

interface SessionContextProps {
  children: React.ReactNode;
}

export default function NextUIProvider({ children }:SessionContextProps) {
  return (
    <Provider>
      {children}
    </Provider>
  )
}