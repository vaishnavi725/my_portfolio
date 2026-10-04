import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderGit2, Eye, ChevronLeft, ChevronRight, LayoutGrid, Presentation } from 'lucide-react';
import { projectsData } from '../data/portfolioData';
import type { ProjectItem } from '../types/portfolio';
import { PayGuardVisual } from './PayGuardVisual';
import { SalesforceVisual } from './SalesforceVisual';
import { TravelPlannerVisual } from './TravelPlannerVisual';
import { SoilMoistureVisual } from './SoilMoistureVisual';
import { ProjectModal } from './ProjectModal';
import { useCursor } from '../context/CursorContext';
import { GithubIcon } from './ui/Icons';
import { RotatingSectionBadge } from './ui/RotatingSectionBadge';
import { MagneticButton } from './ui/MagneticButton';

const filterCategories = ['ALL', 'AI / ML', 'FULL STACK', 'SALESFORCE', 'IOT'] as const;

export const Projects: React.FC = () => {
  const [viewMode, setViewMode] = useState<'presentation' | 'grid'>('presentation');
  const [currentPanelIndex, setCurrentPanelIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<1 | -1>(1);
  const [activeFilter, setActiveFilter] = useState<string>('ALL');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const { setCursor, resetCursor } = useCursor();

  const filteredProjects = projectsData.filter((project) => {
    if (activeFilter === 'ALL') return true;
    return project.categoryTag === activeFilter;
  });

  const nextPanel = () => {
    setSlideDirection(1);
    setCurrentPanelIndex((prev) => (prev + 1) % projectsData.length);
  };

  const prevPanel = () => {
    setSlideDirection(-1);
    setCurrentPanelIndex((prev) => (prev - 1 + projectsData.length) % projectsData.length);
  };

  const currentProject = projectsData[currentPanelIndex];

  const renderProjectVisual = (type: string) => {
    switch (type) {
      case 'payguard':
        return <PayGuardVisual />;
      case 'salesforce':
        return <SalesforceVisual />;
      case 'travel':
        return <TravelPlannerVisual />;
      case 'iot':
        return <SoilMoistureVisual />;
      default:
        return null;
    }
  };

  return (
    <section id="projects" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background Circular Rotating Section Badge */}
      <div className="absolute top-12 right-6 lg:right-16 opacity-35 pointer-events-none hidden sm:block">
        <RotatingSectionBadge text="WHAT I BUILD • WHAT I BUILD • " size={150} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#24152A] border border-[#8CC9E8]/40 text-[#8CC9E8] text-xs font-mono mb-3"
          >
            <FolderGit2 className="w-3.5 h-3.5 text-[#8CC9E8]" />
            <span>ENGINEERING SHOWCASE</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-white tracking-tight"
          >
            FEATURED{' '}
            <span className="bg-gradient-to-r from-[#FFFFFF] via-[#8CC9E8] to-[#A88FB5] bg-clip-text text-transparent">
              PROJECTS
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#C8B8D2] text-sm sm:text-base max-w-2xl mt-4 leading-relaxed"
          >
            Explore real-world software systems spanning ML fraud detection, Salesforce CRM architecture, AI geospatial routing, and IoT telemetry.
          </motion.p>

          {/* Mode Switcher: Presentation Deck vs Grid */}
          <div className="mt-6 flex items-center gap-2 p-1 rounded-full bg-[#24152A] border border-[#4B2855]">
            <button
              onClick={() => setViewMode('presentation')}
              className={`px-4 py-1.5 rounded-full text-xs font-mono font-medium flex items-center gap-1.5 transition-all ${
                viewMode === 'presentation'
                  ? 'bg-gradient-to-r from-[#4B2855] to-[#8CC9E8] text-white shadow-[0_0_15px_rgba(140,201,232,0.4)]'
                  : 'text-[#C8B8D2] hover:text-white'
              }`}
            >
              <Presentation className="w-3.5 h-3.5" />
              <span>Storytelling Deck</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-4 py-1.5 rounded-full text-xs font-mono font-medium flex items-center gap-1.5 transition-all ${
                viewMode === 'grid'
                  ? 'bg-gradient-to-r from-[#4B2855] to-[#8CC9E8] text-white shadow-[0_0_15px_rgba(140,201,232,0.4)]'
                  : 'text-[#C8B8D2] hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Full Catalog</span>
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* PRESENTATION STORYTELLING PANEL MODE */}
        {/* ========================================================= */}
        {viewMode === 'presentation' && (
          <div className="relative">
            {/* Panel Step Header / Navigation Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-[#4B2855]">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-lg bg-[#4B2855]/70 border border-[#8CC9E8]/50 text-[#8CC9E8] font-mono text-xs font-bold tracking-wider">
                  PANEL 0{currentPanelIndex + 1} / 0{projectsData.length}
                </span>
                <span className="text-sm font-mono text-[#F8F5F2] font-semibold hidden sm:inline">
                  {currentProject.title}
                </span>
              </div>

              {/* Panel Jump Pills */}
              <div className="flex items-center gap-2">
                {projectsData.map((proj, idx) => (
                  <button
                    key={proj.id}
                    onClick={() => {
                      setSlideDirection(idx > currentPanelIndex ? 1 : -1);
                      setCurrentPanelIndex(idx);
                    }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentPanelIndex === idx
                        ? 'w-8 bg-[#8CC9E8] shadow-[0_0_10px_#8CC9E8]'
                        : 'w-2.5 bg-[#4B2855] hover:bg-[#A88FB5]'
                    }`}
                    aria-label={`Go to ${proj.title}`}
                  />
                ))}
              </div>

              {/* Next / Prev Navigation */}
              <div className="flex items-center gap-2">
                <MagneticButton>
                  <button
                    onClick={prevPanel}
                    className="p-2 rounded-full bg-[#24152A] border border-[#4B2855] text-[#C8B8D2] hover:text-white hover:border-[#8CC9E8] transition-all cursor-pointer"
                    aria-label="Previous Project"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                </MagneticButton>
                <MagneticButton>
                  <button
                    onClick={nextPanel}
                    className="p-2 rounded-full bg-[#24152A] border border-[#4B2855] text-[#C8B8D2] hover:text-white hover:border-[#8CC9E8] transition-all cursor-pointer"
                    aria-label="Next Project"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </MagneticButton>
              </div>
            </div>

            {/* 3D Rotating Slide Container */}
            <div style={{ perspective: 1200 }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentProject.id}
                  initial={{
                    opacity: 0,
                    x: slideDirection * 90,
                    rotateY: slideDirection * 15,
                    scale: 0.92,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    rotateY: 0,
                    scale: 1,
                    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
                  }}
                  exit={{
                    opacity: 0,
                    x: -slideDirection * 90,
                    rotateY: -slideDirection * 15,
                    scale: 0.92,
                    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                  }}
                  className="rounded-3xl p-6 sm:p-8 md:p-10 border border-[#8CC9E8]/40 bg-gradient-to-br from-[#24152A]/95 via-[#160F1B]/95 to-[#24152A]/95 shadow-[0_0_50px_rgba(140,201,232,0.15)] relative overflow-hidden"
                >
                  {/* Glowing Top Line */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#8CC9E8]/60 to-transparent" />

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    {/* Left Column: Project Details */}
                    <div className="lg:col-span-5 flex flex-col items-start text-left">
                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        {currentProject.isMajor && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4B2855] border border-[#8CC9E8] text-[#8CC9E8] text-xs font-mono font-bold shadow-[0_0_15px_rgba(140,201,232,0.4)]">
                            <span className="w-2 h-2 rounded-full bg-[#8CC9E8] animate-ping" />
                            CURRENT MAJOR PROJECT
                          </span>
                        )}
                        <span className="px-3 py-1 rounded-full bg-[#160F1B] border border-[#4B2855] text-[#C8B8D2] text-xs font-mono">
                          {currentProject.categoryTag}
                        </span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-display text-white mb-2">
                        {currentProject.title}
                      </h3>

                      {currentProject.subtitle && (
                        <p className="text-xs sm:text-sm font-mono text-[#8CC9E8] mb-4">
                          {currentProject.subtitle}
                        </p>
                      )}

                      <p className="text-[#F8F5F2]/90 text-xs sm:text-sm leading-relaxed mb-6">
                        {currentProject.summary}
                      </p>

                      {/* Key Stats */}
                      {currentProject.stats && (
                        <div className="grid grid-cols-2 gap-2.5 w-full mb-6">
                          {currentProject.stats.slice(0, 4).map((st, i) => (
                            <div
                              key={i}
                              className="p-2.5 rounded-xl bg-[#160F1B]/95 border border-[#4B2855]"
                            >
                              <div className="text-sm sm:text-base font-bold font-display text-white">
                                {st.value}
                              </div>
                              <div className="text-[10px] font-mono text-[#C8B8D2]">{st.label}</div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Tech Badges */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {currentProject.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-lg bg-[#24152A] border border-[#4B2855] text-[#C8B8D2] text-[11px] font-mono"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap items-center gap-3">
                        <MagneticButton>
                          <button
                            onClick={() => setSelectedProject(currentProject)}
                            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#4B2855] via-[#6F4A78] via-[#8CC9E8] to-[#65BBD8] text-white font-mono text-xs font-bold shadow-[0_0_20px_rgba(140,201,232,0.4)] hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5 text-white" />
                            <span>Explore Details &rarr;</span>
                          </button>
                        </MagneticButton>

                        {currentProject.githubUrl && (
                          <MagneticButton>
                            <a
                              href={currentProject.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2.5 rounded-full bg-[#160F1B] hover:bg-[#24152A] text-[#C8B8D2] hover:text-white border border-[#4B2855] hover:border-[#8CC9E8] font-mono text-xs transition-all flex items-center gap-1.5"
                            >
                              <GithubIcon className="w-3.5 h-3.5 text-[#8CC9E8]" />
                              <span>GitHub</span>
                            </a>
                          </MagneticButton>
                        )}
                      </div>
                    </div>

                    {/* Right Column: Custom Interactive Visualizer */}
                    <div className="lg:col-span-7">
                      {renderProjectVisual(currentProject.visualType)}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* GRID CATALOG MODE */}
        {/* ========================================================= */}
        {viewMode === 'grid' && (
          <div>
            {/* Filter Category Tabs */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
              {filterCategories.map((filter) => {
                const isSelected = activeFilter === filter;
                return (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    onMouseEnter={() => setCursor(filter, 'button')}
                    onMouseLeave={resetCursor}
                    className={`px-4 sm:px-6 py-2 rounded-full text-xs font-mono font-semibold tracking-wider transition-all duration-300 border ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#4B2855] via-[#8CC9E8] to-[#A88FB5] text-white border-[#8CC9E8]/60 shadow-[0_0_20px_rgba(140,201,232,0.4)]'
                        : 'bg-[#24152A] text-[#C8B8D2]/80 hover:text-white border-[#4B2855] hover:border-[#8CC9E8]/60'
                    }`}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>

            {/* Projects List */}
            <div className="space-y-12">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="rounded-3xl p-6 sm:p-8 md:p-10 border border-[#4B2855] bg-gradient-to-br from-[#24152A]/90 via-[#160F1B]/90 to-[#24152A]/90 shadow-[0_0_30px_rgba(140,201,232,0.1)] relative overflow-hidden"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-5 flex flex-col items-start text-left">
                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        <span className="px-3 py-1 rounded-full bg-[#160F1B] border border-[#4B2855] text-[#8CC9E8] text-xs font-mono">
                          {project.categoryTag}
                        </span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white mb-2">
                        {project.title}
                      </h3>
                      <p className="text-[#F8F5F2]/90 text-xs sm:text-sm leading-relaxed mb-6">
                        {project.summary}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {project.technologies.slice(0, 5).map((t) => (
                          <span
                            key={t}
                            className="px-2.5 py-1 rounded-lg bg-[#24152A] border border-[#4B2855] text-[#C8B8D2] text-[11px] font-mono"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="px-5 py-2.5 rounded-full bg-[#4B2855] hover:bg-[#6F4A78] text-white font-mono text-xs font-semibold border border-[#8CC9E8]/40 flex items-center gap-2"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#8CC9E8]" />
                        <span>View Project &rarr;</span>
                      </button>
                    </div>
                    <div className="lg:col-span-7">{renderProjectVisual(project.visualType)}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Project Details Modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
};
