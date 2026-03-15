const CardView = () => {
  const percentage = 50;
  const color = "#00d5ff";

  return (
    <>
      <div className="w-[270px] h-[160px] sm:w-[200px] sm:h-[120px] bg-gradient-to-r from-[#bcf27e51] to-[#85e8b27f]  rounded-2xl flex overflow-hidden px-2 shadow-lg border border-amber-300 transition-transform duration-300 hover:scale-108 hover:z-50 hover:bg-amber-200 lg:scale-90 xl:scale-100">
        {/* Left Side: Icon and Stats */}
        <div className="w-3/5 h-full p-3 flex flex-col justify-between">
          <div className="w-10 h-10 bg-[#a6eefda6] rounded-lg flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke={color}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"></path>
            </svg>
          </div>
          <div>
             <h2 className="font-bold text-2xl text-slate-900 leading-none">2341+</h2>
             <div className="text-sm text-amber-900 font-mono mt-1">Bookings</div>
          </div>
        </div>

        {/* Right Side: Options and Progress */}
        <div className="w-2/5 h-full flex flex-col">
          {/* Dots Icon Container */}
          <div className="w-full h-1/3 flex justify-end items-center pr-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="cursor-pointer opacity-70 hover:opacity-100"
            >
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="12" cy="5" r="1"></circle>
              <circle cx="12" cy="19" r="1"></circle>
            </svg>
          </div>

          {/* Progress Ring Container */}
          <div className="w-full h-2/3 flex items-center justify-center relative pb-2">
            
            {/* Percentage Text: Centered perfectly regardless of size */}
            <span className="absolute z-10 text-[12px] font-bold text-slate-800">
                {percentage}%
            </span>

            {/* The Animated Ring */}
            <div 
              className="w-[60px] h-[60px] rounded-full"
              style={{
                background: `conic-gradient(${color} ${percentage}%, #e2e8f0 0)`,
                WebkitMask: 'radial-gradient(farthest-side, transparent 75%, white 0)',
                mask: 'radial-gradient(farthest-side, transparent 75%, white 0)',
                filter: `drop-shadow(0 0 5px ${color}80)`,
                transition: `all 0.5s ease-in-out`
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export { CardView };