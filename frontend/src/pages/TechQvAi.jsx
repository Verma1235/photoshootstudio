import { Icons } from "../components/svg/Icons";
import { useState } from "react";

const TechQvAi = () => {
  const [aitoggle, setaitoggle] = useState(false);

  const handelAiToggleBtn = () => {
    setaitoggle(!aitoggle);
  };
  return (
    <>
      {aitoggle || (
        <div
          className="absolute bottom-5 right-4 sm:right-5 z-[1000] backdrop-blur-[10px] shadow-sm border-2 p-3 rounded-full flex gap-2 text-white font-semibold text-[15px] cursor-pointer bg-gradient-to-r from-[#ff6831b0] to-[#00a6ffb0] transform translate-x-[125px] transition duration-500 hover:translate-x-0  ease-in-out "
          onClick={handelAiToggleBtn}
        >
          <Icons icon="AI" color="blue" />{" "}
          <span className=" ">AI assisstance</span>
        </div>
      )}

      {!aitoggle || (
        <div className="absolute bottom-5 right-4 sm:right-5 bg-gradient-to-r from-[#fdbf6296]/50 to-[#f64af991]/40 w-[90%] sm:w-[80%] max-w-[500px] h-[85%] max-h-[700px] rounded-2xl p-6 z-50 backdrop-blur-[5px]">
          hii i am TechQvAi your Ai Assistance
          <span className="absolute top-3 right-3 scale-125 cursor-pointer" onClick={handelAiToggleBtn}>
            <Icons icon="x" color="purple" />
          </span>
        </div>
      )}
    </>
  );
};

export { TechQvAi };
