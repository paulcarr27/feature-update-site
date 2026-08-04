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
    id: "ach",
    number: "01",
    eyebrow: "ACH payments",
    title: "Customers can now pay invoices from a bank account.",
    summary:
      "Eligible businesses can offer ACH alongside card and cash on invoice links—giving customers more choice without adding another workflow.",
    bullets: [
      "Enable ACH after account verification.",
      "Track pending, review, settled, and failed states.",
      "See one payment status across invoices, jobs, transactions, and reports.",
    ],
    image: "/features/ach-payment.png",
    alt: "Customer-facing invoice payment page with card, bank account, and cash choices",
    side: "right",
    note: "ACH availability requires account configuration and approval.",
  },
  {
    id: "logins",
    number: "02",
    eyebrow: "Unique team logins",
    title: "Give every team member a secure login.",
    summary:
      "Each employee gets personal access instead of relying on a shared owner account.",
    bullets: [
      "Invite employees to sign in with their own credentials.",
      "Start with a role template, then adjust screens and actions.",
      "Limit access to assigned records when needed.",
    ],
    image: "/features/team-access.png",
    alt: "Edit Employee permissions with role templates, screen access, and action controls",
    side: "left",
  },
  {
    id: "estimates",
    number: "03",
    eyebrow: "Updated estimate builder",
    title: "Choose the estimate structure that fits your job.",
    summary:
      "Start with one complete scope, multiple customer options, or a room-by-room project.",
    bullets: [
      "Room by Room keeps work areas organized.",
      "Every structure keeps pricing and totals in one workflow.",
      "Change the structure as the project evolves.",
    ],
    image: "/features/estimate-builder.png",
    alt: "Estimate Builder structure choices including Standard, Multiple Customer Options, and Room by Room",
    side: "right",
  },
  {
    id: "groups",
    number: "04",
    eyebrow: "Item groups and photos",
    title: "Group related work and add photos to each item.",
    summary:
      "Item groups organize the scope, while per-item photos make choices easier to understand.",
    bullets: [
      "Create groups for rooms, phases, or work types.",
      "Move each line item into the right group.",
      "Attach a photo from the line-item action menu.",
    ],
    image: "/features/item-groups-photos.png",
    alt: "Estimate Builder with grouped line items and an Add photo action",
    side: "left",
  },
  {
    id: "notifications",
    number: "05",
    eyebrow: "Notifications",
    title: "Never miss a moment that matters to your business.",
    summary:
      "Configure in-app and email alerts around the events that matter most to your team.",
    bullets: [
      "Enable in-app alerts, email delivery, or both.",
      "Follow approvals, change orders, payments, and completed jobs.",
      "Open the related record directly from the notification.",
    ],
    image: "/features/notifications.png",
    alt: "Notification settings for in-app alerts, email delivery, and estimate approvals",
    side: "right",
  },
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
        <span className="header-label">August 2026 preview</span>
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
          >
            <span>{feature.number}</span>
            <strong>{feature.eyebrow}</strong>
          </a>
        ))}
      </nav>

      <section className="hero" id="top">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-copy">
          <p className="kicker">Talli update · Beta preview</p>
          <h1>
            Five focused updates.
            <span>One smoother workflow.</span>
          </h1>
          <p className="hero-summary">
            A clearer way to get paid, manage team access, build estimates, and
            stay informed.
          </p>
          <a className="primary-cta" href="#ach">
            Explore what&apos;s new <span aria-hidden="true">↓</span>
          </a>
        </div>

        <div className="hero-orbit" aria-hidden="true">
          <span className="orbit orbit-one" />
          <span className="orbit orbit-two" />
          <span className="hero-five">5</span>
          <span className="orbit-label label-one">Get paid</span>
          <span className="orbit-label label-two">Team access</span>
          <span className="orbit-label label-three">Build estimates</span>
          <span className="orbit-label label-four">Add details</span>
          <span className="orbit-label label-five">Stay informed</span>
        </div>
      </section>

      <section className="intro-band" aria-label="Update summary">
        <p>Built from the feedback you&apos;ve shared during beta.</p>
        <span>Real development previews · Features may evolve before release</span>
      </section>

      <div className="feature-list">
        {features.map((feature, index) => {
          const nextFeature = features[index + 1];
          return (
          <section
            className={`feature feature-${feature.side}`}
            id={feature.id}
            data-feature
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
                <span>Development preview</span>
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

      <section className="closing" id="closing">
        <p className="kicker">Beta is in full swing</p>
        <h2>Keep sending your feedback.</h2>
        <p>
          We&apos;re finishing and validating these updates now. We&apos;ll share
          release timing before they reach production.
        </p>
        <a className="primary-cta" href="#top">
          Back to the top <span aria-hidden="true">↑</span>
        </a>
      </section>

      <footer>
        <span>TALLI</span>
        <span>Development preview · August 2026</span>
      </footer>

      {preview ? (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${preview.eyebrow} development preview`}
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
