import {useState} from 'react';
import  ExchangeRateList from "@/app/exchange/components/major/index";
import  HistoryRates from "@/app/exchange/components/historicalRate/index";
import {BadgeDollarSign, ChartNoAxesCombined} from "lucide-react";

import GoldPrices from "@/app/exchange/components/goldRate";

const tabsList = [
    { id: 'rates', label: 'Exchange Rates', icon: <BadgeDollarSign/> },
    { id: 'history', label: 'Historical Rate', icon: <ChartNoAxesCombined/> },
    { id: 'settings', label: 'Gold Prices & Market History', icon: <BadgeDollarSign/> },

];

const TabsComponent = () => {
    const [activeTab, setActiveTab] = useState('rates');

    const renderTabContent = () => {
        switch (activeTab) {
            case 'rates':
                return <ExchangeRateList />;
            case 'history':
                return <HistoryRates />;
            case 'settings':
                return <GoldPrices />;
            case 'contacts':
                return <ExchangeRateList />;
            default:
                return null;
        }
    };


    return (
        <div className="flex flex-col gap-6 rounded-3xl bg-white shadow-3xl md:p-8 z-20 max-h-[550px] ">

            <div className="border-b border-gray-200 dark:border-gray-700">
                <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                    {tabsList?.map((tab) => (
                        <li key={tab.id} className="me-2">
                            <button
                                onClick={() => setActiveTab(tab.id)}
                                className={`font-bold text-lg inline-flex items-center justify-center p-4 border-b-2 rounded-t-lg group transition-colors ${
                                    activeTab === tab.id
                                        ? 'text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500'
                                        : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
                                }`}
                            >
                                <span className="me-2">{tab.icon}</span>
                                {tab.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="overflow-auto box-border">
              <div >{renderTabContent()}</div>
            </div>
        </div>
    );
};

export default TabsComponent;