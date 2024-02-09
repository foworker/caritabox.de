import Link from "next/link";
import { BiPhoneCall } from "react-icons/bi";

import { Logo, Menu, ThemeSwitcher } from "@/components/common";

const Header = async () => {
  return (
    <header className="fixed top-0 z-[999] w-full bg-white/70 shadow-sm backdrop-blur-sm dark:bg-slate-900/80">
      <div className="bg-caritabox-500 px-4 lg:px-0">
        <div className="container mx-auto flex items-center justify-between py-1">
          <div className="flex items-center gap-2 text-sm text-white">
            <BiPhoneCall />
            <Link href={`tel:${process.env.SERVICE_PHONE}`}>
              Service Telefon: {`${process.env.SERVICE_PHONE}`}
            </Link>
          </div>
          <ThemeSwitcher />
        </div>
      </div>
      <div className="container relative mx-auto flex items-center justify-between px-4 py-4 lg:px-0">
        <Logo />
        <div className="flex flex-row items-center gap-4 ">
          <Menu />
        </div>
      </div>
    </header>
  );
};

export default Header;
