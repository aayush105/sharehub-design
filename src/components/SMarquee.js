"use client";
import React from "react";
import Marquee from "react-fast-marquee";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import "../css/Marquee.css";
import { useTheme } from "next-themes";

const SMarquee = ({ data }) => {
  const { theme, setTheme } = useTheme();

  const IconStatus = (difference) => {
    if (difference > 0) {
      return <IoIosArrowUp color="green" style={{ marginLeft: "5px" }} />;
    } else {
      return <IoIosArrowDown color="red" style={{ marginLeft: "5px" }} />;
    }
  };

  return (
    <div className="marquee-container">
      <Marquee  pauseOnHover style={{ overflowX: "hidden" }} className="dark:bg-slate-900">
        <div className="marquee-content">
          {data?.map((item, index) => (
            <div key={index} className="relative py-3 sm:max-w-xl sm:mx-auto">
              <button className="group cursor-pointer relative flex items-center bg-white dark:bg-gray-700 hover:dark:bg-gray-800 text-gray-800 font-semibold py-1 px-4 border border-gray-400 rounded shadow">
                <p className="text-sm text-gray-600 dark:text-slate-300">
                  {item.symbol} {item.lastTradedPrice} &#40;{" "}
                  {(item.openPrice - item.lastTradedPrice).toFixed(2)} &#41;
                </p>
                {IconStatus(item.openPrice - item.lastTradedPrice)}
              </button>
            </div>
          ))}
        </div>
      </Marquee>
    </div>
  );
};

export default SMarquee;
