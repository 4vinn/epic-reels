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
      {/* <section className="card-cta2 justify-center text-center">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Get Interview ready with AI </h2>
          <p className="text-lg">
            Practice real interview scenarios and get instant feedback
          </p>
          <Button asChild className="btn-primary self-center">
            <Link href="/interview">Generate an Interview</Link>
          </Button>
        </div>
      </section> */}

      {/* Hero section*/}
      <section className="flex justify-center items-center h-screen">
        <Image
          src="/bg1.jpg"
          alt="hero cover"
          fill
          sizes="100vw"
          style={{
            objectFit: "cover",
          }}
        />
        <div className="absolute flex flex-col gap-6 text-white text-center">
          <h1 className="text-5xl font-semibold">
            Get Interview ready with AI
          </h1>
          <p className="text-lg">
            Practice real interview scenarios and get instant feedback
          </p>
          <Button asChild className="btn-primary self-center">
            <Link href="/interview">Generate an Interview</Link>
          </Button>
        </div>
      </section>

      {/* user interviews */}
      <section className="flex flex-col items-center sm:items-start gap-6 mt-8">
        <h2>Your interviews</h2>
        <div className="interviews-section">
          {hasUserInterviews ? (
            userInterviews?.map((interview) => (
              <InterviewCard {...interview} key={interview.id} />
            ))
          ) : (
            <p>
              No new interviews available at the moment. Generate a new one to
              get started!
            </p>
          )}
        </div>
      </section>

      {/* other interviews */}
      <section className="flex flex-col items-center sm:items-start gap-6 mt-8">
        <h2>Other Interviews</h2>
        <div className="interviews-section">
          {hasOtherInterviews ? (
            otherInterviews?.map((interview) => (
              <InterviewCard {...interview} key={interview.id} />
            ))
          ) : (
            <p>No new interviews available at the moment. </p>
          )}
        </div>
      </section>
    </>
  );
};

export default Home;
