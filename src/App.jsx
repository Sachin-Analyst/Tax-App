import { useState, useRef } from 'react'
import Dashboard from './components/Dashboard'

export const INITIAL_STATE = {
  fy: '2025-26',
  ageGroup: 'below60',         // default
  basicSalaryMonthly: '',
  takeHomeSalaryMonthly: '',
  hasBonus: null,              
  bonus: '',                   
  hasHRA: false,
  hraMonthly: '',
  hasProfTax: false,
  professionalTax: '',         
  hasEmployerNPS: false,
  employerNPS: '',             
  hasOtherIncome: null,        
  fdInterest: '',
  savingsInterest: '',
  paysRent: null,              
  monthlyRent: '',
  cityType: 'metro',              
  hasHRAInSalary: null,        
  investments80C: {
    epf: '',
    lic: '',
    ppf: '',
    elss: '',
    tuition: '',
    homeLoanPrincipal: '',
    nsc: '',
  },
  has80CItems: [],             
  hasPersonalNPS: null,        
  personalNPS: '',             
  hasSelfInsurance: null,      
  selfInsurancePremium: '',    
  hasParentInsurance: null,    
  parentInsurancePremium: '',  
  parentsAbove60: false,        
  hasHomeLoan: null,           
  loanOwnership: 'self',         
  homeLoanInterest: '',        
  hasTDS: null,                
  tdsDeducted: '',             
  bankTDS: '',                 
}

export default function App() {
  return <Dashboard />
}
