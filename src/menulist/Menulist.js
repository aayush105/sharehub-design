import React from "react";
import { IoHomeOutline } from "react-icons/io5";
import { IoNewspaperOutline } from "react-icons/io5";
import { AiOutlineStock } from "react-icons/ai";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { TbHomeDollar } from "react-icons/tb";
import { IoBarChartOutline } from "react-icons/io5";
import { LiaToolsSolid } from "react-icons/lia";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { FaPeopleRoof } from "react-icons/fa6";

export const MenuList = [
  {
    title: "Home",
    path: "/",
    icon: <IoHomeOutline fontSize={"22px"} />,
  },
  {
    title: "News",
    path: "/news",
    icon: <IoNewspaperOutline fontSize={"22px"} />,
    isSub: true,
    subMenus: [
      {
        title: "Arthakendra",
        path: "/news/arthakendra",
      },
      {
        title: "Announcement",
        path: "/news/announcement",
      },
    ],
  },
  {
    title: "Nepse",
    path: "/nepse",
    icon: <AiOutlineStock fontSize={"22px"} />,
    isSub: true,
    subMenus: [
      {
        title: "Live Nepse",
        path: "/nepse/live",
      },
      {
        title: "Stock Price",
        path: "/nepse/stock-price",
      },
      {
        title: "Market Indices",
        path: "/nepse/market-indices",
      },
      {
        title: "Floorsheet",
        path: "/nepse/floorsheet",
      },
      {
        title: "Top Gainers",
        path: "/nepse/top-gainers",
      },
      {
        title: "Top Losers",
        path: "/nepse/top-losers",
      },
      {
        title: "Today's Top",
        path: "/nepse/todays-top",
      },
      {
        title: "52 Week High/Low",
        path: "/nepse/HL-week",
      },
      {
        title: "Sector Summary",
        path: "/nepse/sector-summary",
      },
      {
        title: "Mutual Fund",
        path: "/nepse/mutual-fund",
      },
      {
        title: "Price Volume Analysis",
        path: "/nepse/price-volume",
      },
      {
        title: "Datawise Summary",
        path: "/nepse/datawise-summary",
      },
      {
        title: "Datewise Market Capital",
        path: "/nepse/datawise-market",
      },
      {
        title: "Market Depth",
        path: "/nepse/market-depth",
      },
      {
        title: "Datewise Indices",
        path: "/nepse/datawise-indices",
      },
      {
        title: "Daily Market Summary",
        path: "/nepse/daily-market",
      },
      {
        title: "Price History",
        path: "/nepse/price-history",
      },
      {
        title: "Nepse Price History",
        path: "/nepse/nepse-price-history",
      },
    ],
  },
  {
    title: "Investment",
    path: "/investment",
    icon: <FaHandHoldingDollar fontSize={"22px"} />,
    isSub: true,
    subMenus: [
      {
        title: "Proposed Dividend",
        path: "/investment/proposed-dividend",
      },
      {
        title: "Existing Issues",
        path: "/investment/existing-issues",
      },
      {
        title: "IPO Pipeline",
        path: "/investment/iso",
      },
      {
        title: "Auctions",
        path: "/investment/autions",
      },
      {
        title: "Broker List",
        path: "/investment/broker",
      },
      {
        title: "Promoter Unlock",
        path: "/investment/promoter-unlock",
      },
      {
        title: "Stock By Market Cap",
        path: "/investment/cap",
      },
      {
        title: "Dividend King",
        path: "/investment/dividend-king",
      },
      {
        title: "Stock Heatmap",
        path: "/investment/stock-heatmap",
      },
    ],
  },
  {
    title: "Economy",
    path: "/economy",
    icon: <TbHomeDollar fontSize={"22px"} />,
    isSub: true,
    subMenus: [
      {
        title: "Inflation",
        path: "/economy/inflaction",
      },
      {
        title: "NRB Data",
        path: "/economy/NRB-data",
      },
      {
        title: "Merger & Acquisition",
        path: "/economy/merger",
      },
      {
        title: "Forex Rate",
        path: "/economy/forek",
      },
      {
        title: "Gold & Silver",
        path: "/economy/GS",
      },
      {
        title: "Global Market",
        path: "/economy/GM",
      },
      {
        title: "Fuel Rate",
        path: "/economy/FR",
      },
    ],
  },
  {
    title: "Analysis",
    path: "/analysis",
    icon: <IoBarChartOutline fontSize={"22px"} />,
    isSub: true,
    subMenus: [
      {
        title: "Technical Charts",
        path: "/analysis/technical-chart",
      },
      {
        title: "Fundamental Analysis",
        path: "/analysis/fundamental-analysis",
      },
      {
        title: "Broker Analysis",
        path: "/analysis/broker-analysis",
      },
      {
        title: "Financial Analysis",
        path: "/analysis/financial-analysis",
      },
      {
        title: "Candle Stick Pattern",
        path: "/analysis/candle",
      },
      {
        title: "Stockes By Market Cap",
        path: "/analysis/market-cap",
      },
      {
        title: "Divideng King",
        path: "/analysis/divideng-king",
      },
      {
        title: "Hot Stock",
        path: "/analysis/hot-stock",
      },
      {
        title: "Bulk Transaction",
        path: "/analysis/bulk-transaction",
      },
    ],
  },
  {
    title: "Tools",
    path: "/tools",
    icon: <LiaToolsSolid fontSize={"22px"} />,
    isSub: true,
    subMenus: [
      {
        title: "Calculator",
        path: "/tools/calc",
      },
      {
        title: "Compare Stocks",
        path: "/tools/compare-stocks",
      },

      {
        title: "Mero Share",
        path: "/tools/mero-share",
      },
    ],
  },
  {
    title: "Training",
    path: "/training",
    icon: <LiaChalkboardTeacherSolid fontSize={"22px"} />,
    isSub: true,
    subMenus: [
      {
        title: "Live Training",
        path: "/training/live",
      },
      {
        title: "Videos",
        path: "/training/videos",
      },
    ],
  },
  {
    title: "About Us",
    path: "/about",
    icon: <FaPeopleRoof fontSize={"22px"} />,
  },
];
