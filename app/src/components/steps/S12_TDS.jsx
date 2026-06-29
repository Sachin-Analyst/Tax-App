import { useState } from 'react';
import StepWrapper from '../StepWrapper';
import FrequencyInput from '../FrequencyInput';
import { toNum } from '../../utils';

export default function S12_TDS(props) {
  const { data, update, goNext } = props;
  const [errors, setErrors] = useState({});
  const [hasBankTDS, setHasBankTDS] = useState(data.bankTDS !== '');

  const hasInterest = data.hasOtherIncome && (toNum(data.fdInterest) + toNum(data.savingsInterest) > 0);

  const handleNext = () => {
    const newErrors = {};
    if (data.hasTDS === null) newErrors.hasTDS = true;
    if (data.hasTDS && !data.tdsDeducted) newErrors.tdsDeducted = true;
    if (hasInterest && hasBankTDS && !data.bankTDS) newErrors.bankTDS = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    goNext();
  };

  return (
    <StepWrapper {...props} stepName="TDS Deducted">
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-lg bg-indigo-100 flex items-center justify-center text-sm">🧾</div>
            <h2 className="text-xs font-medium text-indigo-600 uppercase tracking-wide">Almost done</h2>
          </div>
          <h1 className="text-xl font-bold text-gray-900 leading-tight mb-2">Does your employer deduct income tax from your salary every month?</h1>
          <p className="text-sm text-gray-500">This is called TDS (Tax Deducted at Source). It usually shows up on your monthly payslip.</p>
        </div>
        
        <div className="space-y-6">
          <div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => { update({ hasTDS: true }); setErrors(prev => ({ ...prev, hasTDS: false })) }}
                className={`flex-1 py-2.5 rounded-xl border-2 transition-all font-semibold text-sm ${data.hasTDS === true ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'}`}
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => { update({ hasTDS: false, tdsDeducted: '' }); setErrors(prev => ({ ...prev, hasTDS: false })) }}
                className={`flex-1 py-2.5 rounded-xl border-2 transition-all font-semibold text-sm ${data.hasTDS === false ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'}`}
              >
                No
              </button>
            </div>
            {errors.hasTDS && <p className="text-red-600 text-xs mt-1" role="alert">Please answer yes or no.</p>}
          </div>

          {data.hasTDS === true && (
            <div className="reveal p-4 bg-indigo-50 border border-indigo-100 rounded-xl">
              <FrequencyInput
                id="tdsDeducted"
                label="How much TDS does your employer deduct?"
                value={data.tdsDeducted}
                onChange={(val) => { update({ tdsDeducted: val }); setErrors(prev => ({ ...prev, tdsDeducted: false })) }}
                placeholder="e.g. 5,000"
                hint="Check your latest payslip. We will compare total TDS paid against your final tax."
                required
              />
              {errors.tdsDeducted && <p className="text-red-600 text-xs mt-1">Amount required</p>}
            </div>
          )}

          {hasInterest && (
            <div className="pt-6 border-t border-gray-100">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Did your bank deduct any TDS on your interest income?
              </h3>
              <div className="flex gap-3 mb-4">
                <button
                  type="button"
                  onClick={() => { setHasBankTDS(true); setErrors(prev => ({ ...prev, bankTDS: false })) }}
                  className={`flex-1 py-2.5 rounded-xl border-2 transition-all font-semibold text-sm ${hasBankTDS === true ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'}`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => { setHasBankTDS(false); update({ bankTDS: '' }); setErrors(prev => ({ ...prev, bankTDS: false })) }}
                  className={`flex-1 py-2.5 rounded-xl border-2 transition-all font-semibold text-sm ${hasBankTDS === false ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'}`}
                >
                  No
                </button>
              </div>

              {hasBankTDS === true && (
                <div className="reveal p-4 bg-blue-50 border border-blue-100 rounded-xl">
                  <FrequencyInput
                    id="bankTDS"
                    label="Total TDS deducted by bank"
                    value={data.bankTDS}
                    onChange={(val) => { update({ bankTDS: val }); setErrors(prev => ({ ...prev, bankTDS: false })) }}
                    placeholder="e.g. 2,500"
                    required
                  />
                  {errors.bankTDS && <p className="text-red-600 text-xs mt-1">Amount required</p>}
                </div>
              )}
            </div>
          )}
        </div>

        <button onClick={handleNext} className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 active:from-green-800 active:to-emerald-800 text-white font-bold py-4 px-6 rounded-xl text-[15px] transition-all shadow-lg shadow-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center justify-center gap-2 mt-4">
          Calculate My Tax
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
        </button>
      </div>
    </StepWrapper>
  )
}
