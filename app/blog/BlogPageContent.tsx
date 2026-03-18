'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Clock, Calendar } from 'lucide-react'
import CtaSection from '@/components/sections/CtaSection'

const featured = {
  emoji: '📋', title: 'The Ultimate Canadian Moving Checklist: 8 Weeks Out', excerpt: 'Everything you need to do, week by week, to ensure a completely stress-free move anywhere in Canada — from booking movers to utility transfers, address changes, and settling in.', category: 'Checklist', readTime: '8 min', date: 'Feb 2026', author: 'Alex Tremblay, CEO', gradient: 'from-navy-800 to-navy-600',
}

const posts = [
  { emoji: '💰', title: 'How to Save $500+ on Your Next Move in Canada', excerpt: 'Simple strategies — from moving mid-month to decluttering first — that slash your moving costs significantly without sacrificing quality.', category: 'Savings', readTime: '5 min', date: 'Jan 2026', gradient: 'from-amber-brand to-amber-dark' },
  { emoji: '🏙️', title: 'Toronto Elevator Bookings: What Nobody Tells You', excerpt: 'Condo elevator reservations, loading dock rules, and building permits — the hidden logistics of moving in Toronto, explained in detail.', category: 'City Guide', readTime: '6 min', date: 'Jan 2026', gradient: 'from-sky-brand to-navy-600' },
  { emoji: '📦', title: 'The Pro Packer\'s Guide: Pack Your Home in 3 Days', excerpt: 'Room-by-room packing strategies used by professional movers, with a printable checklist and materials list included.', category: 'Packing', readTime: '7 min', date: 'Dec 2025', gradient: 'from-green-700 to-green-600' },
  { emoji: '🛣️', title: 'The Complete Interprovincial Moving Guide', excerpt: 'Tax implications, health card transfers, licensing changes — everything you need for a smooth cross-province move in Canada.', category: 'Long-Distance', readTime: '9 min', date: 'Dec 2025', gradient: 'from-purple-700 to-purple-600' },
  { emoji: '🌁', title: 'Moving to Vancouver: Parking, Strata & Street Rules', excerpt: 'Vancouver has some of the most complex moving logistics in Canada. Here\'s everything you need to know before move day.', category: 'City Guide', readTime: '5 min', date: 'Nov 2025', gradient: 'from-navy-700 to-sky-brand' },
  { emoji: '🏢', title: 'How to Move Your Office Over a Weekend', excerpt: 'The step-by-step framework businesses use to relocate offices with zero downtime, full team buy-in, and no surprises.', category: 'Commercial', readTime: '6 min', date: 'Nov 2025', gradient: 'from-amber-dark to-navy-600' },
]

const quickTips = [
  { icon: '☀️', title: 'Start Early', tip: 'Aim to start loading before 8am. Traffic is lighter and your energy is at peak. Most moves run 2–3 hours longer than expected.' },
  { icon: '🏷️', title: 'Label Everything', tip: 'Label boxes on the sides, not the top. Use colour-coded tape per room. Include a contents list on each box.' },
  { icon: '💧', title: 'Keep Essentials Close', tip: 'Pack a "first night" bag with toiletries, chargers, snacks, a change of clothes, and important documents. Keep it with you.' },
  { icon: '📸', title: 'Photo Evidence', tip: 'Photograph your belongings before the move, especially electronics and furniture. Protect yourself against damage disputes.' },
]

export default function BlogPageContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative mesh-bg pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0 grid-pattern" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-amber-brand/15 border border-amber-brand/30 rounded-full px-4 py-1.5 mb-6">
            <span className="font-mono text-[0.68rem] font-medium text-amber-brand uppercase tracking-[2px]">📝 Moving Tips & Blog</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="font-display font-black text-white leading-tight mb-5" style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)' }}>
            Move Smarter with <span className="text-gradient italic">MOVEZY.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="font-body text-white/60 text-lg font-light max-w-xl mx-auto">
            Expert tips, city guides, and money-saving advice from the Canadian moving experts.
          </motion.p>
          <nav className="font-body text-sm text-white/40 mt-6">
            <Link href="/" className="hover:text-amber-brand transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-amber-brand">Blog</span>
          </nav>
        </div>
      </section>

      {/* Featured */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-0.5 bg-amber-brand" />
            <span className="font-mono text-[0.7rem] font-medium text-sky-brand uppercase tracking-[2px]">Featured Article</span>
          </div>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            whileHover={{ y: -3 }}
            className="grid grid-cols-1 lg:grid-cols-2 bg-navy-900 rounded-4xl overflow-hidden shadow-card-xl cursor-pointer group">
            <div className={`bg-gradient-to-br ${featured.gradient} flex items-center justify-center text-[8rem] min-h-[260px] relative`}>
              {featured.emoji}
              <div className="absolute inset-0 bg-navy-900 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            </div>
            <div className="p-10 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-[0.62rem] font-medium text-amber-brand bg-amber-brand/15 border border-amber-brand/25 px-2.5 py-1 rounded-lg uppercase tracking-wide">{featured.category}</span>
                <span className="font-mono text-[0.62rem] text-white/40 flex items-center gap-1"><Clock size={10} /> {featured.readTime}</span>
                <span className="font-mono text-[0.62rem] text-white/40 flex items-center gap-1"><Calendar size={10} /> {featured.date}</span>
              </div>
              <h2 className="font-display font-black text-white text-2xl leading-tight mb-4">{featured.title}</h2>
              <p className="font-body text-white/55 text-sm leading-relaxed font-light mb-6">{featured.excerpt}</p>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[0.7rem] text-white/40">By {featured.author}</span>
                <span className="flex items-center gap-2 font-body font-semibold text-amber-brand text-sm group-hover:gap-4 transition-all">
                  Read Article <ArrowRight size={14} />
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* All posts */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-0.5 bg-amber-brand" />
            <span className="font-mono text-[0.7rem] font-medium text-sky-brand uppercase tracking-[2px]">All Articles</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ y: -6, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
                className="bg-white rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow cursor-pointer group"
              >
                <div className={`bg-gradient-to-br ${p.gradient} h-48 flex items-center justify-center text-6xl relative`}>
                  {p.emoji}
                  <div className="absolute top-3 left-3 bg-white/20 backdrop-blur-sm text-white font-mono text-[0.6rem] font-bold uppercase tracking-wide px-2.5 py-1 rounded-lg border border-white/20">
                    {p.category}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex gap-3 mb-3 text-slate-400 font-mono text-[0.65rem]">
                    <span className="flex items-center gap-1"><Calendar size={10} /> {p.date}</span>
                    <span className="flex items-center gap-1"><Clock size={10} /> {p.readTime} read</span>
                  </div>
                  <h3 className="font-display font-bold text-navy-800 text-lg leading-tight mb-3 group-hover:text-amber-dark transition-colors">{p.title}</h3>
                  <p className="font-body text-slate-500 text-sm leading-relaxed font-light mb-4 line-clamp-3">{p.excerpt}</p>
                  <span className="flex items-center gap-2 font-body font-semibold text-sky-brand text-sm group-hover:gap-4 transition-all">
                    Read Article <ArrowRight size={13} />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Tips */}
      <section className="bg-navy-900 py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-amber-brand" />
              <span className="font-mono text-[0.7rem] font-medium text-amber-brand uppercase tracking-[2px]">Quick Tips</span>
              <div className="w-8 h-0.5 bg-amber-brand" />
            </div>
            <h2 className="font-display font-black text-white" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}>
              Move Day <span className="text-gradient italic">Survival Guide.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {quickTips.map((t, i) => (
              <motion.div key={t.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/8 rounded-3xl p-7 hover:bg-white/8 transition-colors">
                <div className="text-3xl mb-4">{t.icon}</div>
                <h4 className="font-display font-bold text-white text-lg mb-3">{t.title}</h4>
                <p className="font-body text-white/50 text-sm leading-relaxed font-light">{t.tip}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  )
}
