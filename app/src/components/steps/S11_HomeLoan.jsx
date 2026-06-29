import { useState } from 'react';
import StepWrapper from '../StepWrapper';
import FrequencyInput from '../FrequencyInput';
import ConfusedLink from '../ConfusedLink';

function RadioCard({ label, description, selected, onClick }) {
  return (
    <div onClick={onClick} className={`p-3 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-3 ${selected ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${selected ? 'border-indigo-600 bg-indigo-600' : 'border-gray-300 bg-white'}`}>
        {selected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
      </div>
      <div className="flex-1">
        <span className="text-sm font-semibold text-gray-900 block">{label}</span>
        {description && <span className="text-[11px] text-gray-500 leading-tight block mt-0.5">{description}</span>}
      </div>
    </div>
  )
}

export default function S11_HomeLoan(props) {
  const { data, update, goNext } = props;
  const [errors, setErrors] = useState({});

  const handleNext = () => {
    const newErrors = {};
    if (data.hasHomeLoan === null) newErrors.hasHomeLoan = true;
    
    if (data.hasHomeLoan) {
      if (!data.loanOwnership) newErrors.loanOwnership = true;
      if (data.loanOwnership !== 'other' && !data.homeLoanInterest) newErrors.homeLoanInterest = true;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    goNext();
  };

  return (
    <StepWrapper {...props} stepName="Home Loan">
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-lg bg-indigo-100 flex items-center justify-center text-sm">🏡</div>
            <h2 className="text-xs font-medium text-indigo-600 uppercase tracking-wide">Home Loan</h2>
          </div>
          <h1 className="text-xl font-bold text-gray-900 leading-tight mb-2">Do you have a home loan for a house you currently live in?</h1>
          <ConfusedLink label="What if the house is under construction?" />
        </div>
        
        <div className="space-y-4">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => { update({ hasHomeLoan: true }); setErrors(prev => ({ ...prev, hasHomeLoan: false })) }}
              className={`flex-1 py-2.5 rounded-xl border-2 transition-all font-semibold text-sm ${data.hasHomeLoan === true ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'}`}
            >
              Yes
            </button>
            <button
              type="button"
              onClick={() => { update({ hasHomeLoan: false, loanOwnership: null, homeLoanInterest: '' }); setErrors(prev => ({ ...prev, hasHomeLoan: false })) }}
              className={`flex-1 py-2.5 rounded-xl border-2 transition-all font-semibold text-sm ${data.hasHomeLoan === false ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'}`}
            >
              No
            </button>
          </div>
          {errors.hasHomeLoan && <p className="text-red-600 text-xs mt-1" role="alert">Please answer yes or no.</p>}

          {data.hasHomeLoan === true && (
            <div className="reveal space-y-5 p-4 bg-indigo-50 border border-indigo-100 rounded-xl">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Who owns this house? <span className="text-red-500">*</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <RadioCard
                    label="I am the sole owner"
                    selected={data.loanOwnership === 'self'}
                    onClick={() => { update({ loanOwnership: 'self' }); setErrors(prev => ({ ...prev, loanOwnership: false })) }}
                  />
                  <RadioCard
                    label="Jointly owned"
                    description="With a co-borrower"
                    selected={data.loanOwnership === 'joint'}
                    onClick={() => { update({ loanOwnership: 'joint' }); setErrors(prev => ({ ...prev, loanOwnership: false })) }}
                  />
                  <RadioCard
                    label="Someone else"
                    description="E.g., parents/spouse"
                    selected={data.loanOwnership === 'other'}
                    onClick={() => { update({ loanOwnership: 'other', homeLoanInterest: '' }); setErrors(prev => ({ ...prev, loanOwnership: false })) }}
                  />
                </div>
                {errors.loanOwnership && <p className="text-red-600 text-xs mt-1">Please select an ownership type.</p>}
              </div>

              {data.loanOwnership === 'other' && (
                <div className="bg-amber-50 border border-amber-200 text-amber-800 text-xs p-3 rounded-lg reveal">
                  Since you are not an owner or co-owner of the property, you cannot claim tax deductions for this home loan, even if you pay the EMIs.
                </div>
              )}

              {(data.loanOwnership === 'self' || data.loanOwnership === 'joint') && (
                <div className="reveal">
                  <FrequencyInput
                    id="homeLoanInterest"
                    label="How much INTEREST did you pay on the loan this year?"
                    value={data.homeLoanInterest}
                    onChange={(val) => { update({ homeLoanInterest: val }); setErrors(prev => ({ ...prev, homeLoanInterest: false })) }}
                    placeholder="e.g. 1,50,000"
                    note="Under Section 24b, the maximum deduction allowed is ₹2,00,000. Do not include principal amount here."
                    required
                  />
                  {errors.homeLoanInterest && <p className="text-red-600 text-xs mt-1">Amount required</p>}
                </div>
              )}
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
