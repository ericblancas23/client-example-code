interface IconProps {
  outerFill?: string;
  innerFill?: string;
  size?: number;
}

export function Icon({
  outerFill = "white",
  innerFill = "white",
  size = 32,
}: IconProps) {
  return (
    <svg
      fill="none"
      width={size}
      height={size}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="2"
        y="2"
        width="28"
        height="28"
        rx="14"
        stroke={outerFill}
        strokeWidth="4"
      />
      <rect width="4" height="18" rx="2" fill={outerFill} />
      <rect x="28" y="14" width="4" height="18" rx="2" fill={outerFill} />
      <rect x="14" y="12" width="4" height="8" rx="2" fill={innerFill} />
      <rect
        x="20"
        y="14"
        width="4"
        height="8"
        rx="2"
        transform="rotate(90 20 14)"
        fill={innerFill}
      />
    </svg>
  );
}
