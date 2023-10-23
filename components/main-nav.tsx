"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const MainNav = ({}) => {
  const pathname = usePathname();

  return (
    <nav className="mx-6 flex items-center space-x-4 lg:space-x-6">
      <Link
        href="http://localhost:3000/order"
        className={cn(
          "text-sm font-medium transition-colors hover:text-black",
          true ? "text-black" : "text-neutral-500",
        )}
      >
        ORDER
      </Link>

      <Link
        href=" http://localhost:3000/items"
        className={cn(
          "text-sm font-medium transition-colors hover:text-black",
          true ? "text-black" : "text-neutral-500",
        )}
      >
        ITEMS
      </Link>

      <Link
        href="/"
        className={cn(
          "text-sm font-medium transition-colors hover:text-black",
          true ? "text-black" : "text-neutral-500",
        )}
      >
        Welcome to BAH PPE Store
      </Link>
    </nav>
  );
};

export default MainNav;
