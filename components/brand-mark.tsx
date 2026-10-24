export function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <rect width="64" height="64" rx="15" fill="#183D32" />
      <rect x="14" y="10" width="36" height="44" rx="3" fill="#FBF6EA" />
      <rect x="17.5" y="13.5" width="29" height="37" rx="1.5" fill="none" stroke="#C7A45B" strokeWidth="1.4" />
      <rect x="22" y="19" width="20" height="2.6" rx="1.3" fill="#183D32" />
      <rect x="25" y="24.5" width="14" height="2" rx="1" fill="#557963" />
      <path d="M28.5 41 l-3 12 4-2.4 2.5 3.2 1.4-12z M35.5 41 l3 12-4-2.4-2.5 3.2-1.4-12z" fill="#183D32" />
      <circle cx="32" cy="38" r="7" fill="#C7A45B" />
      <circle cx="32" cy="38" r="4.4" fill="none" stroke="#FBF6EA" strokeWidth="1.2" />
    </svg>
  );
}
