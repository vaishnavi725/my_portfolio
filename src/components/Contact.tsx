import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2, Copy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { personalData, socialLinks } from '../data/portfolioData';
import { useCursor } from '../context/CursorContext';
import { GithubIcon, LinkedinIcon, LeetCodeIcon } from './ui/Icons';
import { RotatingSectionBadge } from './ui/RotatingSectionBadge';
import { MagneticButton } from './ui/MagneticButton';

export const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const { setCursor, resetCursor } = useCursor();

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalData.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    try {
      confetti({
        particleCount: 85,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#8CC9E8', '#65BBD8', '#A88FB5', '#C9A85E', '#F8F5F2'],
      });
    } catch {
      // Fallback safe
    }

    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background Circular Rotating Section Badge */}
      <div className="absolute top-8 right-6 lg:right-16 opacity-35 pointer-events-none hidden sm:block">
        <RotatingSectionBadge text="LET'S CONNECT • LET'S CONNECT • " size={150} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#24152A] border border-[#8CC9E8]/40 text-[#8CC9E8] text-xs font-mono mb-3"
          >
            <Mail className="w-3.5 h-3.5 text-[#8CC9E8]" />
            <span>GET IN TOUCH</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-white tracking-tight"
          >
            LET'S BUILD SOMETHING{' '}
            <span className="bg-gradient-to-r from-[#FFFFFF] via-[#8CC9E8] to-[#A88FB5] bg-clip-text text-transparent">
              MEANINGFUL.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#C8B8D2] text-sm sm:text-base max-w-2xl mt-4 leading-relaxed"
          >
            Looking forward to discussing software engineering roles, cloud &amp; AI opportunities, placements, or collaborative technology projects.
          </motion.p>
        </div>

        {/* Contact Split View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Contact Details & Badges */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl p-6 sm:p-8 border border-[#4B2855] shadow-[0_15px_40px_rgba(22,15,27,0.7)] bg-[#24152A]/85">
              <h3 className="text-xl font-bold font-display text-white mb-6 flex items-center gap-2">
                <span>Direct Reachout</span>
              </h3>

              <div className="space-y-4 mb-8">
                {/* Email Item with 1-click copy */}
                <div className="p-4 rounded-2xl bg-[#160F1B]/95 border border-[#4B2855] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="p-2.5 rounded-xl bg-[#4B2855] text-[#8CC9E8] shrink-0">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <div className="text-[10px] font-mono text-[#A88FB5] uppercase">
                        Email Address
                      </div>
                      <a
                        href={`mailto:${personalData.email}`}
                        className="text-xs sm:text-sm font-mono text-[#F8F5F2] hover:text-[#8CC9E8] transition-colors truncate block"
                      >
                        {personalData.email}
                      </a>
                    </div>
                  </div>

                  <button
                    onClick={handleCopyEmail}
                    onMouseEnter={() => setCursor('COPY', 'button')}
                    onMouseLeave={resetCursor}
                    className="p-2 rounded-xl bg-[#24152A] hover:bg-[#4B2855] text-[#C8B8D2] hover:text-[#8CC9E8] text-xs font-mono transition-all shrink-0 border border-[#4B2855] cursor-pointer"
                    title="Copy Email"
                  >
                    {copiedEmail ? (
                      <CheckCircle2 className="w-4 h-4 text-[#8CC9E8]" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Phone */}
                <div className="p-4 rounded-2xl bg-[#160F1B]/95 border border-[#4B2855] flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#4B2855] text-[#8CC9E8] shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-[#A88FB5] uppercase">
                      Phone Number
                    </div>
                    <div className="text-xs sm:text-sm font-mono text-[#F8F5F2]">
                      {personalData.phone}
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="p-4 rounded-2xl bg-[#160F1B]/95 border border-[#4B2855] flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#4B2855] text-[#8CC9E8] shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-[#A88FB5] uppercase">Location</div>
                    <div className="text-xs sm:text-sm font-mono text-[#F8F5F2]">
                      {personalData.location}
                    </div>
                  </div>
                </div>
              </div>

              {/* Verified Profiles */}
              <div>
                <h4 className="text-xs font-mono uppercase text-[#8CC9E8] font-bold mb-3">
                  ONLINE PROFILES &amp; SOCIALS:
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  {socialLinks.slice(0, 3).map((s) => (
                    <MagneticButton key={s.name}>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-xl bg-[#160F1B] border border-[#4B2855] hover:border-[#8CC9E8]/60 text-[#C8B8D2] hover:text-white flex flex-col items-center text-center gap-1 transition-all block w-full"
                      >
                        {s.name === 'GitHub' && <GithubIcon className="w-4 h-4 text-[#8CC9E8]" />}
                        {s.name === 'LinkedIn' && (
                          <LinkedinIcon className="w-4 h-4 text-[#A88FB5]" />
                        )}
                        {s.name === 'LeetCode' && (
                          <LeetCodeIcon className="w-4 h-4 text-[#C9A85E]" />
                        )}
                        <span className="text-[10px] font-mono font-medium">{s.name}</span>
                      </a>
                    </MagneticButton>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl p-6 sm:p-10 border border-[#4B2855] shadow-[0_15px_40px_rgba(22,15,27,0.7)] relative bg-[#24152A]/85">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center flex flex-col items-center"
                >
                  <div className="w-16 h-16 rounded-full bg-[#4B2855] border border-[#8CC9E8] text-[#8CC9E8] flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(140,201,232,0.5)]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold font-display text-white mb-2">
                    Message Dispatched!
                  </h3>
                  <p className="text-sm font-mono text-[#C8B8D2] max-w-md mb-6">
                    Thank you, {name}! Your message has been prepared. You can also connect with me directly at{' '}
                    <strong className="text-[#8CC9E8]">{personalData.email}</strong>.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setName('');
                      setEmail('');
                      setMessage('');
                    }}
                    className="px-5 py-2.5 rounded-full bg-[#160F1B] border border-[#4B2855] text-[#C8B8D2] hover:text-white font-mono text-xs transition-colors cursor-pointer"
                  >
                    Send Another Note
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-[#8CC9E8] font-bold mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g., Alex Johnson"
                        className="w-full px-4 py-3 rounded-xl bg-[#160F1B]/95 border border-[#4B2855] text-[#F8F5F2] text-xs font-mono placeholder:text-[#A88FB5]/60 focus:outline-none focus:border-[#8CC9E8] focus:ring-1 focus:ring-[#8CC9E8] transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-[#8CC9E8] font-bold mb-2">
                        Your Email
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="alex@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-[#160F1B]/95 border border-[#4B2855] text-[#F8F5F2] text-xs font-mono placeholder:text-[#A88FB5]/60 focus:outline-none focus:border-[#8CC9E8] focus:ring-1 focus:ring-[#8CC9E8] transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-[#8CC9E8] font-bold mb-2">
                      Message / Opportunity Scope
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Hi Vaishnavi, let's connect regarding engineering opportunities..."
                      className="w-full px-4 py-3 rounded-xl bg-[#160F1B]/95 border border-[#4B2855] text-[#F8F5F2] text-xs font-mono placeholder:text-[#A88FB5]/60 focus:outline-none focus:border-[#8CC9E8] focus:ring-1 focus:ring-[#8CC9E8] transition-all resize-none"
                    />
                  </div>

                  <MagneticButton className="w-full">
                    <button
                      type="submit"
                      className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#4B2855] via-[#6F4A78] via-[#8CC9E8] to-[#65BBD8] text-white font-mono text-xs font-bold tracking-wider uppercase shadow-[0_0_25px_rgba(140,201,232,0.4)] hover:shadow-[0_0_35px_rgba(140,201,232,0.6)] hover:scale-[1.01] transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Send Message &rarr;</span>
                      <Send className="w-4 h-4 text-white" />
                    </button>
                  </MagneticButton>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
