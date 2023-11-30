"use client";

import { useEffect, useState } from "react";
import {
  ClientSafeProvider,
  LiteralUnion,
  getProviders,
  useSession,
  signIn,
  signOut,
} from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers/index";

import Button, { buttonVariants } from "../ui/Button";

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
    <div>
      <Button type="button" variant="outline" onClick={() => signOut()}>
        Sign Out
      </Button>
    </div>
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
