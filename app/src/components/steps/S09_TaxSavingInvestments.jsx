import { useState } from 'react';
import StepWrapper from '../StepWrapper';
import FrequencyInput from '../FrequencyInput';
import ConfusedLink from '../ConfusedLink';
import { calc80CTotal, fmt } from '../../utils';

const ITEMS_80C = [
  { id: 'epf', label: 'EPF (Employee Provident Fund)', desc: 'Your 12% contribution deducted from salary' },
  { id: 'ppf', label: 'PPF (Public Provident Fund)', desc: 'Deposits made to PPF account' },
  { id: 'elss', label: 'ELSS Mutual Funds', desc: 'Tax saving mutual funds (3-year lock-in)' },
  { id: 'lic', label: 'Life Insurance Premium', desc: 'Term life or endowment policies for self/family' },
  { id: 'tuition', label: 'Children\'s Tuition Fee', desc: 'School/college tuition fees (up to 2 children)' },
  { id: 'home_principal', label: 'Home Loan Principal', desc: 'Principal repayment part of your EMI' },
  { id: 'tax_fd', label: 'Tax Saving FD', desc: '5-year lock-in fixed deposits' },
];

export default function S09_TaxSavingInvestments(props) {
  const { data, update, goNext } = props;
  const [errors, setErrors] = useState({});

  const toggle80C = (id) => {
    const arr = data.has80CItems || [];
    if (arr.includes(id)) {
      update({ has80CItems: arr.filter(x => x !== id) });
    } else {
      update({ has80CItems: [...arr, id] });
    }
  };

  const set80CAmount = (id, val) => {
    update({ investments80C: { ...(data.investments80C || {}), [id]: val } });
  };

  const handleNext = () => {
    const newErrors = {};
    if (data.hasPersonalNPS === null) newErrors.hasPersonalNPS = true;
    if (data.hasPersonalNPS && !data.personalNPS) newErrors.personalNPS = true;
    
    (data.has80CItems || []).forEach(id => {
      if (!data.investments80C?.[id]) {
        newErrors[`80c_${id}`] = true;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    goNext();
  };

  const total80C = calc80CTotal(data);

  return (
    <StepWrapper {...props} stepName="Investments">
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-lg bg-indigo-100 flex items-center justify-center text-sm">📊</div>
            <h2 className="text-xs font-medium text-indigo-600 uppercase tracking-wide">Tax Saving Investments</h2>
          </div>
          <h1 className="text-xl font-bold text-gray-900 leading-tight mb-2">Do you make any of these investments?</h1>
          <p className="text-sm text-gray-500">Under Section 80C, you can claim up to ₹1.5 Lakh in deductions. Tick the ones you invest in.</p>
          <ConfusedLink label="What is Section 80C?" />
        </div>
        
        <div className="space-y-3 pt-2 border-b border-gray-100 pb-6">
          {ITEMS_80C.map(item => {
            const isSelected = (data.has80CItems || []).includes(item.id);
            return (
              <div key={item.id} className={`rounded-xl border-2 transition-all overflow-hidden ${isSelected ? 'border-indigo-600' : 'border-gray-200'}`}>
                <label className={`flex items-start gap-3 p-4 cursor-pointer transition-colors ${isSelected ? 'bg-indigo-50' : 'bg-white hover:bg-gray-50'}`}>
                  <div className="relative flex items-start pt-1">
                    <input type="checkbox" className="sr-only" checked={isSelected} onChange={() => toggle80C(item.id)} />
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${isSelected ? 'border-indigo-600 bg-indigo-600' : 'border-gray-300 bg-white'}`}>
                      {isSelected && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-semibold text-gray-900 block mb-0.5">{item.label}</span>
                    <span className="text-xs text-gray-500">{item.desc}</span>
                  </div>
                </label>
                {isSelected && (
                  <div className="px-4 pb-4 bg-indigo-50 border-t border-indigo-100 reveal">
                    <div className="mt-4">
                      <FrequencyInput
                        id={`80c_${item.id}`}
                        label={`Amount invested in ${item.label.split(' ')[0]}`}
                        value={data.investments80C?.[item.id] || ''}
                        onChange={(val) => { set80CAmount(item.id, val); setErrors(prev => ({ ...prev, [`80c_${item.id}`]: false })) }}
                        required
                      />
                      {errors[`80c_${item.id}`] && <p className="text-red-600 text-xs mt-1">Amount required</p>}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {total80C > 0 && (
            <div className={`mt-4 p-4 rounded-xl border flex items-center justify-between reveal ${total80C >= 150000 ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-200'}`}>
              <div>
                <p className={`text-xs font-bold ${total80C >= 150000 ? 'text-green-800' : 'text-blue-800'}`}>Total 80C Claimed</p>
                {total80C >= 150000 && <p className="text-[10px] text-green-600 mt-0.5">Maximum limit reached! 🎉</p>}
              </div>
              <div className="text-right">
                <span className={`text-lg font-black ${total80C >= 150000 ? 'text-green-700' : 'text-blue-700'}`}>{fmt(total80C)}</span>
                <span className={`text-[10px] block ${total80C >= 150000 ? 'text-green-600' : 'text-blue-600'}`}>/ ₹1,50,000 max</span>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-md">Section 80CCD(1B)</span>
            </div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Do you make personal contributions to NPS? <span className="text-red-500">*</span>
            </h3>
            <p className="text-xs text-gray-500 mb-3">This is an extra ₹50,000 deduction over and above the ₹1.5L 80C limit.</p>
            
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => { update({ hasPersonalNPS: true }); setErrors(prev => ({ ...prev, hasPersonalNPS: false })) }}
                className={`flex-1 py-2.5 rounded-xl border-2 transition-all font-semibold text-sm ${data.hasPersonalNPS === true ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'}`}
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => { update({ hasPersonalNPS: false, personalNPS: '' }); setErrors(prev => ({ ...prev, hasPersonalNPS: false })) }}
                className={`flex-1 py-2.5 rounded-xl border-2 transition-all font-semibold text-sm ${data.hasPersonalNPS === false ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'}`}
              >
                No
              </button>
            </div>
            {errors.hasPersonalNPS && <p className="text-red-600 text-xs mt-1" role="alert">Please answer yes or no.</p>}
          </div>

          {data.hasPersonalNPS === true && (
            <div className="reveal p-4 bg-blue-50 border border-blue-100 rounded-xl">
              <FrequencyInput
                id="personalNPS"
                label="How much did you invest in Tier-1 NPS this year?"
                value={data.personalNPS}
                onChange={(val) => { update({ personalNPS: val }); setErrors(prev => ({ ...prev, personalNPS: false })) }}
                placeholder="e.g. 50,000"
                note="Max extra deduction is ₹50,000."
                required
              />
              {errors.personalNPS && <p className="text-red-600 text-xs mt-1">Amount required</p>}
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
