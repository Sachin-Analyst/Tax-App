import { useState } from 'react'

export default function FrequencyInput({ id, label, value, onChange, placeholder = '0', hint, note, required = false, max, prefix = '₹' }) {
  const [freq, setFreq] = useState('annual') // 'annual' | 'monthly'

  const displayValue = freq === 'monthly' && value !== '' ? Math.round(Number(value) / 12) : value

  const handleInput = (e) => {
    let raw = e.target.value.replace(/[^0-9]/g, '')
    if (raw === '') {
      onChange('')
      return
    }
    let num = Number(raw)
    if (freq === 'monthly') num = num * 12
    if (max !== undefined && num > max) num = max
    onChange(num)
  }

  const formatINR = (val) => {
    if (val === '' || val === null || val === undefined) return ''
    return Number(val).toLocaleString('en-IN')
  }

  const isValid = value !== '' && value !== null && value !== undefined && Number(value) > 0

  return (
    <div className="space-y-1.5 w-full">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="flex rounded-full border border-gray-200 overflow-hidden bg-gray-50 p-0.5 gap-0.5 shrink-0">
          <button
            type="button"
            onClick={() => setFreq('monthly')}
            className={`px-3 py-1 text-xs font-semibold transition-all rounded-full ${freq === 'monthly' ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setFreq('annual')}
            className={`px-3 py-1 text-xs font-semibold transition-all rounded-full ${freq === 'annual' ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Per year
          </button>
        </div>
      </div>
      
      <div className="relative rounded-xl">
        {prefix && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-gray-400 text-sm font-medium">{prefix}</span>
          </div>
        )}
        <input
          type="text"
          id={id}
          inputMode="numeric"
          pattern="[0-9]*"
          value={formatINR(displayValue)}
          onChange={handleInput}
          placeholder={placeholder}
          aria-describedby={hint ? `${id}-hint` : undefined}
          className={`block w-full rounded-xl border py-2.5 text-sm text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none placeholder:text-gray-400 transition-colors ${
            isValid ? 'border-green-300 bg-green-50/30' : 'border-gray-200'
          } ${prefix ? 'pl-8' : 'px-3'} pr-9`}
        />
        {isValid && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
      </div>

      {freq === 'monthly' && isValid && (
        <p className="text-xs text-indigo-600 font-medium reveal">
          = ₹{Number(value).toLocaleString('en-IN')} per year (auto-calculated)
        </p>
      )}

      {note && (
        <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-2 py-1 mt-1">
          {note}
        </p>
      )}
      
      {hint && (
        <p id={`${id}-hint`} className="text-xs text-gray-400 mt-1">
          {hint}
        </p>
      )}
    </div>
  )
}
