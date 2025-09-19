import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Layout from "@/components/layout/Layout";
import { AuthProvider } from "@/hooks/useAuth";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Angola Travel - Descubra a Beleza de Angola",
  description: "Plataforma de turismo completa para Angola. Encontre hospedagens únicas, experiências autênticas e roteiros personalizados com IA. Descubra a rica cultura e paisagens deslumbrantes de Angola.",
  keywords: "Angola, turismo, hospedagem, experiências, roteiros, viagem, cultura africana, Luanda, Benguela",
  authors: [{ name: "Angola Travel Team" }],
  creator: "Angola Travel",
  publisher: "Angola Travel",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://angolatravel.ao"),
  alternates: {
    canonical: "/",
    languages: {
      "pt-AO": "/pt",
      "en-US": "/en",
      "fr-FR": "/fr",
    },
  },
  openGraph: {
    title: "Angola Travel - Descubra a Beleza de Angola",
    description: "Plataforma de turismo completa para Angola. Encontre hospedagens únicas, experiências autênticas e roteiros personalizados.",
    url: "https://angolatravel.ao",
    siteName: "Angola Travel",
    locale: "pt_AO",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Angola Travel - Descubra a Beleza de Angola",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Angola Travel - Descubra a Beleza de Angola",
    description: "Plataforma de turismo completa para Angola. Encontre hospedagens únicas, experiências autênticas e roteiros personalizados.",
    images: ["/images/twitter-image.jpg"],
    creator: "@angolatravel",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-AO" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground">
        <AuthProvider>
          <Layout>
            {children}
          </Layout>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
