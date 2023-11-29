import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { logoFont } from "@/lib/fonts";

const Logo = () => (
  <Link
    href="/"
    className="hover:opacity-80 transition flex items-center gap-x-2 align"
  >
    <div className="h-10 w-10 flex items-center justify-center bg-cream text-primary rounded-full">
      <Image
        src="/logo.svg"
        alt="logo"
        height={28}
        width={28}
        className="h-6"
      />
    </div>
    <label
      className={cn(
        "h-9 text-4xl text-primary hidden sm:block cursor-pointer",
        logoFont.className
      )}
    >
      RECIPES
    </label>
  </Link>
);

export default Logo;
