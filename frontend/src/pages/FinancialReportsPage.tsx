import React from 'react';
import { TrendingUp, DollarSign, Calendar, Activity, PieChart as PieChartIcon } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const barData = [
  { name: 'Mon', revenue: 400 },
  { name: 'Tue', revenue: 300 },
  { name: 'Wed', revenue: 550 },
  { name: 'Thu', revenue: 200 },
  { name: 'Fri', revenue: 700 },
  { name: 'Sat', revenue: 900 },
  { name: 'Sun', revenue: 850 },
];

const pieData = [
  { name: 'Card', value: 4500, color: '#3B82F6' },
  { name: 'UPI', value: 3200, color: '#8B5CF6' },
  { name: 'Cash', value: 1500, color: '#10B981' },
];

export const FinancialReportsPage = () => {
  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Financial Reports</h1>
        <p className="text-gray-400 mt-1">Analyze gym revenue and payment distributions.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 text-white"><Calendar size={100} /></div>
          <p className="text-gray-400 font-medium mb-1 relative z-10">Daily Collection</p>
          <h2 className="text-4xl font-extrabold text-white relative z-10">$850.00</h2>
          <p className="text-green-400 text-sm mt-2 flex items-center relative z-10"><TrendingUp size={14} className="mr-1" /> +12% from yesterday</p>
        </div>

        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 text-white"><Activity size={100} /></div>
          <p className="text-gray-400 font-medium mb-1 relative z-10">Weekly Collection</p>
          <h2 className="text-4xl font-extrabold text-blue-400 relative z-10">$3,900.00</h2>
          <p className="text-green-400 text-sm mt-2 flex items-center relative z-10"><TrendingUp size={14} className="mr-1" /> +5% from last week</p>
        </div>

        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 text-white"><DollarSign size={100} /></div>
          <p className="text-gray-400 font-medium mb-1 relative z-10">Monthly Collection</p>
          <h2 className="text-4xl font-extrabold text-purple-400 relative z-10">$12,450.00</h2>
          <p className="text-green-400 text-sm mt-2 flex items-center relative z-10"><TrendingUp size={14} className="mr-1" /> +20% from last month</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Weekly Revenue Bar Chart */}
        <div className="lg:col-span-2 bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-xl">
          <h3 className="text-xl font-bold mb-6 flex items-center"><TrendingUp size={20} className="mr-2 text-blue-400" /> Revenue This Week</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" tickFormatter={(value) => `$${value}`} />
                <Tooltip 
                  cursor={{fill: '#374151'}} 
                  contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
                  formatter={(value: number) => [`$${value}`, 'Revenue']}
                />
                <Bar dataKey="revenue" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Payment Methods Pie Chart */}
        <div className="lg:col-span-1 bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-xl">
          <h3 className="text-xl font-bold mb-6 flex items-center"><PieChartIcon size={20} className="mr-2 text-purple-400" /> Payment Methods</h3>
          <div className="h-64 w-full flex justify-center items-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                  formatter={(value: number) => `$${value}`}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none flex-col mt-2">
              <span className="text-sm text-gray-400">Total</span>
              <span className="text-xl font-bold">$9,200</span>
            </div>
          </div>
          
          <div className="mt-4 space-y-2">
            {pieData.map(item => (
              <div key={item.name} className="flex justify-between items-center text-sm">
                <span className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                  {item.name}
                </span>
                <span className="font-semibold">${item.value}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
