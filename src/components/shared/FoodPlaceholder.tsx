export function FoodPlaceholder({ className = "" }: { className?: string }) {
  return (
    <div className={`placeholder-icon ${className}`}>
      <svg
        className="w-12 h-12 text-[var(--color-text-tertiary)] opacity-40"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1}
      >
        {/* Fork and knife icon */}
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v8m0 0c0 2.21-1.79 4-4 4H7m5-4c0 2.21 1.79 4 4 4h1" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 14v8m10-8v8" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 2v6c0 1.1.9 2 2 2h0c1.1 0 2-.9 2-2V2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 2v4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 2c0 3-2 5-2 8h0c1.1 0 2-.9 2-2V2z" />
      </svg>
    </div>
  );
}
