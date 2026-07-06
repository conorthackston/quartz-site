import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

// ---------------------------------------------------------------------------
// QuickNav — a fixed rail of section shortcuts, always available for jumping
// around the site regardless of which page you're on. Collapsed by default
// to small color-ringed initials; hovering the rail expands every pill to
// show its full label. Each pill is a transparent/frosted glass chip with a
// gradient border in that section's own color (same palette as the
// per-section accents in custom.scss), so the collapsed rail reads as a
// small rainbow of rings. Desktop only — collapses away entirely on narrow
// viewports so it never covers content on mobile. Dismissible via the small
// × control that fades in on hover; a slim reopen tab appears once hidden.
// ---------------------------------------------------------------------------

interface QuickNavItem {
  label: string
  href: string
  slugPrefix: string
  gradient: string
  icon: string
}

// Minimal lucide-style stroke icons (24x24 viewBox), matching the stroke
// convention already used elsewhere on the site (e.g. the search/menu icons).
const ICON_HOME =
  '<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>'
const ICON_ABOUT =
  '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>'
const ICON_PORTFOLIO =
  '<path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/>'
const ICON_BLOGS =
  '<path d="M12 20h9"/><path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z"/>'
const ICON_GEMINI =
  '<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/>'

const ITEMS: QuickNavItem[] = [
  {
    label: "Home",
    href: "/",
    slugPrefix: "index",
    gradient: "linear-gradient(160deg, #0071e3, #5b6bff 55%, #a855f7)",
    icon: ICON_HOME,
  },
  {
    label: "About",
    href: "/about/about-me",
    slugPrefix: "about",
    gradient: "linear-gradient(160deg, #10b981, #059669 55%, #0d9488)",
    icon: ICON_ABOUT,
  },
  {
    label: "Portfolio",
    href: "/portfolio/",
    slugPrefix: "portfolio",
    gradient: "linear-gradient(160deg, #0ea5e9, #3b82f6 55%, #4f46e5)",
    icon: ICON_PORTFOLIO,
  },
  {
    label: "Blogs",
    href: "/blogs/",
    slugPrefix: "blogs",
    gradient: "linear-gradient(160deg, #0891b2, #6366f1 55%, #a855f7)",
    icon: ICON_BLOGS,
  },
  {
    label: "Gemini",
    href: "/gemini/intro-to-gemini--and--notebooklm",
    slugPrefix: "gemini",
    gradient: "linear-gradient(160deg, #4285f4, #9163d0 55%, #b3319b)",
    icon: ICON_GEMINI,
  },
]

const QuickNav: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  const slug = (fileData.slug as string) ?? ""

  return (
    <div class={classNames(displayClass, "quick-nav-wrapper")}>
      <nav class="quick-nav" aria-label="Quick section navigation">
        <button
          type="button"
          class="quick-nav__dismiss"
          aria-label="Hide quick navigation"
          title="Hide quick navigation"
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
        <ul class="quick-nav__list">
          {ITEMS.map((item) => {
            const isActive =
              item.slugPrefix === "index" ? slug === "index" : slug.startsWith(item.slugPrefix)
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  class={classNames(
                    null,
                    "quick-nav__pill",
                    isActive ? "quick-nav__pill--active" : "",
                  )}
                  style={`--quick-nav-grad: ${item.gradient}`}
                  data-no-popover="true"
                >
                  <span class="quick-nav__dot">
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      dangerouslySetInnerHTML={{ __html: item.icon }}
                    ></svg>
                  </span>
                  <span class="quick-nav__label">{item.label}</span>
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
      <button
        type="button"
        class="quick-nav__reopen"
        aria-label="Show quick navigation"
        title="Show quick navigation"
      >
        <span class="quick-nav__reopen-swatch"></span>
      </button>
    </div>
  )
}

QuickNav.css = `
.quick-nav-wrapper {
  position: fixed;
  top: 50%;
  right: 1.1rem;
  transform: translateY(-50%);
  z-index: 20;
}

.quick-nav {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.55rem;
  padding: 0.6rem 0.5rem;
  border-radius: 22px;
  transition:
    opacity 0.25s ease,
    transform 0.25s ease,
    visibility 0.25s ease;
}

/* --- collapse the whole rail away when dismissed --- */
.quick-nav-wrapper.quick-nav-wrapper--hidden .quick-nav {
  opacity: 0;
  transform: translateX(12px);
  visibility: hidden;
  pointer-events: none;
}

.quick-nav-wrapper:not(.quick-nav-wrapper--hidden) .quick-nav__reopen {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}

/* --- dismiss (×) button, tucked above the rail, only visible on hover --- */
.quick-nav__dismiss {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.35rem;
  height: 1.35rem;
  margin-bottom: 0.1rem;
  border-radius: 50%;
  border: none;
  background: color-mix(in srgb, var(--darkgray) 8%, transparent);
  color: var(--gray);
  cursor: pointer;
  opacity: 0;
  transform: scale(0.8);
  transition:
    opacity 0.18s ease,
    transform 0.18s ease,
    background 0.18s ease,
    color 0.18s ease;
}
.quick-nav:hover .quick-nav__dismiss {
  opacity: 1;
  transform: scale(1);
}
.quick-nav__dismiss:hover {
  background: color-mix(in srgb, #ef4444 16%, transparent);
  color: #ef4444;
}

/* --- reopen tab: a slim swatch-only handle once the rail is hidden --- */
.quick-nav__reopen {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.6rem;
  height: 3.4rem;
  padding: 0;
  border: none;
  border-radius: 14px 0 0 14px;
  background: color-mix(in srgb, var(--light) 55%, transparent);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 4px 16px -8px rgba(20, 20, 50, 0.35);
  cursor: pointer;
  transition:
    opacity 0.25s ease,
    visibility 0.25s ease,
    width 0.18s ease;
  margin-left: auto;
}
.quick-nav__reopen:hover {
  width: 2rem;
}
.quick-nav__reopen-swatch {
  display: block;
  width: 0.4rem;
  height: 2.2rem;
  border-radius: 999px;
  background: linear-gradient(
    180deg,
    #0071e3,
    #10b981 33%,
    #3b82f6 66%,
    #a855f7
  );
}

/* --- pills: collapsed by default to a small ringed initial --- */
.quick-nav__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.quick-nav__pill {
  --pill-fill: color-mix(in srgb, var(--light) 45%, transparent);
  display: flex;
  align-items: center;
  height: 2.25rem;
  width: 2.25rem;
  padding: 0;
  border-radius: 999px;
  border: 1.5px solid transparent;
  background:
    linear-gradient(var(--pill-fill), var(--pill-fill)) padding-box,
    var(--quick-nav-grad) border-box;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  color: var(--dark);
  text-decoration: none;
  box-shadow: 0 4px 16px -10px rgba(20, 20, 50, 0.35);
  overflow: hidden;
  transition:
    width 0.32s cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 0.25s ease,
    border-width 0.25s ease;
}

.quick-nav__dot {
  flex: 0 0 2.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.82;
  transition: opacity 0.2s ease;
}

.quick-nav__label {
  flex: 1 1 auto;
  padding-right: 1.1rem;
  font-family: var(--bodyFont);
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.2s ease;
}

/* --- hovering the rail expands every pill together --- */
.quick-nav:hover .quick-nav__pill {
  width: 8.75rem;
  box-shadow: 0 8px 22px -10px rgba(20, 20, 50, 0.45);
}
.quick-nav:hover .quick-nav__label {
  opacity: 1;
  transition: opacity 0.2s ease 0.12s;
}

.quick-nav__pill--active {
  border-width: 2.5px;
}
.quick-nav__pill--active .quick-nav__dot {
  opacity: 1;
}

/* Desktop only: a fixed rail this size would sit on top of body text on
   narrow viewports, so collapse it away below the tablet breakpoint rather
   than trying to reflow it. */
@media all and (max-width: 900px) {
  .quick-nav-wrapper {
    display: none;
  }
}
`

QuickNav.afterDOMLoaded = `
function setupQuickNav() {
  const wrapper = document.querySelector(".quick-nav-wrapper")
  if (!wrapper) return
  const dismissBtn = wrapper.querySelector(".quick-nav__dismiss")
  const reopenBtn = wrapper.querySelector(".quick-nav__reopen")
  const KEY = "quickNavHidden"

  function applyState() {
    const hidden = localStorage.getItem(KEY) === "1"
    wrapper.classList.toggle("quick-nav-wrapper--hidden", hidden)
  }

  dismissBtn?.addEventListener("click", (e) => {
    e.preventDefault()
    localStorage.setItem(KEY, "1")
    applyState()
  })

  reopenBtn?.addEventListener("click", (e) => {
    e.preventDefault()
    localStorage.removeItem(KEY)
    applyState()
  })

  applyState()
}

document.addEventListener("nav", setupQuickNav)
`

export default (() => QuickNav) satisfies QuartzComponentConstructor
