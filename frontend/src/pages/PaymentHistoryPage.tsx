import React, { useState } from 'react';
import { Search, Download, Printer, Banknote, CreditCard, Smartphone, CheckCircle } from 'lucide-react';

const mockPayments = [
  { id: 'REC-1001', date: '2026-06-15 10:30 AM', memberName: 'Alice Johnson', amount: 50.00, method: 'CASH', status: 'COMPLETED' },
  { id: 'REC-1002', date: '2026-06-14 02:15 PM', memberName: 'Bob Smith', amount: 135.00, method: 'CREDIT_CARD', status: 'COMPLETED' },
  { id: 'REC-1003', date: '2026-06-14 09:00 AM', memberName: 'Charlie Brown', amount: 500.00, method: 'UPI', status: 'COMPLETED' },
];

export const PaymentHistoryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'CASH': return <span className="flex items-center text-green-400 bg-green-500/10 px-2 py-1 rounded text-xs"><Banknote size={14} className="mr-1" /> Cash</span>;
      case 'CREDIT_CARD': return <span className="flex items-center text-blue-400 bg-blue-500/10 px-2 py-1 rounded text-xs"><CreditCard size={14} className="mr-1" /> Card</span>;
      case 'UPI': return <span className="flex items-center text-purple-400 bg-purple-500/10 px-2 py-1 rounded text-xs"><Smartphone size={14} className="mr-1" /> UPI</span>;
      default: return <span className="text-gray-400 text-xs">{method}</span>;
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Payment History</h1>
          <p className="text-gray-400">View all transactions and generate receipts.</p>
        </div>
        
        <div className="flex w-full md:w-auto space-x-4">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by ID or Name..." 
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
              <th className="p-4 font-semibold border-b border-gray-700">Receipt ID</th>
              <th className="p-4 font-semibold border-b border-gray-700">Date & Time</th>
              <th className="p-4 font-semibold border-b border-gray-700">Member</th>
              <th className="p-4 font-semibold border-b border-gray-700">Amount</th>
              <th className="p-4 font-semibold border-b border-gray-700">Method</th>
              <th className="p-4 font-semibold border-b border-gray-700">Status</th>
              <th className="p-4 font-semibold border-b border-gray-700 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {mockPayments.map(payment => (
              <tr key={payment.id} className="hover:bg-gray-700/30 transition">
                <td className="p-4 font-mono text-sm text-blue-400">{payment.id}</td>
                <td className="p-4 text-sm text-gray-300">{payment.date}</td>
                <td className="p-4 font-medium">{payment.memberName}</td>
                <td className="p-4 font-bold text-white">${payment.amount.toFixed(2)}</td>
                <td className="p-4">{getMethodIcon(payment.method)}</td>
                <td className="p-4">
                  <span className="flex items-center text-green-400 text-xs font-bold"><CheckCircle size={14} className="mr-1" /> {payment.status}</span>
                </td>
                <td className="p-4 text-right space-x-2">
                  <button 
                    onClick={handlePrint}
                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition" 
                    title="Print Receipt"
                  >
                    <Printer size={18} />
                  </button>
                  <button 
                    className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded transition"
                    title="Download PDF"
                  >
                    <Download size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
