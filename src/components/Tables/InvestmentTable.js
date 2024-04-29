import { Tab, Tabs, TabsHeader } from '@material-tailwind/react';
import React, { useEffect, useState, useRef } from 'react';

const TABS = [
  {
    label: "IPO",
    value: 1,
  },
  {
    label: "IPO Local",
    value: 2,
  },
  {
    label: "IPO Foreign Employee",
    value: 3,
  },
  {
    label: "Right Share",
    value: 4,
  },
  {
    label: "FPO",
    value: 5,
  },
  {
    label: "Mutual Fund",
    value: 6,
  },
];

const InvestmentTable = () => {
  const [tabIndex, setIndex] = useState(1);
  const [data, setData] = useState([]);
  const tableRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      let url = "";

      if (tabIndex === 1) {
        url = "https://arthakendra.com/data/api/v1/public-offering/?size=10&type=0&for=2";
      } else if (tabIndex === 2) {
        url = "https://arthakendra.com/data/api/v1/public-offering/?size=10&type=0&for=0";
      } else if (tabIndex === 3) {
        url = "https://arthakendra.com/data/api/v1/public-offering/?size=10&type=0&for=1";
      } else if (tabIndex === 4) {
        url = "https://arthakendra.com/data/api/v1/public-offering/?size=10&type=2&for=2";
      } else if (tabIndex === 5) {
        url = "https://arthakendra.com/data/api/v1/public-offering/?size=10&type=1&for=2";
      } else if (tabIndex === 6) {
        url = "https://arthakendra.com/data/api/v1/public-offering/?size=10&type=3&for=2";
      }

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        setData(jsonData.data.content);
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
  }

  const renderRows = (data) => {
    return data.map((item, index) => (
      <tr key={index} className={`${index % 2 === 0 ? "bg-gray-200 text-black" : "bg-gray-100 text-black"}`}>
        <td className='border px-4 py-2'>{item.symbol}</td>
        <td className='border px-4 py-2'>{item.name}</td>
        <td className='border px-4 py-2'>{item.units}</td>
        <td className='border px-4 py-2'>{item.price}</td>
        <td className='border px-4 py-2'>{item.openingDate}</td>
        <td className='border px-4 py-2'>{item.closingDate}</td>
        <td className="border px-4 py-2">
          <div className={`flex items-center justify-center ${item.status === 'DateNotAnnounced' ? "bg-yellow-200" : item.status === 'Closed' ? "bg-red-200" : ""} text-black rounded-lg py-1 px-2`}>
              {item.status === 'NotAnnounced' ? 'Not Announced' : item.status}
          </div>
        </td>
      </tr>
    ));
  };

  return (
    <div className='flex flex-col justify-center'>
      <div className='p-3 text-slate-300 nb-2 font-semibold text-lg'>
        Investment
      </div>
      <Tabs value={tabIndex} onChange={handleTabChange}>
        <TabsHeader>
          {TABS.map(({label, value}) => (
            <Tab 
              key={value}
              value={value}
              onClick= {() => handleTabChange(value)}
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
      
      <div className="w-full overflow-x-auto rounded-lg shadow-md max-h-96">
        <table className="w-full table-auto">
          <thead className="sticky top-0">
            <tr className="bg-gray-800 text-white">
              <th className="px-4 py-2 text-left">Symbol</th>
              <th className="px-4 py-2">Company</th>
              <th className="px-4 py-2">Units</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Opening Date</th>
              <th className="px-4 py-2">Closing Date</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {renderRows(data)}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default InvestmentTable