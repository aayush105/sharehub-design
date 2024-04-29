'use client';

import { useState, useEffect } from "react";
import Chart from "@/components/charts/Chart";
import turnoverIcon from "@/images/turnover.png";
import stockIcon from "@/images/stock.png";
import transactionIcon from "@/images/transaction.png";
import scarpIcon from "@/images/scarp.png";
import capitalIcon from "@/images/capital.png";
import marketIcon from "@/images/market.png";
import SummaryComponent from "@/components/charts/SummaryChart";
import IndexTable from "@/components/Tables/IndexTable";
import GainLoseTable from "@/components/Tables/GainLoseTable";
import TopDataTable from "@/components/Tables/TopDataTable";
import ProposedDividendTable from "@/components/Tables/ProposedDividendTable";
import InvestmentTable from "@/components/Tables/InvestmentTable";

export default function HomePage() {
  const [news, setNews] = useState([]);
  const [summary, setSummary] = useState([]);
  const icons = [turnoverIcon, stockIcon, transactionIcon, scarpIcon, capitalIcon, marketIcon];

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          "https://arthakendra.com/api/v1/news/sharehub/stock-news?limit=8"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch news data");
        }
        const jsonData = await response.json();
        setNews(jsonData.data.content);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchNews();
  }, []);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await fetch(
          "https://live.nepsesharehub.com/v1/nepselive/market-summary"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch summary data");
        }
        const jsonData = await response.json();
        setSummary(jsonData);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchSummary();
  }, []);

  return (
    <main className="mx-auto px-4 py-3 bg-slate-900">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-8">
          <div className="bg-gray-700 rounded-lg p-4 shadow-md">
            <Chart />
          </div>
          <div className="grid grid-cols-12 gap-4 mt-4">
            <div className="col-span-12">
              <div className="bg-gray-700 rounded-lg p-4 shadow-md">
                <IndexTable />
              </div>
            </div>
            <div className="col-span-12">
              <div className="bg-gray-700 rounded-lg p-4 shadow-md">
                <TopDataTable />
              </div>
            </div>
            <div className="col-span-12">
              <div className="bg-gray-700 rounded-lg p-4 shadow-md">
                <GainLoseTable />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12 md:col-span-4">
          <SummaryComponent summaryData={summary} icons={icons} />
          <div className="mt-4 sticky top-0">
            <div className="bg-gray-700 rounded-lg p-4 shadow-md">
              <h2 className="text-lg text-white font-semibold mb-4">Recent News</h2>
              {news.map((item, index) => (
                <a key={index} href="#" className="block mb-4 bg-gray-800 rounded-lg p-4 shadow-md transition-transform duration-300 transform hover:-translate-y-1">
                  <h3 className="text-base text-white font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-400">{item.timeAgo}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div>
        <ProposedDividendTable />
      </div>
      <div className="col-span-12 mt-4">
        <div className="bg-gray-700 rounded-lg p-4 shadow-md">
          <InvestmentTable />
        </div>
      </div>
    </main>
  );
}
