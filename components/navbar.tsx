import Link from "next/link";

import MainNav from "@/components/main-nav";
import Container from "@/components/ui/container";
import NavbarActions from "@/components/navbar-actions";

const Navbar = async () => {
  return (
    <>
      <div className="z-0 border-b bg-white">
        <Container>
          <div className="relative flex h-16 items-center px-4 sm:px-6 lg:px-8">
            <Link href="/" className="ml-4 flex gap-x-2 lg:ml-0">
              <p className="text-xl font-bold">AWS PPE</p>
            </Link>
            <MainNav />
            <NavbarActions />
          </div>
        </Container>
      </div>
    </>
  );
};

export default Navbar;
