import React, { useState, useEffect, useRef } from 'react';
import { Smartphone, QrCode, LogIn, LogOut, CheckCircle, XCircle } from 'lucide-react';

export const AttendanceKioskPage = () => {
  const [activeTab, setActiveTab] = useState<'MOBILE' | 'QR'>('MOBILE');
  const [mobileNumber, setMobileNumber] = useState('');
  const [statusMessage, setStatusMessage] = useState<{ text: string, type: 'success' | 'error' | null }>({ text: '', type: null });
  
  // Hidden input ref for capturing physical barcode scanner input
  const qrInputRef = useRef<HTMLInputElement>(null);

  // Keep hidden input focused when in QR mode
  useEffect(() => {
    if (activeTab === 'QR' && qrInputRef.current) {
      qrInputRef.current.focus();
    }
  }, [activeTab]);

  const handleNumpadClick = (num: string) => {
    if (mobileNumber.length < 10) {
      setMobileNumber(prev => prev + num);
    }
  };

  const handleBackspace = () => {
    setMobileNumber(prev => prev.slice(0, -1));
  };

  const simulateApiCall = (identifier: string, action: 'checkin' | 'checkout') => {
    // Simulated API response
    setTimeout(() => {
      setStatusMessage({ text: `Successfully ${action === 'checkin' ? 'checked in' : 'checked out'}!`, type: 'success' });
      setMobileNumber('');
      setTimeout(() => setStatusMessage({ text: '', type: null }), 3000);
    }, 500);
  };

  const handleQRSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & { qrCode: { value: string } };
    const code = target.qrCode.value;
    
    if (code) {
      // By default physical scanners hit "Enter", submitting the form
      simulateApiCall(code, 'checkin');
      target.qrCode.value = ''; // clear for next scan
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-gray-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-700">
        
        {/* Header Tabs */}
        <div className="flex text-lg font-bold">
          <button 
            onClick={() => setActiveTab('MOBILE')}
            className={`flex-1 py-6 flex justify-center items-center transition ${activeTab === 'MOBILE' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
          >
            <Smartphone className="mr-2" /> Mobile Number
          </button>
          <button 
            onClick={() => setActiveTab('QR')}
            className={`flex-1 py-6 flex justify-center items-center transition ${activeTab === 'QR' ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
          >
            <QrCode className="mr-2" /> Scan QR Code
          </button>
        </div>

        <div className="p-8">
          {/* Status Message Display */}
          {statusMessage.type && (
            <div className={`mb-6 p-4 rounded-xl flex items-center justify-center font-bold text-lg animate-pulse ${statusMessage.type === 'success' ? 'bg-green-500/20 text-green-400 border border-green-500/50' : 'bg-red-500/20 text-red-400 border border-red-500/50'}`}>
              {statusMessage.type === 'success' ? <CheckCircle className="mr-2" /> : <XCircle className="mr-2" />}
              {statusMessage.text}
            </div>
          )}

          {activeTab === 'MOBILE' ? (
            <div>
              <div className="bg-gray-900 border border-gray-700 rounded-xl p-4 mb-8">
                <p className="text-center text-3xl tracking-[0.2em] font-mono h-10 text-white flex items-center justify-center">
                  {mobileNumber || <span className="text-gray-600">Enter Number</span>}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-8">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                  <button 
                    key={num} 
                    onClick={() => handleNumpadClick(num.toString())}
                    className="py-4 bg-gray-700 hover:bg-gray-600 rounded-xl text-2xl font-bold text-white transition active:scale-95"
                  >
                    {num}
                  </button>
                ))}
                <button className="py-4 bg-gray-800 rounded-xl"></button>
                <button 
                  onClick={() => handleNumpadClick('0')}
                  className="py-4 bg-gray-700 hover:bg-gray-600 rounded-xl text-2xl font-bold text-white transition active:scale-95"
                >
                  0
                </button>
                <button 
                  onClick={handleBackspace}
                  className="py-4 bg-gray-600 hover:bg-red-600 rounded-xl text-xl font-bold text-white transition active:scale-95"
                >
                  ⌫
                </button>
              </div>

              <div className="flex space-x-4">
                <button 
                  onClick={() => simulateApiCall(mobileNumber, 'checkin')}
                  disabled={mobileNumber.length < 10}
                  className="flex-1 py-5 bg-green-600 hover:bg-green-500 disabled:bg-gray-700 disabled:text-gray-500 rounded-xl font-bold text-xl transition flex justify-center items-center shadow-lg shadow-green-600/20"
                >
                  <LogIn className="mr-2" /> Check In
                </button>
                <button 
                  onClick={() => simulateApiCall(mobileNumber, 'checkout')}
                  disabled={mobileNumber.length < 10}
                  className="flex-1 py-5 bg-orange-600 hover:bg-orange-500 disabled:bg-gray-700 disabled:text-gray-500 rounded-xl font-bold text-xl transition flex justify-center items-center shadow-lg shadow-orange-600/20"
                >
                  <LogOut className="mr-2" /> Check Out
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="relative">
                <QrCode size={120} className="text-purple-400 mb-8 animate-pulse" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-800 to-transparent"></div>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Ready to Scan</h2>
              <p className="text-gray-400 text-center max-w-xs">Please hold your member QR code in front of the scanner.</p>
              
              {/* Invisible form capturing physical scanner input */}
              <form onSubmit={handleQRSubmit}>
                <input 
                  type="text" 
                  name="qrCode" 
                  ref={qrInputRef} 
                  className="opacity-0 absolute -z-10" 
                  autoComplete="off"
                  onBlur={() => { if (activeTab === 'QR') qrInputRef.current?.focus() }} // keep focus
                />
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
