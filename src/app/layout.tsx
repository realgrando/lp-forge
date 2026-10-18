import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LP-Forge v2 — Nivix Unified Builder Engine",
  description: "Motor unificado de criação e ejeção de Landing Pages e Linktree 3D da Nivix.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cormorant+Garamond:ital,wght@0,300..700;1,300..700&family=Fraunces:opsz,wght@9..144,300..900&family=Inter:wght@100..900&family=Montserrat:wght@100..900&family=Outfit:wght@100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Plus+Jakarta+Sans:wght@200..800&family=Poppins:wght@100..900&family=Space+Grotesk:wght@300..700&family=Syne:wght@400..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#09090B] text-zinc-50 antialiased selection:bg-[#F4B400] selection:text-zinc-950">
        {children}
      </body>
    </html>
  );
}
