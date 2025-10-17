import Link from "next/link";
import React from "react";
import { Logo } from "./Logo";

export const Footer = () => {
  const links = [
    {
      name: "Pricing",
      href: "https://tally.so/r/wokkvP",
    },
    {
      name: "Blog",
      href: "https://tally.so/r/wokkvP",
    },
    {
      name: "Contact",
      href: "https://tally.so/r/wokkvP",
    },
  ];
  const legal = [
    {
      name: "Privacy Policy",
      href: "/privacy",
    },
    {
      name: "Terms of Service",
      href: "/terms",
    },
    {
      name: "Refund Policy",
      href: "/refund",
    },
  ];
  const socials = [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/96203976/",
    },
  ];
  return (
    <div className="relative">
      <div className="border-t border-neutral-100  dark:border-neutral-800 px-8 pt-20 pb-32 relative bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto text-sm text-neutral-500 dark:text-neutral-400 flex sm:flex-row flex-col justify-between items-start ">
          <div>
            <div className="mr-4  md:flex mb-4">
              <Logo />
            </div>
            <div>Copyright &copy; 2025 Lynk</div>
            <div className="mt-2">All rights reserved</div>
          </div>
          <div className="grid grid-cols-3 gap-10 items-start mt-10 md:mt-0">
            <div className="flex justify-center space-y-4 flex-col mt-4">
              {links.map((link) => (
                <Link
                  key={link.name}
                  className="transition-colors hover:text-black text-muted dark:text-muted-dark dark:hover:text-neutral-400 text-xs sm:text-sm"
                  href={link.href}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="flex justify-center space-y-4 flex-col mt-4">
              {legal.map((link) => (
                <Link
                  key={link.name}
                  className="transition-colors hover:text-black text-muted dark:text-muted-dark dark:hover:text-neutral-400 text-xs sm:text-sm"
                  href={link.href}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="flex justify-center space-y-4 flex-col mt-4">
              {socials.map((link) => (
                <Link
                  key={link.name}
                  className="transition-colors hover:text-black text-muted dark:text-muted-dark dark:hover:text-neutral-400 text-xs sm:text-sm"
                  href={link.href}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <p className="text-center text-5xl md:text-9xl lg:text-[18rem] font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 dark:from-neutral-950 to-neutral-200 dark:to-neutral-800 inset-x-0">
        LYNK AI
      </p>
    </div>
  );
};
