import React, { useState } from 'react';
import { Search, Bell, Smartphone, MessageCircle, AlertCircle, CheckCircle, Clock } from 'lucide-react';

const mockLogs = [
  { id: '1', userName: 'Alice Johnson', title: 'Membership Renewed', message: 'Your Basic Monthly membership has been successfully renewed.', channel: 'PUSH', status: 'SENT', time: '10 mins ago' },
  { id: '2', userName: 'Bob Smith', title: 'Payment Successful', message: 'We have received your payment of $135.00. Thank you!', channel: 'SMS', status: 'SENT', time: '1 hour ago' },
  { id: '3', userName: 'Charlie Brown', title: 'Membership Expiring Soon', message: 'Hi Charlie, your gym membership expires on Sun Jun 18 2026. Please renew to avoid interruption.', channel: 'WHATSAPP', status: 'FAILED', errorLog: 'Timeout connecting to WHATSAPP gateway.', time: '2 hours ago' },
  { id: '4', userName: 'Diana Prince', title: 'Payment Successful', message: 'We have received your payment of $50.00. Thank you!', channel: 'SMS', status: 'PENDING', time: 'Just now' },
];

export const NotificationLogsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'PUSH': return <span className="flex items-center text-blue-400 bg-blue-500/10 px-2 py-1 rounded text-xs"><Bell size={14} className="mr-1" /> Push</span>;
      case 'SMS': return <span className="flex items-center text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded text-xs"><Smartphone size={14} className="mr-1" /> SMS</span>;
      case 'WHATSAPP': return <span className="flex items-center text-green-400 bg-green-500/10 px-2 py-1 rounded text-xs"><MessageCircle size={14} className="mr-1" /> WhatsApp</span>;
      default: return <span className="text-gray-400 text-xs">{channel}</span>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'SENT': return <span className="flex items-center text-green-400 text-xs font-bold"><CheckCircle size={14} className="mr-1" /> SENT</span>;
      case 'PENDING': return <span className="flex items-center text-orange-400 text-xs font-bold"><Clock size={14} className="mr-1 animate-spin" /> PENDING</span>;
      case 'FAILED': return <span className="flex items-center text-red-400 text-xs font-bold"><AlertCircle size={14} className="mr-1" /> FAILED</span>;
      default: return <span className="text-gray-400 text-xs">{status}</span>;
    }
  };

  const filteredLogs = mockLogs.filter(log => 
    (filterStatus === 'ALL' || log.status === filterStatus) &&
    (log.userName.toLowerCase().includes(searchTerm.toLowerCase()) || log.message.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Notification Logs</h1>
          <p className="text-gray-400 mt-1">Audit trail for all outgoing Push, SMS, and WhatsApp messages.</p>
        </div>
        
        <div className="flex w-full md:w-auto space-x-4">
          <select 
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
          >
            <option value="ALL">All Statuses</option>
            <option value="SENT">Sent</option>
            <option value="PENDING">Pending</option>
            <option value="FAILED">Failed</option>
          </select>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search user or message..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition"
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl overflow-hidden shadow-xl border border-gray-700">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-700/50 text-gray-300">
            <tr>
              <th className="p-4 font-semibold border-b border-gray-700">Recipient</th>
              <th className="p-4 font-semibold border-b border-gray-700">Message Details</th>
              <th className="p-4 font-semibold border-b border-gray-700">Channel</th>
              <th className="p-4 font-semibold border-b border-gray-700">Status</th>
              <th className="p-4 font-semibold border-b border-gray-700">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filteredLogs.map(log => (
              <tr key={log.id} className="hover:bg-gray-700/30 transition">
                <td className="p-4 font-medium text-white whitespace-nowrap">{log.userName}</td>
                <td className="p-4">
                  <div className="mb-1 font-semibold text-gray-200">{log.title}</div>
                  <div className="text-sm text-gray-400 max-w-md truncate" title={log.message}>{log.message}</div>
                  {log.errorLog && (
                    <div className="text-xs text-red-400 mt-1 flex items-center bg-red-500/10 inline-block px-2 py-0.5 rounded">
                      <AlertCircle size={12} className="mr-1" /> Error: {log.errorLog}
                    </div>
                  )}
                </td>
                <td className="p-4">{getChannelIcon(log.channel)}</td>
                <td className="p-4">{getStatusBadge(log.status)}</td>
                <td className="p-4 text-sm text-gray-400 whitespace-nowrap">{log.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredLogs.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No notifications found matching your filters.
          </div>
        )}
      </div>
    </div>
  );
};
