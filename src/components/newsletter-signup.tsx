'use client';

import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

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
    <div className="rounded-xl border border-[#2a2a2a] bg-[#1c1c1c] p-6 sm:p-10">
      <div className="max-w-xl">
        <p className="text-xs uppercase tracking-[0.2em] text-[#5a5550] mb-3">
          Newsletter
        </p>
        <h2 className="text-xl sm:text-2xl font-light text-[#e8e4df] mb-3 tracking-tight">
          Stay ahead in AV production
        </h2>
        <p className="text-sm text-[#8a8580] leading-relaxed mb-6">
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
              className="flex-1 px-4 py-2.5 rounded-lg bg-[#141414] border border-[#2a2a2a] text-[#e8e4df] placeholder-[#5a5550] focus:outline-none focus:border-[#8a8580] text-sm transition-colors"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#e8e4df] hover:bg-[#d4d0cb] text-[#141414] text-sm font-medium transition-colors"
            >
              Subscribe
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
