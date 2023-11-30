"use client";

import { useEffect, useState } from "react";
import {
  ClientSafeProvider,
  LiteralUnion,
  getProviders,
  useSession,
  signIn,
} from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers/index";

import HeaderNav from "./HeaderNav";
import HeaderNavMobile from "@/components/Header/HeaderNavMobile";
import Button from "@/components/ui/Button";

const HeaderActions = () => {
  const { data: session, status } = useSession();

  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);

  useEffect(() => {
    (async () => {
      const prov = await getProviders();
      setProviders(prov);
    })();
  }, []);

  if (status === "loading") return null;

  return session?.user ? (
    <>
      <HeaderNav user={session.user} />
      <HeaderNavMobile user={session.user} />
    </>
  ) : (
    <div>
      {providers &&
        Object.values(providers).map((provider) => (
          <Button
            key={provider.name}
            type="button"
            variant="ghost"
            onClick={() => signIn(provider.id)}
          >
            Sign in
          </Button>
        ))}
    </div>
  );
};

export default HeaderActions;
