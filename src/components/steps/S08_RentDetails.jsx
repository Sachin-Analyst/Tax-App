import { useState } from 'react';
import StepWrapper from '../StepWrapper';
import NumberInput from '../NumberInput';

export default function S08_RentDetails(props) {
  const { data, update, goNext } = props;
  const [errors, setErrors] = useState({});

  const handleNext = () => {
    const newErrors = {};
    if (!data.monthlyRent) newErrors.monthlyRent = true;
    if (!data.cityType) newErrors.cityType = true;
    if (data.hasHRAInSalary === null) newErrors.hasHRAInSalary = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    goNext();
  };

  return (
    <StepWrapper {...props} stepName="Rent Details">
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-lg bg-indigo-100 flex items-center justify-center text-sm">🏠</div>
            <h2 className="text-xs font-medium text-indigo-600 uppercase tracking-wide">Housing</h2>
          </div>
          <h1 className="text-xl font-bold text-gray-900 leading-tight mb-2">Tell us about your rent</h1>
        </div>
        
        <div className="space-y-5">
          <div>
            <NumberInput
              id="monthlyRent"
              label="How much rent do you pay per month?"
              value={data.monthlyRent}
              onChange={(val) => { update({ monthlyRent: val }); setErrors(prev => ({ ...prev, monthlyRent: false })) }}
              placeholder="e.g. 20,000"
              required
            />
            {errors.monthlyRent && <p className="text-red-600 text-xs mt-1" role="alert">Required</p>}
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Where do you live? <span className="text-red-500">*</span>
            </h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <label className={`flex-1 p-3 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-2 ${data.cityType === 'metro' ? 'border-indigo-600 bg-indigo-50 text-indigo-800' : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'}`}>
                <input type="radio" name="cityType" className="sr-only" checked={data.cityType === 'metro'} onChange={() => { update({ cityType: 'metro' }); setErrors(prev => ({ ...prev, cityType: false })) }} />
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${data.cityType === 'metro' ? 'border-indigo-600 bg-indigo-600' : 'border-gray-300'}`}>
                  {data.cityType === 'metro' && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                </div>
                <span className="text-sm font-medium">Metro City</span>
              </label>
              <label className={`flex-1 p-3 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-2 ${data.cityType === 'nonMetro' ? 'border-indigo-600 bg-indigo-50 text-indigo-800' : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'}`}>
                <input type="radio" name="cityType" className="sr-only" checked={data.cityType === 'nonMetro'} onChange={() => { update({ cityType: 'nonMetro' }); setErrors(prev => ({ ...prev, cityType: false })) }} />
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${data.cityType === 'nonMetro' ? 'border-indigo-600 bg-indigo-600' : 'border-gray-300'}`}>
                  {data.cityType === 'nonMetro' && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                </div>
                <span className="text-sm font-medium">Non-Metro City</span>
              </label>
            </div>
            <p className="text-xs text-gray-400 mt-1">Metro = Delhi, Mumbai, Kolkata, or Chennai (gives 50% basic limit).</p>
            {errors.cityType && <p className="text-red-600 text-xs mt-1" role="alert">Please select city type.</p>}
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Does your salary slip include HRA? <span className="text-red-500">*</span>
            </h3>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => { update({ hasHRAInSalary: true, hasHRA: true }); setErrors(prev => ({ ...prev, hasHRAInSalary: false })) }}
                className={`flex-1 py-2.5 rounded-xl border-2 transition-all font-semibold text-sm ${data.hasHRAInSalary === true ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'}`}
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => { update({ hasHRAInSalary: false, hasHRA: false, hraMonthly: '' }); setErrors(prev => ({ ...prev, hasHRAInSalary: false })) }}
                className={`flex-1 py-2.5 rounded-xl border-2 transition-all font-semibold text-sm ${data.hasHRAInSalary === false ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'}`}
              >
                No
              </button>
            </div>
            {errors.hasHRAInSalary && <p className="text-red-600 text-xs mt-1" role="alert">Please answer yes or no.</p>}
          </div>
          
          {data.hasHRAInSalary === true && !data.hraMonthly && (
            <div className="bg-amber-50 border border-amber-200 text-amber-800 text-xs p-3 rounded-lg reveal">
              Make sure you go back to Step 5 (Salary Components) and enter your monthly HRA amount. Otherwise, your rent won't save you any tax!
            </div>
          )}
        </div>

        <button onClick={handleNext} className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 active:from-indigo-800 active:to-purple-800 text-white font-bold py-3 px-6 rounded-xl text-sm transition-all shadow-md shadow-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mt-4">
          Continue →
        </button>
      </div>
    </StepWrapper>
  )
}
