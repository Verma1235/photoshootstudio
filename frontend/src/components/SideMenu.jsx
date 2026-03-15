const SideMenu = ({iconstoggle,menuflag,handleMenuToggle,handleIconsToggle}) => {
  return (
    <>
      {/* side menu */}

      <div
        className={`${iconstoggle ? "xl:w-[50px]" : "xl:w-[250px]"} hidden xl:block bg-[#ffffff47] h-full p-2`}
      >
        <div className=" w-full h-[40px] bg-[#ffffff3a] gap-1 xl:flex justify-between items-center px-1 rounded backdrop-blur shadow">
          {iconstoggle || <h3>PHOTOSHOOTSTUDIO</h3>}
          <svg
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
            <path d="M9 3v18"></path>
            <path d="m16 15-3-3 3-3"></path>
          </svg>{" "}
        </div>
      </div>

      {menuflag || (
        <div className="xl:hidden absolute top-0 left-0  z-20 bg-linear-to-r from-[#fab2987b] to-[#ef9cfa5f] w-full h-full backdrop-blur p-5">
          <div className="w-full h-[50px]  flex justify-between items-center p-2 rounded backdrop-blur shadow-sm">
            <h1>PHOTOSHOOTSTUDIO</h1>
            <svg
              onClick={handleMenuToggle}
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
              <path d="M9 3v18"></path>
              <path d="m16 15-3-3 3-3"></path>
            </svg>{" "}
          </div>
        </div>
      )}
    </>
  );
};

export { SideMenu };
