'use client'

import Image from 'next/image'
import { useState } from 'react'
import type { AIWorkflowImprovement } from '@/lib/payload'

export default function AIWorkflowAccordion({
  listLabel,
  improvements,
}: {
  listLabel?: string | null
  improvements: AIWorkflowImprovement[]
}) {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div className="w-full">
      {listLabel && (
        <p className="mb-4 text-sm font-semibold uppercase tracking-[1.12px] text-lime">{listLabel}</p>
      )}
      <ul className="flex flex-col">
        {improvements.map((item, index) => {
          const isOpen = index === openIndex
          return (
            <li key={item.id ?? index} className="border-b border-white/40 py-4 last:border-b-0">
              <button
                type="button"
                onClick={() => setOpenIndex(index)}
                className="flex w-full items-center justify-between text-left"
                aria-expanded={isOpen}
              >
                <span className="text-2xl font-semibold text-white">{item.title}</span>
                <span
                  className={`relative block h-3 w-[18px] shrink-0 opacity-70 transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                >
                  <Image src="/images/home/icons/chevron.svg" alt="" fill />
                </span>
              </button>
              <div
                className={`grid transition-all duration-300 ease-out ${
                  isOpen ? 'mt-2 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  {item.description && <p className="text-base leading-6 text-white">{item.description}</p>}
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
