"use client";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { FaRegNewspaper } from "react-icons/fa6";
import { GrAnnounce } from "react-icons/gr";
import { AiOutlinePercentage, AiOutlineStock } from "react-icons/ai";
import { TbReport } from "react-icons/tb";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { SiFigshare } from "react-icons/si";
import { GoHistory } from "react-icons/go";
import { BiAnalyse, BiSpreadsheet } from "react-icons/bi";
import { useRef, useState } from "react";
import Information from "@/components/companyPage/Information";
import HRL from "@/images/hrl.jpg"
import Image from "next/image";
import News from "@/components/companyPage/News";
import Announcement from "@/components/companyPage/Announcement";
import { Dropdown } from "flowbite-react";
import RightShares from "@/components/companyPage/RightShares";
import DividendHistory from "@/components/companyPage/DividendHistory";
import PriceHistory from "@/components/companyPage/PriceHistory";

export default function Company() {
  const [selectedButton, setSelectedButton] = useState("Information");
  const informationRef = useRef(null);
  const newsRef = useRef(null);
  const announcementsRef = useRef(null);
  const dividendsRef = useRef(null);
  const rightSharesRef = useRef(null);
  const priceHistoryRef = useRef(null);
  const floorsheetRef = useRef(null);
  const brokerAnalysisRef = useRef(null);
  const fundamentalsRef = useRef(null);
  const financialReportsRef = useRef(null);
  const compareStocksRef = useRef(null);

  const handleButtonClick = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const buttonList = [
    { name: "Information", icon: <IoIosInformationCircleOutline />, ref: informationRef },
    { name: "News", icon: <FaRegNewspaper />, ref: newsRef },
    { name: "Announcements", icon: <GrAnnounce />, ref: announcementsRef },
    { name: "Dividends", icon: <AiOutlinePercentage />, ref: dividendsRef },
    { name: "Right Shares", icon: <SiFigshare />, ref: rightSharesRef },
    { name: "Price History", icon: <GoHistory />, ref: priceHistoryRef },
    { name: "Floorsheet", icon: <BiSpreadsheet />, ref: informationRef },
    { name: "Broker Analysis", icon: <BiAnalyse />, ref: informationRef },
    { name: "Fundamentals", icon: <LiaFileInvoiceDollarSolid />, ref: informationRef },
    { name: "Financial Reports", icon: <TbReport />, ref: informationRef },
    { name: "Compare Stocks", icon: <AiOutlineStock />, ref: informationRef },
  ];

  return (
    <>
      <main>
      <div className="col-span-12 text-2xl bg-slate-900 font-bold p-2 text-slate-300 flex items-center">
        <Image 
          src={HRL}
          height={50}
          width={50}
          className="mr-2 rounded-full"
        />
        <span>HRL Himalayan Reinsurance Limited</span>
      </div>
        <div className=" p-2 grid bg-slate-900 grid-cols-12 gap-2 ">
          <div className="p-2 mb-2 rounded-md md:col-span-2 hidden md:block bg-gray-800 ">
            <div class="w-100 h-max sticky top-[0]">
              <ul class="flex-column space-y space-y-4 text-sm font-medium text-gray-400 mb-4">
                {buttonList.map((item, index) => (
                  <li key={item.index}>
                    <button
                      class={`relative inline-flex items-center px-3 py-2 rounded-lg ${
                        selectedButton === item.name
                          ? "text-white bg-gray-600"
                          : "text-gray-400 bg-gray-800"
                      } w-full `}
                      // aria-current="page"
                      onClick={() => {
                        setSelectedButton(item.name);
                        handleButtonClick(item.ref);
                      }}
                    >
                      <div className="mr-2">{item.icon}</div>
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="p-2 rounded block col-span-12 md:hidden bg-slate-800 ">
            <Dropdown
              label={selectedButton}
              style={{color: "white", borderColor: "gray"}}
            >
              {buttonList.map((item) => (
                <Dropdown.Item
                  key={item.name}
                  className="text-white bg-gray-600"
                  onClick={() => {
                    setSelectedButton(item.name);
                    handleButtonClick(item.ref);
                  }}
                >
                  {item.name}
                </Dropdown.Item>
              ))}
            </Dropdown>
          </div>
 
          <div className="col-span-12 md:col-span-10 p-2 bg-gray-600 rounded-md mb-2 mr-3">
            <div className="grid grid-cols-12 gap-4 bg-gray-600">
              <div className="col-span-12" ref={informationRef}>
                <div className="bg-gray-700 rounded-lg p-4 shadow-md mt-2">
                  <Information />
                </div>
              </div>
              <div className="col-span-12 md:col-span-12" ref={newsRef}>
                <div className="bg-gray-700 rounded-lg p-4 shadow-md mt-2">
                  <News />
                </div>
              </div>
              <div className="col-span-12 md:col-span-3" ref={announcementsRef}>
                <div className="bg-gray-700 rounded-lg p-4 shadow-md mt-2">
                  <Announcement />
                </div>
              </div><div className="col-span-12 md:col-span-9" ref={rightSharesRef}>
                <div className="bg-gray-700 rounded-lg p-4 shadow-md mt-2">
                  <RightShares />
                </div>
              </div>
              <div className="col-span-12 md:col-span-12 " ref={dividendsRef}>
                <div className="bg-gray-700 rounded-lg p-4 shadow-md mt-2">
                  <DividendHistory />
                </div>
              </div>
              <div className="col-span-12 md:col-span-12 " ref={priceHistoryRef}>
                <div className="bg-gray-700 rounded-lg p-4 shadow-md mt-2">
                  <PriceHistory />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
