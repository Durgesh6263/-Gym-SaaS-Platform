import React, { useState } from 'react';
import { Search, UserCheck, Clock, Users } from 'lucide-react';

const mockAttendance = [
  { id: '1', memberName: 'Alice Johnson', date: 'Today', checkIn: '08:00 AM', checkOut: '09:30 AM', duration: '1h 30m', status: 'COMPLETED' },
  { id: '2', memberName: 'Bob Smith', date: 'Today', checkIn: '09:15 AM', checkOut: '--', duration: 'In Gym', status: 'ACTIVE' },
  { id: '3', memberName: 'Charlie Brown', date: 'Yesterday', checkIn: '06:00 PM', checkOut: '07:45 PM', duration: '1h 45m', status: 'COMPLETED' },
];

export const AttendanceHistoryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Attendance History</h1>
          <p className="text-gray-400 mt-1">Monitor gym capacity and member check-ins.</p>
        </div>
        
        <div className="flex w-full md:w-auto space-x-4">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search member..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition text-white"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg flex items-center space-x-4">
          <div className="p-4 bg-blue-500/10 rounded-full text-blue-400">
            <Users size={32} />
          </div>
          <div>
            <p className="text-gray-400 font-medium">Currently in Gym</p>
            <h2 className="text-3xl font-bold text-white">42</h2>
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg flex items-center space-x-4">
          <div className="p-4 bg-green-500/10 rounded-full text-green-400">
            <UserCheck size={32} />
          </div>
          <div>
            <p className="text-gray-400 font-medium">Total Check-Ins Today</p>
            <h2 className="text-3xl font-bold text-white">128</h2>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl overflow-hidden shadow-xl border border-gray-700">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-700/50 text-gray-300">
            <tr>
              <th className="p-4 font-semibold border-b border-gray-700">Member</th>
              <th className="p-4 font-semibold border-b border-gray-700">Date</th>
              <th className="p-4 font-semibold border-b border-gray-700">Check In</th>
              <th className="p-4 font-semibold border-b border-gray-700">Check Out</th>
              <th className="p-4 font-semibold border-b border-gray-700">Duration</th>
              <th className="p-4 font-semibold border-b border-gray-700">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {mockAttendance.map(record => (
              <tr key={record.id} className="hover:bg-gray-700/30 transition">
                <td className="p-4 font-medium text-white">{record.memberName}</td>
                <td className="p-4 text-gray-300">{record.date}</td>
                <td className="p-4 text-green-400 font-mono text-sm">{record.checkIn}</td>
                <td className="p-4 text-orange-400 font-mono text-sm">{record.checkOut}</td>
                <td className="p-4 text-gray-300 flex items-center"><Clock size={14} className="mr-2 text-gray-500"/> {record.duration}</td>
                <td className="p-4">
                  {record.status === 'ACTIVE' ? (
                    <span className="px-2 py-1 rounded bg-blue-500/20 text-blue-400 text-xs font-bold">IN GYM</span>
                  ) : (
                    <span className="px-2 py-1 rounded bg-gray-700 text-gray-400 text-xs font-bold">COMPLETED</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
