interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "secondary" | "outline" | "destructive";
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  const variants = {
    default: "bg-blue-500 text-white border-transparent",
    secondary:
      "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 border-transparent",
    outline: "bg-transparent border-current",
    destructive: "bg-red-500 text-white border-transparent",
  };

  return (
    <span
      className={`inline-flex items-center rounded border px-2 py-0.5 text-xs font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
