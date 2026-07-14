import type { Metadata } from "next";
import Link from "next/link";
import { getSiteSettings } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy Policy | Tyca Niquole",
  description:
    "How Tyca Niquole collects, uses, and protects information submitted through this website.",
};

const LAST_UPDATED = "July 14, 2026";

export default function PrivacyPolicyPage() {
  const { logo, contact } = getSiteSettings();

  return (
    <section className="px-6 py-16 md:py-20">
      <div className="section-shell mx-auto max-w-3xl px-6 py-12 md:px-12">
        <p className="text-sm font-medium text-foreground/50">
          Last updated: {LAST_UPDATED}
        </p>
        <h1 className="mt-2 font-heading text-3xl font-bold text-foreground md:text-4xl">
          Privacy Policy
        </h1>

        <div className="mt-8 space-y-8 text-foreground/80">
          <p>
            This policy explains what information {logo.text} (&ldquo;we,&rdquo; &ldquo;us&rdquo;)
            collects through this website, how it&rsquo;s used, and the choices
            you have. By using this site, you agree to the practices
            described below.
          </p>

          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">
              Information we collect
            </h2>
            <p className="mt-3">
              We only collect information you choose to give us directly:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                <strong>Contact form:</strong> your name, email address, the
                service you&rsquo;re inquiring about, and any project details you
                include.
              </li>
              <li>
                <strong>Newsletter signup:</strong> your email address.
              </li>
            </ul>
            <p className="mt-3">
              We don&rsquo;t use cookies, analytics, or tracking scripts on this
              site, and we don&rsquo;t collect information automatically beyond
              standard web server/hosting logs (e.g. IP address, browser
              type) used only to keep the site running securely.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">
              How we use your information
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>To respond to inquiries submitted through the contact form.</li>
              <li>
                To send updates, new work, and availability if you sign up
                for the newsletter.
              </li>
              <li>To operate, secure, and improve this website.</li>
            </ul>
            <p className="mt-3">
              We do not sell your information, and we don&rsquo;t use it for
              advertising or share it with third parties for marketing
              purposes.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">
              Third-party services
            </h2>
            <p className="mt-3">
              Form submissions on this site are processed by{" "}
              <a
                href="https://formsubmit.co/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary underline underline-offset-2"
              >
                FormSubmit
              </a>
              , a third-party form delivery service, which forwards your
              submission to our inbox by email. FormSubmit&rsquo;s handling of your
              data is governed by its own privacy policy. This site is hosted
              on infrastructure that may log standard connection data (such
              as IP address) as part of normal operation.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">
              Data retention
            </h2>
            <p className="mt-3">
              We keep contact and newsletter submissions only as long as
              needed to respond to you, maintain our records, or until you
              ask us to delete them.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">
              Your choices
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                You can unsubscribe from newsletter emails at any time using
                the link in those emails, or by contacting us directly.
              </li>
              <li>
                You can ask us to access, correct, or delete information
                we hold about you by reaching out through the contact form.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">
              Children&rsquo;s privacy
            </h2>
            <p className="mt-3">
              This site is not directed at children under 13, and we do not
              knowingly collect information from children under 13.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">
              Changes to this policy
            </h2>
            <p className="mt-3">
              We may update this policy occasionally. Changes will be posted
              on this page with an updated &ldquo;Last updated&rdquo; date.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">
              Contact us
            </h2>
            <p className="mt-3">
              Questions about this policy or your information? Reach out via
              the{" "}
              <Link
                href="/#contact"
                className="font-medium text-primary underline underline-offset-2"
              >
                contact form
              </Link>
              {contact.address && ` — ${logo.text} is based in the ${contact.address}.`}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
