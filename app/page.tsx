"use client";

import { useEffect, useState } from "react";

type Feature = {
  id: string;
  number: string;
  eyebrow: string;
  title: string;
  summary: string;
  bullets: string[];
  image: string;
  alt: string;
  side: "left" | "right";
  note?: string;
};

const features: Feature[] = [
  {
    "id": "overwatch",
    "number": "01",
    "eyebrow": "Overwatch team chat",
    "title": "Keep the office and the field in the same conversation.",
    "summary": "Bring technician conversations, team chat, and job context together in Overwatch—and keep the conversation going in Talli Field.",
    "bullets": [
      "Message a technician or the team from one workspace.",
      "Attach a job link so the conversation stays connected to the work.",
      "Follow unread messages and return to your conversation drafts."
    ],
    "image": "/features/september-overwatch-drawer-app.jpg",
    "alt": "Actual full Overwatch workspace with technician timeline, roster, and an open chat drawer",
    "side": "right",
    "note": "Enable Overwatch in Settings on the web. Mobile features require a compatible Talli Field app version."
  },
  {
    "id": "quick-pay",
    "number": "02",
    "eyebrow": "Quick Pay & change orders",
    "title": "Keep field payments connected to the job.",
    "summary": "Use Quick Pay in the field with customer and job assignment. When the work changes, revised estimates keep the scope, approval, and balance together.",
    "bullets": [
      "Build a Quick Pay payment with items or a custom amount.",
      "Connect the payment to the right customer and job.",
      "Carry approved scope changes into the job’s updated total."
    ],
    "image": "/features/september-quick-pay-app.jpg",
    "alt": "Actual Talli Field Quick Pay screen with sample customer, job, items, and payment amount",
    "side": "left"
  },
  {
    "id": "subscriptions",
    "number": "03",
    "eyebrow": "Subscription packages",
    "title": "Give ongoing work a place of its own.",
    "summary": "Organize recurring services into packages, then manage customer enrollment, payment setup, and recurring activity from one workspace.",
    "bullets": [
      "Create packages with pricing, included items, and a photo.",
      "Choose each customer’s first billing date when assigning a package.",
      "Review payment health and filter recurring transaction history."
    ],
    "image": "/features/september-subscriptions-opus-app.jpg",
    "alt": "Actual Service Agreements screen showing subscription packages and sample payment-health statistics",
    "side": "right",
    "note": "Editing a package changes future assignments. Existing customers keep their agreed terms until you update their package."
  },
  {
    "id": "invoice-checkout",
    "number": "04",
    "eyebrow": "Invoice checkout",
    "title": "A clearer path from the invoice to the payment.",
    "summary": "A refreshed invoice email leads to card checkout right on the invoice page, with the details customers need before they pay.",
    "bullets": [
      "Review line items and totals alongside embedded card checkout.",
      "Let customers choose whether to save their card.",
      "Follow email delivery, payment status, and outstanding balances."
    ],
    "image": "/features/september-invoice-app.jpg",
    "alt": "Actual invoice checkout screen showing sample invoice details, embedded card fields, and payment journey",
    "side": "left",
    "note": "Available payment methods depend on your business’s payment setup. Bank payments can remain pending before settlement."
  },
  {
    "id": "custom-sms",
    "number": "05",
    "eyebrow": "Custom SMS notifications",
    "title": "Keep customers in the loop before you arrive.",
    "summary": "Stay connected between booking and the visit with custom SMS for on-the-way updates and visit reminders.",
    "bullets": [
      "Send an on-the-way update from the job’s On my way action.",
      "Help customers prepare with visit reminders.",
      "Personalize customer communication with custom SMS messages."
    ],
    "image": "/features/september-on-my-way-app.jpg",
    "alt": "Actual Talli Field job screen with sample job details and the On my way button",
    "side": "right"
  }
];

export default function Home() {
  const [active, setActive] = useState(features[0].id);
  const [preview, setPreview] = useState<Feature | null>(null);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-feature]"),
    );
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-30% 0px -45%", threshold: [0.1, 0.35, 0.6] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const headings = Array.from(
      document.querySelectorAll<HTMLElement>("[data-heading-reveal]"),
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("heading-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "-10% 0px -18%", threshold: 0.18 },
    );
    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!preview) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPreview(null);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [preview]);

  const activeIndex = Math.max(
    0,
    features.findIndex((feature) => feature.id === active),
  );

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Talli update home">
          TALLI
        </a>
        <span className="header-label">September 2026 update</span>
      </header>

      <nav className="progress-nav" aria-label="Feature navigation">
        <span className="progress-line" aria-hidden="true">
          <span
            className="progress-fill"
            style={{ height: `${((activeIndex + 1) / features.length) * 100}%` }}
          />
        </span>
        {features.map((feature) => (
          <a
            key={feature.id}
            href={`#${feature.id}`}
            className={active === feature.id ? "active" : ""}
            aria-label={`Go to ${feature.eyebrow}`}
            title={feature.eyebrow}
          >
            <span>{feature.number}</span>
            <strong>{feature.eyebrow}</strong>
          </a>
        ))}
      </nav>

      <section className="hero" id="top" data-heading-reveal>
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-copy">
          <p className="kicker">Talli update · September 23, 2026</p>
          <h1>
            <span className="hero-title-line hero-title-line-one">
              Five focused updates.
            </span>
            <span className="hero-title-line hero-title-line-two">
              One smoother workflow.
            </span>
          </h1>
          <p className="hero-summary">
            New ways to connect your team, collect payments, manage subscriptions,
            and keep customers informed.
          </p>
          <a className="primary-cta" href="#overwatch">
            Explore what&apos;s new <span aria-hidden="true">↓</span>
          </a>
        </div>

        <div className="hero-orbit" aria-hidden="true">
          <span className="orbit orbit-one" />
          <span className="orbit orbit-two" />
          <span className="hero-five">5</span>
          <span className="orbit-label label-one">Team chat</span>
          <span className="orbit-label label-two">Field payments</span>
          <span className="orbit-label label-three">Subscriptions</span>
          <span className="orbit-label label-four">Invoice checkout</span>
          <span className="orbit-label label-five">Custom SMS</span>
        </div>
      </section>

      <section className="intro-band" aria-label="Update summary">
        <p>Built from the feedback you&apos;ve shared.</p>
        <span>Five product updates · September 2026</span>
      </section>

      <div className="feature-list">
        {features.map((feature, index) => {
          const nextFeature = features[index + 1];
          return (
          <section
            className={`feature feature-${feature.side}`}
            id={feature.id}
            data-feature
            data-heading-reveal
            key={feature.id}
          >
            <div className="feature-copy">
              <p className="feature-number">{feature.number} / 05</p>
              <p className="kicker">{feature.eyebrow}</p>
              <h2>{feature.title}</h2>
              <p className="feature-summary">{feature.summary}</p>
              <ul>
                {feature.bullets.map((bullet) => (
                  <li key={bullet}>
                    <span aria-hidden="true">✓</span>
                    {bullet}
                  </li>
                ))}
              </ul>
              {feature.note ? <p className="feature-note">{feature.note}</p> : null}
              <a
                className="next-feature"
                href={`#${nextFeature?.id ?? "closing"}`}
                aria-label={
                  nextFeature
                    ? `Continue to ${nextFeature.eyebrow}`
                    : "Continue to the closing message"
                }
              >
                <span>{nextFeature ? "Next feature" : "Finish"}</span>
                <strong>{nextFeature?.eyebrow ?? "What comes next"}</strong>
                <i aria-hidden="true">↓</i>
              </a>
            </div>

            <button
              className="product-frame"
              type="button"
              onClick={() => setPreview(feature)}
              aria-label={`Open a larger preview of ${feature.eyebrow}`}
            >
              <span className="frame-topline">
                <span>App screenshot · Sample data</span>
                <span>Click to expand</span>
              </span>
              <span className="image-stage">
                <img src={feature.image} alt={feature.alt} />
              </span>
              <span className="frame-accent" aria-hidden="true" />
            </button>
          </section>
          );
        })}
      </div>

      <section className="closing" id="closing" data-heading-reveal>
        <p className="kicker">September 2026 update</p>
        <h2>Five updates. More ways to keep moving.</h2>
        <p>
          Explore the September improvements across Field Service, Invoicing,
          Subscriptions, and customer communication. Keep sharing your feedback as you
          put Talli to work.
        </p>
        <p className="feature-note">
          <strong>Also in development: QuickBooks Online.</strong>{" "}
          We’re testing invoice import and payment recording with a sandbox
          connection. This preview is not yet available for live business accounts.
        </p>
        <div className="contact-links" aria-label="Contact information">
          <span>Questions? We&apos;re here to help.</span>
          <a href="mailto:Hello@carreonfinancial.com">
            Hello@carreonfinancial.com
          </a>
          <a href="tel:+14803647638">(480) 364-7638</a>
        </div>
        <a className="primary-cta" href="#top">
          Back to the top <span aria-hidden="true">↑</span>
        </a>
      </section>

      <footer>
        <span>TALLI</span>
        <span>Product update · September 2026</span>
      </footer>

      {preview ? (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${preview.eyebrow} product update`}
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) setPreview(null);
          }}
        >
          <div className="lightbox-card">
            <div className="lightbox-head">
              <div>
                <p>{preview.eyebrow}</p>
                <strong>{preview.title}</strong>
              </div>
              <button type="button" onClick={() => setPreview(null)}>
                Close
              </button>
            </div>
            <img src={preview.image} alt={preview.alt} />
          </div>
        </div>
      ) : null}
    </main>
  );
}
