// src/components/sports-reel-generator.tsx
"use client";

import * as React from "react";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Loader2, Wand2, Volume2, CircleStop } from "lucide-react";

import {
  generateSportsReelContent,
  type GenerateSportsReelContentOutput,
} from "@/genkit/flows/generate-sports-reel-content";

import { saveReel } from "@/lib//actions/general.action";
import { auth } from "@/firebase/client";
import { toTitleCase } from "@/lib/utils";

const formSchema = z.object({
  celebrityName: z.string().min(4, {
    message: "Celebrity name must be at least 4 characters.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function SportsReelGenerator() {
  const [reelResult, setReelResult] =
    useState<GenerateSportsReelContentOutput | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const [isSpeaking, setIsSpeaking] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      celebrityName: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setReelResult(null);

    // stopping any ongoing speech before generating new content
    if (window.speechSynthesis?.speaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }

    try {
      //generating reel content
      const result = await generateSportsReelContent(values);
      setReelResult(result);
      console.log(result);
      toast.success(`Content ready for ${values.celebrityName}!`);

      //saving reel content in firestore
      const userId = auth.currentUser?.uid!;
      await saveReel({
        userId,
        celebrityName: values.celebrityName,
        reelContent: result.reelContent,
        imageUrl: result.image,
        voiceName: result.voiceName,
      });
    } catch (error) {
      console.error("Error generating reel:", error);
      toast.error("Failed to generate sports reel. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  // cleanup speech synthesis
  useEffect(() => {
    const synth = window.speechSynthesis;
    const stopSpeech = () => {
      if (synth?.speaking) {
        synth.cancel();
      }
      setIsSpeaking(false);
    };
    return () => {
      stopSpeech();
      utteranceRef.current = null;
    };
  }, []);

  const handleSpeak = (text: string, voiceName: string) => {
    const synth = window.speechSynthesis;

    if (!synth) {
      toast.error("Speech Synthesis Web API Not Supported by your browser.");
      return;
    }

    if (isSpeaking && utteranceRef.current) {
      utteranceRef.current.onstart = null;
      utteranceRef.current.onend = null;
      utteranceRef.current.onerror = null;
      utteranceRef.current = null;
      synth.cancel();
      setIsSpeaking(false);
      return;
    } else {
      synth.cancel(); // ensures no overlap, if user clicks frequently

      const voices = synth.getVoices();
      if (voices.length === 0) {
        toast.error("No voices available in Speech Synthesis Web API.");
        return;
      }
      const matchedVoice = voices.find((voice) => voice.name === voiceName);
      // const allowedIndices = [0, 1, 3, 4, 6, 7, 8];

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = matchedVoice || voices[7];
      utterance.rate = 1;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => {
        setIsSpeaking(false);
        utteranceRef.current = null;
      };
      utterance.onerror = (event) => {
        toast.error("Speech Error. Could not play the audio.");
        setIsSpeaking(false);
        utteranceRef.current = null;
      };
      utteranceRef.current = utterance;
      synth.speak(utterance);
    }
  };

  return (
    <section className="relative min-h-screen w-full flex justify-center items-center overflow-hidden bg-fixed bg-center bg-cover bg-no-repeat bg-[url('/bg1.jpg')]">
      {/* dark overlay */}
      <div className="absolute inset-0 bg-black/75 z-0"></div>

      {/* main content */}
      <div className="z-10 py-20 flex flex-col gap-6 text-white text-center">
        <h1 className="text-5xl font-semibold">EpicReel Generator</h1>
        <p className="text-lg px-4">
          Enter a sports celebrity's name to generate a history reel
        </p>
        <div className="container mx-auto max-w-2xl py-12 px-4">
          <Card className="shadow-lg border border-border rounded-lg overflow-hidden">
            <CardContent className="p-6">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="celebrityName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-semibold">
                          Celebrity Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Michael Jordan"
                            {...field}
                            className="text-base py-3 px-4 rounded-md focus:ring-ring focus:ring-offset-2 border-input" // Ensure border class
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-md text-lg font-semibold flex items-center justify-center gap-2 transition-colors duration-200"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Wand2 className="h-5 w-5" />
                        Generate Reel
                      </>
                    )}
                  </Button>
                </form>
              </Form>
              {isLoading && (
                <div className="mt-8 flex flex-row gap-4">
                  <Skeleton className="h-60 w-3/5 rounded-lg" />
                  <div className="flex flex-col gap-3 w-3/5 mt-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
              )}
              {reelResult && !isLoading && (
                <div className="relative mt-12">
                  {/* Outer blurred glow */}
                  <div className="absolute -inset-2 rounded-[inherit] bg-[#1dd7c4]/20 blur-md z-0" />
                  {/* Main reel content */}
                  <Card className="relative z-10 border-none  py-0 overflow-hidden rounded-lg shadow-md">
                    <CardContent className="p-5 ">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl font-semibold text-primary">
                          Reel content for{" "}
                          {toTitleCase(form.getValues("celebrityName"))}
                        </h3>

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            handleSpeak(
                              reelResult.reelContent,
                              reelResult.voiceName
                            )
                          }
                          aria-label={
                            isSpeaking ? "Stop reading aloud" : "Read aloud"
                          }
                          className="bg-[#252525]"
                        >
                          {isSpeaking ? (
                            <CircleStop className="h-8 w-8" />
                          ) : (
                            <Volume2 className="h-8 w-8" />
                          )}
                        </Button>
                      </div>
                      <div className="flex flex-1 flex-col md:flex-row gap-4 h-full">
                        {/* Image for reel */}
                        {reelResult.image &&
                          reelResult.image.startsWith("data:image") && (
                            <div className="relative md:w-1/3 h-96 md:h-auto">
                              <Image
                                src={reelResult.image}
                                alt={`Generated image for ${form.getValues(
                                  "celebrityName"
                                )}`}
                                fill
                                className="rounded-lg border border-border object-cover"
                                data-ai-hint="sports celebrity"
                                onError={(e) => {
                                  console.error(
                                    "Image failed to load:",
                                    e.currentTarget.src
                                  );
                                }}
                              />
                            </div>
                          )}

                        {/* script */}
                        <div
                          className={reelResult.image ? "md:w-2/3" : "w-full"}
                        >
                          <p className="text-foreground text-left leading-relaxed">
                            {reelResult.reelContent}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
