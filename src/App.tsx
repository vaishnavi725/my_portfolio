import { useState } from 'react';
import { CursorProvider } from './context/CursorContext';
import { CustomCursor } from './components/CustomCursor';
import { InteractiveBackground } from './components/InteractiveBackground';
import { CinematicIntro } from './components/CinematicIntro';
import { SideScrollProgress } from './components/SideScrollProgress';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { TechUniverse } from './components/TechUniverse';
import { Achievements } from './components/Achievements';
import { Education } from './components/Education';
import { Certifications } from './components/Certifications';
import { LeetCodeSection } from './components/LeetCodeSection';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { Contact } from './components/Contact';
import { ThankYouExperience } from './components/ThankYouExperience';
import { Footer } from './components/Footer';
import { SectionTransition } from './components/ui/SectionTransition';

export function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <CursorProvider>
      {showIntro && <CinematicIntro onComplete={() => setShowIntro(false)} />}

      <div className="relative min-h-screen bg-[#061525] text-[#F8FCFF] font-sans selection:bg-[#2F9FEF]/30 selection:text-[#FFFFFF]">
        <CustomCursor />
        <InteractiveBackground />
        <SideScrollProgress />
        <Navbar />

        <main className="relative z-10 flex flex-col">
          {/* Hero Section */}
          <Hero />

          {/* Hero -> About: Circular rotation + scale */}
          <SectionTransition type="circular" id="about-section">
            <About />
          </SectionTransition>

          {/* About -> Experience: Horizontal slide + slight rotation */}
          <SectionTransition type="horizontal-rotate" id="experience-section">
            <Experience />
          </SectionTransition>

          {/* Experience -> Projects: 3D card rotation */}
          <SectionTransition type="3d-card" id="projects-section">
            <Projects />
          </SectionTransition>

          {/* Projects -> Skills: Vertical slide + perspective rotation */}
          <SectionTransition type="vertical-perspective" id="skills-section">
            <Skills />
            <TechUniverse />
          </SectionTransition>

          {/* Skills -> Achievements: Circular reveal */}
          <SectionTransition type="circular-reveal" id="achievements-section">
            <Achievements />
          </SectionTransition>

          {/* Achievements -> Education: Diagonal slide + rotation */}
          <SectionTransition type="diagonal-rotate" id="education-section">
            <Education />
          </SectionTransition>

          {/* Education -> Certifications: Flip-style transition */}
          <SectionTransition type="flip" id="certifications-section">
            <Certifications />
            <LeetCodeSection />
          </SectionTransition>

          {/* Certifications -> Terminal: Digital/scan transition */}
          <SectionTransition type="digital-scan" id="terminal-section">
            <InteractiveTerminal />
          </SectionTransition>

          {/* Terminal -> Contact: Smooth zoom-out + rotation */}
          <SectionTransition type="zoom-rotate" id="contact-section">
            <Contact />
          </SectionTransition>

          {/* Final Interactive Closing Section */}
          <ThankYouExperience />
        </main>

        <Footer />
      </div>
    </CursorProvider>
  );
}

export default App;
