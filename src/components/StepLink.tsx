"use client";
import Link from "next/link";

export default function StepLink({ href, children, className = "text-blue-600 hover:underline" }: {
  href: string; children: React.ReactNode; className?: string;
}) {
  const go = () => {
    setTimeout(() => { if (typeof window !== "undefined") window.location.href = href; }, 0);
  };
  return (
    <Link href={href} className={className} onClick={go}>
      {children}
    </Link>
  );
}
