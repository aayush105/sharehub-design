import React, { useEffect, useState } from 'react';

const News = () => {
  const [news, setNews] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("https://arthakendra.com/api/v1/news/sharehub/stock-news?limit=6&companySymbol=HRL");
        if (!response.ok) {
          throw new Error("Failed to fetch news data");
        }
        const jsonData = await response.json();
        setNews(jsonData.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="container mx-auto px-4 py-4">
      <h1 className="text-3xl font-bold mb-4">Latest News</h1>
      {news && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {news.content.map((item) => (
            <div key={item.id} className="p-4:bg-slate-800 rounded-md shadow-md">
              <div className="flex items-center mb-4">
                {/* <img
                  src={item.imageUrl} 
                  alt="News Thumbnail" 
                  className="w-16 h-16 rounded-full mr-4" 
                /> */}
                <div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-smtext-gray-400">{item.timeAgo}</p>
                </div>
              </div>
              <p className="text-smtext-gray-200">{item.summary}</p>
              <div className="flex mt-4">
                <ul className="flex space-x-2">
                  {item.stockSymbols.map((symbol) => (
                    <li key={symbol} className="bg-gray-700 px-2 py-1 text-xs rounded">
                      {symbol}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default News;
