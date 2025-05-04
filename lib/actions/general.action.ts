"use server";

import { db } from "@/firebase/admin";
import { getCurrentUser } from "./auth.action";

import { FieldValue } from "firebase-admin/firestore";

//save reel content to firestore
export async function saveReel(params: SaveReelParams) {
  const { userId, celebrityName, reelContent, imageUrl, voiceName } = params;

  try {
    const reelRef = db.collection("reels").doc(); // Auto-id
    await reelRef.set({
      userId,
      celebrityName,
      reelContent,
      imageUrl: imageUrl || null,
      voiceName,
      createdAt: new Date().toISOString(),
    });
    return { success: true, id: reelRef.id };
  } catch (error) {
    console.error("Error saving reel:", error);
    return { success: false, error };
  }
}

//fetch all the reels associated with a user
export async function getReelsByUserId(userId: string): Promise<Reel[] | null> {
  const reels = await db
    .collection("reels")
    .where("userId", "==", userId)
    .orderBy("createdAt", "desc")
    .get();

  return reels.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Reel[];
}

// fetch all the reels for global reel page
export async function getAllReels(
  params: GetLatestReelsParams
): Promise<Reel[] | null> {
  const { limit = 50 } = params; //default reels limit is 50

  const reels = await db
    .collection("reels")
    .orderBy("createdAt", "desc")
    // .where("userId", "!=", userId) //if we dont want to show reels created by user himself, in the global reels page
    .limit(limit)
    .get();

  return reels.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Reel[];
}

// like a reel (increment likesCount)
export async function likeReel(reelId: string) {
  const user = await getCurrentUser();

  if (!user || !user.id) {
    throw new Error("User not authenticated");
  }

  const reelRef = db.collection("reels").doc(reelId);

  try {
    await db.runTransaction(async (transaction) => {
      const reelSnap = await transaction.get(reelRef);

      if (!reelSnap.exists) {
        throw new Error("Reel not found");
      }

      const reelData = reelSnap.data();

      // Check if user has already liked within the transaction
      if (reelData?.likedBy && reelData?.likedBy.includes(user.id)) {
        throw new Error("User already liked this reel");
      }

      // Atomically increment like count & add userId to likedBy array
      transaction.update(reelRef, {
        likesCount: (reelData?.likesCount || 0) + 1,
        likedBy: FieldValue.arrayUnion(user.id),
      });
    });

    return { success: true };
  } catch (error: any) {
    console.error("Error liking reel:", error);
    return { success: false, error: error.message || "Failed to like reel" };
  }
}
