const SideMenu = ({
  iconstoggle,
  menuflag,
  handleMenuToggle,
  handleIconsToggle,
  smsideBtn
}) => {
  return (
    <>
      {/* Desktop Side Menu */}
      <div
        className={`hidden xl:block bg-[#ffffff47] h-full p-2
        ${iconstoggle ? "xl:w-[50px]" : "xl:w-[250px]"}
        transition-all duration-300 ease-in-out`}
      >
        <div className="w-full h-[40px] bg-[#ffffff3a] gap-1 xl:flex justify-between items-center px-1 rounded backdrop-blur shadow">
          {!iconstoggle && <h3>PHOTOSHOOTSTUDIO</h3>}

          {iconstoggle ? (
            <svg
              className="cursor-pointer hover:bg-lime-400 rounded "
              onClick={handleIconsToggle}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect width="18" height="18" x="3" y="3" rx="2"></rect>
              <path d="M15 3v18"></path>
              <path d="m8 9 3 3-3 3"></path>
            </svg>
          ) : (
            <svg
              onClick={handleIconsToggle}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="cursor-pointer"
            >
              <rect width="18" height="18" x="3" y="3" rx="2"></rect>
              <path d="M9 3v18"></path>
              <path d="m16 15-3-3 3-3"></path>
            </svg>
          )}
        </div>
      </div>

      {/* Mobile Side Menu */}
      <div
        className={`xl:hidden absolute top-0 left-0 z-20 
        bg-linear-to-r from-[#fab2987b] to-[#ef9cfa5f] 
       w-full sm:w-4/5 max-w-[500px] h-full backdrop-blur p-5
        transform transition-transform duration-300 ease-in-out
        ${menuflag ? "-translate-x-full" : "translate-x-0"}`}
      >
        <div className="w-full h-[50px] flex justify-between items-center p-2 rounded backdrop-blur shadow-sm">
          <h1>PHOTOSHOOTSTUDIO</h1>

          <svg
            onClick={handleMenuToggle}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="cursor-pointer"
          >
            <rect width="18" height="18" x="3" y="3" rx="2"></rect>
            <path d="M9 3v18"></path>
            <path d="m16 15-3-3 3-3"></path>
          </svg>
        </div>
        <div>
          <smsideBtn/>
          
        </div>
      </div>
    </>
  );
};

export { SideMenu };
