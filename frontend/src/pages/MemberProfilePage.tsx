import React from 'react';
import { Mail, Phone, MapPin, Activity, Ruler, Weight, UserCircle, Edit, ShieldAlert } from 'lucide-react';

const mockMember = {
  id: '1',
  firstName: 'Alice',
  lastName: 'Johnson',
  email: 'alice@example.com',
  phoneNumber: '555-0101',
  isActive: true,
  memberProfile: {
    gender: 'FEMALE',
    dateOfBirth: '1990-05-15',
    address: '123 Fitness Ave, Gym City',
    height: '165',
    weight: '62',
    fitnessGoal: 'Weight Loss',
    emergencyContact: 'Bob Johnson (555-0999)',
    medicalNotes: 'No known allergies.',
    joinDate: '2023-01-10',
    photoUrl: 'https://via.placeholder.com/300',
  }
};

export const MemberProfilePage = () => {
  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Member Profile</h1>
          <button className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg font-medium transition">
            <Edit size={18} />
            <span>Edit Profile</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column: ID Card */}
          <div className="md:col-span-1">
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700 flex flex-col items-center text-center">
              <img src={mockMember.memberProfile.photoUrl} alt="Profile" className="w-40 h-40 rounded-full object-cover border-4 border-gray-700 shadow-md mb-4" />
              <h2 className="text-2xl font-bold">{mockMember.firstName} {mockMember.lastName}</h2>
              <p className="text-blue-400 mb-4">{mockMember.memberProfile.fitnessGoal}</p>
              
              <span className="px-4 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-semibold mb-6">Active Member</span>

              <div className="w-full space-y-3 text-left border-t border-gray-700 pt-6">
                <div className="flex items-center text-gray-300">
                  <Phone size={16} className="mr-3 text-gray-500" />
                  <span>{mockMember.phoneNumber}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Mail size={16} className="mr-3 text-gray-500" />
                  <span className="truncate">{mockMember.email}</span>
                </div>
                <div className="flex items-start text-gray-300">
                  <MapPin size={16} className="mr-3 text-gray-500 mt-1 flex-shrink-0" />
                  <span>{mockMember.memberProfile.address}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="md:col-span-2 space-y-8">
            
            {/* Physical Attributes */}
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
              <h3 className="text-xl font-semibold mb-6 border-b border-gray-700 pb-2">Physical Attributes</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                <div>
                  <p className="text-gray-400 text-sm flex items-center"><Ruler size={14} className="mr-1"/> Height</p>
                  <p className="font-semibold text-lg">{mockMember.memberProfile.height} cm</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm flex items-center"><Weight size={14} className="mr-1"/> Weight</p>
                  <p className="font-semibold text-lg">{mockMember.memberProfile.weight} kg</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm flex items-center"><UserCircle size={14} className="mr-1"/> Gender</p>
                  <p className="font-semibold text-lg">{mockMember.memberProfile.gender}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm flex items-center"><Activity size={14} className="mr-1"/> DOB</p>
                  <p className="font-semibold text-lg">{mockMember.memberProfile.dateOfBirth}</p>
                </div>
              </div>
            </div>

            {/* Emergency Info */}
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-red-900/30">
              <h3 className="text-xl font-semibold mb-6 border-b border-gray-700 pb-2 flex items-center text-red-400">
                <ShieldAlert size={20} className="mr-2" /> Emergency Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Emergency Contact</p>
                  <p className="font-medium bg-gray-700 p-3 rounded">{mockMember.memberProfile.emergencyContact}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Medical Notes</p>
                  <p className="font-medium bg-gray-700 p-3 rounded">{mockMember.memberProfile.medicalNotes || 'None'}</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
