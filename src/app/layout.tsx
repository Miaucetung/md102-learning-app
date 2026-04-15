// src/app/layout.tsx
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/contexts/LanguageContext";
import "./globals.css";

export const metadata = {
  title: "Microsoft Learning Platform - MD-102 & MS-102",
  description:
    "Interaktive Lernplattform für Microsoft Endpoint Administrator (MD-102) und Microsoft 365 Administrator (MS-102) Zertifizierungen",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 antialiased">
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
