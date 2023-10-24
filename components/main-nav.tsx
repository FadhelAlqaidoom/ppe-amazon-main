"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const MainNav = ({}) => {
  const pathname = usePathname();

  return (
    <nav className="mx-6 flex items-center space-x-4 lg:space-x-6">
      <Link
        href="/order"
        className={cn(
          "text-sm font-medium transition-colors hover:text-black",
          true ? "text-black" : "text-neutral-500",
        )}
      >
        ORDER
      </Link>

      <Link
        href="/itemstable"
        className={cn(
          "text-sm font-medium transition-colors hover:text-black",
          true ? "text-black" : "text-neutral-500",
        )}
      >
        ITEMS
      </Link>
    </nav>
  );
};

export default MainNav;
