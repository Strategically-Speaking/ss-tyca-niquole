# Tyca Strong Site

Portfolio site built with Next.js App Router.

## Local Development

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

App runs at `http://localhost:3000`.

## Contact Form (Free Gmail Setup)

This site uses [FormSubmit](https://formsubmit.co/) for zero-backend form delivery.

1. Copy `.env.example` to `.env.local`.
2. Set `NEXT_PUBLIC_FORMSUBMIT_EMAIL` to the Gmail address that should receive leads.
3. Start the app and submit the form once.
4. Open the FormSubmit verification email and confirm the address.

After verification, submissions from the contact form are sent to that Gmail inbox for free.

## Deploy

Deploy on Vercel with the same `NEXT_PUBLIC_FORMSUBMIT_EMAIL` environment variable set in Project Settings.
