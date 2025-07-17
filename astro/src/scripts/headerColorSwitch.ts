import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const COLORS = {
  PRIMARY: "#ffffff",
  PRIMARY_TRANSPARENT: "rgba(255, 255, 255, 0.1)",
  SECONDARY: "#725CFA",
  SECONDARY_TRANSPARENT: "rgba(114, 92, 250, 0.1)",
};

const HEADER_COLOR_ATTR = '[data-header-color="true"]';
const NOTCH_BORDER_ATTR = "[data-notch-border-color]";
const NOTCH_HEIGHT = 40;
const HEADER_LINKS_SELECTOR = "header a";
const DAY_COUNTER_ID = "day-counter-container";
const DAY_COUNTER_BG_ID = "day-counter-bg";
const DAY_COUNTER_TEXT_ID = "day-counter";
const LOGO_WHITE_ID = "logo-white";
const LOGO_COLOR_ID = "logo-color";

interface AnimateHeaderOptions {
  linkColor: string;
  counterBg: string;
  counterBorder: string;
  counterText: string;
  logoWhiteOpacity: number;
  logoColorOpacity: number;
  logoWhitePointer: string;
  logoColorPointer: string;
}

function animateHeader({
  linkColor,
  counterBg,
  counterBorder,
  counterText,
  logoWhiteOpacity,
  logoColorOpacity,
  logoWhitePointer,
  logoColorPointer,
}: AnimateHeaderOptions) {
  const links = document.querySelectorAll(HEADER_LINKS_SELECTOR);
  const dayCounter = document.getElementById(DAY_COUNTER_ID);
  const dayCounterBg = document.getElementById(DAY_COUNTER_BG_ID);
  const dayCounterText = document.getElementById(DAY_COUNTER_TEXT_ID);
  const logoWhite = document.getElementById(LOGO_WHITE_ID);
  const logoColor = document.getElementById(LOGO_COLOR_ID);

  if (
    !links.length ||
    !dayCounter ||
    !dayCounterBg ||
    !dayCounterText ||
    !logoWhite ||
    !logoColor
  )
    return;

  gsap.to(links, { color: linkColor, duration: 0.2 });
  gsap.to(dayCounter, {
    backgroundColor: counterBg,
    borderColor: counterBorder,
    duration: 0.2,
  });
  gsap.to(dayCounterBg, { color: counterBg, duration: 0.2 });
  gsap.to(dayCounterText, { color: counterText, duration: 0.2 });
  gsap.to(logoWhite, {
    opacity: logoWhiteOpacity,
    pointerEvents: logoWhitePointer,
    duration: 0.2,
  });
  gsap.to(logoColor, {
    opacity: logoColorOpacity,
    pointerEvents: logoColorPointer,
    duration: 0.2,
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(HEADER_COLOR_ATTR);
  if (!sections.length) return;

  for (const section of sections) {
    const notch = section.querySelector(NOTCH_BORDER_ATTR);
    const hasNotch = notch?.getAttribute("data-notch-border-color") != null;
    const notchHeight = hasNotch ? NOTCH_HEIGHT : 0;

    ScrollTrigger.create({
      trigger: section,
      start: "top top+=70",
      end: `bottom-=${notchHeight} top+=70`,
      onEnter: () =>
        animateHeader({
          linkColor: COLORS.SECONDARY,
          counterBg: COLORS.SECONDARY_TRANSPARENT,
          counterBorder: COLORS.SECONDARY,
          counterText: COLORS.SECONDARY,
          logoWhiteOpacity: 0,
          logoColorOpacity: 1,
          logoWhitePointer: "none",
          logoColorPointer: "auto",
        }),
      onEnterBack: () =>
        animateHeader({
          linkColor: COLORS.SECONDARY,
          counterBg: COLORS.SECONDARY_TRANSPARENT,
          counterBorder: COLORS.SECONDARY,
          counterText: COLORS.SECONDARY,
          logoWhiteOpacity: 0,
          logoColorOpacity: 1,
          logoWhitePointer: "none",
          logoColorPointer: "auto",
        }),
      onLeave: () =>
        animateHeader({
          linkColor: COLORS.PRIMARY,
          counterBg: COLORS.PRIMARY_TRANSPARENT,
          counterBorder: COLORS.PRIMARY,
          counterText: COLORS.PRIMARY,
          logoWhiteOpacity: 1,
          logoColorOpacity: 0,
          logoWhitePointer: "auto",
          logoColorPointer: "none",
        }),
      onLeaveBack: () =>
        animateHeader({
          linkColor: COLORS.PRIMARY,
          counterBg: COLORS.PRIMARY_TRANSPARENT,
          counterBorder: COLORS.PRIMARY,
          counterText: COLORS.PRIMARY,
          logoWhiteOpacity: 1,
          logoColorOpacity: 0,
          logoWhitePointer: "auto",
          logoColorPointer: "none",
        }),
    });
  }
});
