import { useState } from 'react';
import InputPanel from './InputPanel';
import ResultsPanel from './ResultsPanel';
import { INITIAL_STATE } from '../App';

export default function Dashboard() {
  const [data, setData] = useState(INITIAL_STATE);
  function update(fields) { setData(prev => ({ ...prev, ...fields })) }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center shadow-md shadow-indigo-200">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
            </div>
            <div>
              <span className="block text-lg font-extrabold text-gray-900 tracking-tight leading-none">TaxClarity</span>
              <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Financial Dashboard</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 rounded-full px-3 py-1.5 shadow-sm">FY 2025-26</span>
          </div>
        </div>
      </header>
      
      <main className="flex-1 max-w-[1400px] mx-auto w-full px-4 sm:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          <div className="w-full lg:w-[35%] flex-shrink-0">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-1">Your Details</h1>
              <p className="text-sm text-gray-500">Adjust the sliders to instantly see the impact on your tax.</p>
            </div>
            <InputPanel data={data} update={update} />
          </div>
          
          <div className="w-full lg:w-[65%] flex-shrink-0">
            <div className="lg:sticky lg:top-24">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-1">Comparison Overview</h1>
                  <p className="text-sm text-gray-500">Real-time breakdown of both regimes.</p>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider bg-white border border-gray-200 px-3 py-1.5 rounded-lg shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  Live Sync
                </div>
              </div>
              <ResultsPanel data={data} />
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}
