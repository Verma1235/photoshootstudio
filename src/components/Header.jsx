const Header = ({ mypic, handleMenuToggle }) => {
  return (
    <>
      <div className="w-100% h-[40px]  mx-2 my-1 rounded flex items-center justify-between px-1 backdrop-blur">
        <h2 className="font-mono text-xl hidden sm:block">Dashboard</h2>
        {/* side menu start */}
        <div
          className="sm:hidden flex items-center justify-center w-[40px] h-full"
          onClick={handleMenuToggle}
        >
          <svg
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
            <path d="M17 6H3"></path>
            <path d="M21 12H8"></path>
            <path d="M21 18H8"></path>
            <path d="M3 12v6"></path>
          </svg>
        </div>
        {/* side menu end */}
        <div className="w-[calc(100%-50px)] lg:max-w-[500px] h-full  flex items-center justify-end px-2 gap-2">
          <div className="bg-[#ffffffa8] w-[70%] h-[90%] rounded border-1 border-blue-100 flex overflow-hidden">
            <input
              type="search"
              className="w-[calc(100%-40px)] h-full bg-red  focus:outline-none px-2 py-1 text-emerald-900"
              placeholder="Search"
            />
            <button className="w-[40px] bg-blue-400 flex items-center justify-center ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="m13 13.5 2-2.5-2-2.5"></path>
                <path d="m21 21-4.3-4.3"></path>
                <path d="M9 8.5 7 11l2 2.5"></path>
                <circle cx="11" cy="11" r="8"></circle>
              </svg>
            </button>
          </div>
          <div className=" w-[50px] h-[90%]  px-0.5 py-px flex items-center justify-center">
            <img
              src={mypic}
              className="h-full border-1 border-amber-400 rounded  border-gra bg-blue-500 flex items-center justify-center shadow-sm shadow-pink-500 "
              alt="img"
            ></img>
          </div>
        </div>
      </div>
    </>
  );
};

export { Header };
