"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import dayjs from "dayjs";
import { likeReel } from "@/lib/actions/general.action";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { toast } from "sonner";
import { toTitleCase } from "@/lib/utils";

const ReelCard = ({ reel, showLikeButton = false }: ReelCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [likes, setLikes] = useState(reel.likesCount ?? 0);
  const [liked, setLiked] = useState(false);

  const handleOverlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(true);
  };
  const handleCollapse = () => {
    if (isExpanded) setIsExpanded(false);
  };

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (liked) return; // prevent multiple likes for now (from UI)

    try {
      await likeReel(reel.id);

      setLikes(likes + 1);
      setLiked(true);
    } catch (error) {
      console.error("Failed to like:", error);
    }
  };
  //checking if the user has already liked this reel
  useEffect(() => {
    const checkIfUserLiked = async () => {
      const user = await getCurrentUser();
      if (reel.likedBy && reel.likedBy.includes(user?.id!)) {
        setLiked(true);
      }
    };
    checkIfUserLiked();
  }, [reel.likedBy]);

  // const speakText = (text: string, voiceName: string) => {
  //   const synth = window.speechSynthesis;
  //   if (!synth) {
  //     toast.error("Speech Synthesis Web API Not Supported by your browser.");
  //     return;
  //   }
  //   synth.cancel(); // Always stop any previous speech

  //   const voices = synth.getVoices();
  //   if (voices.length === 0) {
  //     toast.error("No voices available in Speech Synthesis Web API.");
  //     return;
  //   }

  //   //finding voice matching the stored voicename
  //   const matchedVoice = voices.find((voice) => voice.name === voiceName);

  //   const utterance = new SpeechSynthesisUtterance(text);
  //   utterance.voice = matchedVoice || voices[7];
  //   utterance.rate = 1;

  //   synth.speak(utterance);
  // };
  const speakText = (text: string, voiceName: string) => {
    const synth = window.speechSynthesis;
    if (!synth) {
      toast.error("Speech Synthesis Web API Not Supported by your browser.");
      return;
    }

    const speak = () => {
      synth.cancel(); // Always stop any previous speech

      const voices = synth.getVoices();
      if (voices.length === 0) {
        toast.error("No voices available in Speech Synthesis Web API.");
        return;
      }

      const matchedVoice = voices.find((voice) => voice.name === voiceName);

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = matchedVoice || voices[7];
      utterance.rate = 1;

      synth.speak(utterance);
    };

    const voices = synth.getVoices();
    if (voices.length > 0) {
      speak();
    } else {
      // Voices not ready yet — wait
      const handleVoicesChanged = () => {
        speak();
        synth.removeEventListener("voiceschanged", handleVoicesChanged);
      };
      synth.addEventListener("voiceschanged", handleVoicesChanged);
    }
  };
  useEffect(() => {
    const observer = new IntersectionObserver(
      (reelCards) => {
        reelCards.forEach((reelCard) => {
          if (reelCard.isIntersecting && reelCard.intersectionRatio >= 0.9) {
            speakText(reel.reelContent, reel.voiceName);
          } else {
            window.speechSynthesis.cancel();
          }
        });
      },
      {
        threshold: [0.9], // 90% visible
      }
    );

    const element = document.getElementById(`reel-${reel.id}`);
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [reel.reelContent, reel.id, reel.voiceName]);

  return (
    <div
      id={`reel-${reel.id}`}
      className="h-screen w-full flex justify-center items-center snap-start relative"
      onClick={handleCollapse}
    >
      <div className="relative mt-12">
        {/* Outer blurred glow */}
        <div className="absolute -inset-2 rounded-[inherit] bg-[#e6e6e6]/30 blur-3xl z-0" />
        {/* Main Reel content */}
        <div className="relative w-[360px] h-[85vh] md:h-[90vh] bg-black rounded-xl overflow-hidden border border-[#5b5b5b]">
          <Image
            src={reel.imageUrl}
            alt={`Image for ${reel.celebrityName}`}
            fill
            className="object-cover"
          />

          {/* Text Overlay */}
          <div
            className={`absolute bottom-0 left-0 right-0 p-4 text-white transition-all duration-500 ease-in-out transform ${
              isExpanded ? "" : " cursor-pointer"
            } bg-gradient-to-t from-black/90 via-black/90 to-transparent`}
            onClick={handleOverlayClick}
          >
            {showLikeButton && (
              <button
                onClick={handleLike}
                disabled={liked}
                className={`flex mb-1 items-center gap-2 text-md bg-[#101010f1] backdrop-blur-2xl p-1 px-2 rounded-lg ${
                  liked
                    ? "text-red-400"
                    : "text-gray-300 hover:text-pink-500 cursor-pointer"
                }`}
              >
                🔥 {likes}
              </button>
            )}
            <h2 className="text-xl font-semibold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] mb-1  underline-offset-4">
              {toTitleCase(reel.celebrityName)}
            </h2>
            <p
              className={`text-sm mb-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-500 ease-in-out ${
                isExpanded ? "text-white" : "text-[#e1e1e1] line-clamp-2 "
              }`}
              style={{
                maxHeight: isExpanded ? "1000px" : "50px",
              }}
            >
              {reel.reelContent}
            </p>
            <span
              className={`text-xs text-gray-300  ${isExpanded ? "" : "hidden"}`}
            >
              {dayjs(reel.createdAt).format("D MMM YYYY h:mm A")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReelCard;
