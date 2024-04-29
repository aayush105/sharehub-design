import React, { useState } from "react";
import NoDataFound from "@/images/no_data_found.png";
import Image from "next/image";

const RightShares = () => {
    const [config, setConfig] = useState({
        pageSize: 10,
    });

    return (
        <div className="grid bg-gray-600 grid-cols-12 gap-3 rounded-lg shadow-md mt-4">
            <div className="col-span-12 md:col-span-6 flex justify-between items-start p-3">
                <h1 className="text-2xl font-bold text-gray-300">Right Shares History</h1>
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
                    <table className="w-full text-sm rounded-md text-left min-h-[200px] rtl:text-right text-gray-400">
                        <thead className="sticky top-0 bg-gray-800 text-white uppercase">
                            <tr>
                                <th className="px-6 py-1">Opening Date</th>
                                <th className="px-6 py-1">Units</th>
                                <th className="px-6 py-1">Right Share Ratio</th>
                                <th className="px-6 py-1">Issue Manager</th>
                                <th className="px-6 py-1">Total Amount</th>
                                <th className="px-6 py-1">Closing Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan={6} className="px-6 py-4 text-center">
                                    <div className="flex flex-col items-center">
                                        <Image
                                            src={NoDataFound}
                                            width={300}
                                            height={300} 
                                            alt="No Data Found"
                                        />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default RightShares;
