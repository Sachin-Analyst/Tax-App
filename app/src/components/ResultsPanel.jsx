import { computeTax } from '../taxEngine';
import { fmt } from '../utils';

function Row({ label, newAmt, oldAmt, isTotal, isHeader }) {
  if (isHeader) {
    return (
      <div className="grid grid-cols-12 px-5 py-2.5 bg-gray-50/80 border-y border-gray-100 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
        <div className="col-span-6">{label}</div>
        <div className="col-span-3 text-right">{newAmt}</div>
        <div className="col-span-3 text-right">{oldAmt}</div>
      </div>
    )
  }
  return (
    <div className={`grid grid-cols-12 px-5 py-3 border-b border-gray-50 last:border-0 text-sm ${isTotal ? 'bg-indigo-50/30 font-bold text-gray-900' : 'text-gray-600 hover:bg-gray-50/50'}`}>
      <div className="col-span-6 pr-2 truncate">{label}</div>
      <div className={`col-span-3 text-right ${newAmt === '₹0' && !isTotal ? 'text-gray-300' : ''}`}>{newAmt}</div>
      <div className={`col-span-3 text-right ${oldAmt === '₹0' && !isTotal ? 'text-gray-300' : ''}`}>{oldAmt}</div>
    </div>
  )
}

export default function ResultsPanel({ data }) {
  const { newRegime, oldRegime, recommended, savings } = computeTax(data);

  const isGreen = recommended === 'new';
  const winnerName = recommended === 'new' ? 'New Regime' : 'Old Regime';
  const winnerTax = recommended === 'new' ? newRegime.totalTax : oldRegime.totalTax;
  
  const maxTax = Math.max(newRegime.totalTax, oldRegime.totalTax, 1);
  const newWidth = Math.max(5, (newRegime.totalTax / maxTax) * 100);
  const oldWidth = Math.max(5, (oldRegime.totalTax / maxTax) * 100);

  return (
    <div className="space-y-6">
      
      {/* Hero Recommendation Card */}
      <div className={`relative rounded-3xl p-6 sm:p-8 shadow-xl border overflow-hidden ${isGreen ? 'bg-gradient-to-br from-emerald-600 to-green-700 border-green-500 shadow-green-200' : 'bg-gradient-to-br from-indigo-600 to-purple-800 border-indigo-500 shadow-indigo-200'} text-white`}>
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </div>
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 bg-white/20 text-white">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
            Recommendation
          </div>
          
          <h2 className="text-3xl font-extrabold mb-1 tracking-tight">{winnerName} is better</h2>
          <p className="text-sm opacity-80 mb-6 font-medium">For Financial Year 2025-26</p>
          
          <p className="text-xs uppercase font-semibold opacity-70 tracking-widest mb-1">Total Tax Payable</p>
          <div className="flex items-end gap-4">
            <p className="text-5xl font-black tracking-tighter">{fmt(winnerTax)}</p>
            {savings > 0 && (
              <div className="bg-white/20 px-3 py-1.5 rounded-lg text-sm font-bold mb-1">
                Saves {fmt(savings)}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bar Chart Comparison */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-5">Tax Liability Comparison</h3>
        <div className="space-y-5">
          <div>
            <div className="flex justify-between text-sm font-bold mb-1.5 text-indigo-900">
              <span>New Tax Regime</span>
              <span>{fmt(newRegime.totalTax)}</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3.5 overflow-hidden">
              <div className={`h-full rounded-full transition-all duration-700 ease-out ${recommended === 'new' ? 'bg-emerald-500' : 'bg-indigo-400'}`} style={{ width: `${newWidth}%` }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm font-bold mb-1.5 text-gray-700">
              <span>Old Tax Regime</span>
              <span>{fmt(oldRegime.totalTax)}</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3.5 overflow-hidden">
              <div className={`h-full rounded-full transition-all duration-700 ease-out ${recommended === 'old' ? 'bg-emerald-500' : 'bg-gray-400'}`} style={{ width: `${oldWidth}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Side-by-side Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden pb-2">
        <div className="p-5">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Detailed Breakdown</h3>
        </div>

        <Row label="Category" newAmt="New Regime" oldAmt="Old Regime" isHeader />
        
        <Row label="Gross Salary / Income" newAmt={fmt(newRegime.grossIncome)} oldAmt={fmt(oldRegime.grossIncome)} />
        <Row label="Standard Deduction" newAmt={`− ${fmt(newRegime.standardDeduction)}`} oldAmt={`− ${fmt(oldRegime.standardDeduction)}`} />
        
        <div className="px-5 py-2 bg-gray-50/50 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-y border-gray-50">Deductions</div>
        <Row label="HRA Exemption" newAmt={newRegime.hraExemption ? `− ${fmt(newRegime.hraExemption)}` : '₹0'} oldAmt={oldRegime.hraExemption ? `− ${fmt(oldRegime.hraExemption)}` : '₹0'} />
        <Row label="80C Investments" newAmt={newRegime.deduction80C ? `− ${fmt(newRegime.deduction80C)}` : '₹0'} oldAmt={oldRegime.deduction80C ? `− ${fmt(oldRegime.deduction80C)}` : '₹0'} />
        <Row label="Health Insurance (80D)" newAmt={newRegime.deduction80D ? `− ${fmt(newRegime.deduction80D)}` : '₹0'} oldAmt={oldRegime.deduction80D ? `− ${fmt(oldRegime.deduction80D)}` : '₹0'} />
        <Row label="Home Loan (24b)" newAmt={newRegime.deductionHomeLoanInterest ? `− ${fmt(newRegime.deductionHomeLoanInterest)}` : '₹0'} oldAmt={oldRegime.deductionHomeLoanInterest ? `− ${fmt(oldRegime.deductionHomeLoanInterest)}` : '₹0'} />
        <Row label="NPS (80CCD 1B & 2)" newAmt={`− ${fmt(newRegime.employerNPSDeduction + newRegime.deductionPersonalNPS)}`} oldAmt={`− ${fmt(oldRegime.employerNPSDeduction + oldRegime.deductionPersonalNPS)}`} />
        
        <Row label="Taxable Income" newAmt={fmt(newRegime.taxableIncome)} oldAmt={fmt(oldRegime.taxableIncome)} isTotal />

        <div className="px-5 py-2 bg-gray-50/50 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-y border-gray-50">Taxes</div>
        <Row label="Tax on Slabs" newAmt={fmt(newRegime.slabTax)} oldAmt={fmt(oldRegime.slabTax)} />
        <Row label="87A Rebate" newAmt={newRegime.rebate ? `− ${fmt(newRegime.rebate)}` : '₹0'} oldAmt={oldRegime.rebate ? `− ${fmt(oldRegime.rebate)}` : '₹0'} />
        <Row label="Health & Ed Cess (4%)" newAmt={newRegime.cess ? `+ ${fmt(newRegime.cess)}` : '₹0'} oldAmt={oldRegime.cess ? `+ ${fmt(oldRegime.cess)}` : '₹0'} />

        <Row label="Total Tax Payable" newAmt={fmt(newRegime.totalTax)} oldAmt={fmt(oldRegime.totalTax)} isTotal />
      </div>

    </div>
  )
}
