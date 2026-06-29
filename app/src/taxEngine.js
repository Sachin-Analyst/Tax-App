import * as C from './constants'
import { toNum, calc80CTotal } from './utils'

export function applySlabs(income, slabs) {
  if (income <= 0) return 0
  let tax = 0, prev = 0
  for (const { upTo, rate } of slabs) {
    if (upTo === null) {
      tax += (income - prev) * rate
      break
    }
    if (income <= upTo) {
      tax += (income - prev) * rate
      break
    }
    tax += (upTo - prev) * rate
    prev = upTo
  }
  return Math.round(tax)
}

export function calculateGrossIncome(data) {
  const takeHome = toNum(data.takeHomeSalaryMonthly) * 12
  const bonus = data.hasBonus ? toNum(data.bonus) : 0
  const fdInterest = data.hasOtherIncome ? toNum(data.fdInterest) : 0
  const savingsInterest = data.hasOtherIncome ? toNum(data.savingsInterest) : 0
  return takeHome + bonus + fdInterest + savingsInterest
}

export function calculateHRAExemption(data) {
  if (!data.paysRent || !data.hasHRA || toNum(data.hraMonthly) <= 0) return 0
  
  const annualHRAReceived = toNum(data.hraMonthly) * 12
  const annualBasic = toNum(data.basicSalaryMonthly) * 12
  const annualRentPaid = toNum(data.monthlyRent) * 12
  
  const pct = data.cityType === 'metro' ? C.HRA_METRO_PCT : C.HRA_NONMETRO_PCT
  const limit2 = pct * annualBasic
  const limit3 = annualRentPaid - (0.1 * annualBasic)
  
  return Math.max(0, Math.min(annualHRAReceived, limit2, limit3))
}

export function calculateNewRegimeTax(data) {
  const grossIncome = calculateGrossIncome(data)
  const annualBasic = toNum(data.basicSalaryMonthly) * 12
  
  let employerNPSDeduction = 0
  if (data.hasEmployerNPS) {
    const rawNPS = toNum(data.employerNPS)
    const limit = C.EMPLOYER_NPS_PCT_OF_BASIC * annualBasic
    employerNPSDeduction = Math.min(rawNPS, limit)
  }
  
  const standardDeduction = C.STANDARD_DEDUCTION_NEW
  const professionalTaxDeduction = 0 // Not available in new regime
  
  const taxableIncome = Math.max(0, grossIncome - standardDeduction - employerNPSDeduction)
  
  const slabTax = applySlabs(taxableIncome, C.NEW_REGIME_SLABS)
  
  let rebate = 0
  let marginalRelief = 0
  
  if (taxableIncome <= C.REBATE_87A_NEW_INCOME_LIMIT) {
    rebate = Math.min(slabTax, C.REBATE_87A_NEW_MAX)
  } else {
    // Marginal relief
    const excess = taxableIncome - C.REBATE_87A_NEW_INCOME_LIMIT
    const taxAfterRebateRaw = slabTax 
    if (taxAfterRebateRaw > excess) {
      marginalRelief = taxAfterRebateRaw - excess
    }
  }
  
  const taxAfterRebate = Math.max(0, slabTax - rebate - marginalRelief)
  const cess = Math.round(taxAfterRebate * C.CESS_RATE)
  const totalTax = taxAfterRebate + cess
  
  return {
    grossIncome,
    taxableIncome,
    standardDeduction,
    professionalTaxDeduction,
    hraExemption: 0,
    deduction80C: 0,
    deduction80D: 0,
    deductionPersonalNPS: 0,
    employerNPSDeduction,
    deductionHomeLoanInterest: 0,
    deduction80TTA_TTB: 0,
    slabTax,
    rebate,
    marginalRelief,
    cess,
    totalTax
  }
}

function getOldSlabs(ageGroup) {
  if (ageGroup === 'senior') return C.OLD_REGIME_SLABS_SENIOR
  if (ageGroup === 'superSenior') return C.OLD_REGIME_SLABS_SUPER_SENIOR
  return C.OLD_REGIME_SLABS_BELOW60
}

export function calculateOldRegimeTax(data) {
  const grossIncome = calculateGrossIncome(data)
  const annualBasic = toNum(data.basicSalaryMonthly) * 12
  
  const standardDeduction = C.STANDARD_DEDUCTION_OLD
  
  let professionalTaxDeduction = 0
  if (data.hasProfTax) {
    professionalTaxDeduction = Math.min(toNum(data.professionalTax), C.PROF_TAX_CAP)
  }
  
  const hraExemption = calculateHRAExemption(data)
  
  let deduction80C = 0
  if (data.has80CItems?.length) {
    deduction80C = Math.min(calc80CTotal(data), C.CAP_80C)
  }
  
  let deduction80D = 0
  if (data.hasSelfInsurance) {
    const cap = (data.ageGroup === 'senior' || data.ageGroup === 'superSenior') ? C.CAP_80D_SELF_ABOVE60 : C.CAP_80D_SELF_BELOW60
    deduction80D += Math.min(toNum(data.selfInsurancePremium), cap)
  }
  if (data.hasParentInsurance) {
    const cap = data.parentsAbove60 ? C.CAP_80D_PARENTS_ABOVE60 : C.CAP_80D_PARENTS_BELOW60
    deduction80D += Math.min(toNum(data.parentInsurancePremium), cap)
  }
  
  let deductionHomeLoanInterest = 0
  if (data.hasHomeLoan && data.loanOwnership !== 'other') {
    deductionHomeLoanInterest = Math.min(toNum(data.homeLoanInterest), C.CAP_24B)
  }
  
  let deductionPersonalNPS = 0
  if (data.hasPersonalNPS) {
    deductionPersonalNPS = Math.min(toNum(data.personalNPS), C.CAP_80CCD1B)
  }
  
  let employerNPSDeduction = 0
  if (data.hasEmployerNPS) {
    const rawNPS = toNum(data.employerNPS)
    const limit = C.EMPLOYER_NPS_PCT_OF_BASIC * annualBasic
    employerNPSDeduction = Math.min(rawNPS, limit)
  }
  
  let deduction80TTA_TTB = 0
  if (data.hasOtherIncome) {
    const fd = toNum(data.fdInterest)
    const sv = toNum(data.savingsInterest)
    if (data.ageGroup === 'senior' || data.ageGroup === 'superSenior') {
      deduction80TTA_TTB = Math.min(fd + sv, C.CAP_80TTB)
    } else {
      deduction80TTA_TTB = Math.min(sv, C.CAP_80TTA)
    }
  }
  
  const totalDeductions = standardDeduction + professionalTaxDeduction + hraExemption + deduction80C + deduction80D + deductionHomeLoanInterest + deductionPersonalNPS + employerNPSDeduction + deduction80TTA_TTB
  
  const taxableIncome = Math.max(0, grossIncome - totalDeductions)
  
  const slabTax = applySlabs(taxableIncome, getOldSlabs(data.ageGroup))
  
  let rebate = 0
  if (data.ageGroup !== 'superSenior' && taxableIncome <= C.REBATE_87A_OLD_INCOME_LIMIT) {
    rebate = Math.min(slabTax, C.REBATE_87A_OLD_MAX)
  }
  
  const taxAfterRebate = Math.max(0, slabTax - rebate)
  const cess = Math.round(taxAfterRebate * C.CESS_RATE)
  const totalTax = taxAfterRebate + cess
  
  return {
    grossIncome,
    taxableIncome,
    standardDeduction,
    professionalTaxDeduction,
    hraExemption,
    deduction80C,
    deduction80D,
    deductionPersonalNPS,
    employerNPSDeduction,
    deductionHomeLoanInterest,
    deduction80TTA_TTB,
    slabTax,
    rebate,
    marginalRelief: 0,
    cess,
    totalTax
  }
}

export function computeTax(data) {
  const newRegime = calculateNewRegimeTax(data)
  const oldRegime = calculateOldRegimeTax(data)
  
  let recommended = 'new'
  if (oldRegime.totalTax < newRegime.totalTax) {
    recommended = 'old'
  }
  
  const savings = Math.abs(newRegime.totalTax - oldRegime.totalTax)
  
  const employerTDS = data.hasTDS ? toNum(data.tdsDeducted) : 0
  const bankTDS = (data.hasOtherIncome && data.bankTDS) ? toNum(data.bankTDS) : 0
  const totalTdsDeducted = employerTDS + bankTDS
  
  const targetTax = recommended === 'new' ? newRegime.totalTax : oldRegime.totalTax
  let tdsType = 'settled'
  let tdsAmount = 0
  
  if (totalTdsDeducted > targetTax) {
    tdsType = 'refund'
    tdsAmount = totalTdsDeducted - targetTax
  } else if (totalTdsDeducted < targetTax) {
    tdsType = 'payable'
    tdsAmount = targetTax - totalTdsDeducted
  }
  
  return {
    newRegime,
    oldRegime,
    recommended,
    savings,
    tds: { type: tdsType, amount: tdsAmount },
    tdsDeducted: totalTdsDeducted,
    employerTDS,
    bankTDS
  }
}
