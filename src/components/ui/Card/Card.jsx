export default function Card({ children }) {
  return (
    <div className="custom-gradient-light w-[95%] md:w-[80%] lg:w-[70%] py-15 px-5 md:px-16 min-h-[80vh] mx-auto my-10 rounded-2xl border-2 border-blue3 shadow-lg shadow-blue3/30">
      {children}
    </div>
  );
}
