import React from "react";
import { Metadata } from "next";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { getReelsByUserId } from "@/lib/actions/general.action";
import ReelCard from "@/components/ReelCard";
import Link from "next/link";

export const metadata: Metadata = {
  title: "EpicReels - My Reels",
  description: "View your generated sport celebrity reels.",
  openGraph: {
    title: "EpicReels - My Reels",
    description: "View your generated sport celebrity reels.",
    images: ["/epicreel.png"],
  },
};

const MyReels = async () => {
  const user = await getCurrentUser();
  const userReels = await getReelsByUserId(user?.id!);
  const hasUserReels = userReels && userReels.length > 0;

  return (
    <div className="relative h-screen w-screen bg-black text-white overflow-hidden">
      {hasUserReels ? (
        <div className="h-full w-full overflow-y-scroll snap-y snap-mandatory">
          {userReels?.map((reel, id) => (
            <ReelCard key={id} reel={reel} />
          ))}
        </div>
      ) : (
        <div className="h-full w-full flex flex-col items-center justify-center text-center space-y-4">
          <p className="text-lg font-medium text-gray-200">
            You haven&apos;t created any reels yet.
          </p>
          <Link
            href="/generate"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-200"
          >
            Create Your First Reel
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyReels;
