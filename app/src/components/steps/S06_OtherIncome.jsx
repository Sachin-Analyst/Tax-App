import { useState } from 'react';
import StepWrapper from '../StepWrapper';
import FrequencyInput from '../FrequencyInput';
import ConfusedLink from '../ConfusedLink';

export default function S06_OtherIncome(props) {
  const { data, update, goNext } = props;
  const [error, setError] = useState(false);

  const handleNext = () => {
    if (data.hasOtherIncome === null) {
      setError(true);
      return;
    }
    if (!data.hasOtherIncome) {
      update({ fdInterest: '', savingsInterest: '' });
    }
    goNext();
  };

  const setHasOtherIncome = (val) => {
    update({ hasOtherIncome: val });
    setError(false);
  };

  return (
    <StepWrapper {...props} stepName="Other Income">
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-lg bg-indigo-100 flex items-center justify-center text-sm">💵</div>
            <h2 className="text-xs font-medium text-indigo-600 uppercase tracking-wide">Other Income</h2>
          </div>
          <h1 className="text-xl font-bold text-gray-900 leading-tight mb-2">Did your bank pay you any interest this year?</h1>
          <p className="text-sm text-gray-500">Interest from Fixed Deposits (FD) and Savings accounts is added to your income and taxed. Many people forget this.</p>
          <ConfusedLink label="What counts as interest income?" />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <div className="text-lg mb-2">🏦</div>
            <h3 className="text-sm font-bold text-gray-900 mb-1">Fixed Deposit (FD)</h3>
            <p className="text-xs text-gray-500 leading-relaxed">Interest earned on money locked in an FD for 1–5 years...</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <div className="text-lg mb-2">💳</div>
            <h3 className="text-sm font-bold text-gray-900 mb-1">Savings Account</h3>
            <p className="text-xs text-gray-500 leading-relaxed">The small interest your bank pays on the balance in your regular account...</p>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-6 space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Did you earn any interest from FDs or savings accounts in FY 2025-26? <span className="text-red-500">*</span>
            </h3>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setHasOtherIncome(true)}
                className={`flex-1 py-2.5 rounded-xl border-2 transition-all font-semibold text-sm ${data.hasOtherIncome === true ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'}`}
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => setHasOtherIncome(false)}
                className={`flex-1 py-2.5 rounded-xl border-2 transition-all font-semibold text-sm ${data.hasOtherIncome === false ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'}`}
              >
                No
              </button>
            </div>
            {error && <p className="text-red-600 text-xs mt-1" role="alert">Please answer yes or no.</p>}
          </div>

          {data.hasOtherIncome === true && (
            <div className="reveal space-y-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
              <FrequencyInput
                id="fdInterest"
                label="Total FD Interest"
                value={data.fdInterest}
                onChange={(val) => update({ fdInterest: val })}
                hint="Add all FDs together. Enter 0 if you have no FDs."
              />
              <FrequencyInput
                id="savingsInterest"
                label="Total Savings Account Interest"
                value={data.savingsInterest}
                onChange={(val) => update({ savingsInterest: val })}
                hint="Usually a small amount. Check your annual bank statement. Enter 0 if negligible."
              />
              <p className="text-xs text-blue-700 mt-2">
                Tip: open your bank app → Statements → search for "Interest Credit" entries.
              </p>
            </div>
          )}
        </div>

        <button onClick={handleNext} className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 active:from-indigo-800 active:to-purple-800 text-white font-bold py-3 px-6 rounded-xl text-sm transition-all shadow-md shadow-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          Continue →
        </button>
      </div>
    </StepWrapper>
  )
}
