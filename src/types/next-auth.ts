import "next-auth/next";

declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      email: string;
    };
  }
}
