export const applySectionClipPathWithBorder = ({
  section,
  borderColor,
}: {
  section: HTMLElement;
  borderColor: string;
}): void => {
  const resizeHandler = () => updateSectionClipPath(section, borderColor);

  resizeHandler();
  window.addEventListener("resize", resizeHandler);
};

const updateSectionClipPath = (section: HTMLElement, borderColor: string) => {
  try {
    const paramsSection = computeClipPathParams(section);
    const clipPathSection = generateClipPathString(paramsSection);

    applyClipPath(section, clipPathSection);

    const shadow = getOrCreateShadowClone(section, borderColor);

    const paramsShadowClone = computeClipPathParams(section, true);
    const clipPathShadowClone = generateClipPathString(paramsShadowClone);

    applyClipPath(shadow, clipPathShadowClone);
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

const computeClipPathParams = (
  section: HTMLElement,
  isClone: boolean = false
): ClipPathParams => {
  const width = window.innerWidth;
  const height = section.clientHeight;
  const centerX = width / 2;

  const cornerRadius = 6;
  const bottomY = height - 30;
  const fullBottomY = height;

  const leftCornerX = !isClone ? centerX - 120 : centerX - 128;
  const leftNotchStartX = !isClone ? centerX - 100 : centerX - 108;
  const rightNotchEndX = !isClone ? centerX + 100 : centerX + 108;
  const rightCornerX = !isClone ? centerX + 120 : centerX + 128;

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

const getOrCreateShadowClone = (
  section: HTMLElement,
  borderColor: string
): HTMLElement => {
  const parent = section.parentElement;
  if (!parent) throw new Error("Section has no parent");
  let shadow = getShadowClone(parent);

  if (shadow) return shadow;

  shadow = createShadowClone(borderColor);

  parent.insertBefore(shadow, section);

  return shadow;
};

const getShadowClone = (parent: HTMLElement): HTMLElement | null => {
  let shadow = parent?.querySelector(".section-shadow") as HTMLElement | null;
  return shadow;
};

const createShadowClone = (borderColor: string): HTMLElement => {
  const shadow = document.createElement("div");
  shadow.classList.add("section-shadow");

  shadow.setAttribute("aria-hidden", "true");
  shadow.setAttribute("role", "presentation");

  styleShadowClone(shadow, borderColor);

  return shadow;
};

const applyClipPath = (element: HTMLElement, clipPath: string) => {
  element.style.clipPath = clipPath;
};

const styleShadowClone = (shadow: HTMLElement, borderColor: string) => {
  shadow.style.opacity = "0.2";
  Object.assign(shadow.style, {
    position: "absolute",
    top: "10px",
    left: "0%",
    width: "100%",
    height: "100%",
    pointerEvents: "none",
    zIndex: "0",
    overflow: "hidden",
    backgroundColor: borderColor,
  });
};
