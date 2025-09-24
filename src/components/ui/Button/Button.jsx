"use client";

export default function Button({ children, disabled, margin, onClick, sm }) {
  return (
    <button
      onClick={onClick}
      type="submit"
      disabled={disabled}
      className={`btn ${margin} ${sm && "text-sm"}`}
    >
      {children}
    </button>
  );
}
