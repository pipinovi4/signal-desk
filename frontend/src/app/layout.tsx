import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";

import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const themeInitializationScript = [
  "(() => {",
  "  try {",
  '    const savedTheme = localStorage.getItem("signaldesk-theme");',
  '    const systemTheme = matchMedia("(prefers-color-scheme: light)").matches',
  '      ? "light"',
  '      : "dark";',
  "    const theme =",
  '      savedTheme === "light" || savedTheme === "dark"',
  "        ? savedTheme",
  "        : systemTheme;",
  "    document.documentElement.dataset.theme = theme;",
  '    const favicon = document.getElementById("signaldesk-favicon");',
  "    if (favicon) {",
  '      favicon.setAttribute("href",',
  '        theme === "light"',
  '          ? "/signal-desk-favicon-light.png"',
  '          : "/signal-desk-favicon-dark.png");',
  "    }",
  "  } catch {",
  '    document.documentElement.dataset.theme = "dark";',
  "  }",
  "})();",
].join("\n");

export const metadata: Metadata = {
  title: "SignalDesk",
  description: "Turn fragmented information into useful signals.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={spaceGrotesk.variable}
      data-theme="dark"
      suppressHydrationWarning
    >
      <head>
        <link
          id="signaldesk-favicon"
          rel="icon"
          type="image/png"
          sizes="64x64"
          href="/signal-desk-favicon-dark.png"
        />
        <script
          dangerouslySetInnerHTML={{ __html: themeInitializationScript }}
        />
      </head>
      <body className="flex min-h-dvh flex-col font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
