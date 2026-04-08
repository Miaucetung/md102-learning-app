// src/app/layout.tsx
import "./globals.css";

export const metadata = {
  title: "MainLab",
  description: "Practice labs for Hyper-V, AD/DNS/DHCP, Entra/Intune",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className="min-h-screen bg-white text-zinc-900">
        {children}
      </body>
    </html>
  );
}
