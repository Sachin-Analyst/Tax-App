import { useState } from 'react';
import StepWrapper from '../StepWrapper';
import NumberInput from '../NumberInput';
import FrequencyInput from '../FrequencyInput';
import ConfusedLink from '../ConfusedLink';

const COMPONENTS = [
  { key: 'hasHRA', label: 'HRA — House Rent Allowance', tag: 'Section 10(13A)', emoji: '🏠', description: 'A part of your salary meant for rent. Can be partially tax-free if you pay rent.' },
  { key: 'hasProfTax', label: 'Professional Tax', tag: 'Section 16(iii)', emoji: '🏛️', description: 'State govt tax deducted monthly from your salary. Usually ₹200/month (max ₹2,400/year).' },
  { key: 'hasEmployerNPS', label: 'Employer NPS contribution', tag: 'Section 80CCD(2)', emoji: '🏦', description: 'Your company puts money into your NPS retirement account as part of your pay package.' },
];

function CheckboxCard({ label, description, tag, emoji, selected, onToggle, children }) {
  return (
    <div className={`rounded-xl border-2 overflow-hidden transition-all ${selected ? 'border-indigo-600' : 'border-gray-200'}`}>
      <label className={`cursor-pointer flex items-start gap-3 p-4 transition-colors ${selected ? 'bg-indigo-50' : 'bg-white hover:bg-gray-50'}`}>
        <div className="relative flex items-start pt-1">
          <input
            type="checkbox"
            className="sr-only"
            checked={selected}
            onChange={onToggle}
          />
          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${selected ? 'border-indigo-600 bg-indigo-600' : 'border-gray-300 bg-white'}`}>
            {selected && (
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-0.5">
            <span className="text-sm font-semibold text-gray-900">{emoji} {label}</span>
            <span className="text-[10px] font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-md">{tag}</span>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed">{description}</p>
        </div>
      </label>
      {selected && children}
    </div>
  )
}

export default function S05_SalaryComponents(props) {
  const { data, update, goNext } = props;
  const [errors, setErrors] = useState({});

  const handleToggle = (key) => {
    update({ [key]: !data[key] });
    setErrors(prev => ({ ...prev, [key]: false }));
  };

  const handleNext = () => {
    const newErrors = {};
    if (data.hasHRA && !data.hraMonthly) newErrors.hasHRA = true;
    if (data.hasProfTax && !data.professionalTax) newErrors.hasProfTax = true;
    if (data.hasEmployerNPS && !data.employerNPS) newErrors.hasEmployerNPS = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    goNext();
  };

  return (
    <StepWrapper {...props} stepName="Salary Components">
      <div className="space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-lg bg-indigo-100 flex items-center justify-center text-sm">📋</div>
            <h2 className="text-xs font-medium text-indigo-600 uppercase tracking-wide">Salary Components</h2>
          </div>
          <h1 className="text-xl font-bold text-gray-900 leading-tight mb-1">Does your salary slip show any of these?</h1>
          <p className="text-sm text-gray-500">Tick all that appear on your slip. Leave the rest blank.</p>
          <ConfusedLink label="What are these?" />
        </div>
        
        <div className="space-y-4 pt-2">
          <CheckboxCard
            {...COMPONENTS[0]}
            selected={data.hasHRA}
            onToggle={() => handleToggle('hasHRA')}
          >
            <div className="px-4 pb-4 bg-indigo-50 border-t border-indigo-100 reveal">
              <div className="mt-4">
                <NumberInput
                  id="hraMonthly"
                  label="How much HRA do you receive per month?"
                  value={data.hraMonthly}
                  onChange={(val) => { update({ hraMonthly: val }); setErrors(prev => ({ ...prev, hasHRA: false })) }}
                  placeholder="e.g. 15,000"
                  hint="Find it on your salary slip under Earnings."
                  required
                />
                {errors.hasHRA && <p className="text-red-600 text-xs mt-1">Amount required</p>}
              </div>
            </div>
          </CheckboxCard>

          <CheckboxCard
            {...COMPONENTS[1]}
            selected={data.hasProfTax}
            onToggle={() => handleToggle('hasProfTax')}
          >
            <div className="px-4 pb-4 bg-indigo-50 border-t border-indigo-100 reveal">
              <div className="mt-4">
                <FrequencyInput
                  id="professionalTax"
                  label="How much Professional Tax is deducted?"
                  value={data.professionalTax}
                  onChange={(val) => { update({ professionalTax: val }); setErrors(prev => ({ ...prev, hasProfTax: false })) }}
                  placeholder="200"
                  note="Usually ₹200/month = ₹2,400/year. Maximum is ₹2,500 per year."
                  required
                />
                {errors.hasProfTax && <p className="text-red-600 text-xs mt-1">Amount required</p>}
              </div>
            </div>
          </CheckboxCard>

          <CheckboxCard
            {...COMPONENTS[2]}
            selected={data.hasEmployerNPS}
            onToggle={() => handleToggle('hasEmployerNPS')}
          >
            <div className="px-4 pb-4 bg-indigo-50 border-t border-indigo-100 reveal">
              <div className="mt-4">
                <FrequencyInput
                  id="employerNPS"
                  label="How much does your employer contribute to NPS?"
                  value={data.employerNPS}
                  onChange={(val) => { update({ employerNPS: val }); setErrors(prev => ({ ...prev, hasEmployerNPS: false })) }}
                  placeholder="0"
                  hint="Check your CTC breakdown or salary slip. This is your employer's contribution, not yours."
                  required
                />
                {errors.hasEmployerNPS && <p className="text-red-600 text-xs mt-1">Amount required</p>}
              </div>
            </div>
          </CheckboxCard>
        </div>

        <p className="text-xs text-gray-400 text-center pt-2">If none of these appear on your slip, leave them all unticked and continue.</p>

        <button onClick={handleNext} className="mt-2 w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 active:from-indigo-800 active:to-purple-800 text-white font-bold py-3 px-6 rounded-xl text-sm transition-all shadow-md shadow-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          Continue →
        </button>
      </div>
    </StepWrapper>
  )
}
