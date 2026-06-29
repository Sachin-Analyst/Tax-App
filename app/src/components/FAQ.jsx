import { forwardRef, useImperativeHandle, useState } from 'react'

const FAQS = [
  {
    q: "Where do I find my Basic Pay?",
    a: "Your basic pay is listed on your monthly salary slip. It is usually the largest component of your gross salary (typically 40-50% of your CTC). Do not confuse it with your Gross Pay or Net Take-Home."
  },
  {
    q: "What counts as interest income?",
    a: "Any interest earned from Fixed Deposits (FDs), Recurring Deposits (RDs), and standard Savings Accounts must be declared. Interest from Savings Accounts up to ₹10,000 is tax-free under Section 80TTA (₹50,000 for senior citizens under 80TTB), but you must still declare it."
  },
  {
    q: "What is Section 80C?",
    a: "Section 80C is the most popular tax-saving section. It allows you to reduce your taxable income by up to ₹1,50,000 by investing in specific instruments like PPF, EPF, ELSS mutual funds, Life Insurance, or paying children's tuition fees."
  },
  {
    q: "What about employer provided insurance?",
    a: "You cannot claim tax deductions for health insurance premiums paid by your employer. You can only claim deductions under Section 80D for premiums you pay out of your own pocket."
  },
  {
    q: "What if the house is under construction?",
    a: "You can only claim home loan interest deductions (Section 24b) after the construction is complete and you receive possession. Pre-construction interest can be claimed in 5 equal installments starting from the year of possession."
  }
]

const FAQ = forwardRef((props, ref) => {
  const [openIndex, setOpenIndex] = useState(null)

  useImperativeHandle(ref, () => ({
    openAndScroll: () => {
      const el = document.getElementById('faq-section')
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
        // Flash animation
        el.classList.add('animate-pulse')
        setTimeout(() => el.classList.remove('animate-pulse'), 1000)
      }
    }
  }))

  return (
    <div id="faq-section" className="mt-12 mb-8">
      <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Frequently Asked Questions</h2>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300">
        {FAQS.map((faq, i) => (
          <div key={i} className="border-b border-gray-100 last:border-0">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors focus:outline-none"
            >
              <span className="text-sm font-semibold text-gray-900">{faq.q}</span>
              <svg className={`w-4 h-4 text-gray-400 transition-transform ${openIndex === i ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
            </button>
            {openIndex === i && (
              <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed bg-gray-50/50 border-t border-gray-50">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
})

export default FAQ
