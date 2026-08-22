export function Container({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "header" | "footer" | "main" | "nav";
}) {
  return (
    <Tag className={`mx-auto w-full max-w-6xl px-4 sm:px-6 ${className}`}>
      {children}
    </Tag>
  );
}
