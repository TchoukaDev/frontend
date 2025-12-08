export default function SkeletonSection({ children, height = "" }) {
  return (
    <div
      className={` animate-pulse bg-gray-100 w-full shadow-lg border border-blue2 rounded-xl p-10 space-y-4 ${height}`}
    >
      {children}
    </div>
  );
}
