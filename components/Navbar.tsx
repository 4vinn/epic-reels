import { GalleryHorizontalEnd, Wand2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import SignOutButton from "./SignOutButton";

const Navbar = () => {
  return (
    <>
      <nav className="fixed top-0 left-0 w-full flex justify-between px-2 md:px-28 py-2 z-50 bg-[#1f1f1f99] backdrop-blur-2xl">
        <Link href="/" className="flex items-center gap-1">
          <Image
            src="/logo.png"
            className="bg-white rounded-sm"
            alt="logo"
            width={35}
            height={35}
          />
          <h3 className="text-primary-100">EpicReels</h3>
        </Link>
        <div className="flex flex-row gap-10 items-center">
          <Link href="/my-reels">
            <div className="flex flex-row gap-1 items-center">
              <GalleryHorizontalEnd className="h-4 w-4" />
              My Reels
            </div>
          </Link>
          <Link href="/generate">
            <div className="flex flex-row gap-1 items-center">
              <Wand2 className="h-4 w-4" />
              Create
            </div>
          </Link>
          <SignOutButton />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
