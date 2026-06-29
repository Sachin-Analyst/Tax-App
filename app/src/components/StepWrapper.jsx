import ProgressBar from './ProgressBar';
import TaxPreviewPanel from './TaxPreviewPanel';
import FAQ from './FAQ';

export default function StepWrapper({ children, goBack, reset, showProgress, progressStep, TOTAL_PROGRESS, step, data, stepName, faqRef }) {
  return (
    <>
      <nav className="sticky top-0 z-10 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-2.5 flex items-center gap-3">
          <button onClick={reset} className="flex items-center gap-2 text-left shrink-0">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-bold text-gray-900 tracking-tight leading-none">TaxClarity</div>
              <div className="text-[10px] text-gray-400 leading-none mt-0.5 hidden sm:block">India Tax Calculator</div>
            </div>
          </button>

          {step > 1 && (
            <button onClick={goBack} className="flex items-center gap-1 text-xs font-medium text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-full px-3 py-1.5 transition-colors shrink-0">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
          )}

          <div className="flex-1 min-w-0 flex items-center pl-4">
            {showProgress && (
              <ProgressBar current={progressStep} total={TOTAL_PROGRESS} stepName={stepName} />
            )}
          </div>

          <div className="hidden md:flex items-center gap-1.5 shrink-0 ml-auto">
            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <div className="flex flex-col">
              <span className="text-[10px] font-semibold text-gray-600 leading-none">100% Private</span>
              <span className="text-[10px] text-gray-400 leading-none mt-0.5">Data stays in your browser</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          <main className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-7 card-enter">
              {children}
            </div>
            <FAQ ref={faqRef} />
          </main>
          
          {data && (
            <div className="hidden lg:block lg:col-span-5">
              <div className="sticky top-20">
                <TaxPreviewPanel data={data} />
              </div>
            </div>
          )}
        </div>
      </div>

      <footer className="max-w-7xl mx-auto w-full px-4 sm:px-8 pb-4">
        <p className="text-xs text-center text-gray-300">Salaried individuals · FY 2025-26 · No data saved</p>
      </footer>
    </>
  );
}
