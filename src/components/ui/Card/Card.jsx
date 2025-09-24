export default function Card({ children }) {
  return (
    <div className="custom-gradient-light w-[95%] md:w-[80%] lg:w-[70%] py-8  md:px-16 mx-auto my-10 rounded-2xl border-2 border-blue3 shadow-lg shadow-blue3/30">
      {children}
    </div>
  );
}
