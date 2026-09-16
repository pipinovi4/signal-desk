import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className={styles.page}>
      <section className={styles.content}>
        <div className={styles.brand}>
          <span className={styles.brandSpark} aria-hidden="true" />

          <span className="text-foreground/80 text-xs font-semibold tracking-[0.24em] uppercase">
            SignalDesk
          </span>
        </div>

        <div className={styles.error}>
          <div className={styles.signalLine} aria-hidden="true">
            <span className={styles.signalNode} />
          </div>

          <span className={styles.code}>404</span>
        </div>

        <div className={styles.copy}>
          <h1 className="text-foreground text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
            Signal lost.
          </h1>

          <p className="text-muted-foreground mt-3 max-w-md text-sm leading-6 sm:text-base">
            We couldn&apos;t find the route you&apos;re trying to connect to.
          </p>
        </div>

        <Link
          href="/"
          className="bg-primary hover:bg-primary-hover mt-8 inline-flex h-11 items-center justify-center rounded-xl px-6 text-sm font-semibold text-white transition-colors"
        >
          Return home
        </Link>

        <div className={styles.status}>
          <span>STATUS</span>
          <span className={styles.separator}>·</span>
          <span>ROUTE_NOT_FOUND</span>
        </div>
      </section>
    </main>
  );
}
