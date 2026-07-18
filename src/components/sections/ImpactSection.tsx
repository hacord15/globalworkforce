"use client";

import { useIntersectionObserver } from "@/lib/useIntersectionObserver";
import {
  Banknote,
  TrendingUp,
  Globe2,
  BookOpen,
  HeartHandshake,
  PiggyBank,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { images } from "@/lib/images";

const IMPACT_POINTS = [
  { icon: Banknote, label: "Increase family income" },
  { icon: TrendingUp, label: "Improve social status" },
  { icon: Globe2, label: "Build international careers" },
  { icon: BookOpen, label: "Access continuous training" },
  { icon: HeartHandshake, label: "Secure family welfare" },
  { icon: PiggyBank, label: "Create long-term financial stability" },
];

const STATS = [
  { value: "25,000+", label: "Successful Placements" },
  { value: "30+", label: "Destination Countries" },
  { value: "6", label: "Industry Sectors" },
  { value: "48 hrs", label: "Avg. Shortlisting Time" },
];

export default function ImpactSection() {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <section ref={ref} className="imp-section">
      <style>{`
        /* ── section ── */
        .imp-section {
          position: relative;
          background: #fff;
          overflow: hidden;
        }

        /* subtle red wash */
        .imp-redwash {
          position: absolute; inset: 0; pointer-events: none;
          background: radial-gradient(ellipse 55% 70% at 95% 50%,
            rgba(200,16,46,0.05) 0%, transparent 70%);
        }

        /* ── grid ── */
        .imp-grid {
          max-width: 1280px;
          margin: 0 auto;
          padding: 5rem 2.5rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
          position: relative; z-index: 10;
        }

        /* ══ LEFT — IMAGE COLUMN ═══════════════════════════════ */
        .imp-img-col {
          position: relative;
        }

        /* main image frame */
        .imp-img-frame {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          aspect-ratio: 4/5;
          box-shadow: 0 32px 64px rgba(0,0,0,0.14);
        }
        .imp-img-frame img {
          width: 100%; height: 100%;
          object-fit: cover;
          display: block;
        }

        /* red corner accent */
        .imp-img-frame::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            160deg,
            transparent 55%,
            rgba(200,16,46,0.35) 100%
          );
          z-index: 1;
          border-radius: inherit;
        }

        /* decorative red border offset */
        .imp-img-border {
          position: absolute;
          top: 16px; left: -16px;
          right: 16px; bottom: -16px;
          border: 2px solid rgba(200,16,46,0.22);
          border-radius: 18px;
          z-index: 0;
        }

        /* floating stat pill — bottom left */
        .imp-pill {
          position: absolute;
          bottom: -1.25rem; left: -1.25rem;
          z-index: 10;
          background: #C8102E;
          color: #fff;
          border-radius: 12px;
          padding: 1rem 1.4rem;
          display: flex; flex-direction: column;
          gap: 0.1rem;
          box-shadow: 0 12px 32px rgba(200,16,46,0.38);
          min-width: 140px;
        }
        .imp-pill-num {
          font-family: var(--font-display);
          font-size: 1.8rem; font-weight: 900;
          line-height: 1; letter-spacing: -0.03em;
        }
        .imp-pill-lbl {
          font-size: 0.62rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.14em;
          color: rgba(255,255,255,0.75);
        }

        /* floating quote chip — top right */
        .imp-chip {
          position: absolute;
          top: 1.25rem; right: -1.25rem;
          z-index: 10;
          background: #fff;
          border: 1px solid #eee;
          border-radius: 10px;
          padding: 0.7rem 1rem;
          box-shadow: 0 8px 24px rgba(0,0,0,0.10);
          display: flex; align-items: center; gap: 0.55rem;
          max-width: 180px;
        }
        .imp-chip-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: #C8102E; flex-shrink: 0;
          animation: imp-pulse 2s ease-in-out infinite;
        }
        @keyframes imp-pulse {
          0%,100% { opacity: 1; transform: scale(1); }
          50%      { opacity: 0.5; transform: scale(0.7); }
        }
        .imp-chip span {
          font-size: 0.65rem; font-weight: 700;
          color: #222; line-height: 1.35;
        }

        /* ══ RIGHT — COPY COLUMN ════════════════════════════════ */
        .imp-copy-col {}

        .imp-eyebrow {
          font-size: 0.68rem; font-weight: 800;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: #C8102E; display: block; margin-bottom: 0.8rem;
        }

        .imp-heading {
          font-family: var(--font-display);
          font-size: clamp(2rem, 3.2vw, 3rem);
          font-weight: 800; line-height: 1.15;
          color: #111; margin-bottom: 1rem;
        }
        .imp-heading-red { color: #C8102E; }

        .imp-divider {
          width: 48px; height: 3px;
          background: #C8102E; border-radius: 2px;
          margin-bottom: 1.4rem;
        }

        .imp-body {
          font-size: 0.9rem; line-height: 1.8;
          color: #555; margin-bottom: 0.75rem;
          max-width: 460px;
        }
        .imp-body strong { color: #222; font-weight: 600; }

        /* impact grid */
        .imp-points {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 0.6rem; margin: 1.5rem 0 1.75rem;
        }
        .imp-point {
          display: flex; align-items: center; gap: 0.65rem;
          padding: 0.65rem 0.9rem;
          border-radius: 8px;
          background: rgba(200,16,46,0.04);
          border: 1px solid rgba(200,16,46,0.10);
          transition: border-color 0.2s, background 0.2s;
        }
        .imp-point:hover {
          border-color: rgba(200,16,46,0.28);
          background: rgba(200,16,46,0.07);
        }
        .imp-point-icon {
          width: 28px; height: 28px; border-radius: 6px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          background: rgba(200,16,46,0.10); color: #C8102E;
        }
        .imp-point span {
          font-size: 0.72rem; font-weight: 500;
          color: #444; line-height: 1.3;
        }

        /* quote */
        .imp-quote {
          border-left: 3px solid #C8102E;
          padding-left: 1rem;
          margin-bottom: 1.8rem;
          font-size: 0.82rem;
          font-style: italic;
          color: #777;
          line-height: 1.7;
        }

        /* mini stats row */
        .imp-stats-row {
          display: flex; gap: 1.5rem; flex-wrap: wrap;
          margin-bottom: 2rem;
          padding: 1rem 1.25rem;
          background: #fafafa;
          border: 1px solid #eee;
          border-radius: 10px;
        }
        .imp-stat { display: flex; flex-direction: column; gap: 0.1rem; }
        .imp-stat-num {
          font-family: var(--font-display);
          font-size: 1.3rem; font-weight: 800;
          color: #C8102E; letter-spacing: -0.02em; line-height: 1;
        }
        .imp-stat-lbl {
          font-size: 0.6rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.12em;
          color: #999;
        }

        /* CTA */
        .imp-cta {
          display: inline-flex; align-items: center; gap: 0.5rem;
          background: #C8102E; color: #fff;
          font-family: var(--font-display);
          font-size: 0.68rem; font-weight: 800;
          text-transform: uppercase; letter-spacing: 0.18em;
          padding: 0.85rem 1.7rem;
          text-decoration: none; border-radius: 2px;
          border: 1px solid #C8102E;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
        }
        .imp-cta:hover {
          background: #a80d26;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(200,16,46,0.35);
        }
        .imp-cta .imp-arr { transition: transform 0.2s; }
        .imp-cta:hover .imp-arr { transform: translateX(4px); }

        /* ── entrance animations ── */
        .imp-fade {
          opacity: 0; transform: translateY(16px);
          transition: opacity 0.65s ease, transform 0.65s ease;
        }
        .imp-fade-left {
          opacity: 0; transform: translateX(-24px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .imp-fade-right {
          opacity: 0; transform: translateX(24px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .imp-fade.in, .imp-fade-left.in, .imp-fade-right.in {
          opacity: 1; transform: translate(0);
        }
        .imp-d1 { transition-delay: 0.05s; }
        .imp-d2 { transition-delay: 0.15s; }
        .imp-d3 { transition-delay: 0.28s; }
        .imp-d4 { transition-delay: 0.42s; }
        .imp-d5 { transition-delay: 0.56s; }
        .imp-d6 { transition-delay: 0.68s; }

        /* ── responsive ── */
        @media (max-width: 900px) {
          .imp-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
            padding: 3.5rem 1.5rem;
          }
          .imp-img-col { max-width: 480px; margin: 0 auto; width: 100%; }
          .imp-chip { right: 0; }
        }
        @media (max-width: 520px) {
          .imp-points { grid-template-columns: 1fr; }
          .imp-stats-row { gap: 1rem; }
        }

        @media (prefers-reduced-motion: reduce) {
          .imp-fade, .imp-fade-left, .imp-fade-right {
            opacity: 1 !important; transform: none !important;
            transition: none !important;
          }
          .imp-chip-dot { animation: none; }
        }
      `}</style>

      <div className="imp-redwash" aria-hidden />

      <div className="imp-grid">
        {/* ══ LEFT — IMAGE ══════════════════════════════════════ */}
        <div
          className={`imp-img-col imp-fade-left imp-d1${isVisible ? " in" : ""}`}
        >
          {/* offset border */}
          <div className="imp-img-border" />

          {/* main image */}
          <div className="imp-img-frame">
            <Image
              src={images.homepage.impactImg}
              alt="Workers building international careers through SIS Global"
              width={800}
              height={1000}
            />
          </div>

          {/* floating pill — placements */}
          {/* <div className="imp-pill">
            <span className="imp-pill-num">25K+</span>
            <span className="imp-pill-lbl">Successful Placements</span>
          </div> */}

          {/* floating chip — live indicator */}
          <div className="imp-chip">
            <span className="imp-chip-dot" />
            <span>Hiring active across 30+ countries</span>
          </div>
        </div>

        {/* ══ RIGHT — COPY ══════════════════════════════════════ */}
        <div className="imp-copy-col">
          <span
            className={`imp-eyebrow imp-fade imp-d1${isVisible ? " in" : ""}`}
          >
            Our Purpose
          </span>

          <h2
            className={`imp-heading imp-fade imp-d2${isVisible ? " in" : ""}`}
          >
            Changing Lives Through{" "}
            <span className="imp-heading-red">Global Employment</span>
          </h2>

          <div
            className={`imp-divider imp-fade imp-d2${isVisible ? " in" : ""}`}
          />

          <p className={`imp-body imp-fade imp-d3${isVisible ? " in" : ""}`}>
           Our ethos is rooted in meaningful
employment — not just creating jobs, but  <strong>transforming lives.</strong>
          </p>
          <p className={`imp-body imp-fade imp-d3${isVisible ? " in" : ""}`}>
            Through ethical recruitment, continuous upskilling, insurance
            support, family connect initiatives, and post-deployment support, we
            help workers build better futures for themselves and their families.
          </p>

          {/* impact points */}
          <div
            className={`imp-points imp-fade imp-d4${isVisible ? " in" : ""}`}
          >
            {IMPACT_POINTS.map(({ icon: Icon, label }) => (
              <div className="imp-point" key={label}>
                <div className="imp-point-icon">
                  <Icon size={16} strokeWidth={1.8} />
                </div>
                <span
                  style={{
                    fontSize: "15px",
                    lineHeight: "1.35",
                    fontWeight: 500,
                  }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* mini stats */}
          {/* <div className={`imp-stats-row imp-fade imp-d5${isVisible ? " in" : ""}`}>
            {STATS.map((s) => (
              <div className="imp-stat" key={s.label}>
                <span className="imp-stat-num">{s.value}</span>
                <span className="imp-stat-lbl">{s.label}</span>
              </div>
            ))}
          </div> */}

          {/* quote */}
          <p className={`imp-quote imp-fade imp-d5${isVisible ? " in" : ""}`} style={{ fontSize: "16px" }}>
            Our mission is to uplift workers and their families socially and
            economically through global employment opportunities.
          </p>

          {/* CTA */}
          {/* <div className={`imp-fade imp-d6${isVisible ? " in" : ""}`}>
            <Link href="/jobs" className="imp-cta">
              Find Opportunities <ArrowRight size={13} className="imp-arr" />
            </Link>
          </div> */}
        </div>
      </div>
    </section>
  );
}
