# Epic Reels - AI generated sports celebrity history reels

**Live Demo -->** [epicreels.vercel.app](https://epicreels.vercel.app)\
**Demo Credentials -->** Email: `demo@gmail.com` Pswrd: `demo123`

## Tech stack

- **Frontend**: Next.js (App Router), TailwindCSS, Shadcn
- **Backend**: Server Actions, Firebase Auth, Firestore DB
- **AI / TTS**:
  - Gemini 2.0 flash
  - Speech Synthesis Web API

## Features

- `Login / Logout` (Firebase Auth)
- `Reel content generation` (Gemini - genkit)
- `Automatic TTS narration on reel view with multiple voice` (Speech Synthesis + Intersection Observer Web API )
- `Like button` (one like per user on global reels)
- `Global Reels`(community feed)
- `My Reels` (user generated reels)

## Key decisions & trade-offs (due to time constraint)

- Used **Speech Synthesis Web API** (minimal latency and supports multiple voices)
- Used **Firebase Storage** instead of AWS S3 (faster for MVP + could not use AWS for some reason )
- Used **Server Actions** to fetch reels instead of route handler

> As I progressed, I realized that since my approach involves generating images and text (rather than full videos), the Speech Synthesis Web API was a better fit due to its minimal latency, zero cost, and we can easily randomize voices for TTS.

## Future improvements

- Shareable links for each reel (unique ID)
- Slideshow of 4-5 images in a reel instead of just 1 static image OR video generation with AI
- Pre-generate audio at the time of reel creation & store in DB (play this audio when reel is in view)
- "Unlike" functionality
- User can pick "voice" for TTS at the time of creation
- Basic CRUD operations for reels
