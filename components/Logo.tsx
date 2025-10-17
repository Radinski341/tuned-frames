"use client";
import Link from "next/link";
import React from "react";

export const Logo = () => {
  // const handleLogoClick = (e: React.MouseEvent) => {
  //   e.preventDefault();
  //   window.scrollTo({
  //     top: 0,
  //     behavior: "smooth",
  //   });
  // };
  return (
    <Link
      href="/"
      // onClick={handleLogoClick}
      className="font-normal flex space-x-2 items-center text-sm mr-4  text-black px-2 py-1  relative z-20"
    >
      <span className="font-bold text-black dark:text-white">Lynk.</span>
    </Link>
  );
};
