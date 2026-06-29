import { useState } from 'react';
import StepWrapper from '../StepWrapper';
import NumberInput from '../NumberInput';
import FrequencyInput from '../FrequencyInput';
import ConfusedLink from '../ConfusedLink';
import { toNum, fmt } from '../../utils';

export default function S04_SalaryDetails(props) {
  const { data, update, goNext } = props;
  const [errors, setErrors] = useState({});

  const takeHomeAnnual = toNum(data.takeHomeSalaryMonthly) * 12;
  const basicAnnual = toNum(data.basicSalaryMonthly) * 12;
  const bonus = toNum(data.bonus);
  
  const totalAnnual = takeHomeAnnual + (data.hasBonus ? bonus : 0);

  const basicExceedsWarning = basicAnnual > takeHomeAnnual && takeHomeAnnual > 0;
  const surchargeWarning = totalAnnual > 5000000;

  const handleNext = () => {
    const newErrors = {};
    if (!data.takeHomeSalaryMonthly) newErrors.takeHome = true;
    if (!data.basicSalaryMonthly) newErrors.basic = true;
    if (data.hasBonus === null) newErrors.hasBonus = true;
    if (data.hasBonus && !data.bonus) newErrors.bonus = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    goNext();
  };

  const handleBonusToggle = (val) => {
    update({ hasBonus: val });
    setErrors(prev => ({ ...prev, hasBonus: false }));
    if (!val) {
      update({ bonus: '' });
      setErrors(prev => ({ ...prev, bonus: false }));
    }
  };

  return (
    <StepWrapper {...props} stepName="Salary Details">
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-lg bg-indigo-100 flex items-center justify-center text-sm">💰</div>
            <h2 className="text-xs font-medium text-indigo-600 uppercase tracking-wide">Your Salary</h2>
          </div>
          <h1 className="text-xl font-bold text-gray-900 leading-tight mb-2">What does your salary look like?</h1>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <NumberInput
              id="takeHome"
              label="Take-home salary (Monthly)"
              value={data.takeHomeSalaryMonthly}
              onChange={(val) => { update({ takeHomeSalaryMonthly: val }); setErrors(prev => ({ ...prev, takeHome: false })) }}
              placeholder="e.g. 85,000"
              hint="The amount credited to your bank account each month — not your CTC or gross salary."
              required
            />
            {errors.takeHome && <p className="text-red-600 text-xs mt-1" role="alert">Required</p>}
          </div>
          <div>
            <NumberInput
              id="basic"
              label="Basic Pay (Monthly)"
              value={data.basicSalaryMonthly}
              onChange={(val) => { update({ basicSalaryMonthly: val }); setErrors(prev => ({ ...prev, basic: false })) }}
              placeholder="e.g. 42,500"
              required
            />
            {errors.basic && <p className="text-red-600 text-xs mt-1" role="alert">Required</p>}
            <ConfusedLink label="Where do I find my Basic Pay?" />
          </div>
        </div>

        {takeHomeAnnual > 0 && (
          <div className="reveal px-4 py-2.5 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center justify-between">
            <span className="text-sm font-medium text-indigo-800">Your annual take-home:</span>
            <span className="text-lg font-bold text-indigo-900">{fmt(takeHomeAnnual)}</span>
          </div>
        )}

        {basicExceedsWarning && (
          <div className="bg-amber-50 border border-amber-200 text-amber-800 text-xs p-3 rounded-lg reveal">
            <span className="font-bold">Wait, please check!</span> Your Basic Pay ({fmt(basicAnnual)}/yr) is higher than your Take-home salary ({fmt(takeHomeAnnual)}/yr). Basic pay is just one component of your salary and should normally be less than your total take-home.
          </div>
        )}

        {surchargeWarning && (
          <div className="bg-amber-50 border border-amber-200 text-amber-800 text-xs p-3 rounded-lg reveal">
            <span className="font-bold">Note:</span> Incomes above ₹50 Lakh may attract a surcharge. This calculator does not handle surcharge. We recommend consulting a CA.
          </div>
        )}

        <div className="border-t border-gray-100 pt-6 space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Do you get any extra money apart from your fixed monthly salary? <span className="text-red-500">*</span>
            </h3>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => handleBonusToggle(true)}
                className={`flex-1 py-2.5 rounded-xl border-2 transition-all font-semibold text-sm ${data.hasBonus === true ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'}`}
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => handleBonusToggle(false)}
                className={`flex-1 py-2.5 rounded-xl border-2 transition-all font-semibold text-sm ${data.hasBonus === false ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'}`}
              >
                No
              </button>
            </div>
            {errors.hasBonus && <p className="text-red-600 text-xs mt-1" role="alert">Please answer yes or no.</p>}
          </div>

          {data.hasBonus === true && (
            <div className="reveal p-4 bg-blue-50 border border-blue-100 rounded-xl space-y-3">
              <FrequencyInput
                id="bonus"
                label="How much extra do you receive?"
                value={data.bonus}
                onChange={(val) => { update({ bonus: val }); setErrors(prev => ({ ...prev, bonus: false })) }}
                placeholder="e.g. 1,00,000"
                required
              />
              {errors.bonus && <p className="text-red-600 text-xs mt-1" role="alert">Amount required</p>}
              
              <div className="bg-white border border-blue-100 rounded-lg p-3 mt-2 space-y-2">
                <p className="text-xs text-gray-600 font-medium">Include these:</p>
                <ul className="text-[11px] text-gray-500 list-disc list-inside">
                  <li>Yearly performance bonus</li>
                  <li>Joining bonus or retention bonus</li>
                  <li>Variable pay received this year</li>
                </ul>
                <p className="text-xs text-gray-600 font-medium pt-1">Don't include:</p>
                <ul className="text-[11px] text-gray-500 list-disc list-inside">
                  <li>Your fixed monthly salary (we already counted that)</li>
                  <li>EPF/NPS contributions by employer</li>
                </ul>
              </div>
            </div>
          )}

          {data.hasBonus === false && (
            <p className="text-sm text-gray-500 italic reveal">Got it — we'll use only your fixed monthly salary.</p>
          )}

          {data.hasBonus === true && totalAnnual > 0 && !errors.bonus && (
            <div className="reveal px-4 py-3 bg-green-50 border border-green-200 rounded-xl flex items-center justify-between">
              <span className="text-sm font-medium text-green-800">Your total income:</span>
              <span className="text-lg font-bold text-green-900">{fmt(totalAnnual)}</span>
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
