import { computeTax } from '../../taxEngine';
import { fmt } from '../../utils';
import { NEW_REGIME_SLABS, OLD_REGIME_SLABS_BELOW60, OLD_REGIME_SLABS_SENIOR, OLD_REGIME_SLABS_SUPER_SENIOR } from '../../constants';

// Helper functions for slab breakdown
function getOldSlabs(ageGroup) {
  if (ageGroup === 'senior') return OLD_REGIME_SLABS_SENIOR
  if (ageGroup === 'superSenior') return OLD_REGIME_SLABS_SUPER_SENIOR
  return OLD_REGIME_SLABS_BELOW60
}

function computeSlabRows(taxableIncome, slabs) {
  let prev = 0
  return slabs.map(slab => {
    const upTo = slab.upTo
    let label
    if (prev === 0) label = upTo === null ? 'All' : `Up to ${fmt(upTo)}`
    else label = upTo === null ? `Above ${fmt(prev)}` : `${fmt(prev + 1)} – ${fmt(upTo)}`

    let incomeInBand = 0
    if (upTo === null) {
      incomeInBand = Math.max(0, taxableIncome - prev)
    } else {
      incomeInBand = Math.max(0, Math.min(taxableIncome, upTo) - prev)
    }

    const tax = Math.round(incomeInBand * slab.rate)
    const active = incomeInBand > 0 && slab.rate > 0
    
    prev = upTo === null ? prev : upTo

    return { label, rate: slab.rate, incomeInBand, tax, active }
  })
}

function ComparisonRow({ label, newAmt, oldAmt, isTotal, isHeader }) {
  const baseClass = "grid grid-cols-12 px-5 py-3 border-b border-gray-100 last:border-0 items-center text-sm";
  if (isHeader) {
    return (
      <div className={`${baseClass} bg-gray-50/50 border-t border-gray-100`}>
        <div className="col-span-5 sm:col-span-6 text-xs font-bold text-gray-500 uppercase tracking-wider">{label}</div>
        <div className="col-span-3 sm:col-span-3 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">{newAmt}</div>
        <div className="col-span-4 sm:col-span-3 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">{oldAmt}</div>
      </div>
    )
  }
  return (
    <div className={`${baseClass} ${isTotal ? 'bg-gray-50 font-bold text-gray-900' : 'text-gray-600 hover:bg-gray-50/50 transition-colors'}`}>
      <div className="col-span-5 sm:col-span-6 pr-2 leading-tight">{label}</div>
      <div className={`col-span-3 sm:col-span-3 text-right ${newAmt === '₹0' && !isTotal ? 'text-gray-300' : ''}`}>{newAmt}</div>
      <div className={`col-span-4 sm:col-span-3 text-right ${oldAmt === '₹0' && !isTotal ? 'text-gray-300' : ''}`}>{oldAmt}</div>
    </div>
  )
}

function SlabCard({ title, data, slabs }) {
  const rows = computeSlabRows(data.taxableIncome, slabs);
  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden h-full">
      <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50">
        <h3 className="text-sm font-bold text-gray-900">{title}</h3>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-4 gap-1 px-2.5 py-2 border-b border-gray-200 bg-gray-100/50 rounded-t-lg">
          <div className="text-[10px] font-semibold text-gray-500 uppercase col-span-1">Income Slab</div>
          <div className="text-[10px] font-semibold text-gray-500 uppercase text-center col-span-1">Rate</div>
          <div className="text-[10px] font-semibold text-gray-500 uppercase text-right col-span-1">Your Income</div>
          <div className="text-[10px] font-semibold text-gray-500 uppercase text-right col-span-1">Tax</div>
        </div>
        <div className="divide-y divide-gray-100">
          {rows.map((row, i) => (
            <div key={i} className={`grid grid-cols-4 gap-1 px-2.5 py-2 text-[11px] sm:text-xs ${row.active ? 'bg-indigo-50/60 text-indigo-700 font-medium' : 'text-gray-400'}`}>
              <div className="truncate col-span-1">{row.label}</div>
              <div className="text-center col-span-1">{row.rate * 100}%</div>
              <div className="text-right col-span-1">{fmt(row.incomeInBand)}</div>
              <div className="text-right col-span-1">{fmt(row.tax)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function S14_Results({ data, skipTo, reset }) {
  const results = computeTax(data);
  const { newRegime, oldRegime, recommended, savings, tds, tdsDeducted } = results;

  const winnerData = recommended === 'new' ? newRegime : oldRegime;
  const loserData = recommended === 'new' ? oldRegime : newRegime;
  const winnerName = recommended === 'new' ? 'New Tax Regime' : 'Old Tax Regime';
  const loserName = recommended === 'new' ? 'Old Tax Regime' : 'New Tax Regime';

  const isGreen = recommended === 'new';

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col pb-16">
      <nav className="sticky top-0 z-10 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between">
          <button onClick={reset} className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-sm font-bold text-gray-900 tracking-tight">TaxClarity</span>
          </button>
          
          <div className="flex gap-2">
            <button onClick={() => window.print()} className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg px-3 py-1.5 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              Report
            </button>
            <button onClick={() => skipTo(12)} className="flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-gray-900 px-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
              Go Back
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-8 py-8 reveal">
        <div className="text-center mb-8">
          <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-2">Final Verdict</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">Here is your tax breakdown</h1>
          <p className="text-gray-500 mt-2">FY 2025-26 • Based on your inputs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className={`relative rounded-3xl p-6 sm:p-8 shadow-xl border ${isGreen ? 'bg-gradient-to-br from-green-600 via-emerald-600 to-green-700 border-green-500 shadow-green-200' : 'bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 border-indigo-500 shadow-indigo-200'} text-white overflow-hidden`}>
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            
            <div className="relative z-10">
              <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6 ${isGreen ? 'bg-green-800/40 text-green-100' : 'bg-indigo-900/40 text-indigo-100'}`}>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                The Clear Winner
              </div>
              
              <h2 className="text-2xl font-bold mb-1 opacity-90">{winnerName}</h2>
              <p className="text-xs opacity-75 mb-6">You should opt for this regime when filing your returns.</p>
              
              <p className="text-xs uppercase font-semibold opacity-70 tracking-wider mb-1">Total Tax Payable</p>
              <p className="text-5xl font-black tracking-tighter mb-4">{fmt(winnerData.totalTax)}</p>
              
              {savings > 0 && (
                <div className={`inline-block px-4 py-2.5 rounded-xl text-sm font-semibold ${isGreen ? 'bg-green-800/40' : 'bg-indigo-900/40'}`}>
                  Saves you {fmt(savings)} compared to the {loserName.toLowerCase()}.
                </div>
              )}
            </div>
          </div>

          <div className="rounded-3xl p-6 sm:p-8 bg-white border border-gray-200 shadow-sm flex flex-col justify-center">
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">{loserName}</h2>
            <p className="text-xs text-gray-400 mb-6">Not recommended</p>
            
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Total Tax Payable</p>
            <p className="text-4xl font-black text-gray-800 tracking-tighter mb-6">{fmt(loserData.totalTax)}</p>
            
            <div className="space-y-2 border-t border-gray-100 pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Gross Income</span>
                <span className="font-semibold text-gray-900">{fmt(loserData.grossIncome)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Taxable Income</span>
                <span className="font-semibold text-gray-900">{fmt(loserData.taxableIncome)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 sm:p-8 pb-4">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center shrink-0 text-lg">📑</div>
              <h2 className="text-lg font-bold text-gray-900">Detailed Comparison</h2>
            </div>
            <p className="text-sm text-gray-500 pl-10">A side-by-side breakdown of your tax calculation</p>
          </div>

          <ComparisonRow label="Category" newAmt="New Regime" oldAmt="Old Regime" isHeader />
          
          <div className="px-5 py-2 bg-indigo-50/50 text-[10px] font-bold text-indigo-800 uppercase tracking-widest">Income</div>
          <ComparisonRow label="Gross Income" newAmt={fmt(newRegime.grossIncome)} oldAmt={fmt(oldRegime.grossIncome)} />
          
          <div className="px-5 py-2 bg-indigo-50/50 text-[10px] font-bold text-indigo-800 uppercase tracking-widest">Deductions & Exemptions</div>
          <ComparisonRow label="Standard Deduction" newAmt={newRegime.standardDeduction ? `− ${fmt(newRegime.standardDeduction)}` : '₹0'} oldAmt={oldRegime.standardDeduction ? `− ${fmt(oldRegime.standardDeduction)}` : '₹0'} />
          
          {(newRegime.professionalTaxDeduction > 0 || oldRegime.professionalTaxDeduction > 0) && (
            <ComparisonRow label="Professional Tax" newAmt={newRegime.professionalTaxDeduction ? `− ${fmt(newRegime.professionalTaxDeduction)}` : '₹0'} oldAmt={oldRegime.professionalTaxDeduction ? `− ${fmt(oldRegime.professionalTaxDeduction)}` : '₹0'} />
          )}
          {(newRegime.employerNPSDeduction > 0 || oldRegime.employerNPSDeduction > 0) && (
            <ComparisonRow label="Employer NPS (80CCD 2)" newAmt={newRegime.employerNPSDeduction ? `− ${fmt(newRegime.employerNPSDeduction)}` : '₹0'} oldAmt={oldRegime.employerNPSDeduction ? `− ${fmt(oldRegime.employerNPSDeduction)}` : '₹0'} />
          )}
          {(newRegime.hraExemption > 0 || oldRegime.hraExemption > 0) && (
            <ComparisonRow label="HRA Exemption" newAmt={newRegime.hraExemption ? `− ${fmt(newRegime.hraExemption)}` : '₹0'} oldAmt={oldRegime.hraExemption ? `− ${fmt(oldRegime.hraExemption)}` : '₹0'} />
          )}
          {(newRegime.deduction80C > 0 || oldRegime.deduction80C > 0) && (
            <ComparisonRow label="Section 80C Investments" newAmt={newRegime.deduction80C ? `− ${fmt(newRegime.deduction80C)}` : '₹0'} oldAmt={oldRegime.deduction80C ? `− ${fmt(oldRegime.deduction80C)}` : '₹0'} />
          )}
          {(newRegime.deduction80D > 0 || oldRegime.deduction80D > 0) && (
            <ComparisonRow label="Health Insurance (80D)" newAmt={newRegime.deduction80D ? `− ${fmt(newRegime.deduction80D)}` : '₹0'} oldAmt={oldRegime.deduction80D ? `− ${fmt(oldRegime.deduction80D)}` : '₹0'} />
          )}
          {(newRegime.deductionHomeLoanInterest > 0 || oldRegime.deductionHomeLoanInterest > 0) && (
            <ComparisonRow label="Home Loan Interest (24b)" newAmt={newRegime.deductionHomeLoanInterest ? `− ${fmt(newRegime.deductionHomeLoanInterest)}` : '₹0'} oldAmt={oldRegime.deductionHomeLoanInterest ? `− ${fmt(oldRegime.deductionHomeLoanInterest)}` : '₹0'} />
          )}
          {(newRegime.deductionPersonalNPS > 0 || oldRegime.deductionPersonalNPS > 0) && (
            <ComparisonRow label="Personal NPS (80CCD 1B)" newAmt={newRegime.deductionPersonalNPS ? `− ${fmt(newRegime.deductionPersonalNPS)}` : '₹0'} oldAmt={oldRegime.deductionPersonalNPS ? `− ${fmt(oldRegime.deductionPersonalNPS)}` : '₹0'} />
          )}
          {(newRegime.deduction80TTA_TTB > 0 || oldRegime.deduction80TTA_TTB > 0) && (
            <ComparisonRow label="Savings Interest (80TTA/TTB)" newAmt={newRegime.deduction80TTA_TTB ? `− ${fmt(newRegime.deduction80TTA_TTB)}` : '₹0'} oldAmt={oldRegime.deduction80TTA_TTB ? `− ${fmt(oldRegime.deduction80TTA_TTB)}` : '₹0'} />
          )}

          <ComparisonRow label="Taxable Income" newAmt={fmt(newRegime.taxableIncome)} oldAmt={fmt(oldRegime.taxableIncome)} isTotal />

          <div className="px-5 py-2 bg-indigo-50/50 text-[10px] font-bold text-indigo-800 uppercase tracking-widest">Tax Calculation</div>
          <ComparisonRow label="Tax on Slabs" newAmt={fmt(newRegime.slabTax)} oldAmt={fmt(oldRegime.slabTax)} />
          {(newRegime.rebate > 0 || oldRegime.rebate > 0) && (
            <ComparisonRow label="87A Rebate" newAmt={newRegime.rebate ? `− ${fmt(newRegime.rebate)}` : '₹0'} oldAmt={oldRegime.rebate ? `− ${fmt(oldRegime.rebate)}` : '₹0'} />
          )}
          {(newRegime.marginalRelief > 0 || oldRegime.marginalRelief > 0) && (
            <ComparisonRow label="Marginal Relief" newAmt={newRegime.marginalRelief ? `− ${fmt(newRegime.marginalRelief)}` : '₹0'} oldAmt={oldRegime.marginalRelief ? `− ${fmt(oldRegime.marginalRelief)}` : '₹0'} />
          )}
          <ComparisonRow label="Health & Education Cess (4%)" newAmt={newRegime.cess ? `+ ${fmt(newRegime.cess)}` : '₹0'} oldAmt={oldRegime.cess ? `+ ${fmt(oldRegime.cess)}` : '₹0'} />

          <ComparisonRow label="Total Tax Payable" newAmt={fmt(newRegime.totalTax)} oldAmt={fmt(oldRegime.totalTax)} isTotal />
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <SlabCard title="New Regime Slabs" data={newRegime} slabs={NEW_REGIME_SLABS} />
          <SlabCard title="Old Regime Slabs" data={oldRegime} slabs={getOldSlabs(data.ageGroup)} />
        </div>

        <div className="mt-8 bg-white rounded-3xl border border-gray-200 shadow-sm p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-lg">⚖️</div>
            <h2 className="text-lg font-bold text-gray-900">Tax Settlement</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Total Tax Liability</p>
              <p className="text-2xl font-bold text-gray-900">{fmt(winnerData.totalTax)}</p>
              <p className="text-[10px] text-gray-400 mt-1">Based on {winnerName}</p>
            </div>
            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Total TDS Deducted</p>
              <p className="text-2xl font-bold text-gray-900">{fmt(tdsDeducted)}</p>
              <p className="text-[10px] text-gray-400 mt-1">By employer & bank</p>
            </div>
          </div>

          {tds.type === 'refund' && (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-5 flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
              </div>
              <div>
                <p className="text-sm font-bold text-green-900 mb-0.5">You will get a REFUND of {fmt(tds.amount)}</p>
                <p className="text-xs text-green-700 leading-relaxed">Your TDS deduction is higher than your actual tax liability. The Income Tax Department will refund this amount to your bank account after you file your returns.</p>
              </div>
            </div>
          )}

          {tds.type === 'payable' && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-5 flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 10l7-7m0 0l7 7m-7 7v18" /></svg>
              </div>
              <div>
                <p className="text-sm font-bold text-red-900 mb-0.5">You need to PAY {fmt(tds.amount)} more</p>
                <p className="text-xs text-red-700 leading-relaxed">Your TDS deduction was lower than your actual tax liability. You will need to pay this remaining amount before filing your returns (Self Assessment Tax).</p>
              </div>
            </div>
          )}

          {tds.type === 'settled' && (
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900 mb-0.5">Your tax is fully settled!</p>
                <p className="text-xs text-gray-600 leading-relaxed">Your TDS deduction exactly matches your tax liability. You have nothing more to pay or receive.</p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 flex justify-center">
          <button onClick={reset} className="text-sm font-medium text-gray-500 hover:text-gray-900 flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-gray-100 transition-colors border border-transparent hover:border-gray-200">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            Start over
          </button>
        </div>
      </main>
    </div>
  )
}
