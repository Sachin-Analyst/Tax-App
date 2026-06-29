import { useState } from 'react';
import StepWrapper from '../StepWrapper';
import FrequencyInput from '../FrequencyInput';
import ConfusedLink from '../ConfusedLink';

export default function S10_HealthInsurance(props) {
  const { data, update, goNext } = props;
  const [errors, setErrors] = useState({});

  const handleNext = () => {
    const newErrors = {};
    if (data.hasSelfInsurance === null) newErrors.hasSelfInsurance = true;
    if (data.hasSelfInsurance && !data.selfInsurancePremium) newErrors.selfInsurancePremium = true;
    
    if (data.hasParentInsurance === null) newErrors.hasParentInsurance = true;
    if (data.hasParentInsurance) {
      if (!data.parentInsurancePremium) newErrors.parentInsurancePremium = true;
      if (data.parentsAbove60 === null) newErrors.parentsAbove60 = true;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    goNext();
  };

  return (
    <StepWrapper {...props} stepName="Health Insurance">
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-lg bg-indigo-100 flex items-center justify-center text-sm">🏥</div>
            <h2 className="text-xs font-medium text-indigo-600 uppercase tracking-wide">Health Insurance</h2>
          </div>
          <h1 className="text-xl font-bold text-gray-900 leading-tight mb-2">Do you pay for health insurance?</h1>
          <p className="text-sm text-gray-500">Premiums paid for yourself, your spouse, children, and parents can be claimed under Section 80D.</p>
          <ConfusedLink label="What about employer provided insurance?" />
        </div>
        
        <div className="space-y-4 pt-2 border-b border-gray-100 pb-6">
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              1. Do you pay premium for yourself, spouse, or children? <span className="text-red-500">*</span>
            </h3>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => { update({ hasSelfInsurance: true }); setErrors(prev => ({ ...prev, hasSelfInsurance: false })) }}
                className={`flex-1 py-2.5 rounded-xl border-2 transition-all font-semibold text-sm ${data.hasSelfInsurance === true ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'}`}
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => { update({ hasSelfInsurance: false, selfInsurancePremium: '' }); setErrors(prev => ({ ...prev, hasSelfInsurance: false })) }}
                className={`flex-1 py-2.5 rounded-xl border-2 transition-all font-semibold text-sm ${data.hasSelfInsurance === false ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'}`}
              >
                No
              </button>
            </div>
            {errors.hasSelfInsurance && <p className="text-red-600 text-xs mt-1" role="alert">Please answer yes or no.</p>}
          </div>

          {data.hasSelfInsurance === true && (
            <div className="reveal p-4 bg-indigo-50 border border-indigo-100 rounded-xl">
              <FrequencyInput
                id="selfInsurancePremium"
                label="Total premium paid this year"
                value={data.selfInsurancePremium}
                onChange={(val) => { update({ selfInsurancePremium: val }); setErrors(prev => ({ ...prev, selfInsurancePremium: false })) }}
                placeholder="e.g. 15,000"
                hint="Includes preventive health checkups up to ₹5,000."
                required
              />
              {errors.selfInsurancePremium && <p className="text-red-600 text-xs mt-1">Amount required</p>}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              2. Do you pay premium for your parents? <span className="text-red-500">*</span>
            </h3>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => { update({ hasParentInsurance: true }); setErrors(prev => ({ ...prev, hasParentInsurance: false })) }}
                className={`flex-1 py-2.5 rounded-xl border-2 transition-all font-semibold text-sm ${data.hasParentInsurance === true ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'}`}
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => { update({ hasParentInsurance: false, parentInsurancePremium: '', parentsAbove60: null }); setErrors(prev => ({ ...prev, hasParentInsurance: false })) }}
                className={`flex-1 py-2.5 rounded-xl border-2 transition-all font-semibold text-sm ${data.hasParentInsurance === false ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'}`}
              >
                No
              </button>
            </div>
            {errors.hasParentInsurance && <p className="text-red-600 text-xs mt-1" role="alert">Please answer yes or no.</p>}
          </div>

          {data.hasParentInsurance === true && (
            <div className="reveal space-y-4 p-4 bg-indigo-50 border border-indigo-100 rounded-xl">
              <FrequencyInput
                id="parentInsurancePremium"
                label="Total premium paid for parents"
                value={data.parentInsurancePremium}
                onChange={(val) => { update({ parentInsurancePremium: val }); setErrors(prev => ({ ...prev, parentInsurancePremium: false })) }}
                placeholder="e.g. 30,000"
                required
              />
              {errors.parentInsurancePremium && <p className="text-red-600 text-xs mt-1">Amount required</p>}

              <div>
                <p className="block text-sm font-medium text-gray-700 mb-1.5">Are any of your parents aged 60 or above? <span className="text-red-500">*</span></p>
                <div className="flex gap-2">
                  <label className={`flex-1 p-2.5 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-2 ${data.parentsAbove60 === true ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-indigo-200 bg-white text-indigo-900 hover:border-indigo-300'}`}>
                    <input type="radio" name="parentsAbove60" className="sr-only" checked={data.parentsAbove60 === true} onChange={() => { update({ parentsAbove60: true }); setErrors(prev => ({ ...prev, parentsAbove60: false })) }} />
                    <span className="text-sm font-semibold mx-auto">Yes</span>
                  </label>
                  <label className={`flex-1 p-2.5 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-2 ${data.parentsAbove60 === false ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-indigo-200 bg-white text-indigo-900 hover:border-indigo-300'}`}>
                    <input type="radio" name="parentsAbove60" className="sr-only" checked={data.parentsAbove60 === false} onChange={() => { update({ parentsAbove60: false }); setErrors(prev => ({ ...prev, parentsAbove60: false })) }} />
                    <span className="text-sm font-semibold mx-auto">No</span>
                  </label>
                </div>
                {errors.parentsAbove60 && <p className="text-red-600 text-xs mt-1">Required</p>}
                {data.parentsAbove60 === true && <p className="text-xs text-indigo-700 mt-1.5 font-medium">Limit increased to ₹50,000 for senior citizen parents.</p>}
              </div>
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
