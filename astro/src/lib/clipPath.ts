export const applySectionClipPath = (section: HTMLElement): void => {
  const resizeHandler = () => updateSectionClipPath(section);

  resizeHandler();
  window.addEventListener("resize", resizeHandler);
};

const updateSectionClipPath = (section: HTMLElement) => {
  try {
    const params = computeClipPathParams(section);
    const clipPath = generateClipPathString(params);

    applyClipPath(section, clipPath);

    const shadow = getOrCreateShadowClone(section);
    applyClipPath(shadow, clipPath);
    styleShadowClone(shadow);
  } catch (error) {
    console.error(error);
  }
};

interface ClipPathParams {
  width: number;
  height: number;
  centerX: number;
  bottomY: number;
  fullBottomY: number;
  leftCornerX: number;
  leftNotchStartX: number;
  rightNotchEndX: number;
  rightCornerX: number;
  leftTangentX: number;
  leftTangentY: number;
  rightTangentX: number;
  rightTangentY: number;
  cornerRadius: number;
}

const computeClipPathParams = (section: HTMLElement): ClipPathParams => {
  const width = window.innerWidth;
  const height = section.clientHeight;
  const centerX = width / 2;

  const cornerRadius = 6;
  const bottomY = height * 0.97;
  const fullBottomY = height;

  const leftCornerX = centerX - 120;
  const leftNotchStartX = centerX - 100;
  const rightNotchEndX = centerX + 100;
  const rightCornerX = centerX + 120;

  const diagonalSlope =
    (fullBottomY - bottomY) / (leftNotchStartX - leftCornerX);
  const tangentOffset = cornerRadius / Math.sqrt(1 + diagonalSlope ** 2);

  const leftTangentX = leftNotchStartX - tangentOffset;
  const leftTangentY = fullBottomY - cornerRadius;
  const rightTangentX = rightNotchEndX + tangentOffset;
  const rightTangentY = fullBottomY - cornerRadius;

  return {
    width,
    height,
    centerX,
    bottomY,
    fullBottomY,
    leftCornerX,
    leftNotchStartX,
    rightNotchEndX,
    rightCornerX,
    leftTangentX,
    leftTangentY,
    rightTangentX,
    rightTangentY,
    cornerRadius,
  };
};

const generateClipPathString = (params: ClipPathParams): string => {
  return `path("M 0 0 L 0 ${params.bottomY} L ${params.leftCornerX} ${
    params.bottomY
  } L ${params.leftTangentX} ${params.leftTangentY} Q ${
    params.leftNotchStartX
  } ${params.fullBottomY} ${params.leftNotchStartX + params.cornerRadius} ${
    params.fullBottomY
  } L ${params.rightNotchEndX - params.cornerRadius} ${params.fullBottomY} Q ${
    params.rightNotchEndX
  } ${params.fullBottomY} ${params.rightTangentX} ${params.rightTangentY} L ${
    params.rightCornerX
  } ${params.bottomY} L ${params.width} ${params.bottomY} L ${
    params.width
  } 0 Z")`;
};

const getOrCreateShadowClone = (section: HTMLElement): HTMLElement => {
  const parent = section.parentElement;
  if (!parent) throw new Error("Section has no parent");
  let shadow = getShadowClone(parent);

  if (shadow) return shadow;

  shadow = createShadowClone(section);

  parent.insertBefore(shadow, section);

  return shadow;
};

const getShadowClone = (parent: HTMLElement): HTMLElement | null => {
  let shadow = parent?.querySelector(".section-shadow") as HTMLElement | null;
  return shadow;
};

const createShadowClone = (section: HTMLElement): HTMLElement => {
  const clonedImg = cloneImageFromSection(section);

  clonedImg.setAttribute("aria-hidden", "true");
  clonedImg.setAttribute("alt", "");

  const shadow = document.createElement("div");
  shadow.classList.add("section-shadow");

  shadow.setAttribute("aria-hidden", "true");
  shadow.setAttribute("role", "presentation");

  Object.assign(shadow.style, {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    zIndex: "0",
    overflow: "hidden",
  });

  shadow.appendChild(clonedImg);
  return shadow;
};

const cloneImageFromSection = (section: HTMLElement): HTMLImageElement => {
  const originalImg = section.querySelector("img");

  if (!originalImg) {
    throw new Error("No <img> found in section to clone.");
  }

  const clone = originalImg.cloneNode(true) as HTMLImageElement;
  applyComputedStylesToImage(clone, originalImg);
  return clone;
};

const applyComputedStylesToImage = (
  target: HTMLImageElement,
  source: HTMLImageElement
) => {
  const computed = getComputedStyle(source);

  Object.assign(target.style, {
    position: computed.position,
    top: computed.top,
    left: computed.left,
    right: computed.right,
    bottom: computed.bottom,
    width: "100%",
    height: "100%",
    objectFit: computed.objectFit,
    transform: computed.transform,
    display: "block",
  });
};

const applyClipPath = (element: HTMLElement, clipPath: string) => {
  element.style.clipPath = clipPath;
};

const styleShadowClone = (shadow: HTMLElement) => {
  shadow.style.transform = "scaleX(1.05) scaleY(1.02) translateY(4px)";
  shadow.style.opacity = "0.3";
};
