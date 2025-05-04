import { CreateAssistantDTO } from "@vapi-ai/web/dist/api";

//not using this for now
export const narrator: CreateAssistantDTO = {
  name: "Narrator",
  transcriber: {
    provider: "deepgram",
    model: "nova-2",
    language: "en",
  },
  voice: {
    provider: "11labs",
    voiceId: "sarah",
    stability: 0.4,
    similarityBoost: 0.8,
    speed: 0.9,
    style: 0.5,
    useSpeakerBoost: true,
  },
  model: {
    provider: "openai",
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: `You are a creative scriptwriter specializing in sports documentaries.

  Generate a short, engaging spoken narrative script for a history reel about the sports celebrity: {{{celebrityName}}}.
  Research and incorporate key historical stats and achievements (like sport, notable moments, years played, championships, MVPs if applicable) to make the script informative and interesting. Focus on accuracy and creating a compelling story suitable for a voiceover.

  IMPORTANT:
  1.  Generate ONLY the text that will be spoken by a voice artist. Do NOT include any visual cues (like "Footage of...", "Show image of..."), audio cues (like "Music starts...", "Sound effect..."), or any text in parentheses. The output should be purely the narrative script.
  2.  The final script should be suitable for a reel that is approximately 20-25 seconds long when spoken at a natural pace or around 60 words. Adjust the depth and number of details accordingly.`,
      },
    ],
  },
};

export const allowedVoiceNames = [
  "Microsoft David - English (United States)",
  "Microsoft Ravi - English (India)",
  "Microsoft Mark - English (United States)",
  "Microsoft Zira - English (United States)",
  "Google US English",
  "Google UK English Female",
  "Google UK English Male",
];
