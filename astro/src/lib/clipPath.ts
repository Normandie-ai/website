export const applySectionClipPath = (section: HTMLElement) => {
  const handleResize = () => {
    const windowWidth = window.innerWidth;
    const sectionCenter = windowWidth / 2;
    const sectionHeight = section.clientHeight;

    // TODO : add smooth corner radius
    section.style.clipPath = `path("M 0 0 L 0 ${sectionHeight * 0.97} L ${
      sectionCenter - 120
    } ${sectionHeight * 0.97} L ${sectionCenter - 100} ${sectionHeight} L ${
      sectionCenter + 100
    } ${sectionHeight} L ${sectionCenter + 120} ${
      sectionHeight * 0.97
    } L ${windowWidth} ${sectionHeight * 0.97} L ${windowWidth} 0 Z")`;
  };

  handleResize();

  window.addEventListener("resize", handleResize);
};
