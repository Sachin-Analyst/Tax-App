import StepWrapper from '../StepWrapper';

export default function S02_FinancialYear(props) {
  const { goNext } = props;

  return (
    <StepWrapper {...props} stepName="Financial Year">
      <div className="space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-lg bg-indigo-100 flex items-center justify-center text-sm">📅</div>
            <h2 className="text-xs font-medium text-indigo-600 uppercase tracking-wide">Financial Year</h2>
          </div>
          <h1 className="text-xl font-bold text-gray-900 leading-tight mb-2">Which financial year are you calculating tax for?</h1>
        </div>
        
        <div className="p-4 bg-indigo-50 border-2 border-indigo-600 rounded-xl cursor-default transition-all">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full border-2 border-indigo-600 bg-indigo-600 flex items-center justify-center shrink-0">
              <div className="w-2 h-2 rounded-full bg-white"></div>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">FY 2025-26</p>
              <p className="text-xs text-gray-500 mt-0.5">April 2025 to March 2026</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-100 text-blue-800 text-xs p-3 rounded-lg flex items-start gap-2">
          <svg className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <p className="leading-relaxed">This calculator uses the latest rules from Budget 2024. Your tax return for this year will be filed by July 2026.</p>
        </div>

        <button onClick={goNext} className="mt-2 w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 active:from-indigo-800 active:to-purple-800 text-white font-bold py-3 px-6 rounded-xl text-sm transition-all shadow-md shadow-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          Continue →
        </button>
      </div>
    </StepWrapper>
  )
}
