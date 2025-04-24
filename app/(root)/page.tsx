import React from "react";
import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import InterviewCard from "@/components/InterviewCard";

import { getCurrentUser } from "@/lib/actions/auth.action";
import {
  getInterviewsByUserId,
  getOtherInterviews,
} from "@/lib/actions/general.action";

const Home = async () => {
  const user = await getCurrentUser();

  const [userInterviews, otherInterviews] = await Promise.all([
    await getInterviewsByUserId(user?.id!),
    await getOtherInterviews({ userId: user?.id! }),
  ]);

  // const userInterviews = await getInterviewsByUserId(user?.id!);
  // const otherInterviews = await getOtherInterviews({ userId: user?.id! });

  const hasUserInterviews = userInterviews?.length! > 0;
  const hasOtherInterviews = otherInterviews?.length! > 0;

  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Get Interview ready with AI</h2>
          <p className="text-lg">
            practice on real interview questions & get instant feedback
          </p>
          <Button asChild className="btn-primary max-sm:w-full">
            <Link href="/interview">Generate an Interview</Link>
          </Button>
        </div>

        <Image
          src="/robot.png"
          alt="robo dude"
          width={400}
          height={400}
          className="max-sm:hidden"
        />
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Your interviews</h2>
        <div className="interviews-section">
          {hasUserInterviews ? (
            userInterviews?.map((interview) => (
              <InterviewCard {...interview} key={interview.id} />
            ))
          ) : (
            <p>You haven&apos;t taken any interview</p>
          )}
        </div>
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Other Interviews</h2>
        <div className="interviews-section">
          {hasOtherInterviews ? (
            otherInterviews?.map((interview) => (
              <InterviewCard {...interview} key={interview.id} />
            ))
          ) : (
            <p>There are no new interviews available</p>
          )}
        </div>
      </section>
    </>
  );
};

export default Home;
