'use client'

import { useState } from 'react'
import { COUNTRIES } from '@/lib/countries'

type Status = 'idle' | 'submitting' | 'success' | 'error'

const initialFields = { name: '', business: '', jobTitle: '', email: '', country: '', message: '' }

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [fields, setFields] = useState(initialFields)

  const setField =
    (key: keyof typeof initialFields) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setFields((prev) => ({ ...prev, [key]: e.target.value }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('submitting')

    try {
      const res = await fetch('/api/form-submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...fields, formSource: 'contact-page' }),
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
      <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-center">
        <p className="text-lg font-medium text-white">Thanks for reaching out.</p>
        <p className="mt-2 text-sm text-white/70">We&apos;ll be in touch shortly.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-xl border border-white/10 bg-white/5 p-6">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm text-white/70">Name</label>
          <input
            type="text"
            required
            value={fields.name}
            onChange={setField('name')}
            className="w-full border-b border-white/20 bg-transparent py-2 text-sm text-white outline-none placeholder:text-white/40 focus:border-white/60"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-white/70">Company</label>
          <input
            type="text"
            required
            value={fields.business}
            onChange={setField('business')}
            className="w-full border-b border-white/20 bg-transparent py-2 text-sm text-white outline-none placeholder:text-white/40 focus:border-white/60"
            placeholder="Your company"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-white/70">Job title</label>
          <input
            type="text"
            value={fields.jobTitle}
            onChange={setField('jobTitle')}
            className="w-full border-b border-white/20 bg-transparent py-2 text-sm text-white outline-none placeholder:text-white/40 focus:border-white/60"
            placeholder="Your role"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-white/70">Email</label>
          <input
            type="email"
            required
            value={fields.email}
            onChange={setField('email')}
            className="w-full border-b border-white/20 bg-transparent py-2 text-sm text-white outline-none placeholder:text-white/40 focus:border-white/60"
            placeholder="you@example.com"
          />
        </div>
      </div>
      <div>
        <label className="mb-1 block text-sm text-white/70">Country</label>
        <select
          required
          value={fields.country}
          onChange={setField('country')}
          className="w-full border-b border-white/20 bg-transparent py-2 text-sm text-white outline-none focus:border-white/60 [&>option]:bg-ink"
        >
          <option value="" disabled>
            Select your country
          </option>
          {COUNTRIES.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="mb-1 block text-sm text-white/70">Message</label>
        <textarea
          rows={4}
          required
          value={fields.message}
          onChange={setField('message')}
          className="w-full border-b border-white/20 bg-transparent py-2 text-sm text-white outline-none placeholder:text-white/40 focus:border-white/60"
          placeholder="How can we help?"
        />
      </div>
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full rounded-full bg-gomoblue px-4 py-3 font-serif text-sm italic text-white transition hover:bg-gomoblue/90 disabled:opacity-60"
      >
        {status === 'submitting' ? 'Sending…' : 'Send Message'}
      </button>
      {status === 'error' && (
        <p className="text-xs text-rose">Something went wrong — please try again.</p>
      )}
    </form>
  )
}
