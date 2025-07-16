import { applySectionClipPathWithBorder } from '@lib/clipPath';

document.addEventListener('DOMContentLoaded', () => {
  const sectionsWithNotch = document.querySelectorAll('[data-notch-border-color]');
  
  sectionsWithNotch.forEach((section) => {
    const borderColor = section.getAttribute('data-notch-border-color');
    if (borderColor && section instanceof HTMLElement) {
      applySectionClipPathWithBorder({
        section,
        borderColor
      });
    }
  });
}); 