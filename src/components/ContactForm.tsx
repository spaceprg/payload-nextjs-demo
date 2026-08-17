'use client'

import { useState } from 'react'

type Status = 'idle' | 'submitting' | 'success' | 'error'

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('submitting')

    try {
      const res = await fetch('/api/form-submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, formSource: 'contact-page' }),
      })

      if (!res.ok) throw new Error('Request failed')

      setStatus('success')
      setName('')
      setEmail('')
      setMessage('')
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
      <div>
        <label className="mb-1 block text-sm text-white/70">Name</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border-b border-white/20 bg-transparent py-2 text-sm text-white outline-none placeholder:text-white/40 focus:border-white/60"
          placeholder="Your name"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm text-white/70">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border-b border-white/20 bg-transparent py-2 text-sm text-white outline-none placeholder:text-white/40 focus:border-white/60"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label className="mb-1 block text-sm text-white/70">Message</label>
        <textarea
          rows={4}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
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
