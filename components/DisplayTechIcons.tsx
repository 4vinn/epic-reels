import { cn, getTechLogos } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const DisplayTechIcons = async ({ techStack }: TechIconProps) => {
  const techIcons = await getTechLogos(techStack);
  return (
    <div className="flex flex-row">
      {techIcons.slice(0, 4).map(({ tech, url }, index) => (
        <div
          key={index}
          className={cn(
            "relative group border bg-[#1f1f1f99] backdrop-blur-xl rounded-full p-2 flex-center",
            index >= 1 && "-ml-3"
          )}
        >
          <span className="tech-tooltip">{tech}</span>
          <Image
            src={url}
            width={100}
            height={100}
            alt={tech}
            className="size-5"
          />
        </div>
      ))}
    </div>
  );
};

export default DisplayTechIcons;
