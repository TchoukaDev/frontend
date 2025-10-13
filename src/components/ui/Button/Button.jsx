"use client";

export default function Button({
  children,
  disabled,
  onClick,
  onMouseDown,
  sm,
}) {
  return (
    <button
      onClick={onClick}
      onMouseDown={onMouseDown}
      type="submit"
      disabled={disabled}
      className={`btn  ${sm && "text-sm"}`}
    >
      {children}
    </button>
  );
}
