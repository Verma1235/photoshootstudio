import { useState } from "react";
import { Header } from "../components/Header.jsx";
import mypic from "../assets/dinesh.png";
import { CardView } from "../components/CardView.jsx";
import { SideMenu } from "../components/SideMenu.jsx";

const UserDashboard = () => {
  const [menuflag, setMenuflag] = useState(true); // Start hidden
  const [iconstoggle, setIconsToggle] = useState(true);

  const handleMenuToggle = () => {
    setMenuflag(!menuflag);
  };

  const handleIconsToggle = () => {
    setIconsToggle(!iconstoggle);
  };

  return (
    <>
      <div className="relative h-screen  bg-gradient-to-r from-[#ff9169bf] to-[#e04ef3bb] p-2 flex justify-center items-center overflow-hidden">
        <div className="h-[99%] w-[99%] bg-[#ffffff5f] rounded-xl shadow-lg  shadow-red-400/50 overflow-hidden flex xl:gap-3 ">
          <SideMenu
            iconstoggle={iconstoggle}
            menuflag={menuflag}
            handleMenuToggle={handleMenuToggle}
            handleIconsToggle={handleIconsToggle}
          />

          {/* header */}
          <div
            className={`w-[100%] ${iconstoggle ? "xl:w-[calc(100%-50px)]" : "xl:w-[calc(100%-250px)]"} bg-[#ffffff1c] h-full flex flex-col gap-2 backdrop-blur`}
          >
            <Header mypic={mypic} handleMenuToggle={handleMenuToggle} />

            <div className="w-full h-[calc(100%-60px)] flex flex-col md:flex-row gap-4 p-2 overflow-hidden">
              {/* Left Column: Cards + Recent Bookings */}
              <div className="w-full md:w-3/5 h-full flex flex-col overflow-y-auto pr-1 custom-scrollbar">
                {/* Grid Container */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 justify-items-center mb-6">
                  <CardView />
                  <CardView />
                  <CardView />
                  <CardView />
                  {/* Add more cards here and they will stay evenly aligned */}
                </div>

                {/* Recent Booking Section */}
                <div className="w-[95%] min-h-[400px] bg-white/40 backdrop-blur rounded-xl border border-white/20 p-4 shrink-0 m-auto">
                  <h2 className="text-emerald-900 font-semibold mb-3">
                    Recent Bookings
                  </h2>
                  <hr className="bg-lime-400 h-0.5 outline-0 border-0" />
                  <div className="w-full h-[300px]  rounded-lg border border-dashed border-white/10  text-purple p-2 overflow-auto">
                    <table class="table-auto m-2 w-full min-w-[500px] m-auto ">
                      <thead className=" border-b-2 border-b-emerald-800/10 ">
                        <tr>
                          <th>Tracking ID</th>
                          <th>Product Name</th>
                          <th>Status</th>
                          <th>Price</th>
                          <th>Payment</th>
                        </tr>
                      </thead>
                      <tbody className="font-light text-sm">
                        <tr className="*:text-center *:h-[50px]">
                          <td>#45789655</td>
                          <td>CAMERA_SET45</td>
                          <td>
                            <span className="  h-auto p-x-2 rounded-full animate-pulse bg-red-500 text-amber-50 font-bold text-center block pb-1">
                              {" "}
                              pending{" "}
                            </span>
                          </td>
                          <td>₹35000</td>
                          <td>
                            <span className="  h-auto p-x-2 rounded-full  bg-emerald-700 text-amber-50 font-bold text-center block pb-1">
                              {" "}
                              completed{" "}
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Right Panel */}
              <div className="hidden md:block md:w-2/5 h-full bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 shadow-inner">
                {/* Right panel content (Stats/Activity) */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { UserDashboard };
