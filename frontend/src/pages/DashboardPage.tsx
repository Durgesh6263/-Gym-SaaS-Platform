import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, UserCheck, UserMinus, DollarSign, Activity, Briefcase } from 'lucide-react';

const mockData = [
  { name: 'Mon', revenue: 4000 },
  { name: 'Tue', revenue: 3000 },
  { name: 'Wed', revenue: 5000 },
  { name: 'Thu', revenue: 2780 },
  { name: 'Fri', revenue: 6890 },
  { name: 'Sat', revenue: 2390 },
  { name: 'Sun', revenue: 3490 },
];

export const DashboardPage = () => {
  // In a real app, this state would be populated from the backend API
  const [stats, setStats] = useState({
    totalMembers: 1250,
    activeMembers: 1100,
    expiredMembers: 150,
    totalStaff: 12,
    todayCollection: 450.00,
    monthlyRevenue: 12500.00,
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-400">Welcome back! Here's what's happening today.</p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatCard title="Total Members" value={stats.totalMembers} icon={<Users />} color="bg-blue-500" />
          <StatCard title="Active Members" value={stats.activeMembers} icon={<UserCheck />} color="bg-green-500" />
          <StatCard title="Expired Members" value={stats.expiredMembers} icon={<UserMinus />} color="bg-red-500" />
          <StatCard title="Today's Collection" value={`$${stats.todayCollection}`} icon={<DollarSign />} color="bg-indigo-500" />
          <StatCard title="Monthly Revenue" value={`$${stats.monthlyRevenue}`} icon={<Activity />} color="bg-purple-500" />
          <StatCard title="Total Staff" value={stats.totalStaff} icon={<Briefcase />} color="bg-gray-500" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chart Area */}
          <div className="lg:col-span-2 bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
            <h2 className="text-xl font-semibold mb-4">Revenue Trend (Last 7 Days)</h2>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px', color: '#fff' }} />
                  <Line type="monotone" dataKey="revenue" stroke="#8B5CF6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Side Panels */}
          <div className="space-y-8">
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
              <h2 className="text-xl font-semibold mb-4">Recent Registrations</h2>
              <ul className="space-y-4">
                {[1, 2, 3].map(i => (
                  <li key={i} className="flex items-center space-x-3 border-b border-gray-700 pb-2 last:border-0 last:pb-0">
                    <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
                      <UserCheck size={20} className="text-gray-300" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">New Member #{i}</p>
                      <p className="text-xs text-gray-400">Joined today</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
              <h2 className="text-xl font-semibold mb-4">Recent Payments</h2>
              <ul className="space-y-4">
                {[1, 2, 3].map(i => (
                  <li key={i} className="flex justify-between items-center border-b border-gray-700 pb-2 last:border-0 last:pb-0">
                    <div>
                      <p className="font-medium text-sm">Payment #{i}</p>
                      <p className="text-xs text-gray-400">Credit Card</p>
                    </div>
                    <span className="text-green-400 font-semibold">+$45.00</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color }: { title: string, value: string | number, icon: React.ReactNode, color: string }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 hover:border-gray-500 transition-colors group cursor-pointer">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-400 mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-white">{value}</h3>
        </div>
        <div className={`w-14 h-14 rounded-full flex items-center justify-center ${color} bg-opacity-20`}>
          <div className={`${color.replace('bg-', 'text-')} opacity-100 group-hover:scale-110 transition-transform`}>
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
};
