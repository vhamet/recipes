"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faUser,
  faBook,
} from "@fortawesome/free-solid-svg-icons";

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
    <div className="sm:hidden left-4 top-4 flex">
      <div className={cn("right-12 top-5 z-10", open ? "fixed" : "absolute")}>
        <AnimatedBurgerMenu onClick={() => setOpen(!open)} />
      </div>
      <aside
        className={cn(
          "w-64 h-screen py-20 px-4 fixed top-0 right-0 bg-background-light border-l border-border duration-500",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav className="flex flex-col items-end gap-y-4">
          <div className="flex gap-x-2 items-center">
            <label className="cursor-pointer text-sm">{user.username}</label>
            <UserAvatar user={user} />
          </div>
          <Link href="/profile" className="flex items-center gap-x-2">
            Profile
            <FontAwesomeIcon icon={faUser} />
          </Link>
          <Link href="/recipes" className="flex items-center gap-x-2">
            My Recipes
            <FontAwesomeIcon icon={faBook} />
          </Link>
          <Button
            type="button"
            variant="ghost"
            className="p-0 flex gap-x-2 text-base text-primary"
            onClick={() => signOut()}
          >
            Sign Out
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
          </Button>
        </nav>
      </aside>
    </div>
  );
};

export default HeaderNavMobile;
