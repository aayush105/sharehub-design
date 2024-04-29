import React, { useState, useEffect } from "react";

const DividendHistory = () => {
  const [dividend, setDividend] = useState([]);
  const [config, setConfig] = useState({
    pageSize: 10,
  });

  useEffect(() => {
    const getNewsDividendInfo = async () => {
      try {
        const response = await fetch(
          "https://arthakendra.com/data/api/v1/dividend?pageSize=50&symbol=HRL"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        setDividend(jsonData.data.content);
      } catch (error) {
        console.log(error.message);
      }
    };

    getNewsDividendInfo();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  return (
    <div className="grid bg-gray-600 grid-cols-12 gap-3 rounded-lg shadow-md mt-4">
      <div className="col-span-12 md:col-span-6 flex justify-between items-start p-3">
          <h1 className="text-2xl font-bold text-gray-300">Dividend History</h1>
      </div>
      <div className="w-full p-3 col-span-12 md:col-span-6 flex justify-end items-start">
          <div className="text-sm text-gray-300 mb-2">
              Row Per Page
              <select
                  onChange={(e) => {
                      setConfig((prevConfig) => ({
                          ...prevConfig,
                          pageSize: e.target.value,
                      }));
                  }}
                  value={config.pageSize}
                  className="ml-2 p-1 text-sm border rounded-lg focus:border-blue-500 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500"
                  style={{ maxWidth: "80px" }}
              >
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                  <option value="25">25</option>
              </select>
          </div>
      </div>
      <div className="w-full p-3 col-span-12">
        <div className="relative overflow-x-auto border-3 rounded-md border-slate-900">
          <table className="w-full text-sm text-left rtl:text-right text-gray-400">
            <thead className="sticky top-0 bg-gray-800 text-white uppercase">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Fiscal Year</th>
                <th className="px-4 py-2">Bonus</th>
                <th className="px-4 py-2">Cash</th>
                <th className="px-4 py-2">Total</th>
                <th className="px-4 py-2">Announcement Date</th>
                <th className="px-4 py-2">Book Closure Date</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {dividend.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-200 text-black" : "bg-gray-100 text-black"}>
                  <td className="border px-4 py-2">{item.fiscalYear}</td>
                  <td className="border px-4 py-2">{item.name}</td>
                  <td className="border px-4 py-2">{item.bonus}%</td>
                  <td className="border px-4 py-2">{item.cash}%</td>
                  <td className="border px-4 py-2">{item.total}%</td>
                  <td className="border px-4 py-2">{formatDate(item.announcementDate)}</td>
                  <td className="border px-4 py-2">{formatDate(item.bookClosureDate)}</td>
                  <td className="border px-4 py-2">
                    <div className={`flex items-center justify-center ${item.status === 'NotAnnounced' ? "bg-yellow-200" : item.status === 'Closed' ? "bg-red-200" : ""} text-black rounded-lg py-1 px-2`}>
                        {item.status === 'NotAnnounced' ? 'Not Announced' : item.status}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DividendHistory;
