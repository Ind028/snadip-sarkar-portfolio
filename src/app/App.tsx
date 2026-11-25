import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Instagram,
  Facebook,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Play,
  Star,
  Menu,
  X,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from "lucide-react";

// ─── INTRO VIDEO ─────────────────────────────────────────────────────────────
const INTRO_VIDEO = "/intro-video.mp4";
const GOOGLE_SHEETS_WEBHOOK_URL =
  import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK_URL?.trim() ?? "";

// ─── PHOTO ASSETS ────────────────────────────────────────────────────────────
const PHOTOS = {
  hero: "/photos/prashant-arora-hero.jpg",
  about: "/photos/sandip-kathak-dramatic.jpg",
  perf1: "/photos/sandip-kathak-first-performance.jpg",
  perf2: "/photos/sandip-kathak-duet.jpg",
  perf3: "/photos/sandip-kathak-stage.jpg",
  perf4: "/photos/sandip-kathak-dramatic.jpg",
  perf5: "/photos/sandip-kathak-pose.jpg",
  perf6: "/photos/sandip-kathak-black-white.jpg",
  gal1: "/photos/sandip-kathak-stage.jpg",
  gal2: "/photos/sandip-kathak-pose.jpg",
  gal3: "/photos/sandip-kathak-dramatic.jpg",
  gal4: "/photos/sandip-kathak-black-white.jpg",
  gal5: "/photos/sandip-kathak-leap.jpg",
  gal6: "/photos/sandip-kathak-duet.jpg",
};

// ─── DATA ────────────────────────────────────────────────────────────────────
const PERFORMANCES = [
  {
    title: "Shiva Tandav",
    category: "Stage Performance",
    image: PHOTOS.perf1,
    images: [PHOTOS.perf1, PHOTOS.gal1, PHOTOS.gal3],
    desc: "A breathtaking interpretation of Lord Shiva's cosmic dance of creation and destruction.",
  },
  {
    title: "Raas Leela",
    category: "Classical Production",
    image: PHOTOS.perf2,
    images: [PHOTOS.perf2, PHOTOS.gal2, PHOTOS.gal4],
    desc: "The eternal love story of Radha and Krishna rendered in pure classical Kathak.",
  },
  {
    title: "Thumri Evening",
    category: "Festival",
    image: PHOTOS.perf3,
    images: [PHOTOS.perf3, PHOTOS.gal5, PHOTOS.gal1],
    desc: "An intimate evening of semi-classical Thumri compositions at Apeejay Kolkata Literary Festival.",
  },
  {
    title: "Mughal-e-Azam",
    category: "Collaboration",
    image: PHOTOS.perf4,
    images: [PHOTOS.perf4, PHOTOS.gal4, PHOTOS.gal2],
    desc: "A grand collaborative production celebrating four centuries of Mughal heritage.",
  },
  {
    title: "Chakkar Masterclass",
    category: "Workshop",
    image: PHOTOS.perf5,
    images: [PHOTOS.perf5, PHOTOS.gal6, PHOTOS.gal3],
    desc: "Intensive workshop on the iconic spinning technique — the soul of Kathak.",
  },
  {
    title: "Bandish ki Dhun",
    category: "Stage Performance",
    image: PHOTOS.perf6,
    images: [PHOTOS.perf6, PHOTOS.gal3, PHOTOS.gal6],
    desc: "An intricate bandish exploring the sacred relationship between music and movement.",
  },
];

const CLASSES = [
  {
    level: "Junior",
    hindi: "Junior",
    color: "#F4841F",
    desc: "Foundation course: mudras, basic footwork (tatkar), and introductory compositions.",
    schedules: [
      "Wednesday — 6:00–7:00 PM · Offline",
      "Thursday — 8:00–9:00 PM · Online",
    ],
    duration: "45 minutes minimum",
    fee: "₹1,000",
  },
  {
    level: "Intermediate",
    hindi: "Intermediate",
    color: "#C9A84C",
    desc: "Advanced compositions, Thumri, Bhajan, and technical refinement of chakkar.",
    schedules: [
      "Wednesday — 7:00–8:00 PM · Offline",
      "Sunday — 8:00–9:00 PM · Online",
    ],
    duration: "45 minutes minimum",
    fee: "₹1,500",
  },
  {
    level: "Senior",
    hindi: "Senior",
    color: "#89CFF0",
    desc: "Performance-level training, original choreography, and stage preparation.",
    schedules: [
      "Wednesday — 5:00–6:00 PM · Offline",
      "Saturday — 8:00–9:00 PM · Online",
    ],
    duration: "45 minutes minimum",
    fee: "₹2,000",
  },
];

const TESTIMONIALS = [
  {
    name: "Anjali Sharma",
    role: "Student · Advanced Batch",
    city: "Mumbai",
    text: "Guruma's teaching transformed not just my dancing but my entire approach to life. Her mastery of Kathak is unparalleled — she transmits not just technique but the very soul of the art.",
  },
  {
    name: "Ravi Kumar",
    role: "Parent of student",
    city: "Delhi",
    text: "My daughter has been learning here for three years. The discipline, grace, and artistic sensibility she has developed under Guruma's guidance is extraordinary.",
  },
  {
    name: "Priya Menon",
    role: "Professional Dancer",
    city: "Chennai",
    text: "Watching a performance by Sandip Sarkar is a transcendent experience. He does not merely dance — he becomes the story, the raga, the moment itself.",
  },
  {
    name: "Sunil Agarwal",
    role: "Audience · Jai Ho Festival",
    city: "Kolkata",
    text: "I have witnessed performances across three continents. Nothing compares to the emotional depth and technical precision she brings to every single performance.",
  },
];

const AWARDS = [
  {
    year: "National",
    title: "National Scholarship in Kathak",
    org: "Ministry of Culture, Government of India",
  },
  {
    year: "Gold",
    title: "Gold Medal — 1st Class, 1st Position",
    org: "Nikhil Bharat Sangeet Samiti",
  },
  {
    year: "1st",
    title: "Youth Competition — District Level",
    org: "First position",
  },
  {
    year: "M.A.",
    title: "Master's Degree — First Class",
    org: "Rabindra Bharati University",
  },
  {
    year: "Festivals",
    title: "Vasant Utsav, Konark, Shirpur, Sangai & Uday Shankar",
    org: "Selected festival performances across India",
  },
  {
    year: "Doordarshan",
    title: "Doordarshan Graded Artist",
    org: "Recognised Kathak artist",
  },
];

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────────
function GlobalStyles() {
  return (
    <style>{`
      html { scroll-behavior: smooth; }
      html, body {
        background:
          radial-gradient(ellipse at 15% 10%, rgba(201,168,76,0.18) 0%, transparent 45%),
          radial-gradient(ellipse at 85% 85%, rgba(10,95,115,0.14) 0%, transparent 45%),
          radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.06) 0%, transparent 70%),
          #000000 !important;
        background-attachment: fixed !important;
        overflow-x: hidden;
      }
      body { font-family: 'Lato', sans-serif; }
      *, *::before, *::after { box-sizing: border-box; }
      a, a:visited { color: inherit; -webkit-text-fill-color: inherit; }
      ::-webkit-scrollbar { width: 6px; }
      ::-webkit-scrollbar-track { background: #0D0205; }
      ::-webkit-scrollbar-thumb { background: #C9A84C55; border-radius: 3px; }

      .font-yatra { font-family: 'Yatra One', cursive; }
      .font-cinzel { font-family: 'Cinzel Decorative', serif; }
      .font-garamond { font-family: 'EB Garamond', serif; }
      .font-lato { font-family: 'Lato', sans-serif; }
      .hero-image {
        object-position: center 38%;
        transform: scale(1.015);
      }
      .hero-overlay {
        background:
          linear-gradient(to bottom, rgba(13,2,5,0.62) 0%, rgba(13,2,5,0.34) 48%, rgba(13,2,5,0.95) 100%);
      }
      .hero-eyebrow { font-size: 1rem; }
      .hero-role { font-size: 1.25rem; }
      .hero-quote { font-size: 1rem; }
      .hero-actions a { font-size: 0.875rem; }
      .shiva-performance-image {
        transform: scale(1.45) translateY(-8%);
      }
      @media (max-width: 640px) {
        .hero-image {
          object-position: 60% 28%;
          transform: scale(1.01);
        }
        .hero-overlay {
          background:
            radial-gradient(ellipse at 68% 32%, rgba(201,168,76,0.08) 0%, transparent 36%),
            linear-gradient(to bottom, rgba(13,2,5,0.74) 0%, rgba(13,2,5,0.3) 42%, rgba(13,2,5,0.96) 100%);
        }
        .hero-eyebrow { font-size: 1.1rem; }
        .hero-role { font-size: 1.4rem; }
        .hero-quote { font-size: 1.1rem; }
        .hero-actions a { font-size: 1rem; }
      }
      @media (prefers-reduced-motion: reduce) {
        .hero-image { transform: none; }
      }

      @keyframes shimmerText {
        0%   { background-position: -300% center; }
        100% { background-position: 300% center; }
      }
      @keyframes bounceChevron {
        0%, 100% { transform: translateY(0); }
        50%      { transform: translateY(8px); }
      }
      @keyframes fadeSlideUp {
        from { opacity: 0; transform: translateY(28px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      .gold-shimmer {
        background: linear-gradient(90deg, #C9A84C 0%, #FFE566 40%, #C9A84C 60%, #8B6914 100%);
        background-size: 300% auto;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        animation: shimmerText 4s linear infinite;
      }
      .gold-shimmer-static {
        background: linear-gradient(135deg, #FFE566 0%, #C9A84C 50%, #8B6914 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      .section-reveal {
        opacity: 0;
        transform: translateY(40px);
        transition: opacity 0.9s ease, transform 0.9s ease;
      }
      .section-reveal.visible {
        opacity: 1;
        transform: translateY(0);
      }

      .perf-card:hover .perf-overlay { opacity: 1; }
      .perf-card:hover img { transform: scale(1.07); }
      img { transition: transform 0.6s ease; }

      .class-card {
        position: relative;
        background: linear-gradient(135deg, #1A0508 0%, #0D0205 100%);
        border: 1px solid rgba(201, 168, 76, 0.22);
        transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
      }
      .class-card:hover {
        border-color: rgba(201, 168, 76, 0.7);
        transform: translateY(-6px);
        box-shadow: 0 20px 50px rgba(201, 168, 76, 0.12);
      }

      .nav-link {
        position: relative;
        color: #89CFF0;
        font-family: 'Lato', sans-serif;
        font-size: 0.85rem;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        transition: color 0.25s;
      }
      .nav-link::after {
        content: '';
        position: absolute;
        bottom: -3px;
        left: 0;
        width: 0;
        height: 1px;
        background: #C9A84C;
        transition: width 0.3s;
      }
      .nav-link:hover { color: #C9A84C; }
      .nav-link:visited { color: #89CFF0; }
      .nav-link:hover::after { width: 100%; }

      .social-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 72px;
        height: 72px;
        border-radius: 50%;
        border: 1.5px solid rgba(201, 168, 76, 0.35);
        background: rgba(201, 168, 76, 0.06);
        color: #C9A84C;
        transition: background 0.3s, border-color 0.3s, transform 0.3s, box-shadow 0.3s;
      }
      .social-btn:hover {
        background: rgba(201, 168, 76, 0.18);
        border-color: #C9A84C;
        transform: scale(1.12);
        box-shadow: 0 0 28px rgba(201, 168, 76, 0.3);
      }
    `}</style>
  );
}

// ─── INTRO VIDEO ─────────────────────────────────────────────────────────────
function IntroVideo({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"enter" | "playing">("enter");
  const [overlayOpacity, setOverlayOpacity] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const doneRef = useRef(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const finish = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    videoRef.current?.pause();
    setOverlayOpacity(0);
    setTimeout(onComplete, 2400);
  }, [onComplete]);

  const handleEnter = () => {
    setPhase("playing");
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    video.play().catch(() => {});
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black"
      style={{
        zIndex: 100,
        opacity: overlayOpacity,
        transition: overlayOpacity === 0 ? "opacity 2.4s ease" : "none",
        pointerEvents: overlayOpacity < 0.5 ? "none" : "auto",
      }}
    >
      {/* Video — preloaded but paused until user clicks Enter */}
      <video
        ref={videoRef}
        src={INTRO_VIDEO}
        className="w-full h-full"
        style={{
          objectFit: "cover",
          objectPosition: "center",
          display: phase === "playing" ? "block" : "none",
        }}
        playsInline
        preload="auto"
        onEnded={finish}
      />

      {/* Click-to-Enter overlay */}
      {phase === "enter" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p
            className="font-yatra text-sm tracking-[0.3em] mb-6"
            style={{ color: "rgba(201,168,76,0.6)" }}
          >
            Welcome
          </p>
          <button
            onClick={handleEnter}
            className="font-cinzel font-bold tracking-widest uppercase px-12 py-4"
            style={{
              fontSize: "clamp(1rem, 2vw, 1.3rem)",
              background: "linear-gradient(135deg, #C9A84C, #8B6914)",
              color: "#ffffff",
              WebkitTextFillColor: "#ffffff",
              letterSpacing: "0.2em",
              boxShadow: "0 0 40px rgba(201,168,76,0.3)",
            }}
          >
            Enter
          </button>
          <p
            className="font-lato text-xs mt-4 tracking-widest"
            style={{ color: "rgba(201,168,76,0.35)" }}
          >
            with sound
          </p>
        </div>
      )}

      {/* Playing controls */}
      {phase === "playing" && (
        <>
          <button
            onClick={toggleMute}
            className="absolute bottom-8 left-8 font-lato text-xs tracking-widest uppercase flex items-center gap-2"
            style={{
              color: "rgba(201,168,76,0.75)",
              letterSpacing: "0.15em",
              zIndex: 2,
              border: "1px solid rgba(201,168,76,0.3)",
              padding: "8px 16px",
              background: "rgba(0,0,0,0.5)",
            }}
          >
            {isMuted ? "🔇 Tap for Sound" : "🔊 Tap to Mute"}
          </button>
          <button
            onClick={finish}
            className="absolute bottom-8 right-8 font-lato text-xs tracking-widest uppercase"
            style={{
              color: "rgba(201,168,76,0.45)",
              letterSpacing: "0.2em",
              zIndex: 2,
            }}
          >
            Skip Intro ›
          </button>
        </>
      )}
    </div>
  );
}

// ─── SECTION TITLE ────────────────────────────────────────────────────────────
function SectionTitle({
  hindi,
  english,
  sub,
}: {
  hindi: string;
  english: string;
  sub?: string;
}) {
  return (
    <div className="text-center mb-6">
      <p
        className="font-yatra text-base tracking-[0.25em] mb-2"
        style={{ color: "rgba(201,168,76,0.6)" }}
      >
        {hindi}
      </p>
      <h2
        className="font-cinzel font-bold mb-4"
        style={{
          fontSize: "clamp(1.8rem, 4vw, 3rem)",
          background:
            "linear-gradient(135deg, #FFE566 0%, #C9A84C 50%, #8B6914 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {english}
      </h2>
      {sub && (
        <p
          className="font-garamond italic text-lg"
          style={{ color: "rgba(250,243,224,0.55)" }}
        >
          {sub}
        </p>
      )}
      <div className="flex items-center justify-center gap-4 mt-6">
        <div
          style={{
            height: 1,
            width: 60,
            background: "linear-gradient(to left, #C9A84C, transparent)",
          }}
        />
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#C9A84C",
            boxShadow: "0 0 12px #C9A84C",
          }}
        />
        <div
          style={{
            height: 1,
            width: 60,
            background: "linear-gradient(to right, #C9A84C, transparent)",
          }}
        />
      </div>
    </div>
  );
}

// ─── ORNAMENTAL DIVIDER ───────────────────────────────────────────────────────
function OrnamentalDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-6 opacity-30">
      <div style={{ height: 1, width: 80, background: "#C9A84C" }} />
      <svg width="32" height="32" viewBox="0 0 32 32">
        {[0, 90, 180, 270].map((a) => (
          <ellipse
            key={a}
            cx="16"
            cy="16"
            rx="10"
            ry="4"
            fill="none"
            stroke="#C9A84C"
            strokeWidth="1"
            transform={`rotate(${a}, 16, 16)`}
          />
        ))}
        <circle cx="16" cy="16" r="3" fill="#C9A84C" />
      </svg>
      <div style={{ height: 1, width: 80, background: "#C9A84C" }} />
    </div>
  );
}

// ─── NAV ──────────────────────────────────────────────────────────────────────
function Navbar({ visible }: { visible: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Performances", href: "#performances" },
    { label: "Classes", href: "#classes" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={visible ? { y: 0, opacity: 1 } : { y: -80, opacity: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-4 sm:px-8 py-4"
      style={{
        maxWidth: "100vw",
        overflow: "hidden",
        background: scrolled
          ? "rgba(13,2,5,0.96)"
          : "linear-gradient(to bottom, rgba(13,2,5,0.7), transparent)",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(201,168,76,0.18)" : "none",
        transition: "background 0.4s, border-color 0.4s",
      }}
    >
      {/* Logo */}
      <a
        href="#home"
        className="font-cinzel font-bold text-base sm:text-lg whitespace-nowrap"
        style={{
          color: "#C9A84C",
          letterSpacing: "0.06em",
          minWidth: 0,
          flexShrink: 1,
        }}
      >
        Sandip Sarkar
      </a>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-8">
        {links.map((l) => (
          <a key={l.href} href={l.href} className="nav-link">
            {l.label}
          </a>
        ))}
      </div>

      {/* CTA */}
      <a
        href="#registration"
        className="hidden md:flex items-center gap-2 px-5 py-2 font-lato text-xs tracking-widest uppercase"
        style={{
          border: "1px solid #C9A84C",
          color: "#C9A84C",
          transition: "background 0.3s, color 0.3s",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.background = "#C9A84C";
          (e.currentTarget as HTMLElement).style.color = "#0D0205";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.background = "transparent";
          (e.currentTarget as HTMLElement).style.color = "#C9A84C";
        }}
      >
        Register
      </a>

      {/* Mobile toggle */}
      <button
        className="md:hidden"
        style={{ color: "#C9A84C" }}
        onClick={() => setMobileOpen((v) => !v)}
      >
        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-full left-0 right-0 py-4"
            style={{
              background: "rgba(13,2,5,0.97)",
              borderBottom: "1px solid rgba(201,168,76,0.2)",
            }}
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="block px-8 py-3 nav-link"
                onClick={() => setMobileOpen(false)}
              >
                {l.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// ─── HERO SECTION ─────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={PHOTOS.hero}
          alt="Kathak performance"
          className="hero-image w-full h-full object-cover"
          style={{
            background: "#0D0205",
            objectPosition: "center 38%",
            filter: "brightness(0.34) saturate(0.7) contrast(0.95)",
          }}
        />
        <div
          className="hero-overlay"
          style={{
            position: "absolute",
            inset: 0,
          }}
        />
      </div>

      {/* Hero text */}
      <div
        className="relative text-center px-6 max-w-4xl mx-auto"
        style={{ zIndex: 2 }}
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9 }}
          className="hero-eyebrow font-yatra tracking-[0.3em] mb-4"
          style={{ color: "rgba(201,168,76,0.7)" }}
        >
          Welcome · An Artist's Journey
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="font-cinzel font-black mb-4"
          style={{
            fontSize: "clamp(2.6rem, 8vw, 6rem)",
            lineHeight: 1.1,
            letterSpacing: "0.04em",
            background:
              "linear-gradient(135deg, #FFE566 0%, #C9A84C 45%, #FFD700 75%, #8B6914 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: "drop-shadow(0 0 30px rgba(201,168,76,0.4))",
          }}
        >
          Sandip Sarkar
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.9 }}
          className="hero-role font-garamond italic md:text-2xl mb-2 tracking-wide"
          style={{ color: "rgba(250,243,224,0.75)" }}
        >
          Kathak Performer · Choreographer · Guru
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 1 }}
          className="hero-quote font-yatra tracking-widest mb-12"
          style={{ color: "rgba(201,168,76,0.5)" }}
        >
          "Discipline in rhythm, devotion in expression"
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.9 }}
          className="hero-actions flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="#about"
            className="flex items-center gap-3 px-8 py-3.5 font-lato text-sm tracking-widest uppercase"
            style={{
              background: "linear-gradient(135deg, #C9A84C, #8B6914)",
              color: "#ffffff",
              WebkitTextFillColor: "#ffffff",
              fill: "#ffffff",
              fontWeight: 700,
              boxShadow: "0 6px 28px rgba(201,168,76,0.35)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform =
                "translateY(-2px)";
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 12px 40px rgba(201,168,76,0.5)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform =
                "translateY(0)";
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 6px 28px rgba(201,168,76,0.35)";
            }}
          >
            Explore My Journey <ArrowRight size={15} />
          </a>
          <a
            href="#registration"
            className="flex items-center gap-3 px-8 py-3.5 font-lato text-sm tracking-widest uppercase"
            style={{
              border: "1.5px solid rgba(201,168,76,0.6)",
              color: "#C9A84C",
              transition: "background 0.3s, color 0.3s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background =
                "rgba(201,168,76,0.1)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
            }}
          >
            Register for Classes
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{
          color: "rgba(201,168,76,0.45)",
          animation: "bounceChevron 2.2s ease-in-out infinite",
          zIndex: 2,
        }}
      >
        <ChevronDown size={22} />
      </div>
    </section>
  );
}

// ─── ABOUT SECTION ────────────────────────────────────────────────────────────
function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) =>
        e.isIntersecting &&
        el
          .querySelectorAll(".section-reveal")
          .forEach((r) => r.classList.add("visible")),
      { threshold: 0.12 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-8 px-6 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <div className="section-reveal">
          <SectionTitle
            hindi="About the Artist"
            english="The Artist"
            sub="A dedicated Kathak dancer shaped by distinguished gurus and institutions"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Portrait */}
          <div className="section-reveal relative">
            <div
              className="relative overflow-hidden"
              style={{ aspectRatio: "4/5" }}
            >
              {/* Palace-window frame decoration */}
              <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                  border: "2px solid rgba(201,168,76,0.4)",
                  outline: "8px solid rgba(201,168,76,0.08)",
                  outlineOffset: "-2px",
                }}
              />
              <img
                src={PHOTOS.about}
                alt="Sandip Sarkar — portrait"
                className="w-full h-full object-cover"
                style={{
                  objectPosition: "center 68%",
                  filter: "saturate(0.95) contrast(1.02)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(13,2,5,0.7) 0%, transparent 50%)",
                }}
              />
            </div>

            {/* Quote overlay */}
            <div
              className="absolute bottom-6 left-6 right-6"
              style={{ zIndex: 20 }}
            >
              <p
                className="font-garamond italic text-lg"
                style={{
                  color: "#FAF3E0",
                  textShadow: "0 2px 10px rgba(0,0,0,0.8)",
                }}
              >
                "Kathak is not movement — it is breath, devotion, and the
                silence between beats."
              </p>
            </div>

            {/* Corner ornaments */}
            {[
              ["top-2 left-2", ""],
              ["top-2 right-2", "scale-x-[-1]"],
              ["bottom-2 left-2", "scale-y-[-1]"],
              ["bottom-2 right-2", "scale-[-1]"],
            ].map(([pos, t], i) => (
              <div
                key={i}
                className={`absolute ${pos} z-20`}
                style={{ transform: t }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <path
                    d="M 0 24 L 0 0 L 24 0"
                    fill="none"
                    stroke="#C9A84C"
                    strokeWidth="2"
                  />
                  <circle cx="3" cy="3" r="2" fill="#C9A84C" />
                </svg>
              </div>
            ))}
          </div>

          {/* Biography */}
          <div className="section-reveal space-y-7">
            <div>
              <p
                className="font-yatra text-sm tracking-widest mb-3"
                style={{ color: "rgba(201,168,76,0.6)" }}
              >
                Biography
              </p>
              <p
                className="font-garamond text-lg leading-relaxed"
                style={{ color: "rgba(250,243,224,0.8)" }}
              >
                <strong style={{ color: "#C9A84C" }}>Sandip Sarkar</strong>{" "}
                is a young Kathak dancer from Balurghat. He began learning under
                Smt. Shatabdi Bhattacharjee and continued his journey in Kolkata
                under the guidance of Shri Subrata Pandit. He further developed
                his skills through workshops with Padma Vibhushan Pandit Birju
                Maharaj and Vidushi Saswati Sen.
              </p>
            </div>
            <div>
              <p
                className="font-garamond text-lg leading-relaxed"
                style={{ color: "rgba(250,243,224,0.8)" }}
              >
                He has performed in productions with Pandit Birju Maharaj, Shri
                Ashimbandhu Bhattacharya, Smt. Luna Podder, Smt. Paramita
                Maitra, Smt. Susmita Chatterjee, and his teacher. He holds a
                first-class Master's degree from Rabindra Bharati University
                under Prof. Smt. Amita Dutta and has performed at Vasant Utsav,
                Konark Festival, Shirpur Mahatsab, Sangai Festival, and Uday
                Shankar Dance Festival. He has also undertaken international
                tours under the guidance of the Indian Council for Cultural
                Relations (ICCR).
              </p>
            </div>

            {/* Awards timeline */}
            <div>
              <p
                className="font-yatra text-sm tracking-widest mb-5"
                style={{ color: "rgba(201,168,76,0.6)" }}
              >
                Achievements & Experience
              </p>
              <div className="space-y-4">
                {AWARDS.map((a, i) => (
                  <div key={i} className="flex gap-5 items-start">
                    <div
                      className="font-cinzel text-sm pt-0.5 shrink-0"
                      style={{
                        color: "#C9A84C",
                        width: "clamp(6.5rem, 28%, 9rem)",
                        flexShrink: 0,
                      }}
                    >
                      {a.year}
                    </div>
                    <div
                      style={{
                        width: 1,
                        background:
                          "linear-gradient(to bottom, #C9A84C, rgba(201,168,76,0.1))",
                        alignSelf: "stretch",
                        minHeight: "40px",
                      }}
                    />
                    <div>
                      <p
                        className="font-lato font-bold text-sm"
                        style={{ color: "#FAF3E0" }}
                      >
                        {a.title}
                      </p>
                      <p
                        className="font-lato text-xs mt-0.5"
                        style={{ color: "rgba(176,144,112,0.8)" }}
                      >
                        {a.org}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── PERFORMANCES SECTION ─────────────────────────────────────────────────────
function PerformancesSection() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedPerformance, setSelectedPerformance] = useState<
    (typeof PERFORMANCES)[number] | null
  >(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const filters = [
    "All",
    "Stage Performance",
    "Classical Production",
    "Festival",
    "Workshop",
    "Collaboration",
  ];
  const filtered =
    activeFilter === "All"
      ? PERFORMANCES
      : PERFORMANCES.filter((p) => p.category === activeFilter);

  return (
    <section id="performances" className="py-8 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          hindi="Performances & Works"
          english="Works & Performances"
          sub="A decade of stages, stories, and sacred movement"
        />

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className="font-lato text-xs tracking-widest uppercase px-5 py-2"
              style={{
                border: `1px solid ${activeFilter === f ? "#C9A84C" : "rgba(201,168,76,0.25)"}`,
                color: activeFilter === f ? "#0D0205" : "rgba(201,168,76,0.6)",
                background: activeFilter === f ? "#C9A84C" : "transparent",
                transition: "all 0.25s",
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <motion.div
              key={p.title}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="perf-card relative overflow-hidden cursor-pointer group"
              style={{ aspectRatio: "4/3", background: "#1A0508" }}
              onClick={() => {
                setSelectedPerformance(p);
                setSelectedImage(0);
              }}
            >
              <img
                src={p.image}
                alt={p.title}
                className={`w-full h-full object-cover ${
                  p.title === "Shiva Tandav" ? "shiva-performance-image" : ""
                }`}
                style={{
                  background: "#0D0205",
                  objectPosition: "center top",
                }}
              />
              <div
                className="perf-overlay absolute inset-0 flex flex-col justify-end p-6"
                style={{
                  background:
                    "linear-gradient(to top, rgba(13,2,5,0.95) 0%, rgba(13,2,5,0.5) 60%, transparent 100%)",
                  opacity: 0.85,
                  transition: "opacity 0.4s",
                }}
              >
                <span
                  className="font-lato text-xs tracking-widest uppercase mb-2"
                  style={{ color: "#C9A84C" }}
                >
                  {p.category}
                </span>
                <h3
                  className="font-cinzel font-bold text-xl mb-2"
                  style={{ color: "#FAF3E0" }}
                >
                  {p.title}
                </h3>
                <p
                  className="font-garamond text-sm leading-relaxed"
                  style={{ color: "rgba(250,243,224,0.7)" }}
                >
                  {p.desc}
                </p>
              </div>

              {/* Hover border glow */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  border: "1px solid rgba(201,168,76,0)",
                  transition: "border-color 0.3s",
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedPerformance && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            style={{ background: "rgba(13,2,5,0.96)" }}
            onClick={() => setSelectedPerformance(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              className="relative w-full max-w-5xl max-h-[92vh] overflow-auto p-5 md:p-8"
              style={{
                background: "rgba(26,5,8,0.98)",
                border: "1px solid rgba(201,168,76,0.35)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                aria-label="Close performance images"
                className="absolute top-4 right-4 z-10"
                style={{ color: "#C9A84C" }}
                onClick={() => setSelectedPerformance(null)}
              >
                <X size={28} />
              </button>

              <div className="pr-10 mb-5">
                <p
                  className="font-lato text-xs tracking-widest uppercase mb-2"
                  style={{ color: "#C9A84C" }}
                >
                  {selectedPerformance.category}
                </p>
                <h3
                  className="font-cinzel font-bold text-2xl md:text-3xl"
                  style={{ color: "#FAF3E0" }}
                >
                  {selectedPerformance.title}
                </h3>
                <p
                  className="font-garamond text-base mt-2"
                  style={{ color: "rgba(250,243,224,0.7)" }}
                >
                  {selectedPerformance.desc}
                </p>
              </div>

              <div
                className="overflow-hidden mb-4"
                style={{
                  aspectRatio: "16/9",
                  background: "#0D0205",
                  border: "1px solid rgba(201,168,76,0.2)",
                }}
              >
                <motion.img
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  src={selectedPerformance.images[selectedImage]}
                  alt={`${selectedPerformance.title} image ${selectedImage + 1}`}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                {selectedPerformance.images.map((image, imageIndex) => (
                  <button
                    type="button"
                    key={image}
                    aria-label={`View image ${imageIndex + 1}`}
                    className="overflow-hidden"
                    style={{
                      aspectRatio: "4/3",
                      border: `1px solid ${
                        selectedImage === imageIndex
                          ? "#C9A84C"
                          : "rgba(201,168,76,0.2)"
                      }`,
                    }}
                    onClick={() => setSelectedImage(imageIndex)}
                  >
                    <img
                      src={image}
                      alt=""
                      className="w-full h-full object-contain"
                      style={{ background: "#0D0205" }}
                    />
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ─── FEATURED VIDEO ───────────────────────────────────────────────────────────
function FeaturedVideoSection() {
  return (
    <section className="py-8 px-6 relative overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(201,168,76,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-5xl mx-auto">
        <SectionTitle
          hindi="Featured Performances"
          english="Featured Performance"
          sub="Shiva Tandav — Jai Ho Classical Arts Festival 2023"
        />

        {/* Palace window frame */}
        <div className="relative">
          {/* Top arch decoration */}
          <div className="relative mx-auto mb-0" style={{ maxWidth: 800 }}>
            <svg
              width="100%"
              height="60"
              viewBox="0 0 800 60"
              preserveAspectRatio="none"
            >
              <path
                d="M 0 60 L 0 30 Q 400 -20 800 30 L 800 60Z"
                fill="rgba(201,168,76,0.08)"
                stroke="rgba(201,168,76,0.4)"
                strokeWidth="1.5"
              />
              {/* Arch rosette */}
              {[200, 400, 600].map((x) => (
                <circle
                  key={x}
                  cx={x}
                  cy={15}
                  r="5"
                  fill="#C9A84C"
                  opacity="0.5"
                />
              ))}
            </svg>
          </div>

          {/* Video embed area */}
          <div
            className="relative mx-auto overflow-hidden"
            style={{
              maxWidth: 800,
              aspectRatio: "16/9",
              border: "2px solid rgba(201,168,76,0.35)",
              boxShadow:
                "0 0 80px rgba(201,168,76,0.12), inset 0 0 60px rgba(13,2,5,0.5)",
            }}
          >
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Featured Kathak Performance — Shiva Tandav"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
              style={{ border: "none" }}
            />
          </div>

          {/* Bottom arch decoration */}
          <div className="relative mx-auto mt-0" style={{ maxWidth: 800 }}>
            <svg
              width="100%"
              height="60"
              viewBox="0 0 800 60"
              preserveAspectRatio="none"
            >
              <path
                d="M 0 0 L 0 30 Q 400 80 800 30 L 800 0Z"
                fill="rgba(201,168,76,0.08)"
                stroke="rgba(201,168,76,0.4)"
                strokeWidth="1.5"
              />
            </svg>
          </div>

          {/* Corner ornaments */}
          {[
            "top-[60px] left-0",
            "top-[60px] right-0",
            "bottom-[60px] left-0",
            "bottom-[60px] right-0",
          ].map((pos, i) => (
            <div
              key={i}
              className={`absolute ${pos}`}
              style={{
                transform: ["", "scaleX(-1)", "scaleY(-1)", "scale(-1, -1)"][i],
              }}
            >
              <svg width="36" height="36" viewBox="0 0 36 36">
                <path
                  d="M 0 36 L 0 0 L 36 0"
                  fill="none"
                  stroke="rgba(201,168,76,0.5)"
                  strokeWidth="1.5"
                />
                <circle cx="5" cy="5" r="2.5" fill="#C9A84C" opacity="0.6" />
              </svg>
            </div>
          ))}
        </div>

        <p
          className="text-center font-garamond italic text-base mt-8"
          style={{ color: "rgba(250,243,224,0.45)" }}
        >
          "The body becomes a temple when Kathak is danced with devotion."
        </p>
      </div>
    </section>
  );
}

// ─── CLASSES SECTION ──────────────────────────────────────────────────────────
function ClassesSection() {
  return (
    <section id="classes" className="py-8 px-6 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(61,10,15,0.5) 0%, transparent 70%)",
        }}
      />
      <div className="max-w-6xl mx-auto relative">
        <SectionTitle
          hindi="Dance Classes"
          english="Classes & Workshops"
          sub="Wednesday batches are offline; all other timings are online"
        />

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {CLASSES.map((c, i) => (
            <motion.div
              key={c.level}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="class-card p-8"
            >
              {/* Level indicator */}
              <div
                className="inline-block px-4 py-1 mb-5 font-lato text-xs tracking-widest uppercase"
                style={{ border: `1px solid ${c.color}`, color: c.color }}
              >
                {c.level}
              </div>
              <h3
                className="font-yatra text-3xl mb-1"
                style={{ color: c.color }}
              >
                {c.hindi}
              </h3>
              <p
                className="font-garamond text-base leading-relaxed mb-6"
                style={{ color: "rgba(250,243,224,0.7)" }}
              >
                {c.desc}
              </p>

              <div
                className="space-y-3 text-sm font-lato"
                style={{ color: "rgba(250,243,224,0.6)" }}
              >
                {c.schedules.map((schedule) => (
                  <div key={schedule} className="flex items-start gap-2">
                    <div
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: c.color,
                        marginTop: 6,
                        flexShrink: 0,
                      }}
                    />
                    <span>{schedule}</span>
                  </div>
                ))}
                <div className="flex items-center gap-2">
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: c.color,
                    }}
                  />
                  <span>Duration: {c.duration}</span>
                </div>
              </div>

              <div
                className="mt-8 pt-6 flex items-center justify-between"
                style={{ borderTop: "1px solid rgba(201,168,76,0.15)" }}
              >
                <span
                  className="font-cinzel font-bold text-xl"
                  style={{ color: c.color }}
                >
                  {c.fee}
                </span>
                <a
                  href="#registration"
                  className="font-lato text-xs tracking-widest uppercase px-4 py-2"
                  style={{
                    border: `1px solid ${c.color}`,
                    color: c.color,
                    transition: "background 0.25s, color 0.25s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = c.color;
                    (e.currentTarget as HTMLElement).style.color = "#0D0205";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "transparent";
                    (e.currentTarget as HTMLElement).style.color = c.color;
                  }}
                >
                  Enroll
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Timetable */}
        <div
          className="p-8 md:p-12"
          style={{
            border: "1px solid rgba(201,168,76,0.2)",
            background: "rgba(26,5,8,0.6)",
          }}
        >
          <h3
            className="font-lato font-bold text-xl tracking-widest uppercase mb-8 text-center"
            style={{ color: "#C9A84C" }}
          >
            Weekly Schedule
          </h3>
          <p
            className="font-garamond italic text-center mb-6"
            style={{ color: "rgba(250,243,224,0.65)" }}
          >
            Wednesday batches are offline. All other class timings are online.
          </p>
          <div className="overflow-x-auto">
            <table
              className="w-full font-lato text-sm"
              style={{ borderCollapse: "collapse" }}
            >
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(201,168,76,0.25)" }}>
                  {["Time", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                    (d) => (
                      <th
                        key={d}
                        className="py-3 px-4 text-left"
                        style={{
                          color: "#C9A84C",
                          fontWeight: 700,
                          letterSpacing: "0.1em",
                        }}
                      >
                        {d}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    time: "5:00 PM",
                    cells: ["-", "-", "Senior · Offline", "-", "-", "-", "-"],
                  },
                  {
                    time: "6:00 PM",
                    cells: ["-", "-", "Junior · Offline", "-", "-", "-", "-"],
                  },
                  {
                    time: "7:00 PM",
                    cells: [
                      "-",
                      "-",
                      "Intermediate · Offline",
                      "-",
                      "-",
                      "-",
                      "-",
                    ],
                  },
                  {
                    time: "8:00 PM",
                    cells: [
                      "-",
                      "-",
                      "-",
                      "Junior · Online",
                      "-",
                      "Senior · Online",
                      "Intermediate · Online",
                    ],
                  },
                ].map((row, ri) => (
                  <tr
                    key={ri}
                    style={{ borderBottom: "1px solid rgba(201,168,76,0.1)" }}
                  >
                    <td
                      className="py-3 px-4 font-bold"
                      style={{ color: "rgba(201,168,76,0.7)" }}
                    >
                      {row.time}
                    </td>
                    {row.cells.map((c, ci) => (
                      <td
                        key={ci}
                        className="py-3 px-4"
                        style={{
                          color:
                            c === "-" ? "rgba(250,243,224,0.2)" : "#FAF3E0",
                          fontWeight: c !== "-" ? 600 : 400,
                        }}
                      >
                        {c}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── REGISTRATION SECTION ─────────────────────────────────────────────────────
function RegistrationSection() {
  const [form, setForm] = useState({
    name: "",
    age: "",
    email: "",
    phone: "",
    experience: "",
    batch: "",
    mode: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
      ...(e.target.name === "mode" ? { batch: "" } : {}),
    }));
  };

  const checkEmailExists = (email: string) =>
    new Promise<boolean>((resolve, reject) => {
      const callbackName = `registrationCheck_${Date.now()}`;
      const script = document.createElement("script");
      const timeout = window.setTimeout(() => {
        cleanup();
        reject(new Error("Email check timed out"));
      }, 10000);
      const cleanup = () => {
        window.clearTimeout(timeout);
        delete window[callbackName as keyof Window];
        script.remove();
      };

      window[callbackName as keyof Window] = ((result: {
        exists?: boolean;
      }) => {
        cleanup();
        resolve(Boolean(result.exists));
      }) as never;
      script.onerror = () => {
        cleanup();
        reject(new Error("Email check failed"));
      };
      script.src = `${GOOGLE_SHEETS_WEBHOOK_URL}?action=checkEmail&email=${encodeURIComponent(email)}&callback=${callbackName}`;
      document.body.appendChild(script);
    });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    if (!GOOGLE_SHEETS_WEBHOOK_URL) {
      setSubmitError(
        "Registration is not connected yet. Please configure the Google Sheets webhook.",
      );
      return;
    }

    setSubmitting(true);
    try {
      try {
        if (await checkEmailExists(form.email.trim())) {
          setSubmitError(
            "This email is already registered. Please use a different email address.",
          );
          return;
        }
      } catch (emailCheckError) {
        console.warn(
          "Duplicate email check unavailable; continuing with server submission:",
          emailCheckError,
        );
      }

      const response = await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        mode: "no-cors",
        body: JSON.stringify({
          ...form,
          submittedAt: new Date().toISOString(),
        }),
      });

      if (response.type !== "opaque" && !response.ok) {
        throw new Error(`Google Sheets returned ${response.status}`);
      }

      setSubmitted(true);
    } catch (error) {
      console.error("Registration submission failed:", error);
      setSubmitError(
        "We could not save your registration. Please try again or contact us directly.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 16px",
    background: "rgba(201,168,76,0.06)",
    border: "1px solid rgba(201,168,76,0.25)",
    color: "#FAF3E0",
    fontFamily: "'Lato', sans-serif",
    fontSize: "0.95rem",
    outline: "none",
    transition: "border-color 0.3s, background 0.3s",
  };

  return (
    <section id="registration" className="py-8 px-6 relative overflow-hidden">
      {/* Texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, rgba(201,168,76,0.04) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(10,95,115,0.04) 0%, transparent 50%)",
        }}
      />

      <div className="max-w-3xl mx-auto relative">
        <SectionTitle
          hindi="Class Registration"
          english="Register for Classes"
          sub="Begin your journey into the sacred art of Kathak"
        />

        {!submitted ? (
          <div
            className="p-8 md:p-12 relative"
            style={{
              border: "1px solid rgba(201,168,76,0.3)",
              background: "rgba(26,5,8,0.8)",
            }}
          >
            {/* Corner decorations */}
            {[
              "top-0 left-0",
              "top-0 right-0 scale-x-[-1]",
              "bottom-0 left-0 scale-y-[-1]",
              "bottom-0 right-0 scale-[-1]",
            ].map((pos, i) => (
              <div key={i} className={`absolute ${pos}`}>
                <svg width="30" height="30" viewBox="0 0 30 30">
                  <path
                    d="M 0 30 L 0 5 Q 0 0 5 0 L 30 0"
                    fill="none"
                    stroke="#C9A84C"
                    strokeWidth="1.5"
                    opacity="0.6"
                  />
                </svg>
              </div>
            ))}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label
                    className="block font-lato text-xs tracking-widest uppercase mb-2"
                    style={{ color: "rgba(201,168,76,0.7)" }}
                  >
                    Full Name *
                  </label>
                  <input
                    required
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    style={inputStyle}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#C9A84C";
                      e.target.style.background = "rgba(201,168,76,0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(201,168,76,0.25)";
                      e.target.style.background = "rgba(201,168,76,0.06)";
                    }}
                  />
                </div>
                <div>
                  <label
                    className="block font-lato text-xs tracking-widest uppercase mb-2"
                    style={{ color: "rgba(201,168,76,0.7)" }}
                  >
                    Age *
                  </label>
                  <input
                    required
                    name="age"
                    type="number"
                    min="5"
                    max="80"
                    value={form.age}
                    onChange={handleChange}
                    placeholder="Minimum age: 5 years"
                    style={inputStyle}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#C9A84C";
                      e.target.style.background = "rgba(201,168,76,0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(201,168,76,0.25)";
                      e.target.style.background = "rgba(201,168,76,0.06)";
                    }}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label
                    className="block font-lato text-xs tracking-widest uppercase mb-2"
                    style={{ color: "rgba(201,168,76,0.7)" }}
                  >
                    Email Address *
                  </label>
                  <input
                    required
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    style={inputStyle}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#C9A84C";
                      e.target.style.background = "rgba(201,168,76,0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(201,168,76,0.25)";
                      e.target.style.background = "rgba(201,168,76,0.06)";
                    }}
                  />
                </div>
                <div>
                  <label
                    className="block font-lato text-xs tracking-widest uppercase mb-2"
                    style={{ color: "rgba(201,168,76,0.7)" }}
                  >
                    Phone Number *
                  </label>
                  <input
                    required
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 91631 31879"
                    style={inputStyle}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#C9A84C";
                      e.target.style.background = "rgba(201,168,76,0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(201,168,76,0.25)";
                      e.target.style.background = "rgba(201,168,76,0.06)";
                    }}
                  />
                </div>
              </div>

              <div>
                <label
                  className="block font-lato text-xs tracking-widest uppercase mb-2"
                  style={{ color: "rgba(201,168,76,0.7)" }}
                >
                  Dance Experience
                </label>
                <select
                  name="experience"
                  value={form.experience}
                  onChange={handleChange}
                  style={{ ...inputStyle, cursor: "pointer" }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#C9A84C";
                    e.target.style.background = "rgba(201,168,76,0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(201,168,76,0.25)";
                    e.target.style.background = "rgba(201,168,76,0.06)";
                  }}
                >
                  <option value="" style={{ background: "#1A0508" }}>
                    Select your experience level
                  </option>
                  <option value="none" style={{ background: "#1A0508" }}>
                    No prior experience
                  </option>
                  <option value="beginner" style={{ background: "#1A0508" }}>
                    1–2 years
                  </option>
                  <option
                    value="intermediate"
                    style={{ background: "#1A0508" }}
                  >
                    3–5 years
                  </option>
                  <option value="advanced" style={{ background: "#1A0508" }}>
                    5+ years
                  </option>
                </select>
              </div>

              <div>
                <label
                  className="block font-lato text-xs tracking-widest uppercase mb-2"
                  style={{ color: "rgba(201,168,76,0.7)" }}
                >
                  Class Format *
                </label>
                <select
                  required
                  name="mode"
                  value={form.mode}
                  onChange={handleChange}
                  style={{ ...inputStyle, cursor: "pointer" }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#C9A84C";
                    e.target.style.background = "rgba(201,168,76,0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(201,168,76,0.25)";
                    e.target.style.background = "rgba(201,168,76,0.06)";
                  }}
                >
                  <option value="" style={{ background: "#1A0508" }}>
                    Select class format
                  </option>
                  <option value="online" style={{ background: "#1A0508" }}>
                    Online — all other timings
                  </option>
                  <option value="offline" style={{ background: "#1A0508" }}>
                    Offline — Wednesday batches
                  </option>
                </select>
              </div>

              <div>
                <label
                  className="block font-lato text-xs tracking-widest uppercase mb-2"
                  style={{ color: "rgba(201,168,76,0.7)" }}
                >
                  Preferred Batch *
                </label>
                <select
                  required
                  disabled={!form.mode}
                  name="batch"
                  value={form.batch}
                  onChange={handleChange}
                  style={{
                    ...inputStyle,
                    cursor: form.mode ? "pointer" : "not-allowed",
                    opacity: form.mode ? 1 : 0.55,
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#C9A84C";
                    e.target.style.background = "rgba(201,168,76,0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(201,168,76,0.25)";
                    e.target.style.background = "rgba(201,168,76,0.06)";
                  }}
                >
                  <option value="" style={{ background: "#1A0508" }}>
                    {form.mode
                      ? "Select preferred batch"
                      : "Select class format first"}
                  </option>
                  {form.mode === "offline" && (
                    <>
                      <option value="junior-offline" style={{ background: "#1A0508" }}>
                        Junior — Wednesday 6:00–7:00 PM · Offline
                      </option>
                      <option value="intermediate-offline" style={{ background: "#1A0508" }}>
                        Intermediate — Wednesday 7:00–8:00 PM · Offline
                      </option>
                      <option value="senior-offline" style={{ background: "#1A0508" }}>
                        Senior — Wednesday 5:00–6:00 PM · Offline
                      </option>
                    </>
                  )}
                  {form.mode === "online" && (
                    <>
                      <option value="junior-online" style={{ background: "#1A0508" }}>
                        Junior — Thursday 8:00–9:00 PM · Online
                      </option>
                      <option value="intermediate-online" style={{ background: "#1A0508" }}>
                        Intermediate — Sunday 8:00–9:00 PM · Online
                      </option>
                      <option value="senior-online" style={{ background: "#1A0508" }}>
                        Senior — Saturday 8:00–9:00 PM · Online
                      </option>
                    </>
                  )}
                </select>
              </div>

              <div className="pt-4 text-center">
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-3 px-12 py-4 font-lato font-bold text-sm tracking-widest uppercase"
                  style={{
                    background: "linear-gradient(135deg, #C9A84C, #8B6914)",
                    color: "#0D0205",
                    opacity: submitting ? 0.65 : 1,
                    boxShadow: "0 8px 30px rgba(201,168,76,0.35)",
                    transition: "transform 0.2s, box-shadow 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform =
                      "translateY(-2px)";
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "0 14px 40px rgba(201,168,76,0.5)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform =
                      "translateY(0)";
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "0 8px 30px rgba(201,168,76,0.35)";
                  }}
                >
                  {submitting ? "Saving..." : "Register Now"}{" "}
                  <ArrowRight size={16} />
                </button>
              </div>
              {submitError && (
                <p
                  role="alert"
                  className="text-center font-lato text-sm"
                  style={{ color: "#F4841F" }}
                >
                  {submitError}
                </p>
              )}
            </form>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-12 text-center"
            style={{
              border: "1px solid rgba(201,168,76,0.3)",
              background: "rgba(26,5,8,0.8)",
            }}
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{
                background: "rgba(201,168,76,0.15)",
                border: "1.5px solid #C9A84C",
              }}
            >
              <Star size={24} style={{ color: "#C9A84C" }} />
            </div>
            <h3
              className="font-cinzel font-bold text-2xl mb-4"
              style={{ color: "#C9A84C" }}
            >
              Thank You
            </h3>
            <p
              className="font-garamond text-lg"
              style={{ color: "rgba(250,243,224,0.7)" }}
            >
              Your registration has been received. Sandip Sarkar's team will
              contact you within 48 hours to confirm your enrollment.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────
function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  return (
    <section className="py-8 px-6 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(61,10,15,0.4) 0%, transparent 70%)",
        }}
      />
      <div className="max-w-4xl mx-auto relative">
        <SectionTitle
          hindi="Reviews"
          english="Testimonials"
          sub="Words from students, audiences, and fellow artists"
        />

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.45 }}
              className="p-8 md:p-12 text-center"
              style={{
                border: "1px solid rgba(201,168,76,0.2)",
                background: "rgba(26,5,8,0.7)",
              }}
            >
              {/* Gold quote mark */}
              <div className="mb-6">
                <svg
                  width="48"
                  height="36"
                  viewBox="0 0 48 36"
                  className="mx-auto"
                >
                  <path
                    d="M 0 36 L 0 18 C 0 8 4 3 12 0 L 16 6 C 10 8 8 12 8 18 L 16 18 L 16 36Z M 26 36 L 26 18 C 26 8 30 3 38 0 L 42 6 C 36 8 34 12 34 18 L 42 18 L 42 36Z"
                    fill="rgba(201,168,76,0.4)"
                  />
                </svg>
              </div>

              <p
                className="font-garamond text-xl md:text-2xl italic leading-relaxed mb-8"
                style={{ color: "rgba(250,243,224,0.85)" }}
              >
                {TESTIMONIALS[current].text}
              </p>

              <div>
                <p
                  className="font-cinzel font-bold text-base"
                  style={{ color: "#C9A84C" }}
                >
                  {TESTIMONIALS[current].name}
                </p>
                <p
                  className="font-lato text-xs tracking-widest uppercase mt-1"
                  style={{ color: "rgba(176,144,112,0.7)" }}
                >
                  {TESTIMONIALS[current].role} · {TESTIMONIALS[current].city}
                </p>
              </div>

              {/* Stars */}
              <div className="flex justify-center gap-1 mt-5">
                {Array(5)
                  .fill(0)
                  .map((_, si) => (
                    <Star
                      key={si}
                      size={14}
                      style={{ color: "#C9A84C", fill: "#C9A84C" }}
                    />
                  ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={() =>
                setCurrent(
                  (v) => (v - 1 + TESTIMONIALS.length) % TESTIMONIALS.length,
                )
              }
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                border: "1.5px solid rgba(201,168,76,0.35)",
                color: "#C9A84C",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "border-color 0.2s, background 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "rgba(201,168,76,0.12)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "transparent";
              }}
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  style={{
                    width: i === current ? 24 : 8,
                    height: 8,
                    borderRadius: 4,
                    background:
                      i === current ? "#C9A84C" : "rgba(201,168,76,0.3)",
                    transition: "all 0.3s",
                  }}
                />
              ))}
            </div>

            <button
              onClick={() => setCurrent((v) => (v + 1) % TESTIMONIALS.length)}
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                border: "1.5px solid rgba(201,168,76,0.35)",
                color: "#C9A84C",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "border-color 0.2s, background 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "rgba(201,168,76,0.12)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background =
                  "transparent";
              }}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SOCIAL SECTION ───────────────────────────────────────────────────────────
function SocialSection() {
  const socials = [
    {
      Icon: Instagram,
      label: "Instagram",
      handle: "@sandipsarkarkathak",
      url: "https://instagram.com",
      color: "#E1306C",
      sub: "Behind the scenes · Reels · Stories",
    },
    {
      Icon: Facebook,
      label: "Facebook",
      handle: "Sandip Sarkar Kathak",
      url: "https://facebook.com",
      color: "#1877F2",
      sub: "Events · Updates · Community",
    },
    {
      Icon: Youtube,
      label: "YouTube",
      handle: "Sandip Sarkar Official",
      url: "https://youtube.com",
      color: "#FF0000",
      sub: "Full performances · Tutorials",
    },
  ];

  return (
    <section className="py-8 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionTitle
          hindi="Social Media"
          english="Follow the Journey"
          sub="Connect, engage, and witness the art come alive"
        />

        <div className="grid md:grid-cols-3 gap-6">
          {socials.map(({ Icon, label, handle, url, color, sub }) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center p-8 text-center"
              style={{
                border: "1px solid rgba(201,168,76,0.2)",
                background: "rgba(26,5,8,0.6)",
                transition:
                  "transform 0.3s, box-shadow 0.3s, border-color 0.3s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform =
                  "translateY(-6px)";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  `0 20px 50px ${color}22`;
                (e.currentTarget as HTMLElement).style.borderColor =
                  `${color}66`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform =
                  "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
                (e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(201,168,76,0.2)";
              }}
            >
              {/* Lotus petal ring around icon */}
              <div className="relative mb-5">
                <svg
                  width="90"
                  height="90"
                  viewBox="0 0 90 90"
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20"
                >
                  {Array.from({ length: 8 }, (_, i) => {
                    const a = (i / 8) * Math.PI * 2;
                    return (
                      <ellipse
                        key={i}
                        cx={45 + 38 * Math.cos(a)}
                        cy={45 + 38 * Math.sin(a)}
                        rx="14"
                        ry="5"
                        fill={color}
                        transform={`rotate(${(a * 180) / Math.PI + 90}, ${45 + 38 * Math.cos(a)}, ${45 + 38 * Math.sin(a)})`}
                      />
                    );
                  })}
                </svg>
                <div
                  className="social-btn relative"
                  style={{
                    color,
                    borderColor: `${color}44`,
                    background: `${color}0F`,
                  }}
                >
                  <Icon size={28} />
                </div>
              </div>

              <p
                className="font-cinzel font-bold text-base mb-1"
                style={{ color: "#FAF3E0" }}
              >
                {label}
              </p>
              <p
                className="font-lato text-xs tracking-widest mb-3"
                style={{ color: color, opacity: 0.8 }}
              >
                {handle}
              </p>
              <p
                className="font-garamond italic text-sm"
                style={{ color: "rgba(250,243,224,0.45)" }}
              >
                {sub}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT SECTION ──────────────────────────────────────────────────────────
function ContactSection() {
  const [msg, setMsg] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 16px",
    background: "rgba(201,168,76,0.06)",
    border: "1px solid rgba(201,168,76,0.22)",
    color: "#FAF3E0",
    fontFamily: "'Lato', sans-serif",
    fontSize: "0.95rem",
    outline: "none",
    resize: "none" as const,
    transition: "border-color 0.3s, background 0.3s",
  };

  return (
    <section id="contact" className="py-8 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionTitle
          hindi="Contact"
          english="Contact"
          sub="For performances, collaborations, and inquiries"
        />

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact details */}
          <div className="space-y-8">
            <div>
              <p
                className="font-yatra text-sm tracking-widest mb-5"
                style={{ color: "rgba(201,168,76,0.6)" }}
              >
                Contact Details
              </p>

              {[
                {
                  Icon: Mail,
                  label: "Email",
                  value: "sandip93sarkar@gmail.com",
                  href: "mailto:sandip93sarkar@gmail.com",
                },
                {
                  Icon: Phone,
                  label: "Phone",
                  value: "+91 91631 31879",
                  href: "tel:+919163131879",
                },
                {
                  Icon: MapPin,
                  label: "Studio",
                  value:
                    "25 A Sangeet Sarani\nFlat No. 5, 2nd Floor\nKolkata 700029, West Bengal, India",
                  href: null,
                },
              ].map(({ Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4 mb-6">
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      flexShrink: 0,
                      border: "1px solid rgba(201,168,76,0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#C9A84C",
                    }}
                  >
                    <Icon size={18} />
                  </div>
                  <div>
                    <p
                      className="font-lato text-xs tracking-widest uppercase mb-1"
                      style={{ color: "rgba(201,168,76,0.6)" }}
                    >
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className="font-lato text-base"
                        style={{ color: "#FAF3E0", transition: "color 0.2s" }}
                        onMouseEnter={(e) =>
                          ((e.currentTarget as HTMLElement).style.color =
                            "#C9A84C")
                        }
                        onMouseLeave={(e) =>
                          ((e.currentTarget as HTMLElement).style.color =
                            "#FAF3E0")
                        }
                      >
                        {value}
                      </a>
                    ) : (
                      <p
                        className="font-lato text-base whitespace-pre-line"
                        style={{ color: "rgba(250,243,224,0.75)" }}
                      >
                        {value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <div
              className="relative overflow-hidden flex items-center justify-center"
              style={{
                height: 200,
                border: "1px solid rgba(201,168,76,0.25)",
                background: "rgba(26,5,8,0.8)",
              }}
            >
              <div className="text-center">
                <MapPin
                  size={32}
                  style={{
                    color: "rgba(201,168,76,0.4)",
                    margin: "0 auto 8px",
                  }}
                />
                <p
                  className="font-lato text-xs tracking-widest uppercase"
                  style={{ color: "rgba(201,168,76,0.4)" }}
                >
                  25 A Sangeet Sarani, Kolkata 700029
                </p>
                <p
                  className="font-garamond italic text-sm mt-1"
                  style={{ color: "rgba(250,243,224,0.3)" }}
                >
                  Map integration via Google Maps API
                </p>
              </div>
            </div>
          </div>

          {/* Inquiry form */}
          <div>
            <p
              className="font-yatra text-sm tracking-widest mb-5"
              style={{ color: "rgba(201,168,76,0.6)" }}
            >
              Send Message
            </p>

            {!sent ? (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setSendError("");
                  setSending(true);
                  try {
                    if (!GOOGLE_SHEETS_WEBHOOK_URL) {
                      throw new Error("Google Sheets webhook is not configured");
                    }
                    await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
                      method: "POST",
                      mode: "no-cors",
                      headers: { "Content-Type": "text/plain;charset=utf-8" },
                      body: JSON.stringify({
                        action: "message",
                        ...msg,
                        submittedAt: new Date().toISOString(),
                      }),
                    });
                    setSent(true);
                  } catch (error) {
                    console.error("Contact message submission failed:", error);
                    setSendError(
                      "We could not save your message. Please try again or contact us directly.",
                    );
                  } finally {
                    setSending(false);
                  }
                }}
                className="space-y-4"
              >
                <input
                  required
                  placeholder="Your name"
                  value={msg.name}
                  onChange={(e) =>
                    setMsg((p) => ({ ...p, name: e.target.value }))
                  }
                  style={inputStyle}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#C9A84C";
                    e.target.style.background = "rgba(201,168,76,0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(201,168,76,0.22)";
                    e.target.style.background = "rgba(201,168,76,0.06)";
                  }}
                />
                <input
                  required
                  type="email"
                  placeholder="Email address"
                  value={msg.email}
                  onChange={(e) =>
                    setMsg((p) => ({ ...p, email: e.target.value }))
                  }
                  style={inputStyle}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#C9A84C";
                    e.target.style.background = "rgba(201,168,76,0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(201,168,76,0.22)";
                    e.target.style.background = "rgba(201,168,76,0.06)";
                  }}
                />
                <textarea
                  required
                  rows={5}
                  placeholder="Your message — for performances, collaborations, or any inquiry..."
                  value={msg.message}
                  onChange={(e) =>
                    setMsg((p) => ({ ...p, message: e.target.value }))
                  }
                  style={inputStyle}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#C9A84C";
                    e.target.style.background = "rgba(201,168,76,0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(201,168,76,0.22)";
                    e.target.style.background = "rgba(201,168,76,0.06)";
                  }}
                />
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full py-4 font-lato font-bold text-sm tracking-widest uppercase"
                  style={{
                    background: "linear-gradient(135deg, #C9A84C, #8B6914)",
                    color: "#0D0205",
                    opacity: sending ? 0.65 : 1,
                    transition: "opacity 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.opacity = "0.88")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.opacity = "1")
                  }
                >
                  {sending ? "Saving..." : "Send Message"}
                </button>
                {sendError && (
                  <p
                    role="alert"
                    className="font-lato text-sm text-center"
                    style={{ color: "#F4841F" }}
                  >
                    {sendError}
                  </p>
                )}
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-8 text-center"
                style={{
                  border: "1px solid rgba(201,168,76,0.3)",
                  background: "rgba(26,5,8,0.8)",
                }}
              >
                <p
                  className="font-cinzel text-lg font-bold mb-3"
                  style={{ color: "#C9A84C" }}
                >
                  Message Sent
                </p>
                <p
                  className="font-garamond italic"
                  style={{ color: "rgba(250,243,224,0.65)" }}
                >
                  We will respond within 1–2 business days.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer
      className="relative py-14 px-6 text-center overflow-hidden"
      style={{ borderTop: "1px solid rgba(201,168,76,0.18)" }}
    >
      <div className="relative">
        <p
          className="font-yatra text-sm tracking-[0.3em] mb-2"
          style={{ color: "rgba(201,168,76,0.5)" }}
        >
          Dance is Divine
        </p>
        <p
          className="font-cinzel font-bold text-2xl mb-1"
          style={{ color: "#C9A84C" }}
        >
          Sandip Sarkar
        </p>
        <p
          className="font-garamond italic text-base mb-8"
          style={{ color: "rgba(250,243,224,0.4)" }}
        >
          Kathak Performer · Choreographer · Guru
        </p>

        <div className="flex justify-center gap-6 mb-8">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="social-btn" style={{ width: 44, height: 44 }}>
              <Instagram size={18} />
            </div>
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="social-btn" style={{ width: 44, height: 44 }}>
              <Facebook size={18} />
            </div>
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="social-btn" style={{ width: 44, height: 44 }}>
              <Youtube size={18} />
            </div>
          </a>
        </div>

        <div
          className="flex flex-wrap justify-center gap-x-8 gap-y-2 font-lato text-xs tracking-widest uppercase mb-8"
          style={{ color: "#89CFF0" }}
        >
          {[
            "Home",
            "About",
            "Performances",
            "Classes",
            "Contact",
          ].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              style={{ transition: "color 0.2s", color: "#89CFF0" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "#C9A84C")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "#89CFF0")
              }
            >
              {l}
            </a>
          ))}
        </div>

        <p
          className="font-lato text-xs"
          style={{ color: "rgba(250,243,224,0.2)" }}
        >
          © 2026 Sandip Sarkar Kathak. All rights reserved. · Kolkata, West
          Bengal, India
        </p>
      </div>
    </footer>
  );
}

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [introDone, setIntroDone] = useState(false);
  const [showNav, setShowNav] = useState(false);

  const handleIntroComplete = useCallback(() => {
    setIntroDone(true);
    setTimeout(() => setShowNav(true), 600);
  }, []);

  return (
    <div
      className="text-foreground min-h-screen relative"
      style={{
        background: `
          radial-gradient(ellipse at 15% 10%, rgba(201,168,76,0.18) 0%, transparent 45%),
          radial-gradient(ellipse at 85% 85%, rgba(10,95,115,0.14) 0%, transparent 45%),
          radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.06) 0%, transparent 70%),
          #000000`,
        backgroundAttachment: "fixed",
      }}
    >
      <GlobalStyles />

      <AnimatePresence>
        {!introDone && <IntroVideo onComplete={handleIntroComplete} />}
      </AnimatePresence>

      <Navbar visible={showNav} />

      <motion.main
        initial={{ opacity: 0 }}
        animate={introDone ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.2 }}
      >
        <HeroSection />
        <OrnamentalDivider />
        <AboutSection />
        <OrnamentalDivider />
        <PerformancesSection />
        <OrnamentalDivider />
        <FeaturedVideoSection />
        <OrnamentalDivider />
        <ClassesSection />
        <OrnamentalDivider />
        <RegistrationSection />
        <OrnamentalDivider />
        <SocialSection />
        <OrnamentalDivider />
        <ContactSection />
        <Footer />
      </motion.main>
    </div>
  );
}
