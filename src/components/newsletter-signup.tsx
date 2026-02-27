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
    <div className="rounded-2xl border border-[#282828] bg-[#1a1a1a] p-8 sm:p-12 lg:p-14">
      <div className="max-w-xl">
        <p className="text-[11px] uppercase tracking-[0.25em] text-[#5a5550] mb-4 font-medium">
          Newsletter
        </p>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-extralight text-[#e8e4df] mb-4 tracking-tight">
          Stay ahead in AV production
        </h2>
        <p className="text-sm text-[#6a6560] leading-relaxed mb-8">
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
              className="flex-1 px-5 py-3 rounded-xl bg-[#141414] border border-[#282828] text-[#e8e4df] placeholder-[#4a4540] focus:outline-none focus:border-[#5a5550] text-sm transition-colors"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#e8e4df] hover:bg-white text-[#141414] text-sm font-medium transition-colors"
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
