import React from "react";

type ProgressiveBlurProps = {
  className?: string;
  backgroundColor?: string;
  position?: "top" | "bottom";
  height?: string;
  blurAmount?: string;
};

const ProgressiveBlur = ({
  className = "",
  backgroundColor = "transparent",
  position = "top",
  height = "150px",
  blurAmount = "4px",
}: ProgressiveBlurProps) => {
  const isTop = position === "top";
  const maskStops = [
    "rgba(0, 0, 0, 0) 0%",
    "rgba(0, 0, 0, 0.12) 18%",
    "rgba(0, 0, 0, 0.32) 36%",
    "rgba(0, 0, 0, 0.6) 58%",
    "rgba(0, 0, 0, 0.85) 78%",
    "rgba(0, 0, 0, 1) 100%",
  ].join(", ");
  const maskGradient = isTop
    ? `linear-gradient(to top, ${maskStops})`
    : `linear-gradient(to bottom, ${maskStops})`;
  const hasTint = backgroundColor !== "transparent";

  return (
    <div
      className={`pointer-events-none absolute left-0 w-full select-none ${className}`}
      style={{
        [isTop ? "top" : "bottom"]: 0,
        height,
        background: hasTint
          ? isTop
            ? `linear-gradient(to top, transparent, ${backgroundColor})`
            : `linear-gradient(to bottom, transparent, ${backgroundColor})`
          : "transparent",
        maskImage: maskGradient,
        WebkitMaskImage: maskGradient,
        WebkitBackdropFilter: `blur(${blurAmount})`,
        backdropFilter: `blur(${blurAmount})`,
        WebkitUserSelect: "none",
        userSelect: "none",
      }}
    />
  );
};

export { ProgressiveBlur };
