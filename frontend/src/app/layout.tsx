import type { Metadata } from "next";
import { Montserrat, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { RootProvider } from "@/components/providers/root-provider";
import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ITSPRELUDE Performance System",
  description: "AI-powered workforce performance & productivity management SaaS platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="stylesheet" href="https://fonts.cdnfonts.com/css/rosehot-free-version" />
        </head>
        <body className={`${montserrat.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
          <RootProvider>
            {children}
            <Toaster />
          </RootProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
