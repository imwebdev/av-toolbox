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

      <div className="relative p-8 sm:p-10 lg:p-12">
        <div className="max-w-xl">
          <div className="flex items-center gap-2.5 mb-4">
            <Mail className="w-4 h-4 text-blue-500" />
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#5a5550] font-semibold">
              Newsletter
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold text-[#f0ece8] mb-3 tracking-tight">
            Stay ahead in AV production
          </h2>
          <p className="text-sm text-[#7a756f] leading-relaxed mb-8">
            Weekly tips, tool updates, and deep-dive guides on streaming, broadcast, and AV engineering.
          </p>

          {submitted ? (
            <div className="flex items-center gap-3 text-emerald-400">
              <div className="w-7 h-7 rounded-full bg-emerald-500/10 flex items-center justify-center">
                <Check className="w-3.5 h-3.5" />
              </div>
              <span className="text-sm">You&apos;re on the list. Check your email to confirm.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md">
              <input
                type="email"
                placeholder="you@studio.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="flex-1 px-4 py-3 rounded-xl bg-[#141414] border border-[#282828] text-[#e8e4df] placeholder-[#4a4540] focus:outline-none focus:border-[#5a5550] text-sm transition-colors"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#f0ece8] hover:bg-white text-[#141414] text-sm font-semibold transition-colors duration-200"
              >
                Subscribe
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
