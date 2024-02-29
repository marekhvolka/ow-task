import { Dialog, Menu } from "@headlessui/react";
import {
  Bars3Icon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import { cn } from "~/utils/helpers";

function NavBarLink({
  href,
  active,
  className,
  children,
}: {
  href: string;
  active: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "relative inline-flex items-center rounded-full px-[18px] py-[6px] text-[18px] text-mainColor hover:rgba(26,27,31,.75) active:bg-[#EEEEEE]",
        className,
        active
          ? "bg-bittersweet-tint1 text-bittersweet hover:bg-bittersweet-tint1 active:bg-bittersweet-tint1"
          : "border-transparent"
      )}
    >
      {children}
    </Link>
  );
}

function MobileNavBarLink({
  href,
  active,
  className,
  children,
}: {
  href: string;
  active: boolean;
  className?: string;
  children: React.ReactNode;
  badge?: string | React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "relative inline-flex items-center rounded-full px-6 py-1 text-sm hover:bg-[#F6F6F6] active:bg-[#EEEEEE]",
        className,
        active ? "font-semibold text-[#001346]" : "font-normal text-[#999]"
      )}
    >
      {children}
    </Link>
  );
}

const menuItems = [
  {
    name: "Titles",
    href: "/titles",
  },
] as {
  name: string;
  href: string;
}[];

export const NavBar: React.FC = () => {
  const router = useRouter();

  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <>
      {/* Desktop */}
      <div className="hidden h-16 justify-between bg-white md:flex">
        <div className="flex flex-1 gap-8">
          <div className="flex items-center">
            <Link href="/" className="relative">
              <img src="/logo.svg" alt="Orbital Witness" className="h-[40px]" />
            </Link>
          </div>
          <div className="mx-4 flex items-center space-x-8">
            {menuItems.map((item) => (
              <NavBarLink
                key={item.href}
                href={item.href}
                active={router.pathname === item.href}
              >
                {item.name}
              </NavBarLink>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="flex h-14 items-center justify-between border-b-2 border-b-[#D7D7D7] bg-white px-4 md:hidden">
        <Link href="/" className="-m-1.5 p-1.5">
          <span className="sr-only">Orbital Witness</span>
          <img className="h-7 w-7 fill-[#001346]" src="/logo.svg" alt="Orbital Witness" />
        </Link>

        {menuItems
          .filter((item) => item.href === router.pathname)
          .map((item) => (
            <MobileNavBarLink
              key={item.href}
              href={item.href}
              active
            >
              {item.name}
            </MobileNavBarLink>
          ))}

        <button
          type="button"
          className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          onClick={() => setMobileMenuOpen(true)}
        >
          <span className="sr-only">Open main menu</span>
          <Bars3Icon className="h-6 w-6 fill-[#999999]" aria-hidden="true" />
        </button>
      </div>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white">
          <div className="flex h-14 items-center justify-between border-b-2 border-b-[#D7D7D7] bg-white px-4 md:hidden">
            <Link href="/planner" className="-m-1.5 p-1.5">
              <span className="sr-only">Orbital Witness</span>
              <img className="h-7 w-7 fill-[#001346]" src="/logo.svg" />
            </Link>
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <Bars3Icon
                className="h-6 w-6 fill-bittersweet"
                aria-hidden="true"
              />
            </button>
          </div>

          <div className="mt-6 flex flex-col items-center space-y-5 px-4">
            {menuItems.map((item) => (
              <MobileNavBarLink
                key={item.href}
                href={item.href}
                active={router.pathname === item.href}
              >
                {item.name}
              </MobileNavBarLink>
            ))}
            <MobileNavBarLink
              href="/feedback"
              className="font-normal"
              active={router.pathname === "/feedback"}
            >
              Send us feedback
            </MobileNavBarLink>
            
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  );
};
