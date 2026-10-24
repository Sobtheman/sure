type P = { className?: string };

export function Arrow({ className = "" }: P) {
  return (
    <svg viewBox="0 0 20 10" className={`h-[10px] w-5 ${className}`} fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden>
      <path d="M0 5h18.5M14.5 1l4 4-4 4" />
    </svg>
  );
}

export function Close({ className = "" }: P) {
  return (
    <svg viewBox="0 0 16 16" className={`h-4 w-4 ${className}`} fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
      <path d="M2 2l12 12M14 2L2 14" />
    </svg>
  );
}

export function Plus({ className = "" }: P) {
  return (
    <svg viewBox="0 0 12 12" className={`h-3 w-3 ${className}`} fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
      <path d="M6 0v12M0 6h12" />
    </svg>
  );
}
