import { useState, useEffect, useRef } from "react";
import { Header } from "../components/Header.jsx";
import mypic from "../assets/dinesh.png";
import { CardView } from "../components/CardView.jsx";
import { SideMenu } from "../components/SideMenu.jsx";

import { cardData } from "../dataset/cardData.jsx";
import { OverAllReportCard } from "../components/OverAllReportCard.jsx";
import { AnalyticsCard } from "../components/AnalyticsCard.jsx";
import { Icons } from "../components/svg/Icons.jsx";

const UserDashboard = () => {
  const [menuflag, setMenuflag] = useState(true);
  const [iconstoggle, setIconsToggle] = useState(false);
  const [popUp, setpopUp] = useState(false);

  const handleMenuToggle = () => {
    setMenuflag(!menuflag);
  };

  const handleIconsToggle = () => {
    setIconsToggle(!iconstoggle);
  };
  const handlePopUpToggle = () => {
    setpopUp(!popUp);
  };

  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, []);

  return (
    <>
      <div className="relative min-h-screen bg-gradient-to-r from-[#ff9169bf] to-[#e04ef3bb] p-2 flex justify-center items-start md:items-center">
        <div className="h-[98vh] w-[99%] bg-[#ffffff5f] rounded-xl shadow-lg shadow-red-400/50 overflow-hidden flex xl:gap-3">
          <SideMenu
            iconstoggle={iconstoggle}
            menuflag={menuflag}
            handleMenuToggle={handleMenuToggle}
            handleIconsToggle={handleIconsToggle}
          />

          {/* MAIN AREA */}
          <div
            className={`flex flex-col w-full ${
              iconstoggle ? "xl:w-[calc(100%-50px)]" : "xl:w-[calc(100%-250px)]"
            }`}
          >
            <Header mypic={mypic} handleMenuToggle={handleMenuToggle} />

            {/* ✅ ONLY SCROLL AREA */}
            <div ref={containerRef} className="flex-1 overflow-y-auto p-2">
              <div className="flex flex-col md:flex-row gap-4">
                {/* LEFT SIDE */}
                <div className="w-full md:w-3/5 h-full flex flex-col gap-4">
                  {/* Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 justify-items-center">
                    {cardData.map((DATA, index) => (
                      <CardView
                        key={index}
                        DATA={DATA}
                        handlePopUpToggle={handlePopUpToggle}
                      />
                    ))}
                  </div>

                  {/* Recent Booking */}
                  <div className="w-[95%] h-auto min-h-[200px] bg-white/40 backdrop-blur rounded-xl border border-white/20 p-4 m-auto">
                    <h2 className="text-emerald-900 font-semibold mb-3">
                      Recent Bookings
                    </h2>

                    <hr className="bg-lime-400 h-0.5 border-0" />

                    <div className="w-full rounded-lg border border-dashed border-white/10 p-2 overflow-x-auto">
                      <table className="table-auto w-full  min-w-[500px] overflow-x-auto">
                        <thead className="border-b-2 border-b-emerald-800/10">
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
                              <span className="px-2 rounded-full animate-pulse bg-red-500 text-white font-bold block pb-1">
                                pending
                              </span>
                            </td>

                            <td>₹35000</td>

                            <td>
                              <span className="px-2 rounded-full bg-emerald-700 text-white font-bold block pb-1">
                                completed
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* RIGHT PANEL */}
                <div className="w-[98%] m-auto md:w-2/5 flex flex-col gap-4">
                  <OverAllReportCard />

                  <AnalyticsCard />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* PopUp model */}
      {popUp && (
        <div
          className="absolute top-0 left-0 z-50 h-screen w-screen flex items-center justify-center bg-white/5"
          onClick={handlePopUpToggle}
        >
          <div className="relative w-[90%] h-[90%] max-w-[700px] max-h-[700px] backdrop-blur-[3px] rounded-3xl shadow-2xl border-2"
          onClick={(e) => e.stopPropagation()}
          >
            <span className="absolute top-4 right-5 scale-150 cursor-pointer shadow" onClick={handlePopUpToggle}>
              <Icons icon="x" color="purple"  />
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export { UserDashboard };
