"use client";

import { useRef, useState, type FormEvent } from "react";

const formsubmitEmail = process.env.NEXT_PUBLIC_FORMSUBMIT_EMAIL;
const formEndpoint = formsubmitEmail
  ? `https://formsubmit.co/ajax/${encodeURIComponent(formsubmitEmail)}`
  : "";

// Bots that fill hidden fields or submit within a couple seconds of page
// load get silently dropped before ever reaching the network.
const MIN_FILL_TIME_MS = 2000;

/**
 * Newsletter form embedded directly inside the footer band, adapted from
 * the SS Component Library's FooterEmbeddedSignupNewsletter
 * (src/components/newsletter/FooterEmbeddedSignupNewsletter.tsx). The
 * library version is static markup only (no submit handling); this wires
 * it to the same FormSubmit endpoint ContactForm.tsx already uses
 * (distinguished by its own _subject) so signups actually reach Tyca's
 * inbox, and swaps the library's ink/border/surface-sunken tokens for
 * Tyca's own foreground/primary tokens already defined in globals.css.
 */
export default function NewsletterSignup() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const mountedAt = useRef(Date.now());

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formEndpoint || isSubmitting) {
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);

    if (formData.get("_honey")) {
      form.reset();
      return;
    }

    if (Date.now() - mountedAt.current < MIN_FILL_TIME_MS) {
      return;
    }

    setIsSubmitting(true);
    setStatus("idle");

    try {
      const response = await fetch(formEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Unable to submit form");
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="border-t border-foreground/10 bg-foreground/[0.03] px-6 py-10 text-center md:px-10">
      <p className="font-heading text-lg font-semibold text-foreground">Get updates from Tyca</p>
      <p className="mx-auto mt-1 max-w-sm text-sm text-foreground/60">
        New reels, availability, and behind-the-scenes — no spam.
      </p>

      <form className="mx-auto mt-4 flex max-w-sm gap-2" onSubmit={handleSubmit}>
        <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />
        <input type="hidden" name="_subject" value="New newsletter signup from tycaniquolecreates.com" />
        <input
          type="hidden"
          name="_blacklist"
          value="viagra, casino, crypto, forex, backlinks, seo services, loan, bitcoin"
        />

        <label className="sr-only" htmlFor="newsletter-email">
          Email address
        </label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          placeholder="you@email.com"
          className="w-full rounded-full border border-foreground/15 bg-white px-4 py-2.5 text-sm text-foreground shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
        <button
          type="submit"
          disabled={!formEndpoint || isSubmitting}
          className="whitespace-nowrap rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Joining..." : "Join"}
        </button>
      </form>

      {!formEndpoint && (
        <p className="mx-auto mt-3 max-w-sm text-xs text-foreground/50">
          Add NEXT_PUBLIC_FORMSUBMIT_EMAIL in .env.local to activate this form.
        </p>
      )}
      {status === "success" && (
        <p className="mt-3 text-xs font-medium text-emerald-600">You&rsquo;re on the list.</p>
      )}
      {status === "error" && (
        <p className="mt-3 text-xs font-medium text-rose-600">Something went wrong — try again.</p>
      )}
    </div>
  );
}
