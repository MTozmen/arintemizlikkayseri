import type { Metadata, Viewport } from "next";
import "./globals.css";
import SiteShell from "./components/SiteShell";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Arın Temizlik | Profesyonel Temizlik Hizmetleri",
  description: "Ev, ofis, inşaat sonrası ve daha fazlası için profesyonel temizlik hizmetleri sunuyoruz.",
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" }
    ],
    shortcut: "/favicon.png",
    apple: "/favicon.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
