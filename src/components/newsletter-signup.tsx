'use client';

import { useState } from 'react';
import { ArrowRight, Check, Mail } from 'lucide-react';

export function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#232323] bg-[#191919]">
      {/* Gradient accent */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-gradient-to-bl from-blue-500/[0.06] via-purple-500/[0.03] to-transparent rounded-full blur-3xl" />

      <div className="relative" style={{ padding: '40px' }}>
        <div className="max-w-xl">
          <div className="flex items-center" style={{ gap: '10px', marginBottom: '16px' }}>
            <Mail className="text-blue-500" style={{ width: '16px', height: '16px' }} />
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#5a5550] font-semibold">
              Newsletter
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold text-[#f0ece8] tracking-tight" style={{ marginBottom: '10px' }}>
            Stay ahead in AV production
          </h2>
          <p className="text-sm text-[#7a756f] leading-relaxed" style={{ marginBottom: '28px' }}>
            Weekly tips, tool updates, and deep-dive guides on streaming, broadcast, and AV engineering.
          </p>

          {submitted ? (
            <div className="flex items-center text-emerald-400" style={{ gap: '12px' }}>
              <div className="rounded-full bg-emerald-500/10 flex items-center justify-center" style={{ width: '28px', height: '28px' }}>
                <Check style={{ width: '14px', height: '14px' }} />
              </div>
              <span className="text-sm">You&apos;re on the list. Check your email to confirm.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row max-w-md" style={{ gap: '12px' }}>
              <input
                type="email"
                placeholder="you@studio.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="flex-1 rounded-xl bg-[#141414] border border-[#282828] text-[#e8e4df] placeholder-[#4a4540] focus:outline-none focus:border-[#5a5550] text-sm transition-colors"
                style={{ padding: '12px 16px' }}
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-xl bg-[#f0ece8] hover:bg-white text-[#141414] text-sm font-semibold transition-colors duration-200"
                style={{ padding: '12px 24px', gap: '8px' }}
              >
                Subscribe
                <ArrowRight style={{ width: '14px', height: '14px' }} />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
