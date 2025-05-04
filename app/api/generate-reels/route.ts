// right now I am using server actions to fetch reels from firestore

import { NextResponse } from "next/server";

const exampleReels = [
  {
    id: "reel1",
    celebrityName: "Cristiano Ronaldo",
    content: "Generated reel content...",
    videoUrl: "/placeholder/reel1.mp4",
    imageUrl: "https://picsum.photos/300/200?random=1",
  },
  {
    id: "reel2",
    celebrityName: "Sachin Tendulkar",
    content: "Another generated reel...",
    videoUrl: "/placeholder/reel2.mp4",
    imageUrl: "https://picsum.photos/300/200?random=2",
  },
];

export async function GET(request: Request) {
  try {
    // TODO: need to implemeent logic to fetch reels from your firestore
    // For now, returning example data
    const reels = exampleReels;

    return NextResponse.json(reels);
  } catch (error) {
    console.error("Error fetching reels:", error);
    return NextResponse.json(
      { error: "Failed to fetch reels" },
      { status: 500 }
    );
  }
}

// for managing reels, if needed:
//  add POST, PUT, DELETE methods here later
