import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PortfolioAnalysis = () => {
  // ★ データ部分 - ここを置換する ★
  const portfolioData = {
    // 攻め銘柄（Aggressive Assets）
    TECH1: { value: 125000, shares: 15, category: 'aggressive', gainLoss: 48.1 },
    GROWTH2: { value: 106000, shares: 10, category: 'aggressive', gainLoss: 32.6 },
    CRYPTO3: { value: 89000, shares: 100, category: 'aggressive', gainLoss: -12.3 },
    
    // 守り銘柄（Defensive Assets）
    BOND1: { value: 200000, shares: 20, category: 'defensive', gainLoss: 2.1 },
    GOLD_ETF: { value: 150000, shares: 15, category: 'defensive', gainLoss: 5.4 },
    
    // 中間資産（Middle Ground - to be reduced）
    INDEX1: { value: 80000, shares: 8, category: 'middle', gainLoss: 8.7 },
    REIT1: { value: 70000, shares: 7, category: 'middle', gainLoss: 4.2 },
    
    // 固定資産（Fixed Assets）
    cash: { value: 1000000, category: 'cash' },
    mutualFunds: { value: 120000, category: 'middle' }
  };
  
  const analysisDate = "2025-05-26";
  // ★ データ部分終了 ★

  // カテゴリ別集計
  const calculateSummary = () => {
    const categories = { aggressive: 0, defensive: 0, middle: 0, cash: 0 };
    
    Object.values(portfolioData).forEach(holding => {
      categories[holding.category] += holding.value;
    });
    
    const totalValue = Object.values(categories).reduce((sum, value) => sum + value, 0);
    const defensiveTotal = categories.defensive + categories.cash;
    
    return {
      categories,
      totalValue,
      ratios: {
        aggressive: (categories.aggressive / totalValue * 100).toFixed(1),
        defensive: (defensiveTotal / totalValue * 100).toFixed(1),
        middle: (categories.middle / totalValue * 100).toFixed(1),
        cash: (categories.cash / totalValue * 100).toFixed(1)
      },
      barbellOptimal: {
        aggressive: categories.aggressive / totalValue >= 0.08 && categories.aggressive / totalValue <= 0.12,
        defensive: defensiveTotal / totalValue >= 0.88,
        cash: categories.cash >= 800000 // Minimum cash buffer
      }
    };
  };

  const summary = calculateSummary();

  // チャート用データ
  const pieData = [
    { name: 'Aggressive', value: summary.categories.aggressive, color: '#e15759' },
    { name: 'Defensive', value: summary.categories.defensive, color: '#59a14f' },
    { name: 'Cash', value: summary.categories.cash, color: '#76b7b2' },
    { name: 'Middle', value: summary.categories.middle, color: '#4e79a7' }
  ];

  const stockList = Object.entries(portfolioData)
    .filter(([ticker]) => ticker !== 'cash' && ticker !== 'mutualFunds')
    .map(([ticker, data]) => ({
      ticker,
      value: data.value,
      category: data.category,
      percentage: (data.value / summary.totalValue * 100).toFixed(2),
      gainLoss: data.gainLoss || 0
    }))
    .sort((a, b) => b.value - a.value);

  const getCategoryLabel = (category) => {
    switch(category) {
      case 'aggressive': return 'Aggressive';
      case 'defensive': return 'Defensive';
      case 'middle': return 'Middle';
      default: return 'Other';
    }
  };

  const getCategoryColor = (category) => {
    switch(category) {
      case 'aggressive': return 'bg-red-100 text-red-800';
      case 'defensive': return 'bg-green-100 text-green-800';
      case 'middle': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-2">Portfolio Analysis Dashboard</h1>
        <p className="text-center text-gray-600 mb-8">Analysis Date: {analysisDate} | Barbell Strategy Evaluation</p>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Total Assets</h3>
            <p className="text-2xl font-bold">¥{summary.totalValue.toLocaleString()}</p>
          </div>
          
          <div className={`bg-white p-4 rounded-lg shadow border-l-4 ${
            summary.barbellOptimal.aggressive ? 'border-green-500' : 'border-red-500'
          }`}>
            <h3 className="text-sm font-medium text-gray-500">Aggressive (Antifragile)</h3>
            <p className="text-xl font-bold text-red-600">{summary.ratios.aggressive}%</p>
            <p className="text-xs text-gray-500">Target: 8-12%</p>
          </div>

          <div className={`bg-white p-4 rounded-lg shadow border-l-4 ${
            summary.barbellOptimal.defensive ? 'border-green-500' : 'border-red-500'
          }`}>
            <h3 className="text-sm font-medium text-gray-500">Defensive + Cash</h3>
            <p className="text-xl font-bold text-green-600">{summary.ratios.defensive}%</p>
            <p className="text-xs text-gray-500">Target: 88-92%</p>
          </div>

          <div className={`bg-white p-4 rounded-lg shadow border-l-4 ${
            summary.categories.middle < 200000 ? 'border-green-500' : 'border-yellow-500'
          }`}>
            <h3 className="text-sm font-medium text-gray-500">Middle Ground</h3>
            <p className="text-xl font-bold text-blue-600">{summary.ratios.middle}%</p>
            <p className="text-xs text-gray-500">Target: Gradual reduction</p>
          </div>
        </div>

        {/* Barbell Strategy Status */}
        <div className={`mb-8 p-4 rounded-lg border-l-4 ${
          summary.barbellOptimal.aggressive && summary.barbellOptimal.defensive && summary.barbellOptimal.cash
            ? 'bg-green-50 border-green-500' : 'bg-yellow-50 border-yellow-500'
        }`}>
          <h3 className="font-bold mb-2">Barbell Strategy Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className={summary.barbellOptimal.aggressive ? 'text-green-700' : 'text-red-700'}>
              Aggressive Ratio: {summary.ratios.aggressive}% {summary.barbellOptimal.aggressive ? '✓' : '⚠'}
            </div>
            <div className={summary.barbellOptimal.defensive ? 'text-green-700' : 'text-red-700'}>
              Defensive Ratio: {summary.ratios.defensive}% {summary.barbellOptimal.defensive ? '✓' : '⚠'}
            </div>
            <div className={summary.barbellOptimal.cash ? 'text-green-700' : 'text-red-700'}>
              Cash Buffer: ¥{summary.categories.cash.toLocaleString()} {summary.barbellOptimal.cash ? '✓' : '⚠'}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Asset Allocation Pie Chart */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Asset Allocation</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`¥${value.toLocaleString()}`, 'Amount']} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Barbell Strategy Evaluation */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Strategy Evaluation</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span>Aggressive (Antifragile)</span>
                  <span className="font-bold">{summary.ratios.aggressive}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-red-500 h-3 rounded-full"
                    style={{width: `${Math.min(parseFloat(summary.ratios.aggressive) * 10, 100)}%`}}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>8%</span><span>10%</span><span>12%</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span>Defensive + Cash</span>
                  <span className="font-bold">{summary.ratios.defensive}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-green-500 h-3 rounded-full"
                    style={{width: `${parseFloat(summary.ratios.defensive)}%`}}
                  ></div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-blue-50 rounded text-sm">
                <h4 className="font-bold mb-2">Key Principles</h4>
                <ul className="space-y-1 text-xs">
                  <li>• Focus aggressive bets on selected few assets</li>
                  <li>• Maintain substantial cash buffer for stability</li>
                  <li>• Gradually eliminate middle-ground investments</li>
                  <li>• Maximize asymmetric upside while limiting downside</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Holdings Detail Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold">Holdings Detail</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Symbol</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Value</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Percentage</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Gain/Loss</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {stockList.map((stock, index) => (
                  <tr key={stock.ticker} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 font-medium">{stock.ticker}</td>
                    <td className="px-6 py-4 text-right">¥{stock.value.toLocaleString()}</td>
                    <td className="px-6 py-4 text-right">{stock.percentage}%</td>
                    <td className={`px-6 py-4 text-right font-medium ${
                      stock.gainLoss > 0 ? 'text-green-600' : stock.gainLoss < 0 ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {stock.gainLoss > 0 ? '+' : ''}{stock.gainLoss.toFixed(1)}%
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(stock.category)}`}>
                        {getCategoryLabel(stock.category)}
                      </span>
                    </td>
                  </tr>
                ))}
                <tr className="bg-gray-100 font-semibold">
                  <td className="px-6 py-4">CASH</td>
                  <td className="px-6 py-4 text-right">¥{summary.categories.cash.toLocaleString()}</td>
                  <td className="px-6 py-4 text-right">{summary.ratios.cash}%</td>
                  <td className="px-6 py-4 text-right">0.0%</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">Cash</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Strategy Recommendations */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Recommendations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-red-600 mb-2">Aggressive Assets</h3>
              <ul className="text-sm space-y-1">
                <li>• Current allocation: {summary.ratios.aggressive}%</li>
                <li>• Target range: 8-12%</li>
                <li>• Focus on high-conviction, asymmetric bets</li>
                <li>• Accept potential 100% loss on individual positions</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-green-600 mb-2">Defensive Assets</h3>
              <ul className="text-sm space-y-1">
                <li>• Current allocation: {summary.ratios.defensive}%</li>
                <li>• Target range: 88-92%</li>
                <li>• Prioritize capital preservation</li>
                <li>• Maintain liquidity for opportunities</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioAnalysis;