import { signOut } from "next-auth/react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faUser,
  faBook,
} from "@fortawesome/free-solid-svg-icons";

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
        <DropdownMenuContent className="p-4">
          <DropdownMenuItem>
            <Link href="/profile" className="flex items-center gap-x-2">
              <FontAwesomeIcon icon={faUser} />
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/recipes" className="flex items-center gap-x-2">
              <FontAwesomeIcon icon={faBook} />
              My Recipes
            </Link>
          </DropdownMenuItem>
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
