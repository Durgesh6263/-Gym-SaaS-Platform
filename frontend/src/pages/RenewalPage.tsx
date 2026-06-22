import React, { useState } from 'react';
import { Search, CreditCard, Banknote, CalendarCheck, FileText, CheckCircle } from 'lucide-react';

const mockMembers = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', status: 'ACTIVE', endDate: '2026-07-15' },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com', status: 'EXPIRED', endDate: '2026-05-10' },
];

const mockPlans = [
  { id: '1', name: 'Basic Monthly', duration: 30, price: 50.00 },
  { id: '2', name: 'Pro Quarterly', duration: 90, price: 135.00 },
  { id: '3', name: 'Elite Yearly', duration: 365, price: 500.00 },
];

export const RenewalPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState('CASH');
  const [showReceipt, setShowReceipt] = useState(false);

  const handleRenew = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedMember && selectedPlan) {
      // API call would go here
      setShowReceipt(true);
    }
  };

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Process Renewal</h1>
        <p className="text-gray-400 mb-8">Extend memberships and generate payment receipts.</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Member Search & Plan Selection */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Member Search */}
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-xl">
              <h2 className="text-xl font-bold mb-4 flex items-center"><Search size={20} className="mr-2 text-blue-400" /> 1. Select Member</h2>
              <input 
                type="text" 
                placeholder="Search by name or email..." 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-blue-500 outline-none text-white mb-4"
              />
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {mockMembers.map(m => (
                  <div 
                    key={m.id} 
                    onClick={() => setSelectedMember(m)}
                    className={`p-3 rounded-lg border cursor-pointer transition flex justify-between items-center ${selectedMember?.id === m.id ? 'bg-blue-600/20 border-blue-500' : 'bg-gray-700 border-gray-600 hover:border-gray-500'}`}
                  >
                    <div>
                      <p className="font-semibold">{m.name}</p>
                      <p className="text-xs text-gray-400">{m.email}</p>
                    </div>
                    <div className="text-right">
                      {m.status === 'ACTIVE' ? (
                        <span className="text-green-400 text-xs font-bold px-2 py-1 rounded bg-green-500/10">ACTIVE (Ends {m.endDate})</span>
                      ) : (
                        <span className="text-red-400 text-xs font-bold px-2 py-1 rounded bg-red-500/10">EXPIRED</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Plan Selection */}
            <div className={`bg-gray-800 rounded-2xl p-6 border shadow-xl transition duration-300 ${selectedMember ? 'border-gray-700' : 'border-gray-800 opacity-50 pointer-events-none'}`}>
              <h2 className="text-xl font-bold mb-4 flex items-center"><CalendarCheck size={20} className="mr-2 text-blue-400" /> 2. Select Plan</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {mockPlans.map(plan => (
                  <div 
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan)}
                    className={`p-4 rounded-xl border cursor-pointer transition text-center ${selectedPlan?.id === plan.id ? 'bg-blue-600 border-blue-400 shadow-lg shadow-blue-500/20' : 'bg-gray-700 border-gray-600 hover:border-gray-500'}`}
                  >
                    <h3 className="font-bold mb-1">{plan.name}</h3>
                    <p className="text-2xl font-extrabold mb-1">${plan.price}</p>
                    <p className="text-sm text-gray-300">{plan.duration} Days</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Checkout Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-xl sticky top-8">
              <h2 className="text-xl font-bold mb-6 border-b border-gray-700 pb-3">Checkout Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Member:</span>
                  <span className="font-semibold text-right">{selectedMember?.name || '--'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Plan:</span>
                  <span className="font-semibold text-right">{selectedPlan?.name || '--'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Start Date:</span>
                  <span className="text-sm text-right">{selectedMember?.status === 'ACTIVE' ? `After ${selectedMember.endDate}` : 'Today'}</span>
                </div>
              </div>

              <div className="mb-6 pt-4 border-t border-gray-700">
                <p className="text-gray-400 mb-2">Payment Method</p>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => setPaymentMethod('CASH')}
                    className={`flex items-center justify-center p-2 rounded border transition ${paymentMethod === 'CASH' ? 'bg-green-600/20 border-green-500 text-green-400' : 'bg-gray-700 border-gray-600 text-gray-400 hover:text-white'}`}
                  >
                    <Banknote size={16} className="mr-2" /> Cash
                  </button>
                  <button 
                    onClick={() => setPaymentMethod('CREDIT_CARD')}
                    className={`flex items-center justify-center p-2 rounded border transition ${paymentMethod === 'CREDIT_CARD' ? 'bg-indigo-600/20 border-indigo-500 text-indigo-400' : 'bg-gray-700 border-gray-600 text-gray-400 hover:text-white'}`}
                  >
                    <CreditCard size={16} className="mr-2" /> Card
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-end mb-6 pt-4 border-t border-gray-700">
                <span className="text-lg font-bold">Total Due</span>
                <span className="text-3xl font-extrabold text-blue-400">${selectedPlan?.price || '0.00'}</span>
              </div>

              <button 
                onClick={handleRenew}
                disabled={!selectedMember || !selectedPlan}
                className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:text-gray-500 disabled:cursor-not-allowed rounded-xl font-bold text-lg transition shadow-lg shadow-blue-500/20 flex justify-center items-center"
              >
                Complete Payment
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Receipt Modal */}
      {showReceipt && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white text-gray-900 rounded-lg p-8 w-full max-w-md shadow-2xl text-center relative">
            <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-1">Payment Successful</h2>
            <p className="text-gray-500 mb-6">Receipt #REC-884920</p>
            
            <div className="bg-gray-50 p-4 rounded-lg text-left space-y-3 mb-8 border border-gray-200 text-sm">
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500">Member</span>
                <span className="font-semibold">{selectedMember?.name}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500">Plan</span>
                <span className="font-semibold">{selectedPlan?.name}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500">Amount Paid</span>
                <span className="font-semibold">${selectedPlan?.price} ({paymentMethod})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Processed By</span>
                <span className="font-semibold">Staff Name</span>
              </div>
            </div>

            <div className="flex space-x-4">
              <button onClick={() => setShowReceipt(false)} className="flex-1 py-3 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold transition">Close</button>
              <button className="flex-1 py-3 flex justify-center items-center bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition">
                <FileText size={18} className="mr-2" /> Print Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
