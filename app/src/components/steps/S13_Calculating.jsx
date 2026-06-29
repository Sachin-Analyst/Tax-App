import { useEffect } from 'react';

export default function S13_Calculating({ goNext }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      goNext();
    }, 2000);
    return () => clearTimeout(timer);
  }, [goNext]);

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center px-4">
      <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-indigo-200 animate-pulse">
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      </div>
      
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Calculating your taxes...</h1>
      <p className="text-sm text-gray-500 mb-8">Crunching the numbers across both regimes</p>
      
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce" style={{ animationDelay: '0.15s' }}></div>
        <div className="w-2 h-2 rounded-full bg-indigo-600 animate-bounce" style={{ animationDelay: '0.3s' }}></div>
      </div>
    </div>
  );
}
