import React, { useState, useEffect, useRef } from "react";
import { PiChartLineDownBold, PiChartLineUpBold } from "react-icons/pi";
import { Tabs, TabsHeader, Tab } from "@material-tailwind/react";

const TABS = [
  {
    label: "Market Indices",
    value: 1,
  },
  {
    label: "Sub Market Indices",
    value: 2,
  },
];

const IndexTable = () => {
  const [tabIndex, setIndex] = useState(1);
  const [indices, setIndices] = useState([]);
  const [subIndices, setSubIndices] = useState([]);
  const tableBodyRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      let url = "";

      if (tabIndex === 1) {
        url = "https://live.nepsesharehub.com/v1/nepselive/index";
      } else if (tabIndex === 2) {
        url = "https://live.nepsesharehub.com/v1/nepselive/sub-index";
      }

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        if (tabIndex === 1) {
          setIndices(jsonData);
        } else if (tabIndex === 2) {
          setSubIndices(jsonData);
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, [tabIndex]);

  const handleTabChange = (value) => {
    setIndex(value);
    if (tableBodyRef.current) {
      tableBodyRef.current.scrollTop = 0;
    }
  };

  const renderRows = (data) => {
    return data.map((item, index) => (
      <tr key={index} className={index % 2 === 0 ? "bg-gray-200 text-black" : "bg-gray-100 text-black"}>
        <td className="border px-4 py-2 text-left">{item.index}</td>
        <td className="border px-4 py-2">{item.currentValue}</td>
        <td className="border px-4 py-2 text-center">
          <div className={`flex items-center justify-center ${item.change < 0 ? "bg-red-200 text-red-800 rounded-lg" : "bg-green-200 text-green-800 rounded-lg"}`}>
            <span>
              {item.change}{" "}
            </span>
            {item.change < 0 ? (
              <PiChartLineDownBold className="text-red-800" />
            ) : item.change > 0 ? (
              <PiChartLineUpBold className="text-green-800" />
            ) : null}
          </div>
        </td>
        <td className="border px-4 py-2">
          <div className={`flex items-center justify-center ${item.perChange < 0 ? "bg-red-200 text-red-800 rounded-lg" : "bg-green-200 text-green-800 rounded-lg"}`}>
            <span>
              {item.perChange}{" "}
            </span>
            {item.perChange < 0 ? (
              <PiChartLineDownBold className="text-red-800" />
            ) : item.perChange > 0 ? (
              <PiChartLineUpBold className="text-green-800" />
            ) : null}
          </div>
        </td>
        <td className="border px-4 py-2">{item.high ?? "-"}</td>
        <td className="border px-4 py-2">{item.low ?? "-"}</td>
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

      <div className="w-full overflow-hidden overflow-y-auto rounded-lg shadow-md max-h-96">
        <table className="w-full table-auto text-sm">
          <thead className="sticky top-0 uppercase">
            <tr className="dark:bg-gray-800 text-white">
              <th className="px-4 py-2 text-left">Indices</th>
              <th className="px-4 py-2">Value</th>
              <th className="px-4 py-2">Change</th>
              <th className="px-4 py-2">% Change</th>
              <th className="px-4 py-2">High</th>
              <th className="px-4 py-2">Low</th>
            </tr>
          </thead>
          <tbody className="max-h-80" ref={tableBodyRef}>{tabIndex === 1 ? renderRows(indices) : renderRows(subIndices)}</tbody>
        </table>
      </div>
    </div>
  );
};

export default IndexTable;
