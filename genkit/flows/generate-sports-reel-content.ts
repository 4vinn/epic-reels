"use server";
/**
 * - generateSportsReelContent --> function that handles the sports reel content generation.
 * - GenerateSportsReelContentInput -> input type for the generateSportsReelContent function.
 * - GenerateSportsReelContentOutput -> return type for the generateSportsReelContent function.
 */

import { ai } from "@/genkit/ai-instance";
import { z } from "genkit";
import { getRandomVoiceName } from "@/lib/utils";

const GenerateSportsReelContentInputSchema = z.object({
  celebrityName: z.string().describe("The name of the sports celebrity."),
});
export type GenerateSportsReelContentInput = z.infer<
  typeof GenerateSportsReelContentInputSchema
>;

const GenerateSportsReelContentOutputSchema = z.object({
  reelContent: z
    .string()
    .describe("The generated spoken narrative script for the sports reel."),
  image: z
    .string()
    .optional()
    .describe(
      "An image to use in the sports reel, as a data URI. May be empty/undefined if generation fails."
    ),
  voiceName: z
    .string()
    .describe(
      "The voice name (from Speech Synthesis API) selected for the reel narration."
    ),
});
export type GenerateSportsReelContentOutput = z.infer<
  typeof GenerateSportsReelContentOutputSchema
>;

export async function generateSportsReelContent(
  input: GenerateSportsReelContentInput
): Promise<GenerateSportsReelContentOutput> {
  return generateSportsReelContentFlow(input);
}

const generateSportsReelContentPrompt = ai.definePrompt({
  name: "generateSportsReelContentPrompt",
  input: {
    schema: z.object({
      celebrityName: z.string().describe("The name of the sports celebrity."),
    }),
  },
  output: {
    schema: z.object({
      reelContent: z
        .string()
        .describe("The generated spoken narrative script for the sports reel."),
    }),
  },
  // prompt for the AI model
  prompt: `You are a creative scriptwriter specializing in sports documentaries.

  Generate a short, engaging spoken narrative script for a history reel about the sports celebrity: {{{celebrityName}}}.
  Research and incorporate key historical stats and achievements (like sport, notable moments, years played, championships, MVPs if applicable) to make the script informative and interesting. Focus on accuracy and creating a compelling story suitable for a voiceover.

  IMPORTANT:
  1.  Generate ONLY the text that will be spoken by a voice artist. Do NOT include any visual cues (like "Footage of...", "Show image of..."), audio cues (like "Music starts...", "Sound effect..."), or any text in parentheses. The output should be purely the narrative script.
  2.  The final script should be suitable for a reel that is approximately 20-25 seconds long when spoken at a natural pace or around 60 words. Adjust the depth and number of details accordingly.
  `,
});

const generateSportsReelContentFlow = ai.defineFlow<
  typeof GenerateSportsReelContentInputSchema,
  typeof GenerateSportsReelContentOutputSchema
>(
  {
    name: "generateSportsReelContentFlow",
    inputSchema: GenerateSportsReelContentInputSchema,
    outputSchema: GenerateSportsReelContentOutputSchema,
  },
  async (input) => {
    // generating text content using the celebrity name
    const { output } = await generateSportsReelContentPrompt({
      celebrityName: input.celebrityName,
    });
    const reelContent = output!.reelContent;

    let imageUrl: string | undefined = undefined;
    try {
      console.log(`Attempting image generation for ${input.celebrityName}...`);
      const { media } = await ai.generate({
        model: "googleai/gemini-2.0-flash-exp",
        prompt: `Generate a high-quality action shot of ${input.celebrityName} playing their primary sport. The image should be vertical (portrait orientation), with an aspect ratio of 9:16, suitable for a mobile highlight reel. The composition should clearly show the athlete in action, centered and dynamic, with minimal background distractions.`,
        config: {
          responseModalities: ["TEXT", "IMAGE"],
        },
      });

      if (media?.url) {
        imageUrl = media.url;
        console.log(`Image generated successfully for ${input.celebrityName}.`);
      } else {
        console.warn(
          `Image generation for ${input.celebrityName} completed but returned no media URL.`
        );
      }
    } catch (imageError) {
      console.error(
        `Error generating image for ${input.celebrityName}:`,
        imageError
      );
    }

    const randomVoice = getRandomVoiceName();

    return {
      reelContent: reelContent,
      image: imageUrl,
      voiceName: randomVoice,
    };
  }
);
