import React from "react";
import { getAllReels } from "@/lib/actions/general.action";
import ReelCard from "@/components/ReelCard";
import Link from "next/link";

const HomePage = async () => {
  const allReels = await getAllReels({ limit: 25 });
  const hasReels = allReels && allReels.length > 0;

  return (
    <div className="relative h-screen w-full bg-black text-white overflow-hidden">
      {hasReels ? (
        <div className="h-full w-full overflow-y-scroll snap-y snap-mandatory">
          {allReels?.map((reel, id) => (
            <ReelCard key={id} reel={reel} showLikeButton />
          ))}
        </div>
      ) : (
        <div className="h-full w-full flex flex-col items-center justify-center text-center space-y-4">
          <p className="text-lg font-medium text-gray-200 mb-8">
            Wow, its empty here! <br />
            Be the first one to create an Epic Reel!
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

export default HomePage;
