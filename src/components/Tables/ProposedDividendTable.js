import React, { useEffect, useState } from 'react';

const ProposedDividendTable = () => {
    const [dividend, setDividend] = useState([]);

    useEffect(() => {
        const fetchDividend = async () => {
            try {
                const response = await fetch(
                  "https://arthakendra.com/data/api/v1/dividend?size=6&pageSize=6"
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
        fetchDividend();
    }, []);

    return (
        <div className="grid bg-gray-600 grid-cols-12 gap-3 rounded-lg shadow-md mt-4">
            <div className=" w-full p-3 grid-cols-12 rounded col-span-12">
                <div className="p-3 text-slate-300 mb-2 font-semibold text-lg">
                    Proposed Dividend
                </div>
                <div className="w-full relative h-[400px] overflow-auto shadow-md sm:rounded-lg">
                    <table className="w-full h-full text-sm text-left rtl:text-right text-gray-400">
                        <thead className="sticky top-0 bg-gray-800 text-white uppercase">
                            <tr>
                            <th scope="col" className="px-4 py-2">
                                Symbol
                            </th>
                            <th scope="col" className="px-4 py-2">
                                % Bonus
                            </th>
                            <th scope="col" className="px-4 py-4">
                                % Cash
                            </th>
                            <th scope="col" className="px-4 py-2">
                                % Total
                            </th>
                            <th scope="col" className="px-4 py-2">
                                Fiscal Year
                            </th>
                            <th scope="col" className="px-4 py-2">
                                Status
                            </th>
                            </tr>
                        </thead>
                        <tbody>
                            {dividend?.map((item, index) => (
                            <tr key={index} className={index % 2 === 0 ? "bg-gray-200 text-black" : "bg-gray-100 text-black"}>
                                <td className="border px-4 py-2 text-left">{item.symbol}</td>
                                <td className="border px-4 py-2">{item.bonus}</td>
                                <td className="border px-4 py-2">{item.cash}</td>
                                <td className="border px-4 py-2">{item.total}</td>
                                <td className="border px-4 py-2">{item.fiscalYear}</td>
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
}

export default ProposedDividendTable;
