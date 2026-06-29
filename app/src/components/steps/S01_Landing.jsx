export default function S01_Landing({ goNext }) {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
      <header className="w-full max-w-6xl mx-auto px-6 sm:px-10 py-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <span className="text-sm font-bold text-gray-900 tracking-tight">TaxClarity</span>
        </div>
        <span className="text-xs font-medium text-gray-500 bg-gray-100 rounded-full px-3 py-1">FY 2025-26</span>
      </header>

      <main className="flex-1 w-full max-w-6xl mx-auto px-6 sm:px-10 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          <div className="card-enter">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100 rounded-full px-3 py-1 w-fit mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
              Know. Compare. Save.
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-[1.1] tracking-tight mb-5">
              Find out <span className="text-indigo-600 underline decoration-indigo-200 decoration-4 underline-offset-4">which tax regime</span> saves you more money this year.
            </h1>
            
            <p className="text-base sm:text-lg text-gray-500 leading-relaxed mb-8 max-w-md">
              Answer a few simple questions about your salary and expenses. We'll compare both tax regimes and show you which one saves you more money — with a clear rupee-by-rupee estimate.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-10">
              <div className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-medium text-gray-600 shadow-sm">
                <span>⏱</span> 2 min
              </div>
              <div className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-medium text-gray-600 shadow-sm">
                <span>🔒</span> 100% Free
              </div>
              <div className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-medium text-gray-600 shadow-sm">
                <span>🛡</span> Private
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <button onClick={goNext} className="bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold py-3.5 px-7 rounded-2xl text-sm transition-colors shadow-md shadow-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex items-center gap-2 w-full sm:w-auto justify-center">
                Start calculation
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </button>
              <button onClick={goNext} className="text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors border border-gray-300 rounded-xl px-5 py-3.5 hover:bg-gray-100 flex items-center gap-2 w-full sm:w-auto justify-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                See how it works
              </button>
            </div>
            <p className="mt-4 text-xs text-gray-400 text-center sm:text-left">Built for salaried individuals only · FY 2025-26</p>
          </div>
          
          <div className="relative mt-8 lg:mt-0 reveal" style={{ animationDelay: '0.1s' }}>
            <div className="absolute inset-0 bg-indigo-100 rounded-3xl blur-3xl opacity-40 scale-95 translate-y-4"></div>
            <div className="relative bg-white rounded-3xl shadow-xl shadow-gray-200/80 border border-gray-100 p-6 sm:p-8">
              
              <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                    <span className="text-sm">👋</span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Your Tax Summary</p>
                    <p className="text-sm font-bold text-gray-900">FY 2025-26 Estimate</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 rounded-2xl p-5 mb-6">
                <div className="flex items-center gap-2 mb-1">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span className="text-xs font-bold text-green-800 uppercase tracking-wide">Recommended</span>
                </div>
                <p className="text-sm text-green-700 font-medium">New Tax Regime</p>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-xs text-green-600">You save</span>
                  <span className="text-2xl font-black text-green-700">₹18,540</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-3">
                  <p className="text-[10px] font-semibold text-indigo-600 uppercase tracking-wide mb-1">New Regime</p>
                  <p className="text-xs text-gray-500 mb-0.5">Total Tax</p>
                  <p className="text-base font-bold text-indigo-900">₹1,12,400</p>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 opacity-70">
                  <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1">Old Regime</p>
                  <p className="text-xs text-gray-400 mb-0.5">Total Tax</p>
                  <p className="text-base font-bold text-gray-700">₹1,30,940</p>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-center gap-1.5 text-xs text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                This is just an example
              </div>
            </div>
          </div>
          
        </div>

        <div className="mt-24 lg:mt-28 reveal" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-center text-sm font-bold text-gray-400 uppercase tracking-widest mb-8">What you get at the end</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm text-center flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-lg mb-3">⚖️</div>
              <h3 className="text-sm font-bold text-gray-900 mb-1.5">Old vs New Comparison</h3>
              <p className="text-xs text-gray-500 leading-relaxed">Side-by-side breakdown of your exact tax liability under both regimes.</p>
            </div>
            <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm text-center flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center text-lg mb-3">💰</div>
              <h3 className="text-sm font-bold text-gray-900 mb-1.5">Exact Amount You Save</h3>
              <p className="text-xs text-gray-500 leading-relaxed">We calculate the rupee difference so you can pick the clear winner.</p>
            </div>
            <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm text-center flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center text-lg mb-3">🧾</div>
              <h3 className="text-sm font-bold text-gray-900 mb-1.5">Refund or Tax Due</h3>
              <p className="text-xs text-gray-500 leading-relaxed">Know immediately if you'll get a refund from the IT dept or need to pay more.</p>
            </div>
            <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm text-center flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-lg mb-3">🗣️</div>
              <h3 className="text-sm font-bold text-gray-900 mb-1.5">Plain English, No Jargon</h3>
              <p className="text-xs text-gray-500 leading-relaxed">No confusing CA terms. Every deduction is explained in simple words.</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-auto border-t border-gray-200 bg-white py-6">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-1.5 mb-2">
            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            <span className="text-xs font-semibold text-gray-700">100% Private & Secure</span>
          </div>
          <p className="text-[11px] text-gray-400">All calculations happen directly in your browser. No data is stored, sent to any server, or shared.</p>
        </div>
      </footer>
    </div>
  )
}
