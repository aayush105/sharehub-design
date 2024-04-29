import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import Image from "next/image";
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';

const SummaryComponent = ({ summaryData, icons }) => {

  const normalizedData = summaryData.map(item => ({
    ...item,
    normalizedValue: Math.log(item.value) 
  }));
  // const detail = summaryData.map(item => item.detail);

  const colorScale = scaleOrdinal(schemeCategory10);

  return (
    <div className="bg-gray-700 rounded-lg p-4 shadow-md">
      <h2 className="text-lg font-semibold mb-4">Summary</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={normalizedData}
            dataKey="normalizedValue" 
            cx="50%"
            cy="50%"
            outerRadius={80}
            innerRadius={40} 
            fill="#8884d8"
            label={({value}) => `${Math.round(Math.exp(value))}`} 
          >
            {normalizedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colorScale(index)} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-4">
        {summaryData.map((item, index) => (
          <div key={index} className="bg-gray-800 rounded-lg p-3 shadow-md mb-3 transition-transform duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm text-gray-400">{item.detail}</p>
                <p className="text-lg font-semibold">{item.value}</p> 
              </div>
              <div className="w-8 h-8bg-gray-800 rounded-full flex items-center justify-center">
                <Image src={icons[index]} alt={`Icon ${index}`} width={32} height={32} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SummaryComponent;
