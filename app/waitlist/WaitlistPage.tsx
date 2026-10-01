"use client";

import Image from "next/image";
import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  PanelsTopLeft,
  Square,
  Sprout,
  HelpCircle,
  Layers,
  Compass,
  UserX,
  GraduationCap,
  Sparkles,
  Rocket,
  Brain,
  ArrowRight,
} from "lucide-react";
import styles from "./waitlist.module.css";

import WaitlistModal from "./components/WaitlistModal";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const launchDate = new Date(2027, 0, 1, 0, 1, 0);

function getTimeLeft(): TimeLeft {
  const difference = Math.max(launchDate.getTime() - Date.now(), 0);

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

export default function WaitlistPage() {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInitialEmail, setModalInitialEmail] = useState("");

  useEffect(() => {
    setMounted(true);
    setTimeLeft(getTimeLeft());

    const timer = window.setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const countdown = useMemo(
    () => [
      { label: "Days", value: timeLeft.days },
      { label: "Hours", value: timeLeft.hours },
      { label: "Minutes", value: timeLeft.minutes },
      { label: "Seconds", value: timeLeft.seconds },
    ],
    [timeLeft]
  );

  function openWaitlistModal(prefilledEmail = "") {
    setModalInitialEmail(prefilledEmail);
    setIsModalOpen(true);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    openWaitlistModal(email);
  }

  function smoothScrollTo(targetId: string, duration = 850) {
    const target = document.getElementById(targetId);
    if (!target) return;

    const startPosition = window.pageYOffset;
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - 24;
    const distance = targetPosition - startPosition;
    let startTime: number | null = null;

    function animation(currentTime: number) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    }

    function easeInOutCubic(t: number, b: number, c: number, d: number) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t * t + b;
      t -= 2;
      return (c / 2) * (t * t * t + 2) + b;
    }

    requestAnimationFrame(animation);
  }

  function handleNavClick(event: React.MouseEvent<HTMLAnchorElement>, targetId: string) {
    event.preventDefault();
    smoothScrollTo(targetId);
    if (typeof window !== "undefined") {
      window.history.pushState(null, "", `#${targetId}`);
    }
  }

  function scrollToForm() {
    const el = document.getElementById("waitlist-email");
    if (el) {
      smoothScrollTo("top");
      setTimeout(() => {
        el.focus();
      }, 850);
    }
  }

  return (
    <main className={`${styles.page} waitlist-page-root`}>
      <div className={styles.backdrop} aria-hidden="true">
        <span className={styles.diagonalOne} />
        <span className={styles.diagonalTwo} />
        <span className={styles.glow} />
        <span className={styles.bottomBlur} />
      </div>

      <nav className={styles.navbar} aria-label="Waitlist navigation">
        <a
          className={styles.logoLink}
          href="#top"
          onClick={(e) => handleNavClick(e, "top")}
          aria-label="Upstartica home"
        >
          <Image
            src="/images/Upstartica - Horizontal Logo.png"
            alt="Upstartica"
            width={450}
            height={160}
            priority
            className={styles.logo}
          />
        </a>

        <div className={styles.navLinks}>
          <a href="#why" onClick={(e) => handleNavClick(e, "why")}>
            Why
          </a>
          <a href="#path" onClick={(e) => handleNavClick(e, "path")}>
            Clearer Path
          </a>
          <a href="#you" onClick={(e) => handleNavClick(e, "you")}>
            For you
          </a>
          <a href="#coming" onClick={(e) => handleNavClick(e, "coming")}>
            What&apos;s coming
          </a>
        </div>

        <button className={styles.navCta} onClick={() => openWaitlistModal(email)} type="button">
          Join Waitlist <ArrowRight size={16} strokeWidth={2.5} className={styles.btnArrow} />
        </button>
      </nav>

      <section id="top" className={styles.hero} aria-labelledby="waitlist-title">
        <p className={styles.eyebrow}>IDEAS TODAY. BIGGER TOMORROWS.</p>
        <h1 id="waitlist-title" className={styles.title}>
          We&apos;re here to take you from <span>zero to one.</span>
        </h1>
        <p className={styles.subtitle}>A more prepared you for a bigger tomorrow.</p>

        <form id="join" className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.srOnly} htmlFor="waitlist-email">
            Email address
          </label>
          <input
            id="waitlist-email"
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setMessage("");
            }}
            placeholder="Enter your email"
            required
          />
          <button type="submit">
            Join Waitlist <ArrowRight size={16} strokeWidth={2.5} className={styles.btnArrow} />
          </button>
        </form>
        <p className={styles.status} aria-live="polite">
          {message}
        </p>

        <div className={styles.launchLabel}>Launching in</div>
        <div className={styles.countdown} aria-label="Countdown to launch">
          {countdown.map((item) => (
            <div className={styles.timeCard} key={item.label}>
              <strong>
                {mounted
                  ? String(item.value).padStart(item.label === "Days" ? 1 : 2, "0")
                  : "00"}
              </strong>
              <span>{item.label}</span>
            </div>
          ))}
        </div>

        <div className={styles.featurePreview} aria-label="Upstartica benefits">
          <div>
            <Square size={18} strokeWidth={1.8} aria-hidden="true" />
            <span>Practical Perspectives</span>
          </div>
          <div>
            <Sprout size={18} strokeWidth={1.8} aria-hidden="true" />
            <span>Real-World Thinking</span>
          </div>
          <div>
            <PanelsTopLeft size={18} strokeWidth={1.8} aria-hidden="true" />
            <span>Actionable Clarity</span>
          </div>
        </div>
      </section>

      {/* SECTION: THE GAP IS REAL */}
      <section id="why" className={styles.gapSection}>
        <div className={styles.gapContainer}>
          <div className={styles.gapLeft}>
            <p className={styles.gapEyebrow}>THE GAP IS REAL</p>
            <h2 className={styles.gapTitle}>
              Big ambitions.<br />
              Many<br />
              <span>roadblocks.</span>
            </h2>
            <p className={styles.gapSubtitle}>
              You have the curiosity and drive, but the right guidance, structure and resources are often missing.
            </p>
          </div>

          <div className={styles.gapRight}>
            <div className={styles.gapCard}>
              <div className={styles.cardBadge}>
                <HelpCircle size={20} strokeWidth={2} aria-hidden="true" />
              </div>
              <h3>Too many questions</h3>
              <p>You know there&apos;s potential, but don&apos;t always know where to start.</p>
            </div>

            <div className={styles.gapCard}>
              <div className={styles.cardBadge}>
                <Layers size={20} strokeWidth={2} aria-hidden="true" />
              </div>
              <h3>It feels overwhelming</h3>
              <p>Information is everywhere, and it&apos;s hard to know what actually matters.</p>
            </div>

            <div className={styles.gapCard}>
              <div className={styles.cardBadge}>
                <Compass size={20} strokeWidth={2} aria-hidden="true" />
              </div>
              <h3>No clear direction</h3>
              <p>You&apos;re unsure which path is right and what steps to take next.</p>
            </div>

            <div className={styles.gapCard}>
              <div className={styles.cardBadge}>
                <UserX size={20} strokeWidth={2} aria-hidden="true" />
              </div>
              <h3>Lack of support</h3>
              <p>It can feel isolating when people around you don&apos;t fully understand.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: YOU JUST NEED A CLEARER PATH */}
      <section id="path" className={styles.pathSection}>
        <div className={styles.pathContainerCard}>
          <div className={styles.pathContent}>
            <p className={styles.pathEyebrow}>YOU DON&apos;T NEED TO KNOW EVERYTHING</p>
            <h2 className={styles.pathTitle}>
              You just need a <span>clearer path.</span>
            </h2>
            <p className={styles.pathSubtitle}>
              The right knowledge, perspective and tools can help you move forward with confidence, one step at a time.
            </p>
          </div>

          <div className={styles.pathImageWrapper}>
            <Image
              src="/images/path.png"
              alt="A clearer path illustration"
              width={600}
              height={400}
              className={styles.pathImage}
              priority
            />
          </div>
        </div>
      </section>

      {/* SECTION 4: FOR CURIOUS BUILDERS - THIS IS FOR YOU */}
      <section id="you" className={styles.forYouSection}>
        <div className={styles.forYouContainer}>
          <p className={styles.forYouEyebrow}>FOR CURIOUS BUILDERS</p>
          <h2 className={styles.forYouTitle}>
            This is <span>for you.</span>
          </h2>
          <p className={styles.forYouSubtitle}>
            Whether you have a rough idea, a hundred questions, or just a strong curiosity — you&apos;re in the right place.
          </p>

          <div className={styles.forYouGrid}>
            <div className={styles.forYouCard}>
              <div className={styles.forYouBadge}>
                <GraduationCap size={22} strokeWidth={2} aria-hidden="true" />
              </div>
              <h3>Students</h3>
              <p>Exploring ideas for the future.</p>
            </div>

            <div className={styles.forYouCard}>
              <div className={styles.forYouBadge}>
                <Sparkles size={22} strokeWidth={2} aria-hidden="true" />
              </div>
              <h3>Early Explorers</h3>
              <p>Curious about where to begin.</p>
            </div>

            <div className={styles.forYouCard}>
              <div className={styles.forYouBadge}>
                <Rocket size={22} strokeWidth={2} aria-hidden="true" />
              </div>
              <h3>Aspiring Founders</h3>
              <p>Thinking about building something.</p>
            </div>

            <div className={styles.forYouCard}>
              <div className={styles.forYouBadge}>
                <Brain size={22} strokeWidth={2} aria-hidden="true" />
              </div>
              <h3>Independent Thinkers</h3>
              <p>Wanting to understand more.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: WE'RE BUILDING SOMETHING BETTER */}
      <section id="coming" className={styles.buildingSection}>
        <div className={styles.buildingContainerCard}>
          <div className={styles.buildingContent}>
            <p className={styles.buildingEyebrow}>WHAT&apos;S COMING</p>
            <h2 className={styles.buildingTitle}>
              We&apos;re building<br />
              something <span>better.</span>
            </h2>
            <p className={styles.buildingSubtitle}>
              Something for people who are curious, ambitious and ready to take their first real step.
            </p>
            <button className={styles.buildingCtaBtn} onClick={() => openWaitlistModal(email)} type="button">
              Be the first to know <ArrowRight size={16} strokeWidth={2.5} className={styles.btnArrow} />
            </button>
          </div>

          <div className={styles.buildingImageWrapper}>
            <Image
              src="/images/17.png"
              alt="Upstartica platform preview"
              width={600}
              height={400}
              className={styles.buildingImage}
            />
          </div>
        </div>
      </section>

      {/* SECTION 6: QUOTE / TESTIMONIAL */}
      <section className={styles.quoteSection}>
        <div className={styles.quoteContainer}>
          <div className={styles.quoteIcon} aria-hidden="true">&rdquo;&rdquo;</div>
          <blockquote className={styles.quoteText}>
            I wish I had access to something like this when I was starting out.
          </blockquote>
          <p className={styles.quoteCaption}>
            A feeling shared by many people at the beginning of the journey.
          </p>
        </div>
      </section>

      {/* SECTION 7: FINAL CTA & FOOTER */}
      <section className={styles.finalSection}>
        <div className={styles.finalCard}>
          <div className={styles.finalContent}>
            <p className={styles.finalEyebrow}>BE PART OF WHAT&apos;S COMING</p>
            <h2 className={styles.finalTitle}>
              A brighter tomorrow is a <span>step away.</span>
            </h2>
            <p className={styles.finalSubtitle}>
              Join the waitlist and be the first to know what&apos;s coming.
            </p>

            <form className={styles.finalForm} onSubmit={handleSubmit}>
              <label className={styles.srOnly} htmlFor="waitlist-email-bottom">
                Email address
              </label>
              <input
                id="waitlist-email-bottom"
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setMessage("");
                }}
                placeholder="Enter your email"
                required
              />
              <button type="submit">
                Join Waitlist <ArrowRight size={16} strokeWidth={2.5} className={styles.btnArrow} />
              </button>
            </form>
          </div>

          <footer className={styles.footerBar}>
            <div className={styles.footerLeft}>
              <div className={styles.footerLogoBadge}>
                <Image
                  src="/images/Upstartica - Horizontal Logo.png"
                  alt="Upstartica"
                  width={320}
                  height={100}
                  className={styles.footerLogo}
                />
              </div>
              <p className={styles.copyright}>
                &copy; 2026 Upstartica &middot; Ideas today. Bigger tomorrows.
              </p>
            </div>

            <div className={styles.footerRight}>
              <a href="#why" onClick={(e) => handleNavClick(e, "why")}>
                Why
              </a>
              <a href="#path" onClick={(e) => handleNavClick(e, "path")}>
                Clearer Path
              </a>
              <a href="#you" onClick={(e) => handleNavClick(e, "you")}>
                For you
              </a>
              <a href="#coming" onClick={(e) => handleNavClick(e, "coming")}>
                What&apos;s coming
              </a>
              <a href="#top" onClick={(e) => handleNavClick(e, "top")}>
                Waitlist
              </a>
            </div>
          </footer>
        </div>
      </section>

      <WaitlistModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialEmail={modalInitialEmail}
      />
    </main>
  );
}




