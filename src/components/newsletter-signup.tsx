'use client';

import { useState } from 'react';
import { Mail, ArrowRight, Check } from 'lucide-react';

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
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 to-zinc-800 dark:from-zinc-800 dark:to-zinc-900 border border-zinc-700 dark:border-zinc-700 p-8 sm:p-12">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-blue-500/10 via-violet-500/5 to-transparent rounded-full blur-3xl" />

      <div className="relative max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-sm font-medium text-blue-300 mb-6">
          <Mail className="w-3.5 h-3.5" />
          Newsletter
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          Stay ahead in AV production
        </h2>
        <p className="text-zinc-400 leading-relaxed mb-8 max-w-lg">
          Get weekly tips, tool updates, and deep-dive guides on streaming, broadcast, and AV engineering. Join 2,000+ professionals.
        </p>

        {submitted ? (
          <div className="flex items-center gap-3 text-emerald-400">
            <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
              <Check className="w-4 h-4" />
            </div>
            <span className="font-medium">You&apos;re on the list! Check your email to confirm.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md">
            <input
              type="email"
              placeholder="you@studio.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-zinc-600 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors"
            >
              Subscribe
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
