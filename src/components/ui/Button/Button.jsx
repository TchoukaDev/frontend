"use client";

export default function Button({ children, disabled, margin, onClick }) {
  return (
    <button
      onClick={onClick}
      type="submit"
      disabled={disabled}
      className={`btn ${margin}`}
    >
      {children}
    </button>
  );
}
