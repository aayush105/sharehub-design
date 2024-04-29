import React, { useState, useEffect, useRef } from "react";
import { PiChartLineDownBold, PiChartLineUpBold } from "react-icons/pi";
import { Tabs, TabsHeader, Tab } from "@material-tailwind/react";

const TABS = [
  {
    label: "Top Gainers",
    value: "gainers",
  },
  {
    label: "Top Losers",
    value: "losers",
  },
];

const GainLoseTable = () => {
  const [tabIndex, setIndex] = useState("gainers");
  const [data, setData] = useState([]);
  const tableRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      let url = "";

      if (tabIndex === "gainers") {
        url = "https://live.nepsesharehub.com/v1/nepselive/top-gainers";
      } else if (tabIndex === "losers") {
        url = "https://live.nepsesharehub.com/v1/nepselive/top-losers";
      }

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, [tabIndex]);

  const handleTabChange = (value) => {
    setIndex(value);
    if (tableRef.current) {
      tableRef.current.scrollTop = 0;
    }
  };

  const renderRows = (data) => {
    return data.map((item, index) => (
      <tr key={index} className={index % 2 === 0 ? "bg-gray-200 text-black" : "bg-gray-100 text-black"}>
        <td className="border px-4 py-2">{item.symbol}</td>
        <td className="border px-4 py-2">
          <div className={`flex items-center justify-center ${item.pointChange < 0 ? "bg-red-200 text-red-800 rounded-lg" : "bg-green-200 text-green-800 rounded-lg"}`}>
            {typeof item.pointChange === 'number' ? item.pointChange.toFixed(2) : '-'}
            {typeof item.pointChange === 'number' && item.pointChange < 0 ? (
              <PiChartLineDownBold className="text-red-800" />
            ) : (
              <PiChartLineUpBold className="text-green-800" />
            )}
          </div>
        </td>
        <td className="border px-4 py-2">
          <div className={`flex items-center justify-center ${item.percentageChange < 0 ? "bg-red-200 text-red-800 rounded-lg" : "bg-green-200 text-green-800 rounded-lg"}`}>
            {typeof item.percentageChange === 'number' ? item.percentageChange.toFixed(2) : '-'}%
            {typeof item.percentageChange === 'number' && item.percentageChange < 0 ? (
              <PiChartLineDownBold className="text-red-800" />
            ) : (
              <PiChartLineUpBold className="text-green-800" />
            )}
          </div>
        </td>
        <td className="border px-4 py-2">{item.ltp}</td>
      </tr>
    ));
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Tabs value={tabIndex} onChange={handleTabChange}>
        <TabsHeader>
          {TABS.map(({ label, value }) => (
            <Tab
              key={value}
              value={value}
              onClick={() => handleTabChange(value)}
              className={`cursor-pointer ${
                tabIndex === value
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500"
              }`}
            >
              {label}
            </Tab>
          ))}
        </TabsHeader>
      </Tabs>

      <div className="w-full overflow-hidden rounded-lg shadow-md max-h-96">
        <table className="w-full table-auto text-sm">
          <thead className="uppercase">
            <tr className="bg-gray-800 text-white">
              <th className="px-4 py-2">Symbol</th>
              <th className="px-4 py-2">Change</th>
              <th className="px-4 py-2">% Change</th>
              <th className="px-4 py-2">LTP</th>
            </tr>
          </thead>
        </table>
      </div>
      <div className="w-full overflow-y-auto rounded-lg shadow-md max-h-98" ref={tableRef}>
        <table className="w-full table-auto">
          <tbody>{renderRows(data)}</tbody>
        </table>
      </div>
    </div>
  );
};

export default GainLoseTable;
