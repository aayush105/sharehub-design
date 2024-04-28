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
import { useEffect, useState } from "react";
import Information from "@/components/companyPage/Information";
import HRL from "@/images/hrl.jpg"
import Image from "next/image";

export default function Company() {
  const [selectedButton, setSelectedButton] = useState("Information");

  const buttonList = [
    { name: "Information", icon: <IoIosInformationCircleOutline /> },
    { name: "News", icon: <FaRegNewspaper /> },
    { name: "Announcements", icon: <GrAnnounce /> },
    { name: "Dividends", icon: <AiOutlinePercentage /> },
    { name: "Right Shares", icon: <SiFigshare /> },
    { name: "Price History", icon: <GoHistory /> },
    { name: "Floorsheet", icon: <BiSpreadsheet /> },
    { name: "Broker Analysis", icon: <BiAnalyse /> },
    { name: "Fundamentals", icon: <LiaFileInvoiceDollarSolid /> },
    { name: "Financial Reports", icon: <TbReport /> },
    { name: "Compare Stocks", icon: <AiOutlineStock /> },
  ];

  return (
    <>
      <main>
      <div className="col-span-12 text-2xl bg-gray-100 dark:bg-slate-900 font-bold p-2 text-gray-600 dark:text-slate-300 flex items-center">
        <Image 
          src={HRL}
          height={50}
          width={50}
          className="mr-2 rounded-full"
        />
        <span>HRL Himalayan Reinsurance Limited</span>
      </div>

        <div className=" p-2 grid bg-gray-100 dark:bg-slate-900 grid-cols-12 gap-2 ">
          <div className="p-2 rounded md:col-span-2 hidden md:block bg-gray-200 dark:bg-gray-800 ">
            <div class="w-100 h-max sticky top-[0]">
              <ul class="flex-column space-y space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
                {buttonList.map((item) => (
                  <li>
                    <a
                      href="#"
                      class={`inline-flex relative items-center px-3 py-2 rounded-lg ${
                        selectedButton === item.name
                          ? "text-white bg-gray-600"
                          : "dark:text-white text-black bg-gray-200 dark:bg-gray-800"
                      } active w-full `}
                      aria-current="page"
                      onClick={() => {
                        setSelectedButton(item.name);
                      }}
                    >
                      <div className="mr-2">{item.icon}</div>

                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="w-full p-3 rounded md:col-span-10 col-span-12 bg-gray-200 dark:bg-gray-600 mr-3">
            <Information />
          </div>
        </div>
      </main>
    </>
  );
}
