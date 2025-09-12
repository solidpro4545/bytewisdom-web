export default function ByteWisdomLogo({ size = 40 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ verticalAlign: 'middle' }}
    >
      <circle cx="30" cy="30" r="28" stroke="#6C63FF" strokeWidth="4"/>
      <path d="M22 16h10a8 8 0 1 1 0 16h-10V16z" stroke="#6C63FF" strokeWidth="3" fill="none"/>
      <circle cx="37" cy="24" r="2.8" fill="#6C63FF"/>
      <circle cx="37" cy="32" r="2.8" fill="#6C63FF"/>
    </svg>
  );
}
