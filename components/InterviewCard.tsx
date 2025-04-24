import React from "react";
import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";

import { Button } from "./ui/button";
import DisplayTechIcons from "./DisplayTechIcons";

// import { getRandomInterviewCover } from "@/lib/utils";
import { getFeedbackByInterviewId } from "@/lib/actions/general.action";

const InterviewCard = async ({
  id,
  userId,
  role,
  type,
  techstack,
  createdAt,
}: InterviewCardProps) => {
  const feedback =
    userId && id
      ? await getFeedbackByInterviewId({ interviewId: id, userId })
      : null;

  const normalizedType = /mix/gi.test(type) ? "Mixed" : type;

  const formattedDate = dayjs(
    feedback?.createdAt || createdAt || Date.now()
  ).format("D MMM YYYY");

  return (
    <div className="card-border w-[360px] max-sm:w-full min-h-72">
      <div className="card-interview">
        <div>
          <div className="absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-[#b2b7c1]">
            <p className="badge-text text-black">{normalizedType}</p>
          </div>

          <h3 className="mt-5 font-medium">{role}</h3>
          <div className="flex flex-row gap-3 my-3">
            <div className="flex flex-row gap-1">
              <Image
                src="/calendar.svg"
                alt="calendar"
                width={15}
                height={15}
              />
              <p className="text-sm">{formattedDate}</p>
            </div>
            <div className="flex flex-row gap-1 items-center">
              <Image src="/star.svg" alt="star" width={15} height={15} />
              <p className="text-sm">{feedback?.totalScore || "x"}/100</p>
            </div>
          </div>
          <DisplayTechIcons techStack={techstack} />
          <p className="line-clamp-2 mt-8">
            {feedback?.finalAssessment || "Interview not yet taken."}
          </p>
        </div>
        <div className="flex flex-row justify-between">
          <Button className="btn-primary">
            <Link
              href={feedback ? `/interview/${id}/feedback` : `/interview/${id}`}
            >
              {feedback ? "Check Feedback" : "Take Interview"}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;
