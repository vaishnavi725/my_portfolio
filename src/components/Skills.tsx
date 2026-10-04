import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Cloud, Sparkles, Database, Cpu, Search, CheckCircle2 } from 'lucide-react';
import { skillCategories } from '../data/portfolioData';
import { useCursor } from '../context/CursorContext';
import { RotatingSectionBadge } from './ui/RotatingSectionBadge';

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>(skillCategories[0].name);
  const [searchQuery, setSearchQuery] = useState('');
  const { setCursor, resetCursor } = useCursor();

  const getCategoryIcon = (name: string) => {
    switch (name) {
      case 'Programming':
        return <Terminal className="w-4 h-4 text-[#8CC9E8]" />;
      case 'Cloud & DevOps':
        return <Cloud className="w-4 h-4 text-[#8CC9E8]" />;
      case 'AI & Generative AI':
        return <Sparkles className="w-4 h-4 text-[#C9A85E]" />;
      case 'Platforms & Databases':
        return <Database className="w-4 h-4 text-[#A88FB5]" />;
      default:
        return <Cpu className="w-4 h-4 text-[#8CC9E8]" />;
    }
  };

  const activeCat = skillCategories.find((c) => c.name === selectedCategory) || skillCategories[0];

  const filteredSkills = searchQuery.trim()
    ? skillCategories
        .flatMap((c) => c.skills)
        .filter((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
    : activeCat.skills;

  return (
    <section id="skills" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background Circular Rotating Section Badge */}
      <div className="absolute top-8 right-6 lg:right-16 opacity-35 pointer-events-none hidden sm:block">
        <RotatingSectionBadge text="MY TECH STACK • MY TECH STACK • " size={150} />
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
            <Cpu className="w-3.5 h-3.5 text-[#8CC9E8]" />
            <span>TECHNICAL PROFICIENCY</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-white tracking-tight"
          >
            SKILL{' '}
            <span className="bg-gradient-to-r from-[#FFFFFF] via-[#8CC9E8] to-[#A88FB5] bg-clip-text text-transparent">
              UNIVERSE
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#C8B8D2] text-sm sm:text-base max-w-2xl mt-4 leading-relaxed"
          >
            Categorized technical stack based strictly on verified coursework, certifications, internships, and project implementations.
          </motion.p>
        </div>

        {/* Search Input Bar */}
        <div className="max-w-md mx-auto mb-10">
          <div className="relative">
            <Search className="w-4 h-4 text-[#8CC9E8] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search skill (e.g., Python, AWS, Salesforce, DSA)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-full bg-[#24152A] border border-[#4B2855] text-[#F8F5F2] text-xs font-mono placeholder:text-[#A88FB5]/60 focus:outline-none focus:border-[#8CC9E8] focus:ring-1 focus:ring-[#8CC9E8] transition-all shadow-inner"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        {!searchQuery && (
          <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3 mb-12">
            {skillCategories.map((cat) => {
              const isSelected = selectedCategory === cat.name;
              return (
                <button
                  key={cat.name}
                  onClick={() => setSelectedCategory(cat.name)}
                  onMouseEnter={() => setCursor(cat.name, 'button')}
                  onMouseLeave={resetCursor}
                  className={`px-4 sm:px-6 py-2.5 rounded-2xl text-xs font-mono font-medium tracking-wide transition-all duration-300 flex items-center gap-2 border cursor-pointer ${
                    isSelected
                      ? 'text-white border-[#8CC9E8]/60 bg-gradient-to-r from-[#4B2855] via-[#6F4A78] to-[#8CC9E8] shadow-[0_0_20px_rgba(140,201,232,0.4)]'
                      : 'bg-[#24152A] text-[#C8B8D2]/80 hover:text-white border-[#4B2855] hover:border-[#8CC9E8]/50'
                  }`}
                >
                  {getCategoryIcon(cat.name)}
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Display Grid of Skills */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={searchQuery ? 'search' : selectedCategory}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4"
            >
              {filteredSkills.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.03 }}
                  onMouseEnter={() => setCursor(skill, 'card')}
                  onMouseLeave={resetCursor}
                  className="rounded-2xl p-4 border border-[#4B2855] bg-[#24152A]/90 hover:border-[#8CC9E8]/60 transition-all duration-300 flex items-center gap-2.5 group shadow-sm hover:scale-105"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#8CC9E8] shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="text-xs sm:text-sm font-mono text-white font-medium">
                    {skill}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
