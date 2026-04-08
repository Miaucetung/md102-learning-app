// src/app/lab-az104-exam/layout.tsx
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl p-6">
      {children}
    </div>
  );
}
