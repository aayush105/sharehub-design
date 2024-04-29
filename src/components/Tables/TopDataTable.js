import React, { useState, useEffect, useRef } from "react";
import { PiChartLineDownBold, PiChartLineUpBold } from "react-icons/pi";
import { Tabs, TabsHeader, Tab } from "@material-tailwind/react";

const TABS = [
  {
    label: "Top Turnover",
    value: "turnover",
  },
  {
    label: "Top Traded Shares",
    value: "tradedShares",
  },
  {
    label: "Top Transactions",
    value: "transactions",
  },
];

const TopDataTable = () => {
  const [tabIndex, setIndex] = useState("turnover");
  const [data, setData] = useState([]);
  const tableRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      let url = "";

      if (tabIndex === "turnover") {
        url = "https://live.nepsesharehub.com/v1/nepselive/top-turnover";
      } else if (tabIndex === "tradedShares") {
        url = "https://live.nepsesharehub.com/v1/nepselive/top-shares-traded";
      } else if (tabIndex === "transactions") {
        url = "https://live.nepsesharehub.com/v1/nepselive/top-transactions";
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
    switch (tabIndex) {
      case "turnover":
        return data.map((item, index) => (
          <tr key={index} className={index % 2 === 0 ? "bg-gray-200 text-black" : "bg-gray-100 text-black"}>
            <td className="border px-4 py-2">{item.symbol}</td>
            <td className="border px-4 py-2">{item.turnover}</td>
            <td className="border px-4 py-2">{item.closingPrice}</td>
          </tr>
        ));
      case "tradedShares":
        return data.map((item, index) => (
          <tr key={index} className={index % 2 === 0 ? "bg-gray-200 text-black" : "bg-gray-100 text-black"}>
            <td className="border px-4 py-2">{item.symbol}</td>
            <td className="border px-4 py-2">{item.shareTraded}</td>
            <td className="border px-4 py-2">{item.closingPrice}</td>
          </tr>
        ));
      case "transactions":
        return data.map((item, index) => (
          <tr key={index} className={index % 2 === 0 ? "bg-gray-200 text-black" : "bg-gray-100 text-black"}>
            <td className="border px-4 py-2">{item.symbol}</td>
            <td className="border px-4 py-2">{item.totalTrades}</td>
            <td className="border px-4 py-2">{item.lastTradedPrice}</td>
          </tr>
        ));
      default:
        return null;
    }
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
              {tabIndex === "turnover" && <th className="px-4 py-2">Turnover</th>}
              {tabIndex === "tradedShares" && <th className="px-4 py-2">Shares Traded</th>}
              {tabIndex === "transactions" && <th className="px-4 py-2">Transactions</th>}
              {tabIndex === "turnover" && <th className="px-4 py-2">Closing Price</th>}
              {tabIndex === "tradedShares" && <th className="px-4 py-2">Closing Price</th>}
              {tabIndex === "transactions" && <th className="px-4 py-2">Last Traded Price</th>}
            </tr>
          </thead>
        </table>
      </div>
      <div className="w-full overflow-y-auto rounded-lg shadow-md max-h-96" ref={tableRef}>
        <table className="w-full table-auto">
          <tbody>{renderRows(data)}</tbody>
        </table>
      </div>
    </div>
  );
};

export default TopDataTable;
