import SliderInput from './SliderInput';
import { calc80CTotal } from '../utils';

export default function InputPanel({ data, update }) {
  const total80C = calc80CTotal(data);

  return (
    <div className="space-y-6">
      
      {/* 1. Basic Details */}
      <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50">
          <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
            <span className="text-lg">👤</span> About You
          </h2>
        </div>
        <div className="p-5">
          <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-3">Age Group</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {[
              { val: 'below60', label: '< 60 yrs' },
              { val: 'senior', label: '60-79 yrs' },
              { val: 'superSenior', label: '80+ yrs' }
            ].map(opt => (
              <button
                key={opt.val}
                onClick={() => update({ ageGroup: opt.val })}
                className={`py-2 px-3 text-xs font-bold rounded-lg border-2 transition-all ${data.ageGroup === opt.val ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Income */}
      <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50">
          <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
            <span className="text-lg">💰</span> Income (Annual)
          </h2>
        </div>
        <div className="p-5">
          <SliderInput id="takeHome" label="Annual Salary (Take-home)" value={data.takeHomeSalaryMonthly ? data.takeHomeSalaryMonthly * 12 : ''} onChange={v => update({ takeHomeSalaryMonthly: Math.round(v/12) })} max={5000000} step={50000} />
          <SliderInput id="basicPay" label="Annual Basic Pay" value={data.basicSalaryMonthly ? data.basicSalaryMonthly * 12 : ''} onChange={v => update({ basicSalaryMonthly: Math.round(v/12) })} max={2500000} step={50000} />
          <SliderInput id="bonus" label="Annual Bonus" value={data.bonus} onChange={v => update({ bonus: v, hasBonus: v > 0 })} max={1000000} step={10000} />
          <div className="border-t border-gray-100 my-4"></div>
          <SliderInput id="fdInterest" label="FD Interest" value={data.fdInterest} onChange={v => update({ fdInterest: v, hasOtherIncome: true })} max={500000} step={5000} />
          <SliderInput id="savingsInterest" label="Savings Acc Interest" value={data.savingsInterest} onChange={v => update({ savingsInterest: v, hasOtherIncome: true })} max={50000} step={1000} />
        </div>
      </section>

      {/* 3. Deductions & Allowances */}
      <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50">
          <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
            <span className="text-lg">🛡️</span> Deductions (Old Regime)
          </h2>
        </div>
        <div className="p-5">
          
          <div className="mb-5">
            <SliderInput id="rent" label="Annual Rent Paid" value={data.monthlyRent ? data.monthlyRent * 12 : ''} onChange={v => update({ monthlyRent: Math.round(v/12), paysRent: v > 0 })} max={1200000} step={12000} />
            <div className="flex gap-2 mb-2">
              <button onClick={() => update({ cityType: 'metro' })} className={`flex-1 py-1.5 text-[11px] font-bold rounded border transition-colors ${data.cityType === 'metro' ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-500 border-gray-200'}`}>Metro City</button>
              <button onClick={() => update({ cityType: 'nonMetro' })} className={`flex-1 py-1.5 text-[11px] font-bold rounded border transition-colors ${data.cityType === 'nonMetro' ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-500 border-gray-200'}`}>Non-Metro</button>
            </div>
            <SliderInput id="hra" label="Annual HRA Received" value={data.hraMonthly ? data.hraMonthly * 12 : ''} onChange={v => update({ hraMonthly: Math.round(v/12), hasHRA: v > 0 })} max={1000000} step={12000} />
          </div>

          <div className="border-t border-gray-100 my-4"></div>

          <div className="mb-5">
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-3">80C Investments (Max 1.5L)</label>
            <div className="flex items-center gap-2 mb-3">
              <input 
                type="number" 
                value={data.investments80C?.epf || ''} 
                onChange={(e) => update({ has80CItems: [...(data.has80CItems || []), 'epf'], investments80C: { ...data.investments80C, epf: e.target.value } })}
                placeholder="EPF Amount" 
                className="flex-1 text-sm border-gray-200 rounded-md py-1.5 px-3 focus:ring-indigo-500"
              />
              <input 
                type="number" 
                value={data.investments80C?.ppf || ''} 
                onChange={(e) => update({ has80CItems: [...(data.has80CItems || []), 'ppf'], investments80C: { ...data.investments80C, ppf: e.target.value } })}
                placeholder="PPF / ELSS" 
                className="flex-1 text-sm border-gray-200 rounded-md py-1.5 px-3 focus:ring-indigo-500"
              />
            </div>
            <p className="text-[11px] text-indigo-600 font-semibold bg-indigo-50 p-2 rounded">Total 80C Claimed: ₹{total80C.toLocaleString()}</p>
          </div>

          <div className="border-t border-gray-100 my-4"></div>

          <SliderInput id="nps" label="Personal NPS (80CCD 1B)" value={data.personalNPS} onChange={v => update({ personalNPS: v, hasPersonalNPS: v > 0 })} max={50000} step={5000} />
          <SliderInput id="empNps" label="Employer NPS (80CCD 2)" value={data.employerNPS} onChange={v => update({ employerNPS: v, hasEmployerNPS: v > 0 })} max={500000} step={10000} />
          
          <div className="border-t border-gray-100 my-4"></div>
          
          <SliderInput id="healthSelf" label="Health Ins (Self/Family)" value={data.selfInsurancePremium} onChange={v => update({ selfInsurancePremium: v, hasSelfInsurance: v > 0 })} max={50000} step={1000} />
          <SliderInput id="healthParents" label="Health Ins (Parents)" value={data.parentInsurancePremium} onChange={v => update({ parentInsurancePremium: v, hasParentInsurance: v > 0 })} max={100000} step={1000} />
          
          {data.hasParentInsurance && (
            <div className="flex items-center gap-2 mb-4">
              <input type="checkbox" id="parents60" checked={data.parentsAbove60} onChange={e => update({ parentsAbove60: e.target.checked })} className="rounded text-indigo-600" />
              <label htmlFor="parents60" className="text-xs text-gray-700">Parents are senior citizens (60+)</label>
            </div>
          )}

          <div className="border-t border-gray-100 my-4"></div>

          <SliderInput id="homeLoan" label="Home Loan Interest (24b)" value={data.homeLoanInterest} onChange={v => update({ homeLoanInterest: v, hasHomeLoan: v > 0, loanOwnership: 'self' })} max={200000} step={10000} />
        </div>
      </section>

      {/* 4. TDS */}
      <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-10">
        <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50">
          <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2">
            <span className="text-lg">🧾</span> Taxes Already Paid (TDS)
          </h2>
        </div>
        <div className="p-5">
          <SliderInput id="tds" label="TDS by Employer" value={data.tdsDeducted} onChange={v => update({ tdsDeducted: v, hasTDS: v > 0 })} max={1000000} step={10000} />
        </div>
      </section>

    </div>
  )
}
