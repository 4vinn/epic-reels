import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";
import { redirect } from "next/navigation";

import { isAuthenticated } from "@/lib/actions/auth.action";
import SignOutButton from "@/components/SignOutButton";

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();
  if (!isUserAuthenticated) redirect("/sign-in");

  return (
    <div className="root-layout">
      <nav className="fixed top-0 left-0 w-full flex justify-between px-2 md:px-28 py-2 z-50 bg-[#1f1f1f99] backdrop-blur-xl">
        <Link href="/" className="flex items-center gap-1">
          <Image
            src="/logo2.png"
            className="bg-white rounded-sm p-[2px]"
            alt="logo"
            width={30}
            height={30}
          />
          <h3 className="text-primary-100">PrepTalk</h3>
        </Link>
        <SignOutButton />
      </nav>
      {children}
    </div>
  );
};

export default RootLayout;
