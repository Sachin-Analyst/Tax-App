import { useState } from 'react';
import StepWrapper from '../StepWrapper';

export default function S07_PaysRent(props) {
  const { data, update, goNext, skipTo } = props;
  const [error, setError] = useState(false);

  const handleNext = () => {
    if (data.paysRent === null) {
      setError(true);
      return;
    }
    if (data.paysRent) {
      goNext(); // goes to S08
    } else {
      skipTo(9); // skips S08
    }
  };

  const setPaysRent = (val) => {
    update({ paysRent: val });
    setError(false);
  };

  return (
    <StepWrapper {...props} stepName="Housing">
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-lg bg-indigo-100 flex items-center justify-center text-sm">🏠</div>
            <h2 className="text-xs font-medium text-indigo-600 uppercase tracking-wide">Housing</h2>
          </div>
          <h1 className="text-xl font-bold text-gray-900 leading-tight mb-2">Do you live in a rented house and personally pay the rent?</h1>
        </div>
        
        <div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setPaysRent(true)}
              className={`flex-1 py-2.5 rounded-xl border-2 transition-all font-semibold text-sm ${data.paysRent === true ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'}`}
            >
              Yes
            </button>
            <button
              type="button"
              onClick={() => setPaysRent(false)}
              className={`flex-1 py-2.5 rounded-xl border-2 transition-all font-semibold text-sm ${data.paysRent === false ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'}`}
            >
              No
            </button>
          </div>
          {error && <p className="text-red-600 text-xs mt-1" role="alert">Please answer yes or no.</p>}
        </div>

        {data.paysRent === false && (
          <div className="bg-amber-50 border border-amber-200 text-amber-800 text-xs p-3 rounded-lg reveal">
            Got it. Because you don't pay rent, you cannot claim the HRA tax exemption. We will skip the rent details.
          </div>
        )}

        <button onClick={handleNext} className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 active:from-indigo-800 active:to-purple-800 text-white font-bold py-3 px-6 rounded-xl text-sm transition-all shadow-md shadow-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          Continue →
        </button>
      </div>
    </StepWrapper>
  )
}
