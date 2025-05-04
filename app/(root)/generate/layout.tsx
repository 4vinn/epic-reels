import { Metadata } from "next";

export const metadata: Metadata = {
  title: "EpicReels - Create",
  description: "Create sport celebrity reels with AI",
  openGraph: {
    title: "EpicReels - Create",
    description: "Create sport celebrity reels with AI",
    images: ["/epicreel.png"],
  },
};

const GenerateLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default GenerateLayout;
