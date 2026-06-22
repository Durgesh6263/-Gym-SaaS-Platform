import React, { useState } from 'react';
import { Plus, Edit, Trash2, Tag, Clock, CheckCircle } from 'lucide-react';

const mockPlans = [
  { id: '1', name: 'Basic Monthly', type: 'MONTHLY', durationDays: 30, price: 50.00, discount: 0, description: 'Access to gym equipment. No classes included.', isActive: true },
  { id: '2', name: 'Pro Quarterly', type: 'QUARTERLY', durationDays: 90, price: 135.00, discount: 10, description: 'Full gym access + all group classes.', isActive: true },
  { id: '3', name: 'Elite Yearly', type: 'YEARLY', durationDays: 365, price: 500.00, discount: 20, description: 'VIP access, personal locker, and monthly PT session.', isActive: true },
];

export const MembershipPlansPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold">Membership Plans</h1>
          <p className="text-gray-400 mt-1">Manage subscription tiers, pricing, and discounts.</p>
        </div>
        <button 
          onClick={() => setModalOpen(true)}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-lg font-medium shadow-lg transition"
        >
          <Plus size={20} />
          <span>Create Plan</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockPlans.map(plan => (
          <div key={plan.id} className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden shadow-xl hover:border-gray-500 transition group relative">
            
            {plan.discount > 0 && (
              <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center shadow-lg">
                <Tag size={12} className="mr-1" /> {plan.discount}% OFF
              </div>
            )}

            <div className="p-8 border-b border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <div className="flex items-end space-x-2 mb-4">
                <span className="text-4xl font-extrabold">${plan.price}</span>
                <span className="text-gray-400 pb-1">/ {plan.type.toLowerCase().replace('_', ' ')}</span>
              </div>
              <p className="text-gray-400 text-sm h-10">{plan.description}</p>
            </div>

            <div className="p-6 bg-gray-800/50">
              <ul className="space-y-3 mb-6">
                <li className="flex items-center text-sm text-gray-300">
                  <Clock size={16} className="text-blue-400 mr-3" /> Duration: {plan.durationDays} Days
                </li>
                <li className="flex items-center text-sm text-gray-300">
                  <CheckCircle size={16} className="text-green-400 mr-3" /> Status: {plan.isActive ? 'Active' : 'Inactive'}
                </li>
              </ul>
              
              <div className="flex space-x-3 pt-4 border-t border-gray-700">
                <button className="flex-1 flex justify-center items-center space-x-2 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm font-medium transition">
                  <Edit size={16} /> <span>Edit</span>
                </button>
                <button className="flex items-center justify-center py-2 px-4 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded transition">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-2xl p-8 w-full max-w-md border border-gray-700 shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-white">Create Membership Plan</h2>
            <form className="space-y-5">
              
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Plan Name</label>
                <input type="text" placeholder="e.g. Premium Yearly" className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-blue-500 outline-none text-white" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Plan Type</label>
                  <select className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-blue-500 outline-none text-white appearance-none">
                    <option value="MONTHLY">Monthly</option>
                    <option value="QUARTERLY">Quarterly</option>
                    <option value="HALF_YEARLY">Half Yearly</option>
                    <option value="YEARLY">Yearly</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Duration (Days)</label>
                  <input type="number" placeholder="30" className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-blue-500 outline-none text-white" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Price ($)</label>
                  <input type="number" step="0.01" placeholder="0.00" className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-blue-500 outline-none text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Discount (%)</label>
                  <input type="number" placeholder="0" className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-blue-500 outline-none text-white" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
                <textarea rows={3} placeholder="What does this plan include?" className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-blue-500 outline-none text-white resize-none"></textarea>
              </div>

              <div className="flex justify-end space-x-3 pt-6 border-t border-gray-700">
                <button type="button" onClick={() => setModalOpen(false)} className="px-5 py-2.5 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition">Cancel</button>
                <button type="submit" className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition shadow-lg shadow-blue-500/30">Save Plan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
