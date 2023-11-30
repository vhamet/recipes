"use client";

import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

type AuthProviderProps = {
  children: ReactNode;
  session?: Session;
};

const AuthProvider = ({ children, session }: AuthProviderProps) => (
  <SessionProvider session={session}>{children}</SessionProvider>
);

export default AuthProvider;
