interface Props {
  as?: "div" | "h1" | "h2" | "p";
  children: string;
  className: string;
}

export function GradientText({ as = "div", children, className }: Props) {
  const fullClassName = `
    bg-clip-text text-transparent bg-gradient-to-r from-[#A2F2E3] to-[#7FA3E8]
    whitespace-pre-line
    ${className}
  `;

  if (as === "p") {
    return <p className={fullClassName}>{children}</p>;
  }

  if (as === "h1") {
    return <h1 className={fullClassName}>{children}</h1>;
  }

  if (as === "h2") {
    return <h2 className={fullClassName}>{children}</h2>;
  }

  return <div className={fullClassName}>{children}</div>;
}
