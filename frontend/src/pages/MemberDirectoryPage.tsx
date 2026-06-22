import React, { useState } from 'react';
import { Search, UserPlus, FileText, Phone, MapPin, Activity } from 'lucide-react';

const mockMembers = [
  { id: '1', firstName: 'Alice', lastName: 'Johnson', email: 'alice@example.com', phoneNumber: '555-0101', memberProfile: { fitnessGoal: 'Weight Loss' } },
  { id: '2', firstName: 'Bob', lastName: 'Smith', email: 'bob@example.com', phoneNumber: '555-0202', memberProfile: { fitnessGoal: 'Muscle Gain' } },
];

export const MemberDirectoryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Members Directory</h1>
          <p className="text-gray-400">Search and manage all gym members.</p>
        </div>
        
        <div className="flex w-full md:w-auto space-x-4">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search members..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 transition"
            />
          </div>
          <button 
            onClick={() => setModalOpen(true)}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium transition whitespace-nowrap"
          >
            <UserPlus size={18} />
            <span>Add Member</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {mockMembers.map(member => (
          <div key={member.id} className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-gray-500 transition group cursor-pointer">
            <div className="flex items-center space-x-4 mb-4">
              <img src="https://via.placeholder.com/150" alt="Profile" className="w-16 h-16 rounded-full object-cover border-2 border-gray-600" />
              <div>
                <h3 className="text-lg font-bold group-hover:text-blue-400 transition">{member.firstName} {member.lastName}</h3>
                <p className="text-sm text-gray-400 flex items-center mt-1"><Phone size={12} className="mr-1" /> {member.phoneNumber}</p>
              </div>
            </div>
            
            <div className="bg-gray-700/50 rounded-lg p-3 text-sm">
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-400 flex items-center"><Activity size={14} className="mr-1"/> Goal</span>
                <span className="font-medium text-blue-300">{member.memberProfile.fitnessGoal}</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-gray-400">Status</span>
                <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-xs font-medium">Active</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-xl p-6 w-full max-w-2xl border border-gray-700 shadow-2xl overflow-y-auto max-h-[90vh]">
            <h2 className="text-2xl font-bold mb-6">Register New Member</h2>
            <form className="space-y-6">
              {/* Personal Info */}
              <div>
                <h3 className="text-lg font-semibold border-b border-gray-700 pb-2 mb-4">Personal Info</h3>
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="First Name" className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 outline-none" />
                  <input type="text" placeholder="Last Name" className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 outline-none" />
                  <input type="email" placeholder="Email" className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 outline-none" />
                  <input type="text" placeholder="Mobile" className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 outline-none" />
                  <select className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 outline-none text-gray-300">
                    <option value="">Select Gender</option>
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                    <option value="OTHER">Other</option>
                  </select>
                  <input type="date" className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 outline-none text-gray-300" />
                </div>
              </div>

              {/* Physical Attributes */}
              <div>
                <h3 className="text-lg font-semibold border-b border-gray-700 pb-2 mb-4">Physical Attributes</h3>
                <div className="grid grid-cols-3 gap-4">
                  <input type="number" placeholder="Height (cm)" className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 outline-none" />
                  <input type="number" placeholder="Weight (kg)" className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 outline-none" />
                  <input type="text" placeholder="Fitness Goal" className="w-full p-2 bg-gray-700 rounded border border-gray-600 focus:border-blue-500 outline-none" />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700">
                <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded font-medium transition">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded font-medium transition">Save Member</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
