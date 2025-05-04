type FormType = "sign-in" | "sign-up";

interface SignInParams {
  email: string;
  idToken: string;
}

interface SignUpParams {
  uid: string;
  name: string;
  email: string;
  password: string;
}

interface User {
  name: string;
  email: string;
  id: string;
}

interface Reel {
  id: string;
  userId: string;
  celebrityName: string;
  imageUrl: string;
  voiceName: string;
  reelContent: string;
  likesCount?: number; //not much necessary for this project
  likedBy?: string[];
  createdAt: string;
}
interface ReelCardProps {
  reel: Reel;
  showLikeButton?: boolean;
}

interface SaveReelParams {
  userId: string;
  celebrityName: string;
  reelContent: string;
  imageUrl?: string;
  voiceName: string;
}

interface GetLatestReelsParams {
  // userId: string;
  limit?: number;
}
