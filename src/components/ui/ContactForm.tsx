"use client";

import { useRef, useState, type FormEvent } from "react";
import { SendHorizontal } from "lucide-react";
import Button from "@/components/ui/Button";

const formsubmitEmail = process.env.NEXT_PUBLIC_FORMSUBMIT_EMAIL;
const formEndpoint = formsubmitEmail
  ? `https://formsubmit.co/ajax/${encodeURIComponent(formsubmitEmail)}`
  : "";

// Bots that fill hidden fields or submit within a couple seconds of page
// load get silently dropped before ever reaching the network.
const MIN_FILL_TIME_MS = 2000;

export default function ContactForm() {
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
        headers: {
          Accept: "application/json",
        },
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
    <form className="mt-8 grid gap-4 text-left" onSubmit={handleSubmit}>
      <input
        type="text"
        name="_honey"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />
      <input
        type="hidden"
        name="_subject"
        value="New project inquiry from tycaniquolecreates.com"
      />
      <input
        type="hidden"
        name="_blacklist"
        value="viagra, casino, crypto, forex, backlinks, seo services, loan, bitcoin"
      />

      <div className="grid gap-4 md:grid-cols-2">
        <label
          className="text-sm font-medium text-white"
          htmlFor="contact-name"
        >
          Name
          <input
            id="contact-name"
            name="name"
            required
            className="mt-2 w-full rounded-xl border border-white/35 bg-white/96 px-4 py-3 text-sm text-foreground shadow-sm outline-none transition focus:border-secondary focus:ring-2 focus:ring-white/30"
            placeholder="Your name"
          />
        </label>

        <label
          className="text-sm font-medium text-white"
          htmlFor="contact-email"
        >
          Email
          <input
            id="contact-email"
            name="email"
            required
            type="email"
            className="mt-2 w-full rounded-xl border border-white/35 bg-white/96 px-4 py-3 text-sm text-foreground shadow-sm outline-none transition focus:border-secondary focus:ring-2 focus:ring-white/30"
            placeholder="you@gmail.com"
          />
        </label>
      </div>

      <label
        className="text-sm font-medium text-white"
        htmlFor="contact-service"
      >
        What do you need?
        <select
          id="contact-service"
          name="service"
          required
          defaultValue=""
          className="mt-2 w-full rounded-xl border border-white/35 bg-white/96 px-4 py-3 text-sm text-foreground shadow-sm outline-none transition focus:border-secondary focus:ring-2 focus:ring-white/30"
        >
          <option value="" disabled>
            Choose a service
          </option>
          <option value="Shoot Only">Shoot Only</option>
          <option value="Edit Only">Edit Only</option>
          <option value="Shoot + Edit">Shoot + Edit</option>
          <option value="Custom">Custom Project</option>
        </select>
      </label>

      <label
        className="text-sm font-medium text-white"
        htmlFor="contact-message"
      >
        Project details
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          className="mt-2 w-full rounded-xl border border-white/35 bg-white/96 px-4 py-3 text-sm text-foreground shadow-sm outline-none transition focus:border-secondary focus:ring-2 focus:ring-white/30"
          placeholder="Tell me about your project, timeline, and goals"
        />
      </label>

      {!formsubmitEmail && (
        <p className="rounded-xl border border-white/30 bg-white/14 px-4 py-3 text-sm text-white/90">
          Add NEXT_PUBLIC_FORMSUBMIT_EMAIL in your .env.local to activate this
          form.
        </p>
      )}

      {status === "success" && (
        <p className="rounded-xl border border-emerald-200/45 bg-emerald-300/18 px-4 py-3 text-sm text-white">
          Message sent. Tyca will get back to you soon.
        </p>
      )}

      {status === "error" && (
        <p className="rounded-xl border border-rose-200/45 bg-rose-300/18 px-4 py-3 text-sm text-white">
          Submission failed. Please try again in a moment.
        </p>
      )}

      <Button
        type="submit"
        variant="secondary"
        className="mt-2 w-full bg-white text-foreground hover:bg-white/92"
        disabled={!formsubmitEmail || isSubmitting}
      >
        <SendHorizontal className="mr-2 h-4 w-4" aria-hidden="true" />
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
