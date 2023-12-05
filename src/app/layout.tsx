import type { Metadata } from "next";
import { fontSans } from "../config/fonts";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "SAEP - 2023",
  description: "SAEP - 2023",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontSans.className} min-h-screen`}>
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <main className="w-screen flex">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
