import React from "react";
import logo from "../../public/logo.svg";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className=" fixed w-screen z-50 flex justify-between items-center px-5 h-20">
      <div>
        <Link href="/">
          <Image src={logo} alt="Logo" width={200} height={200} />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
