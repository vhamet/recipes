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

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import Button, { buttonVariants } from "@/components/ui/Button";
import UserAvatar from "@/components/Header/UserAvatar";
import { cn } from "@/lib/utils";

type HeaderNavItemProps = {
  label: string;
  icon: IconDefinition;
  href: string;
  noSeparator?: boolean;
};

const HeaderNavItem = ({
  label,
  icon,
  href,
  noSeparator,
}: HeaderNavItemProps) => (
  <DropdownMenuItem>
    <Link
      href={href}
      className={cn(
        "w-full min-w-[12rem] py-4 flex items-end gap-x-2",
        !noSeparator && "border-b border-cream"
      )}
    >
      <FontAwesomeIcon icon={icon} className="text-2xl" />
      {label}
    </Link>
  </DropdownMenuItem>
);

type HeaderNavProps = {
  user: {
    username: string;
    image: string;
  };
};

const HeaderNav = ({ user }: HeaderNavProps) => {
  return (
    <nav className="hidden sm:flex items-center gap-x-4">
      <Link
        className={cn("flex gap-x-2", buttonVariants({ variant: "default" }))}
        href="/recipes/create"
      >
        <FontAwesomeIcon icon={faPlus} />
        New recipe
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex gap-x-2 items-center">
          <UserAvatar user={user} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-4">
          <HeaderNavItem href="/profile" icon={faUser} label="Profile" />
          <HeaderNavItem
            href="/recipes"
            icon={faBook}
            label="My Recipes"
            noSeparator
          />
          <DropdownMenuSeparator />
          <DropdownMenuItem className="justify-center">
            <Button
              type="button"
              variant="ghostPrimary"
              onClick={() => signOut()}
              className="flex gap-x-2"
            >
              Sign Out
              <FontAwesomeIcon icon={faArrowRightFromBracket} />
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};

export default HeaderNav;
