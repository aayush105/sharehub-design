import React, { useState, useEffect } from "react";
import { PiChartLineDownBold, PiChartLineUpBold } from "react-icons/pi";

const PriceHistory = () => {
  const [priceHistory, setPriceHistory] = useState([]);
  const [config, setConfig] = useState({
    pageSize: 10,
    symbol: "HRL",
    page: 1,
    totalPage: null,
  });
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });

  useEffect(() => {
    getPriceHistoryInfo();
  }, [config.pageSize, config.symbol, config.page, value.startDate, value.endDate]);

  const getPriceHistoryInfo = async () => {
    try {
      console.log("Fetching data with page size:", config.pageSize);
      const response = await fetch(
        `https://arthakendra.com/data/api/v1/price-history?pageSize=${
          config.pageSize
        }&symbol=${config.symbol}&page=${config.page}${
          value.startDate ? "&from=" + value.startDate : ""
        }${value.endDate ? "&to=" + value.endDate : ""}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();
      setPriceHistory(jsonData.data.content);

      // Calculate total pages based on total items and page size
      const totalPages = Math.ceil(jsonData.data.totalItems / config.pageSize);
      setConfig((prevConfig) => ({
        ...prevConfig,
        totalPage: totalPages,
      }));

      console.log("Selected page size:", config.pageSize);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handlePageChange = (newPage) => {
    setConfig((prevConfig) => ({
      ...prevConfig,
      page: newPage,
    }));
  };

  const handleNextPage = () => {
    if (config.page < config.totalPage) {
      handlePageChange(config.page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (config.page > 1) {
      handlePageChange(config.page - 1);
    }
  };

  const handlePageSizeChange = (pageSize) => {
    setConfig((prevConfig) => ({
      ...prevConfig,
      pageSize: pageSize,
      page: 1, // Reset page number to 1 when page size changes
    }));
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= config.totalPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`mr-2 px-3 py-1 rounded-lg bg-gray-700 text-white ${
            config.page === i ? "bg-gray-800 text-white" : "bg-gray-600 text-gray-300"
          }`}
        >
          {i}
        </button>
      );
    }

    const renderPaginatedNumbers = () => {
      if (window.innerWidth <= 768) {
        return (
          <div className="flex flex-wrap justify-center">
            {pages.map((page, index) => (
              <div key={index} className="mr-2 mb-2">
                {page}
              </div>
            ))}
          </div>
        );
      } else {
        return (
          <div className="flex">
            {pages}
          </div>
        );
      }
    };

    return (
      <div className="flex justify-center">
        <button onClick={handlePreviousPage} disabled={config.page === 1} className="bg-blue-500 text-white px-3 py-1 rounded-lg mr-2">
          Previous
        </button>
        {renderPaginatedNumbers()}
        <button onClick={handleNextPage} disabled={config.page === config.totalPage} className="bg-blue-500 text-white px-3 py-1 rounded-lg ml-2">
          Next
        </button>
      </div>
    );
  };

  return (
    <div className="grid bg-gray-600 grid-cols-12 gap-3 rounded-lg shadow-md mt-4">
      <div className="col-span-12 md:col-span-6 flex justify-between items-start p-3">
        <h1 className="text-2xl font-bold text-gray-300">Price History</h1>
      </div>
      <div className="w-full col-span-12 md:col-span-6 flex justify-end items-start p-3">
        <div className="text-sm text-gray-300 mb-2">
          Row Per Page
          <select
            onChange={(e) => {
              const pageSize = parseInt(e.target.value);
              console.log("Selected page size:", pageSize);
              handlePageSizeChange(pageSize);
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
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">High</th>
                <th className="px-4 py-2">Low</th>
                <th className="px-4 py-2">Open</th>
                <th className="px-4 py-2">Close</th>
                <th className="px-4 py-2">Volume</th>
                <th className="px-4 py-2">Change</th>
                <th className="px-4 py-2">% Change</th>
              </tr>
            </thead>
            <tbody>
              {priceHistory.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-200 text-black" : "bg-gray-100 text-black"}>
                  <td className="border px-4 py-2">{item.date}</td>
                  <td className="border px-4 py-2">{item.high}</td>
                  <td className="border px-4 py-2">{item.low}</td>
                  <td className="border px-4 py-2">{item.open}</td>
                  <td className="border px-4 py-2">{item.close}</td>
                  <td className="border px-4 py-2">{item.volume}</td>
                  <td className="border px-4 py-2">
                    <div className={`flex items-center justify-center ${item.change < 0 ? "bg-red-200 rounded-lg":"bg-green-200 rounded-lg"}`}>
                      {item.change < 0 ? (
                        <PiChartLineDownBold className="text-red-500" />
                      ) : (
                        <PiChartLineUpBold className="text-green-500" />
                      )}
                      <span className={item.change < 0 ? "text-red-500" : "text-green-500"}>
                        {item.change}
                      </span>
                    </div>
                  </td>
                  <td className="border px-6 py-2">
                    <div className={`flex items-center justify-center ${item.changePercent  < 0 ? "bg-red-200 text-red-800 rounded-lg" : "bg-green-200 text-green-800 rounded-lg"}`}>
                      {item.changePercent  < 0 ? (
                        <PiChartLineDownBold className="text-red-500" />
                      ) : (
                        <PiChartLineUpBold className="text-green-500" />
                      )}
                      <span className={item.changePercent  < 0 ? "text-red-500" : "text-green-500"}>
                        {item.changePercent}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="col-span-12 p-3 flex justify-center">
        <div>{renderPagination()}</div>
      </div>
    </div>
  );
};

export default PriceHistory;
