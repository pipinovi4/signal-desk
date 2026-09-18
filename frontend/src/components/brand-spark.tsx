import type { CSSProperties } from "react";

import styles from "./brand-spark.module.css";

type BrandSparkProps = Readonly<{
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  duration?: number;
  delay?: number;
  animated?: boolean;
  className?: string;
}>;

type BrandSparkStyle = CSSProperties & {
  "--spark-duration": string;
  "--spark-delay": string;
};

export function BrandSpark({
  size = "md",
  duration = 550,
  delay = 550,
  animated = false,
  className,
}: BrandSparkProps) {
  const style: BrandSparkStyle = {
    "--spark-duration": `${duration}ms`,
    "--spark-delay": `${delay}ms`,
  };

  return (
    <span
      className={[
        styles.brandSpark,
        styles[size],
        animated && styles.animated,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={style}
    />
  );
}
