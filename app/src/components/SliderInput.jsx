export default function SliderInput({ id, label, value, onChange, min = 0, max = 5000000, step = 10000, prefix = '₹', suffix = '' }) {
  const numValue = Number(value) || 0;
  
  const handleTextChange = (e) => {
    let raw = e.target.value.replace(/[^0-9]/g, '');
    if (raw === '') { onChange(''); return; }
    let num = Number(raw);
    if (num > max * 2) num = max * 2; // Allow some overflow beyond slider
    onChange(num);
  }

  const formatINR = (val) => val === '' ? '' : Number(val).toLocaleString('en-IN');

  return (
    <div className="space-y-3 w-full mb-5">
      <div className="flex justify-between items-end">
        <label htmlFor={id} className="block text-xs font-bold text-gray-600 uppercase tracking-wide">{label}</label>
        <div className="relative w-36">
          {prefix && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">{prefix}</span>}
          <input 
            type="text" 
            id={id}
            value={formatINR(value)} 
            onChange={handleTextChange}
            className={`w-full text-right font-bold text-gray-900 bg-gray-50 border border-gray-200 rounded-lg py-1.5 pr-3 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition-all ${prefix ? 'pl-8' : 'pl-3'}`}
          />
        </div>
      </div>
      <div className="relative pt-1">
        <input 
          type="range" 
          min={min} 
          max={max} 
          step={step} 
          value={numValue > max ? max : numValue} 
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
        />
      </div>
    </div>
  )
}
