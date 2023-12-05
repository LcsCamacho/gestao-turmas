export const Col = ({
  children,
  className,
  gap,
}: {
  children: React.ReactNode;
  className?: string;
  gap?: number;
}) => {
  return (
    <div className={`flex flex-col gap-${gap || "4"} ${className || ""}`}>
      {children}
    </div>
  );
};
