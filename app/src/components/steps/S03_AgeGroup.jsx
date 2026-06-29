import { useState } from 'react';
import StepWrapper from '../StepWrapper';

const AGE_OPTIONS = [
  { value: 'below60', label: 'Below 60 years', tag: '', description: 'Basic exemption: ₹2,50,000 under old regime' },
  { value: 'senior', label: '60 to 79 years', tag: 'Senior Citizen', description: 'Basic exemption: ₹3,00,000 under old regime' },
  { value: 'superSenior', label: '80 years or above', tag: 'Super Senior Citizen', description: 'Basic exemption: ₹5,00,000 under old regime' },
];

function RadioCard({ label, description, tag, selected, onClick }) {
  return (
    <div onClick={onClick} className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-start gap-3 ${selected ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'}`}>
      <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${selected ? 'border-indigo-600 bg-indigo-600' : 'border-gray-300 bg-white'}`}>
        {selected && <div className="w-2 h-2 rounded-full bg-white" />}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-0.5">
          <span className="text-sm font-semibold text-gray-900">{label}</span>
          {tag && <span className="text-[10px] font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-md">{tag}</span>}
        </div>
        <p className="text-xs text-gray-500 leading-relaxed">{description}</p>
      </div>
    </div>
  )
}

export default function S03_AgeGroup(props) {
  const { data, update, goNext } = props;
  const [error, setError] = useState(false);

  const handleNext = () => {
    if (!data.ageGroup) {
      setError(true);
      return;
    }
    goNext();
  };

  return (
    <StepWrapper {...props} stepName="Your Age Group">
      <div className="space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-lg bg-indigo-100 flex items-center justify-center text-sm">🎂</div>
            <h2 className="text-xs font-medium text-indigo-600 uppercase tracking-wide">About You</h2>
          </div>
          <h1 className="text-xl font-bold text-gray-900 leading-tight mb-2">Which age group do you fall in?</h1>
        </div>
        
        <div className="space-y-3">
          {AGE_OPTIONS.map((opt) => (
            <RadioCard
              key={opt.value}
              label={opt.label}
              tag={opt.tag}
              description={opt.description}
              selected={data.ageGroup === opt.value}
              onClick={() => {
                update({ ageGroup: opt.value });
                setError(false);
              }}
            />
          ))}
        </div>

        {error && (
          <p className="text-red-600 text-sm" role="alert">Please select your age group to continue.</p>
        )}

        <button onClick={handleNext} className="mt-2 w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 active:from-indigo-800 active:to-purple-800 text-white font-bold py-3 px-6 rounded-xl text-sm transition-all shadow-md shadow-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          Continue →
        </button>
      </div>
    </StepWrapper>
  )
}
