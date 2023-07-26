interface PropsType {
  color: string;
  size: number;
}

export function WaffleIcon({ size = 31, color = "none" }: PropsType) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 31 31"
      fill={color}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M11.5941 0L6.62472 0V6.50754L0 6.50754L0 11.477L6.62472 11.477V19.4046H0L0 24.374H6.62472V31H11.5941V24.374L19.5214 24.374V31H24.4908V24.374H30.9998V19.4046H24.4908V11.477L30.9998 11.477V6.50754L24.4908 6.50754V1.52588e-05L19.5214 1.52588e-05V6.50754L11.5941 6.50754V0ZM19.5214 19.4046V11.477L11.5941 11.477L11.5941 19.4046H19.5214Z"
        fill="#F0745F"
      />
    </svg>
  );
}
