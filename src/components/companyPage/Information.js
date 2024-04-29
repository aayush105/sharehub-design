import React, { useEffect, useState } from "react";
import HrlChart from "@/components/charts/HrlChart";
import { BsGraphDownArrow, BsGraphUpArrow } from "react-icons/bs";
import { FiExternalLink } from "react-icons/fi";
import { GiReceiveMoney } from "react-icons/gi";

const Information = () => {
  const [todayInfo, setTodayInfo] = useState({});
  const [generalInfo, setGeneralInfo] = useState({});
  const [performanceValue, setPerformanceValue] = useState({});

  useEffect(() => {
    const fetchTodayInfo = async () => {
      try {
        const response = await fetch(
          "https://arthakendra.com/data/api/v1/stock-price/todays-price/HRL"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch today's information");
        }
        const jsonData = await response.json();
        setTodayInfo(jsonData.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchGeneralInfo = async () => {
      try {
        const response = await fetch(
          "https://arthakendra.com/data/api/v1/security/general-info/HRL"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch general information");
        }
        const jsonData = await response.json();
        setGeneralInfo(jsonData.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchPerformanceValue = async () => {
      try {
        const response = await fetch(
          "https://arthakendra.com/data/api/v1/fundamental/performance-values/HRL"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch performance value");
        }
        const jsonData = await response.json();
        setPerformanceValue(jsonData.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchTodayInfo();
    fetchGeneralInfo();
    fetchPerformanceValue();
  }, []);

  const isPositive = (number) => {
    return number > 0;
  };

  const formatNumber = (number) => {
    return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const formattedDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 md:col-span-8">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 md:col-span-1 p-4 bg-slate-800 rounded-lg shadow-md">
            <div className={`flex justify-between items-center text-white`}>
              <div>
                <h3 className="text-lg font-semibold">Open Price</h3>
                <p className="text-xl">{todayInfo.openPrice}</p>
              </div>
              <div><GiReceiveMoney size={40}/></div>           
            </div>
          </div>
          <div className="col-span-2 md:col-span-1 p-4 bg-slate-800 rounded-lg shadow-md">
            <div className={`flex justify-between items-center ${isPositive(todayInfo.ltp) ? "text-green-600" : "text-red-600"}`}>
              <div>
                <h3 className="text-lg font-semibold">LTP</h3>
                <p className="text-xl">{todayInfo.ltp}</p>
              </div>
              <div>
                {isPositive(todayInfo.ltp) ? (
                  <BsGraphUpArrow size={40} className="text-green-600" />
                ) : (
                  <BsGraphDownArrow size={40} className="text-red-600" />
                )}
              </div>
            </div>
          </div>
          <div className="col-span-2 md:col-span-1 p-4 bg-slate-800 rounded-lg shadow-md">
            <div className={`flex justify-between items-center ${isPositive(todayInfo.change) ? "text-green-600" : "text-red-600"}`}>
              <div>
                <h3 className="text-lg font-semibold">Change</h3>
                <p className="text-xl">{todayInfo.change}</p>
              </div>
              <div>
                {isPositive(todayInfo.change) ? (
                  <BsGraphUpArrow size={40} className="text-green-600" />
                ) : (
                  <BsGraphDownArrow size={40} className="text-red-600" />
                )}
              </div>
            </div>
          </div>
          <div className="col-span-2 md:col-span-1 p-4 bg-slate-800 rounded-lg shadow-md">
            <div className={`flex justify-between items-center ${isPositive(todayInfo.changePercent) ? "text-green-600" : "text-red-600"}`}>
              <div>
                <h3 className="text-lg font-semibold">Change Percentage</h3>
                <p className="text-xl">{todayInfo.changePercent}</p>
              </div>
              <div>
                {isPositive(todayInfo.changePercent) ? ( 
                  <BsGraphUpArrow size={40} className="text-green-600" />
                ) : (
                  <BsGraphDownArrow size={40} className="text-red-600" />
                )}
              </div>
            </div>
          </div>
          <div className="col-span-2 md:col-span-1 p-4 bg-slate-800 rounded-lg shadow-md">
            <div className={`flex justify-between items-center ${isPositive(todayInfo.lowPrice) ? "text-red-600" : "text-green-600"}`}>
              <div>
                <h3 className="text-lg font-semibold">Low</h3>
                <p className="text-xl">{todayInfo.lowPrice}</p>
              </div>
              <div>
                {isPositive(todayInfo.lowPrice) ? (
                  <BsGraphDownArrow size={40} className="text-red-600" />
                ) : (
                  <BsGraphUpArrow size={40} className="text-green-600" />
                )}
              </div>
            </div>
          </div>
          <div className="col-span-2 md:col-span-1 p-4 bg-slate-800 rounded-lg shadow-md">
            <div className={`flex justify-between items-center ${isPositive(todayInfo.highPrice) ? "text-green-600" : "text-red-600"}`}>
              <div>
                <h3 className="text-lg font-semibold">High</h3>
                <p className="text-xl">{todayInfo.highPrice}</p>
              </div>
              <div>
                {isPositive(todayInfo.highPrice) ? (
                  <BsGraphUpArrow size={40} className="text-green-600" />
                ) : (
                  <BsGraphDownArrow size={40} className="text-red-600" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-12 md:col-span-4">
        <div className="p-3 bg-slate-800 rounded-md shadow-md">
          <h2 className="text-lg text-white font-semibold mb-4">Performance Value</h2>
          <div className="flex justify-between mb-2">
            <p className="text-gray-400">Company</p>
            <p className="text-gray-200">{performanceValue.symbol}</p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="text-gray-400">One Year Yield</p>
            <p className="text-gray-200">{performanceValue.oneYearYield}</p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="text-gray-400">Year</p>
            <p className="text-gray-200">{performanceValue.year}</p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="text-gray-400">EPS</p>
            <p className="text-gray-200">{performanceValue.eps}</p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="text-gray-400">PE Ratio</p>
            <p className="text-gray-200">{performanceValue.peRatio}</p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="text-gray-400">Book Value</p>
            <p className="text-gray-200">{performanceValue.bookValue}</p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="text-gray-400">Price per Book Value</p>
            <p className="text-gray-200">{performanceValue.pricePerBookValue}</p>
          </div>
        </div>
      </div>
      
      <div className="col-span-12 md:col-span-8">
        <div className="p-4 bg-slate-800 rounded-md shadow-md">
          <HrlChart />
        </div>
      </div>
      
      <div className="col-span-12 md:col-span-4">
        <div className="p-4 bg-slate-800 rounded-md shadow-md">
          <h2 className="text-lg text-white  font-semibold mb-4">Today's Data</h2>
          <div className="flex justify-between mb-2">
            <p className="text-gray-400">Business Date</p>
            <p className="text-gray-200">{todayInfo.businessDate}</p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="text-gray-400">Open Price</p>
            <p className="text-gray-200">{todayInfo.openPrice}</p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="text-gray-400">High Price</p>
            <p className="text-gray-200">{todayInfo.highPrice}</p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="text-gray-400">Low Price</p>
            <p className="text-gray-200">{todayInfo.lowPrice}</p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="text-gray-400">Last Traded Price (LTP)</p>
            <p className="text-gray-200">{todayInfo.ltp}</p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="text-gray-400">Change Percent</p>
            <p className="text-gray-200">{todayInfo.changePercent}</p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="text-gray-400">Total Traded Quantity</p>
            <p className="text-gray-200">{todayInfo.totalTradedQuantity}</p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="text-gray-400">Total Traded Value</p>
            <p className="text-gray-200">{todayInfo.totalTradedValue}</p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="text-gray-400">Previous Day Close Price</p>
            <p className="text-gray-200">{todayInfo.previousDayClosePrice}</p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="text-gray-400">Total Trades</p>
            <p className="text-gray-200">{todayInfo.totalTrades}</p>
          </div>
          <div className="flex justify-between mb-3">
            <p className="text-gray-400">Last Updated Time</p>
            <p className="text-gray-200">{formattedDateTime(todayInfo.lastUpdatedTime)}</p>
          </div>
        </div>
      </div>

      <div className="col-span-12 md:col-span-6">
        <div className="p-4 bg-slate-800 rounded-lg shadow-md">
          <h2 className="text-lg text-white  font-semibold mb-4">General Information</h2>
          <div className="flex justify-between mb-2">
            <p className="text-gray-400">Name</p>
            <p className="text-gray-200">{generalInfo.name}</p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="text-gray-400">Market Cap</p>
            <p className="text-gray-200">{formatNumber(generalInfo.marketCap)}</p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="text-gray-400">Paid Up Capital</p>
            <p className="text-gray-200">{formatNumber(generalInfo.paidUpCapital)}</p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="text-gray-400">Face Value</p>
            <p className="text-gray-200">{generalInfo.faceValue}</p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="text-gray-400">Listed Shares</p>
            <p className="text-gray-200">{generalInfo.listedShares}</p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="text-gray-400">Public Shares</p>
            <p className="text-gray-200">{generalInfo.publicShares}</p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="text-gray-400">Promoter Shares</p>
            <p className="text-gray-200">{generalInfo.promoterShares}</p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="text-gray-400">52 Week High</p>
            <p className="text-gray-200">{generalInfo.fiftyTwoWeekHigh}</p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="text-gray-400">52 Week Low</p>
            <p className="text-gray-200">{generalInfo.fiftyTwoWeekLow}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-400">Listing Date</p>
            <p className="text-gray-200">{formattedDateTime(generalInfo.listingDate)}</p>
          </div>
        </div>
      </div>


      <div className="col-span-12 md:col-span-6">
        <div className="p-4 bg-slate-800 rounded-lg shadow-md">
          <h2 className="text-lg text-white  font-semibold mb-4">Company General Information</h2>
          <div className="flex justify-between mb-2">
            <p className="text-gray-400">Share Registrar</p>
            <p className="text-gray-200">NMB Capital Limited</p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="text-gray-400">Website</p>
            <a
              href="https://jeevanbikasmf.com/"
              className="text-blue-300 hover:text-blue-100"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://jeevanbikasmf.com/
            </a>
          </div>
          <div className="flex justify-between mb-2">
            <p className="text-gray-400">Email</p>
            <p className="text-gray-200">info@jeevanbikasmf.com</p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="text-gray-400">Contact No.</p>
            <p className="text-gray-200">21-442662</p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="text-gray-400">Head Office</p>
            <p className="text-gray-200">Katahari-2, Morang</p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="text-gray-400">Management Head</p>
            <p className="text-gray-200">Mr. Sanjaya Kumar Mandal</p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="text-gray-400">Promoter Holding</p>
            <p className="text-gray-200">67.00%</p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="text-gray-400">Public Holding</p>
            <p className="text-gray-200">33.00%</p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="text-gray-400">Promoter</p>
            <p className="text-gray-200">{todayInfo.totalTrades}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-400">Government Holding</p>
            <p className="text-gray-200">Foreign Ownership</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Information;
