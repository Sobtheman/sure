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

export function Instagram({ className = "" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={`h-5 w-5 ${className}`} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function TikTok({ className = "" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={`h-5 w-5 ${className}`} fill="currentColor" aria-hidden>
      <path d="M16.6 3c.3 2.2 1.6 3.7 3.9 3.9v3.1c-1.4.1-2.7-.3-3.9-1.1v6.2c0 3.5-2.6 5.9-5.8 5.9-3.3 0-5.8-2.6-5.6-5.9.2-3.1 2.9-5.4 6.1-5.1v3.2c-1.5-.3-2.9.7-3 2.1-.1 1.4 1 2.6 2.4 2.6 1.4 0 2.5-1.1 2.5-2.6V3h3.4z" />
    </svg>
  );
}

export function WhatsApp({ className = "" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={`h-5 w-5 ${className}`} fill="currentColor" aria-hidden>
      <path d="M12 2.2a9.7 9.7 0 0 0-8.3 14.8L2.3 21.8l4.9-1.3A9.7 9.7 0 1 0 12 2.2zm0 17.7c-1.5 0-3-.4-4.2-1.2l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 1 1 12 19.9zm4.4-6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8.9c-.1.2-.3.2-.5.1-.7-.3-1.4-.7-2-1.3-.5-.5-.9-1-1.2-1.6-.1-.2 0-.4.1-.5l.4-.4.2-.4v-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3-.6.6-.9 1.4-.9 2.2.1 1 .5 1.9 1.1 2.7 1.1 1.6 2.6 2.9 4.4 3.6.5.2.9.3 1.4.4.5.1 1.1.1 1.6-.1.5-.2 1-.6 1.3-1.1.1-.3.1-.6.1-.9l-.4-.2z" />
    </svg>
  );
}
