export default function WaitlistLoading() {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#f6f2ec] text-[#06183b]">
      <div className="flex flex-col items-center space-y-4">
        {/* Sleek Upstartica Orange Spinner */}
        <div className="w-14 h-14 border-4 border-[rgba(6,24,59,0.12)] border-t-[#ff5a05] rounded-full animate-spin"></div>
        <div className="text-xl font-black text-[#06183b] tracking-wider uppercase">
          Upstartica
        </div>
      </div>
    </div>
  );
}
