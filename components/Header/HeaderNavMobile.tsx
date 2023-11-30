"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";

import AnimatedBurgerMenu from "@/components/AnimatedBurgerMenu";
import UserAvatar from "@/components/Header/UserAvatar";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type HeaderNavMobileProps = {
  user: {
    username: string;
    image: string;
  };
};

const HeaderNavMobile = ({ user }: HeaderNavMobileProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="sm:hidden flex left-4 top-4">
      <div className={cn("right-12 top-4 z-10", open ? "fixed" : "absolute")}>
        <AnimatedBurgerMenu onClick={() => setOpen(!open)} />
      </div>
      <aside
        className={cn(
          "w-64 h-screen py-20 px-4 fixed top-0 right-0 bg-background-light duration-500",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav className="flex flex-col items-end gap-y-4">
          <div className="flex gap-x-2 items-center">
            <label className="cursor-pointer text-sm">{user.username}</label>
            <UserAvatar user={user} />
          </div>
          <Link href="/profile">Profile</Link>
          <Link href="/recipes">My Recipes</Link>
          <div className="w-full mt-16 text-center">
            <Button
              type="button"
              variant="ghostPrimary"
              onClick={() => signOut()}
            >
              Sign Out
            </Button>
          </div>
        </nav>
      </aside>
    </div>

    /* transition: translate var(--animation-timing);
  translate: -100%;
  padding: 0.5rem 1rem;
  padding-top: calc(var(--hamburger-height) + var(--hamburger-margin) + 1rem);
  background-color: var(--foreground);
  color: var(--background);
  max-width: 10rem;
  min-height: 100vh; */
  );
};

export default HeaderNavMobile;
