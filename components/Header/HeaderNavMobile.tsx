"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faUser,
  faBook,
  faPlus,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";

import AnimatedBurgerMenu from "@/components/AnimatedBurgerMenu";
import UserAvatar from "@/components/Header/UserAvatar";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type HeaderNavMobileItemProps = {
  label: string;
  icon: IconDefinition;
  href: string;
  noSeparator?: boolean;
};

const HeaderNavMobileItem = ({
  label,
  icon,
  href,
  noSeparator,
}: HeaderNavMobileItemProps) => (
  <Link
    href={href}
    className={cn(
      "w-full py-4 flex items-center justify-end gap-x-2",
      !noSeparator && "border-b border-cream"
    )}
  >
    {label}
    <FontAwesomeIcon icon={icon} className="text-2xl" />
  </Link>
);

type HeaderNavMobileProps = {
  user: {
    username: string;
    email: string;
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
          "w-64 h-screen py-20 px-4 fixed top-0 right-0 z-10 bg-background-light border-l border-border duration-500",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav className="flex flex-col items-end">
          <div className="mb-8 flex gap-x-2 items-center">
            <div className="flex flex-col items-end">
              <label className="text-sm">{user.username}</label>
              <label className="text-xs">{user.email}</label>
            </div>
            <UserAvatar user={user} />
          </div>
          <HeaderNavMobileItem
            href="/recipes/create"
            label="New Recipe"
            icon={faPlus}
          />
          <HeaderNavMobileItem
            href="/recipes"
            label="My Recipes"
            icon={faBook}
          />
          <HeaderNavMobileItem
            href="/profile"
            label="Profile"
            icon={faUser}
            noSeparator
          />
          <div className="w-full mt-12 flex justify-center">
            <Button
              type="button"
              variant="ghost"
              className="p-0 flex gap-x-2 text-base text-primary"
              onClick={() => signOut()}
            >
              Sign Out
              <FontAwesomeIcon icon={faArrowRightFromBracket} />
            </Button>
          </div>
        </nav>
      </aside>
    </div>
  );
};

export default HeaderNavMobile;
