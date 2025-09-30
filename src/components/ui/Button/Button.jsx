"use client";

export default function Button({ children, disabled, onClick, sm }) {
  return (
    <button
      onClick={onClick}
      type="submit"
      disabled={disabled}
      className={`btn  ${sm && "text-sm"}`}
    >
      {children}
    </button>
  );
}
