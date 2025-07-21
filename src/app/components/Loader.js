// components/Loader.jsx
export default function Loader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
      <div className="animate-pulse text-lg font-semibold text-black">
        Loading...
      </div>
    </div>
  );
}
