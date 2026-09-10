'use client'

import { useState } from 'react'
import type { Dictionary } from '@/lib/i18n/getDictionary'
import { useLocale } from '@/lib/i18n/useLocale'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const initialFields = { service: '', name: '', business: '', email: '', phone: '', message: '' }

export default function FooterContactForm({ dictionary }: { dictionary: Dictionary }) {
  const t = dictionary.footerContactForm
  const locale = useLocale()
  const [status, setStatus] = useState<Status>('idle')
  const [fields, setFields] = useState(initialFields)

  const setField = (key: keyof typeof initialFields) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setFields((prev) => ({ ...prev, [key]: e.target.value }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('submitting')

    try {
      const res = await fetch('/api/form-submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fields.name,
          email: fields.email,
          business: fields.business,
          phone: fields.phone,
          service: fields.service,
          message: fields.message,
          formSource: 'footer-form',
          locale,
        }),
      })

      if (!res.ok) throw new Error('Request failed')

      setStatus('success')
      setFields(initialFields)
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col gap-2 rounded-lg bg-white/10 p-6 text-center md:p-10">
        <p className="text-lg font-medium text-white">{t.thanksHeading}</p>
        <p className="text-sm text-white/70">{t.thanksBody}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 rounded-lg bg-white/10 p-6 md:p-10">
      <div>
        <label className="mb-1 block text-sm text-white/70">{t.chooseService}</label>
        <input
          required
          value={fields.service}
          onChange={setField('service')}
          className="w-full border-b border-white/20 bg-transparent py-2 text-sm text-white outline-none focus:border-white/60"
        />
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm text-white/70">{t.fullName}</label>
          <input
            required
            value={fields.name}
            onChange={setField('name')}
            className="w-full border-b border-white/20 bg-transparent py-2 text-sm text-white outline-none focus:border-white/60"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-white/70">{t.business}</label>
          <input
            required
            value={fields.business}
            onChange={setField('business')}
            className="w-full border-b border-white/20 bg-transparent py-2 text-sm text-white outline-none focus:border-white/60"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-white/70">{t.email}</label>
          <input
            type="email"
            required
            value={fields.email}
            onChange={setField('email')}
            className="w-full border-b border-white/20 bg-transparent py-2 text-sm text-white outline-none focus:border-white/60"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-white/70">{t.contact}</label>
          <input
            required
            value={fields.phone}
            onChange={setField('phone')}
            className="w-full border-b border-white/20 bg-transparent py-2 text-sm text-white outline-none focus:border-white/60"
          />
        </div>
      </div>
      <div>
        <label className="mb-1 block text-sm text-white/70">{t.yourMessage}</label>
        <input
          required
          value={fields.message}
          onChange={setField('message')}
          className="w-full border-b border-white/20 bg-transparent py-2 text-sm text-white outline-none focus:border-white/60"
        />
      </div>
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="mt-2 self-start rounded-full bg-gomoblue px-9 py-3.5 font-serif text-base italic text-white transition hover:bg-gomoblue/90 disabled:opacity-60"
      >
        {status === 'submitting' ? t.sending : t.submit}
      </button>
      {status === 'error' && <p className="text-xs text-rose">{t.errorMessage}</p>}
    </form>
  )
}
