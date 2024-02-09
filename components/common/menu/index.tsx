"use client";

import classNames from "classnames";
import { useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { HiMenuAlt3 } from "react-icons/hi";

import { useMenu } from "@/hooks";
import { navLinks } from "@/mock";
import { Avatar, NavLink } from "@/components/caritabox";

export default function Menu() {
  const menu = useMenu();
  const pathname = usePathname();
  const { data: session, status } = useSession();

  useEffect(() => {
    menu.onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);
  return (
    <>
      <nav
        id="main-menu"
        className={classNames(
          "absolute flex w-52 flex-col gap-8 bg-transparent transition-all lg:relative lg:w-full lg:flex-row",
          {
            "right-0 top-20 mr-6 rounded-md !bg-slate-50 p-6 shadow-lg dark:!bg-slate-800":
              menu.isOpen,
            "-right-full top-0 lg:right-0": !menu.isOpen,
          },
        )}
      >
        {session?.user.role === "ADMIN" && (
          <NavLink name="Admin" href="/admin" />
        )}
        {navLinks.map((link, key) => {
          return <NavLink key={key} name={link.name} href={link.href} />;
        })}
        {session?.user.role === "USER" && (
          <NavLink name="Kundenkonto" href="/account" />
        )}
        {status === "authenticated" ? (
          <NavLink name="Abmeldung" onClick={signOut} />
        ) : (
          <NavLink name="Anmeldung" onClick={signIn} />
        )}
      </nav>
      {session?.user && <Avatar fullname={session.user.name} />}
      <div className="flex flex-row items-center justify-end gap-3">
        <HiMenuAlt3
          onClick={menu.onToggle}
          size={40}
          className="block cursor-pointer rounded bg-slate-100 px-1.5 dark:bg-slate-800 lg:hidden"
        />
      </div>
    </>
  );
}
