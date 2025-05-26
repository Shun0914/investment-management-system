import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

const PortfolioComparison = () => {
  // ★ データ部分 - ここを置換する ★
  const comparisonData = {
    previousAnalysis: {
      date: "2025-04-26",
      totalValue: 1850000,
      aggressive: 285000, // 15.4%
      defensive: 1350000, // 73.0%
      cash: 900000,      // 48.6%
      middle: 215000     // 11.6%
    },
    currentAnalysis: {
      date: "2025-05-26", 
      totalValue: 1940000,
      aggressive: 320000, // 16.5%
      defensive: 1450000, // 74.7%
      cash: 1000000,     // 51.5%
      middle: 170000     // 8.8%
    },
    topMovers: [
      { symbol: 'TECH1', change: 25.4, category: 'aggressive', direction: 'up' },
      { symbol: 'GROWTH2', change: 18.2, category: 'aggressive', direction: 'up' },
      { symbol: 'CRYPTO3', change: -8.5, category: 'aggressive', direction: 'down' },
      { symbol: 'INDEX1', change: 4.2, category: 'middle', direction: 'up' },
      { symbol: 'BOND1', change: 1.8, category: 'defensive', direction: 'up' }
    ]
  };

  const performanceHistory = [
    { month: 'Jan', aggressive: 250000, defensive: 1300000, total: 1750000 },
    { month: 'Feb', aggressive: 275000, defensive: 1320000, total: 1820000 },
    { month: 'Mar', aggressive: 260000, defensive: 1340000, total: 1840000 },
    { month: 'Apr', aggressive: 285000, defensive: 1350000, total: 1850000 },
    { month: 'May', aggressive: 320000, defensive: 1450000, total: 1940000 }
  ];
  // ★ データ部分終了 ★

  const { previousAnalysis: prev, currentAnalysis: curr } = comparisonData;

  // Calculate changes
  const changes = {
    totalValue: ((curr.totalValue - prev.totalValue) / prev.totalValue * 100).toFixed(1),
    aggressive: ((curr.aggressive - prev.aggressive) / prev.aggressive * 100).toFixed(1),
    defensive: ((curr.defensive - prev.defensive) / prev.defensive * 100).toFixed(1),
    cash: ((curr.cash - prev.cash) / prev.cash * 100).toFixed(1),
    middle: ((curr.middle - prev.middle) / prev.middle * 100).toFixed(1)
  };

  // Calculate percentages
  const currPercentages = {
    aggressive: (curr.aggressive / curr.totalValue * 100).toFixed(1),
    defensive: (curr.defensive / curr.totalValue * 100).toFixed(1),
    cash: (curr.cash / curr.totalValue * 100).toFixed(1),
    middle: (curr.middle / curr.totalValue * 100).toFixed(1)
  };

  const prevPercentages = {
    aggressive: (prev.aggressive / prev.totalValue * 100).toFixed(1),
    defensive: (prev.defensive / prev.totalValue * 100).toFixed(1),
    cash: (prev.cash / prev.totalValue * 100).toFixed(1),
    middle: (prev.middle / prev.totalValue * 100).toFixed(1)
  };

  // Chart data for allocation comparison
  const allocationComparison = [
    {
      category: 'Aggressive',
      previous: parseFloat(prevPercentages.aggressive),
      current: parseFloat(currPercentages.aggressive),
      target: 10
    },
    {
      category: 'Defensive',
      previous: parseFloat(prevPercentages.defensive),
      current: parseFloat(currPercentages.defensive),
      target: 90
    },
    {
      category: 'Cash',
      previous: parseFloat(prevPercentages.cash),
      current: parseFloat(currPercentages.cash),
      target: 50
    },
    {
      category: 'Middle',
      previous: parseFloat(prevPercentages.middle),
      current: parseFloat(currPercentages.middle),
      target: 0
    }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-2">Portfolio Comparison Analysis</h1>
        <p className="text-center text-gray-600 mb-8">
          {prev.date} vs {curr.date} | Barbell Strategy Progress Tracking
        </p>

        {/* Performance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
            <h3 className="text-sm font-medium text-gray-500">Total Portfolio</h3>
            <p className="text-xl font-bold">¥{curr.totalValue.toLocaleString()}</p>
            <p className={`text-sm ${parseFloat(changes.totalValue) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {parseFloat(changes.totalValue) >= 0 ? '+' : ''}{changes.totalValue}%
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-red-500">
            <h3 className="text-sm font-medium text-gray-500">Aggressive</h3>
            <p className="text-lg font-bold text-red-600">{currPercentages.aggressive}%</p>
            <p className={`text-sm ${parseFloat(changes.aggressive) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {parseFloat(changes.aggressive) >= 0 ? '+' : ''}{changes.aggressive}%
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500">
            <h3 className="text-sm font-medium text-gray-500">Defensive</h3>
            <p className="text-lg font-bold text-green-600">{currPercentages.defensive}%</p>
            <p className={`text-sm ${parseFloat(changes.defensive) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {parseFloat(changes.defensive) >= 0 ? '+' : ''}{changes.defensive}%
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-teal-500">
            <h3 className="text-sm font-medium text-gray-500">Cash</h3>
            <p className="text-lg font-bold text-teal-600">{currPercentages.cash}%</p>
            <p className={`text-sm ${parseFloat(changes.cash) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {parseFloat(changes.cash) >= 0 ? '+' : ''}{changes.cash}%
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow border-l-4 border-yellow-500">
            <h3 className="text-sm font-medium text-gray-500">Middle Ground</h3>
            <p className="text-lg font-bold text-yellow-600">{currPercentages.middle}%</p>
            <p className={`text-sm ${parseFloat(changes.middle) < 0 ? 'text-green-600' : 'text-red-600'}`}>
              {parseFloat(changes.middle) >= 0 ? '+' : ''}{changes.middle}%
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Portfolio Performance Chart */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Portfolio Growth Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `¥${(value/1000000).toFixed(1)}M`} />
                <Tooltip formatter={(value) => [`¥${value.toLocaleString()}`, 'Value']} />
                <Legend />
                <Line type="monotone" dataKey="total" stroke="#2563eb" strokeWidth={3} name="Total Portfolio" />
                <Line type="monotone" dataKey="aggressive" stroke="#dc2626" strokeWidth={2} name="Aggressive Assets" />
                <Line type="monotone" dataKey="defensive" stroke="#16a34a" strokeWidth={2} name="Defensive Assets" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Allocation Comparison */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Allocation Progress vs Targets</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={allocationComparison}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis tickFormatter={(value) => `${value}%`} />
                <Tooltip formatter={(value) => [`${value}%`, 'Allocation']} />
                <Legend />
                <Bar dataKey="previous" fill="#94a3b8" name="Previous Month" />
                <Bar dataKey="current" fill="#3b82f6" name="Current Month" />
                <Bar dataKey="target" fill="#22c55e" name="Target" opacity={0.7} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Strategy Progress Assessment */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Barbell Strategy Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">✅ Positive Developments</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>Cash position increased to {currPercentages.cash}% (¥{curr.cash.toLocaleString()})</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>Middle ground reduced from {prevPercentages.middle}% to {currPercentages.middle}%</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>Total portfolio value increased by {changes.totalValue}%</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>Aggressive positions showing strong performance</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">⚠️ Areas for Improvement</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="text-yellow-500 mr-2">•</span>
                  <span>Aggressive allocation at {currPercentages.aggressive}% (target: 8-12%)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-500 mr-2">•</span>
                  <span>Still {currPercentages.middle}% in middle-ground investments</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-500 mr-2">•</span>
                  <span>Consider rebalancing to maintain target ratios</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-500 mr-2">•</span>
                  <span>Monitor aggressive positions for profit-taking opportunities</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Top Movers */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold">Top Performers This Period</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Symbol</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Change</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {comparisonData.topMovers.map((mover, index) => (
                  <tr key={mover.symbol} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 font-medium">{mover.symbol}</td>
                    <td className={`px-6 py-4 text-right font-bold ${
                      mover.direction === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {mover.direction === 'up' ? '+' : ''}{mover.change.toFixed(1)}%
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        mover.category === 'aggressive' ? 'bg-red-100 text-red-800' :
                        mover.category === 'defensive' ? 'bg-green-100 text-green-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {mover.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-2xl ${
                        mover.direction === 'up' ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {mover.direction === 'up' ? '↗' : '↘'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Items */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Recommended Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-semibold text-red-600 mb-2">Aggressive Positions</h3>
              <ul className="text-sm space-y-1">
                <li>• Consider profit-taking on TECH1 (+25.4%)</li>
                <li>• Maintain core positions in top performers</li>
                <li>• Monitor for rebalancing opportunities</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-semibold text-blue-600 mb-2">Middle Ground</h3>
              <ul className="text-sm space-y-1">
                <li>• Continue systematic reduction plan</li>
                <li>• Target: Reduce from {currPercentages.middle}% to &lt;5%</li>
                <li>• Redeploy capital to extremes</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-semibold text-green-600 mb-2">Overall Strategy</h3>
              <ul className="text-sm space-y-1">
                <li>• Maintain cash buffer above ¥800K</li>
                <li>• Stay disciplined with allocation targets</li>
                <li>• Continue monthly rebalancing reviews</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioComparison;