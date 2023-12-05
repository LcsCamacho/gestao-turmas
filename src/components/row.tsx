export const Row = ({
  children,
  className,
  gap,
}: {
  children: React.ReactNode;
  className?: string;
  gap?: number;
}) => {
  return (
    <div
      className={`flex flex-wrap items-start justify-start gap-${gap || "4"} ${
        className || ""
      }`}
    >
      {children}
    </div>
  );
};
