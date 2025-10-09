export default function GradientLine({ className }) {
  return (
    <div
      className={`mx-auto my-4 w-full lg:w-96 bg-gradient-to-r from-bright-yellow to-white h-[2px] ${className}`}
    ></div>
  );
}
