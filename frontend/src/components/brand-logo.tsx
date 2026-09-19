import Image from "next/image";

import styles from "./brand-logo.module.css";

type BrandLogoProps = Readonly<{
  className?: string;
  priority?: boolean;
  variant?: "wordmark" | "mark";
}>;

const assets = {
  wordmark: {
    dark: "/signal-desk-wordmark-dark.webp",
    light: "/signal-desk-wordmark-light.webp",
    sizes: "(max-width: 640px) 144px, 176px",
  },
  mark: {
    dark: "/signal-desk-mark-dark.webp",
    light: "/signal-desk-mark-light.webp",
    sizes: "64px",
  },
} as const;

export function BrandLogo({
  className,
  priority = false,
  variant = "wordmark",
}: BrandLogoProps) {
  const selected = assets[variant];

  return (
    <span
      className={[styles.logo, styles[variant], className]
        .filter(Boolean)
        .join(" ")}
      role="img"
      aria-label="SignalDesk"
    >
      <Image
        alt=""
        aria-hidden="true"
        className={[styles.image, styles.dark].join(" ")}
        fill
        priority={priority}
        sizes={selected.sizes}
        src={selected.dark}
      />
      <Image
        alt=""
        aria-hidden="true"
        className={[styles.image, styles.light].join(" ")}
        fill
        priority={priority}
        sizes={selected.sizes}
        src={selected.light}
      />
    </span>
  );
}
