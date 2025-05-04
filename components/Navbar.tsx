// import { GalleryHorizontalEnd, Wand2 } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import React from "react";
// import SignOutButton from "./SignOutButton";

// const Navbar = () => {
//   return (
//     <>
//       <nav className="fixed top-0 left-0 w-full flex justify-between px-2 md:px-28 py-2 z-50 bg-[#1f1f1f99] backdrop-blur-2xl">
//         <Link href="/" className="flex items-center gap-1">
//           <Image
//             src="/logo.png"
//             className="bg-white rounded-sm"
//             alt="logo"
//             width={35}
//             height={35}
//           />
//           <h3 className="text-primary-100">EpicReelss</h3>
//         </Link>
//         <div className="flex flex-row gap-10 items-center">
//           <Link href="/my-reels">
//             <div className="flex flex-row gap-1 items-center">
//               <GalleryHorizontalEnd className="h-4 w-4" />
//               My Reels
//             </div>
//           </Link>
//           <Link href="/generate">
//             <div className="flex flex-row gap-1 items-center">
//               <Wand2 className="h-4 w-4" />
//               Create
//             </div>
//           </Link>
//           <SignOutButton />
//         </div>
//       </nav>
//     </>
//   );
// };

// export default Navbar;
"use client";
import { GalleryHorizontalEnd, Wand2, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import SignOutButton from "./SignOutButton";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full flex justify-between px-2 md:px-28 py-2 z-50 ">
        {/* Logo */}
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

        {/* desktop menu */}
        <div className="hidden md:flex flex-row gap-10 items-center">
          <Link
            href="/my-reels"
            className="flex flex-row gap-1 items-center hover:text-primary-100 transition"
          >
            <GalleryHorizontalEnd className="h-4 w-4" />
            My Reels
          </Link>
          <Link
            href="/generate"
            className="flex flex-row gap-1 items-center hover:text-primary-100 transition"
          >
            <Wand2 className="h-4 w-4" />
            Create
          </Link>
          <SignOutButton />
        </div>

        {/* Mobile hamburger */}
        <button onClick={toggleMenu} className="md:hidden flex items-center">
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <Menu className="w-6 h-6 text-white" />
          )}
        </button>
      </nav>

      {/* mobile menu overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#1f1f1fdd] backdrop-blur-2xl flex flex-col items-center justify-center gap-8 text-3xl text-white transition-opacity">
          <Link
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex flex-row gap-2 items-center hover:text-primary-100 transition"
          >
            <svg
              viewBox="0 0 100 100"
              height={38}
              width={38}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M50 15 L15 45 C12 47.5 14 51 17 51 H21 V80 C21 83.3 23.7 86 27 86 H40 C43.3 86 46 83.3 46 80 V62 H54 V80 C54 83.3 56.7 86 60 86 H73 C76.3 86 79 83.3 79 80 V51 H83 C86 51 88 47.5 85 45 L50 15Z"
                fill="white"
              />
            </svg>
            Home
          </Link>
          <Link
            href="/my-reels"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex flex-row gap-2 items-center hover:text-primary-100 transition"
          >
            <GalleryHorizontalEnd className="h-7 w-7" />
            My Reels
          </Link>
          <Link
            href="/generate"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex flex-row gap-2 items-center hover:text-primary-100 transition"
          >
            <Wand2 className="h-7 w-7" />
            Create
          </Link>
          <SignOutButton />
        </div>
      )}
    </>
  );
};

export default Navbar;
