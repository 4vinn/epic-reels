import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { allowedVoiceNames } from "@/constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRandomVoiceName(): string {
  const randomIndex = Math.floor(Math.random() * allowedVoiceNames.length);
  return allowedVoiceNames[randomIndex];
}

export function toTitleCase(str: string): string {
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
  });
}
