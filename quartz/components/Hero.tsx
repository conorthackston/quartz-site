import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

// ---------------------------------------------------------------------------
// Hero — homepage-only landing header for Conor Thackston's Quartz site.
//
// Registered globally (see quartz.ts) but renders ONLY on the root index page
// via the `fileData.slug === "index"` guard below, so it never appears above
// ordinary notes. All styling lives in `Hero.css` and is scoped under the
// `.ct-hero` class, driven by Quartz's theme CSS variables so it tracks
// quartz.config.yaml's palette and switches with light/dark automatically.
// ---------------------------------------------------------------------------

// Edit these to change the hero copy without touching markup or styles.
const HERO = {
  image: "static/hero-portrait.png",
  imageAlt: "Conor Thackston",
  eyebrow: "Instructional Technology Leader",
  name: "Conor Thackston",
  // The tagline is split so only the second half gets the gradient treatment.
  taglineLead: "Innovation.",
  taglineGradient: "Guided by Pedagogy.",
  subtitle: "I bridge the gap between complex digital tools and meaningful learning outcomes.",
  actions: [
    {
      label: "Resume",
      href: "https://www.canva.com/design/DAFx7XiQI7I/qvCjyHRtr0BQzbEueUIMsQ/view?utm_content=DAFx7XiQI7I&utm_campaign=designshare&utm_medium=link&utm_source=viewer",
      primary: true,
    },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/conor-thackston-3912a8127" },
    { label: "Email", href: "mailto:conorthackston@icloud.com" },
  ],
}

const Hero: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  // Homepage only — bail out on every other page.
  if (fileData.slug !== "index") return null

  return (
    <section class={classNames(displayClass, "ct-hero")} aria-label="Site introduction">
      <div class="ct-hero__ambient" aria-hidden="true">
        <span class="ct-hero__aurora ct-hero__aurora--blue"></span>
        <span class="ct-hero__aurora ct-hero__aurora--violet"></span>
        <span class="ct-hero__grid"></span>
      </div>

      <div class="ct-hero__inner">
        <div class="ct-hero__avatar">
          <span class="ct-hero__ring" aria-hidden="true"></span>
          <span class="ct-hero__glow" aria-hidden="true"></span>
          <span class="ct-hero__plate">
            <img src={HERO.image} alt={HERO.imageAlt} width="160" height="160" loading="eager" />
          </span>
        </div>

        <p class="ct-hero__eyebrow">{HERO.eyebrow}</p>
        <h1 class="ct-hero__name">{HERO.name}</h1>
        <p class="ct-hero__tagline">
          {HERO.taglineLead}{" "}
          <span class="ct-hero__gradient">{HERO.taglineGradient}</span>
        </p>
        <p class="ct-hero__subtitle">{HERO.subtitle}</p>

        <div class="ct-hero__actions">
          {HERO.actions.map((action) => (
            <a
              key={action.href}
              href={action.href}
              class={`ct-hero__btn${action.primary ? " ct-hero__btn--primary" : ""}`}
              target={action.href.startsWith("http") ? "_blank" : undefined}
              rel={action.href.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              {action.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

Hero.css = `
.ct-hero {
  /* Blue -> indigo -> violet gradient, themed per mode just below. */
  --ct-grad: linear-gradient(120deg, #0071e3, #5b6bff 45%, #a855f7);
  --ct-ring: conic-gradient(from 0deg, #2997ff, #6b7cff, #a855f7, #2997ff);
  --ct-aurora-blue: rgba(41, 151, 255, 0.28);
  --ct-aurora-violet: rgba(168, 85, 247, 0.22);
  --ct-grid: rgba(29, 29, 31, 0.05);
  /* Fixed white, not theme-aware: the portrait PNG has a hard-coded white
     background (not transparent), so the plate must always match it or the
     object-fit: contain letterboxing shows through as a mismatched gap
     (this is invisible in light mode by coincidence, but shows as a stark
     dark gap once --light flips to near-black in dark mode). */
  --ct-plate: #ffffff;

  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  width: 100%;
  max-width: 46rem;
  margin: 0.5rem auto 1rem;
  padding: clamp(2.5rem, 6vw, 4.25rem) 1.5rem clamp(2.25rem, 5vw, 3.5rem);
  border-radius: 28px;
  border: 1px solid var(--lightgray);
  background: var(--light);
  text-align: center;
}

:root[saved-theme="dark"] .ct-hero {
  --ct-grad: linear-gradient(120deg, #2997ff, #7c8bff 45%, #c084fc);
  --ct-aurora-blue: rgba(41, 151, 255, 0.34);
  --ct-aurora-violet: rgba(168, 85, 247, 0.30);
  --ct-grid: rgba(255, 255, 255, 0.045);
}

/* --- ambient background --- */
.ct-hero__ambient {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}
.ct-hero__grid {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle at 1px 1px, var(--ct-grid) 1px, transparent 0);
  background-size: 26px 26px;
}
.ct-hero__aurora {
  position: absolute;
  border-radius: 50%;
  filter: blur(22px);
}
.ct-hero__aurora--blue {
  width: 460px;
  height: 460px;
  top: -190px;
  left: -110px;
  background: radial-gradient(circle, var(--ct-aurora-blue), transparent 65%);
  animation: ctHeroAurora 15s ease-in-out infinite;
}
.ct-hero__aurora--violet {
  width: 430px;
  height: 430px;
  bottom: -200px;
  right: -110px;
  background: radial-gradient(circle, var(--ct-aurora-violet), transparent 65%);
  animation: ctHeroAurora2 18s ease-in-out infinite;
}

/* --- content --- */
.ct-hero__inner {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* --- avatar --- */
.ct-hero__avatar {
  position: relative;
  width: 150px;
  height: 150px;
  margin-bottom: 1.75rem;
  animation: ctHeroFloat 7s ease-in-out infinite;
}
.ct-hero__ring {
  position: absolute;
  inset: -13px;
  border-radius: 50%;
  background: var(--ct-ring);
  animation: ctHeroSpin 9s linear infinite;
}
.ct-hero__glow {
  position: absolute;
  inset: -30px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(107, 124, 255, 0.38), transparent 70%);
  filter: blur(11px);
}
.ct-hero__plate {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  padding: 5px;
  background: var(--ct-plate);
  /* Clip the portrait to a perfect circle no matter what global img rules do. */
  overflow: hidden;
}
.ct-hero .ct-hero__plate img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  display: block;
  /* Override custom.scss's global img card styling inside the hero. */
  box-shadow: 0 8px 24px -8px rgba(20, 20, 60, 0.4);
  margin: 0;
}

/* --- type --- */
.ct-hero__eyebrow {
  margin: 0 0 1rem;
  font-family: var(--codeFont), monospace;
  font-size: 0.78rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--secondary);
}
.ct-hero__name {
  margin: 0 0 0.6rem;
  font-size: clamp(2.4rem, 6vw, 3.4rem);
  line-height: 1.02;
  letter-spacing: -0.03em;
  color: var(--dark);
}
.ct-hero__tagline {
  margin: 0 0 1rem;
  font-size: clamp(1.4rem, 3.4vw, 2rem);
  line-height: 1.15;
  letter-spacing: -0.02em;
  font-weight: 600;
  color: var(--dark);
}
.ct-hero__gradient {
  background: var(--ct-grad);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  animation: ctHeroGrad 8s ease infinite;
}
.ct-hero__subtitle {
  max-width: 32rem;
  margin: 0 auto 1.9rem;
  font-size: 1.05rem;
  line-height: 1.55;
  color: var(--gray);
}

/* --- actions --- */
.ct-hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
  justify-content: center;
}
.ct-hero__btn {
  display: inline-flex;
  align-items: center;
  padding: 0.7rem 1.35rem;
  border-radius: 30px;
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  color: var(--dark);
  background: color-mix(in srgb, var(--darkgray) 6%, transparent);
  border: 1px solid color-mix(in srgb, var(--darkgray) 14%, transparent);
  transition: transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;
}
.ct-hero__btn:hover {
  transform: translateY(-2px);
  background: color-mix(in srgb, var(--darkgray) 10%, transparent);
}
.ct-hero__btn--primary {
  color: #fff;
  background: var(--ct-grad);
  background-size: 160% auto;
  border-color: transparent;
  box-shadow: 0 10px 24px -10px rgba(90, 80, 220, 0.7);
}
.ct-hero__btn--primary:hover {
  background-position: 100% 0;
  box-shadow: 0 14px 30px -10px rgba(90, 80, 220, 0.8);
}

/* --- motion keyframes --- */
@keyframes ctHeroAurora {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(22px, -16px) scale(1.12); }
}
@keyframes ctHeroAurora2 {
  0%, 100% { transform: translate(0, 0) scale(1.05); }
  50% { transform: translate(-24px, 18px) scale(0.95); }
}
@keyframes ctHeroSpin {
  to { transform: rotate(360deg); }
}
@keyframes ctHeroGrad {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
@keyframes ctHeroFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-7px); }
}

@media (prefers-reduced-motion: reduce) {
  .ct-hero__avatar,
  .ct-hero__ring,
  .ct-hero__aurora,
  .ct-hero__gradient {
    animation: none !important;
  }
}

@media all and (max-width: 800px) {
  .ct-hero {
    border-radius: 22px;
  }
}
`

export default (() => Hero) satisfies QuartzComponentConstructor
