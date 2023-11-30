import { signOut } from "next-auth/react";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import Button from "@/components/ui/Button";
import UserAvatar from "@/components/Header/UserAvatar";

type HeaderNavProps = {
  user: {
    username: string;
    image: string;
  };
};

const HeaderNav = ({ user }: HeaderNavProps) => {
  return (
    <nav className="hidden sm:block">
      <DropdownMenu>
        <DropdownMenuTrigger className="flex gap-x-2 items-center">
          <UserAvatar user={user} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <Link href="/profile">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/recipes">My Recipes</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="justify-center">
            <Button
              type="button"
              variant="ghostPrimary"
              onClick={() => signOut()}
            >
              Sign Out
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};

export default HeaderNav;
