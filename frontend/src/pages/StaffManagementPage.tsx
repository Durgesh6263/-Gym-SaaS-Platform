import React, { useState } from 'react';
import { Plus, Edit, Trash2, Shield, UserX, CheckCircle, XCircle } from 'lucide-react';

const mockStaff = [
  { id: '1', name: 'John Doe', email: 'john@gym.com', position: 'Trainer', shift: 'Morning', isActive: true, permissions: ['ADD_MEMBERS', 'ATTENDANCE_ACCESS'] },
  { id: '2', name: 'Jane Smith', email: 'jane@gym.com', position: 'Manager', shift: 'Full Day', isActive: false, permissions: ['ADD_MEMBERS', 'RENEW_MEMBERSHIP', 'MANAGE_PAYMENTS'] },
];

export const StaffManagementPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Staff Management</h1>
          <p className="text-gray-400">Manage employee accounts and granular access permissions.</p>
        </div>
        <button 
          onClick={() => setModalOpen(true)}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium transition"
        >
          <Plus size={20} />
          <span>Add Staff</span>
        </button>
      </div>

      <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700">
        <table className="w-full text-left">
          <thead className="bg-gray-700 text-gray-300">
            <tr>
              <th className="p-4 font-semibold">Name</th>
              <th className="p-4 font-semibold">Position</th>
              <th className="p-4 font-semibold">Permissions</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {mockStaff.map(staff => (
              <tr key={staff.id} className="hover:bg-gray-700/50 transition">
                <td className="p-4">
                  <p className="font-medium">{staff.name}</p>
                  <p className="text-xs text-gray-400">{staff.email}</p>
                </td>
                <td className="p-4">
                  <p>{staff.position}</p>
                  <p className="text-xs text-gray-400">{staff.shift}</p>
                </td>
                <td className="p-4">
                  <div className="flex flex-wrap gap-2">
                    {staff.permissions.map(p => (
                      <span key={p} className="px-2 py-1 text-xs bg-indigo-500/20 text-indigo-300 rounded-full flex items-center space-x-1">
                        <Shield size={12} />
                        <span>{p.replace('_', ' ')}</span>
                      </span>
                    ))}
                  </div>
                </td>
                <td className="p-4">
                  {staff.isActive ? (
                    <span className="flex items-center text-green-400 text-sm font-medium"><CheckCircle size={16} className="mr-1" /> Active</span>
                  ) : (
                    <span className="flex items-center text-red-400 text-sm font-medium"><XCircle size={16} className="mr-1" /> Suspended</span>
                  )}
                </td>
                <td className="p-4 text-right space-x-3">
                  <button className="text-gray-400 hover:text-white transition"><Edit size={18} /></button>
                  <button className="text-gray-400 hover:text-yellow-400 transition"><UserX size={18} /></button>
                  <button className="text-gray-400 hover:text-red-500 transition"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-xl p-6 w-full max-w-lg border border-gray-700 shadow-2xl">
            <h2 className="text-2xl font-bold mb-4">Add Staff Member</h2>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="First Name" className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 outline-none" />
                <input type="text" placeholder="Last Name" className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 outline-none" />
              </div>
              <input type="email" placeholder="Email Address" className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 outline-none" />
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Position (e.g., Trainer)" className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 outline-none" />
                <input type="text" placeholder="Shift" className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 outline-none" />
              </div>
              
              <div className="mt-6">
                <h3 className="font-semibold mb-2">Assign Permissions</h3>
                <div className="space-y-2">
                  {['ADD_MEMBERS', 'RENEW_MEMBERSHIP', 'MANAGE_PAYMENTS', 'ATTENDANCE_ACCESS'].map(perm => (
                    <label key={perm} className="flex items-center space-x-3 p-2 hover:bg-gray-700 rounded cursor-pointer transition">
                      <input type="checkbox" className="w-4 h-4 rounded text-blue-500" />
                      <span className="text-sm font-medium">{perm.replace('_', ' ')}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-8">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded font-medium transition">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded font-medium transition">Save Staff</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
