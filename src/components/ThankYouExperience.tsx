import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ArrowRight, ArrowUp, Send, Layers } from 'lucide-react';
import { personalData, socialLinks } from '../data/portfolioData';
import { useCursor } from '../context/CursorContext';
import { GithubIcon, LinkedinIcon, LeetCodeIcon } from './ui/Icons';

interface Particle {
  id: number;
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  color: string;
  speed: number;
  angle: number;
}

export const ThankYouExperience: React.FC = () => {
  const { setCursor, resetCursor } = useCursor();
  const containerRef = useRef<HTMLDivElement>(null);

  // Visibility state
  const [isInView, setIsInView] = useState(false);

  // Proximity & mouse tracking (-1 to 1)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cursorProximity, setCursorProximity] = useState(1); // 1 = far, 0 = at center

  // Special 2-second bloom animation trigger
  const [hasBloomed, setHasBloomed] = useState(false);
  const [isBlooming, setIsBlooming] = useState(false);

  // Word entrance states (sequential reveal)
  const [step1ThankYou, setStep1ThankYou] = useState(false);
  const [step2ForVisiting, setStep2ForVisiting] = useState(false);
  const [step3MyProfile, setStep3MyProfile] = useState(false);

  // Magnetic button state for desktop
  const [magneticConnect, setMagneticConnect] = useState({ x: 0, y: 0 });
  const [magneticWork, setMagneticWork] = useState({ x: 0, y: 0 });
  const [magneticTop, setMagneticTop] = useState({ x: 0, y: 0 });

  // Hovered social icon
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);

  // Generate lightweight floating particles around the text
  const initialParticles = useMemo<Particle[]>(() => {
    const colors = ['#1976D2', '#2F9FEF', '#66C7EA', '#78C8F5', '#B9E4FA'];
    const count = 26;
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * 2 * Math.PI;
      const radius = 140 + (i % 5) * 45;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      return {
        id: i,
        x,
        y,
        baseX: x,
        baseY: y,
        size: 2.5 + (i % 3) * 1.5,
        color: colors[i % colors.length],
        speed: 0.008 + (i % 4) * 0.004,
        angle,
      };
    });
  }, []);

  const [particles, setParticles] = useState<Particle[]>(initialParticles);

  // Intersection observer to trigger entrance when user scrolls into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.25 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Sequential word-by-word entrance when scrolled into view
  useEffect(() => {
    if (!isInView) return;

    const t1 = setTimeout(() => setStep1ThankYou(true), 250);
    const t2 = setTimeout(() => setStep2ForVisiting(true), 850);
    const t3 = setTimeout(() => setStep3MyProfile(true), 1500);

    // Special final animation after staying for ~2.2 seconds
    const tBloom = setTimeout(() => {
      if (!hasBloomed) {
        setIsBlooming(true);
        setHasBloomed(true);
        setTimeout(() => setIsBlooming(false), 1400);
      }
    }, 2400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(tBloom);
    };
  }, [isInView, hasBloomed]);

  // Mouse move and proximity tracking
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const relX = (e.clientX - centerX) / (rect.width / 2);
    const relY = (e.clientY - centerY) / (rect.height / 2);

    setMousePos({ x: relX, y: relY });

    // Distance from center
    const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);
    const maxDist = rect.width / 2;
    setCursorProximity(Math.min(Math.max(dist / maxDist, 0), 1));

    // Particle repulsion: particles deflect slightly from mouse
    const mouseLocalX = e.clientX - centerX;
    const mouseLocalY = e.clientY - centerY;

    setParticles((prev) =>
      prev.map((p) => {
        const dx = p.x - mouseLocalX;
        const dy = p.y - mouseLocalY;
        const distToMouse = Math.hypot(dx, dy);
        const repelRadius = 110;

        if (distToMouse < repelRadius && distToMouse > 0) {
          const force = (1 - distToMouse / repelRadius) * 22;
          return {
            ...p,
            x: p.baseX + (dx / distToMouse) * force,
            y: p.baseY + (dy / distToMouse) * force,
          };
        }
        return {
          ...p,
          x: p.baseX,
          y: p.baseY,
        };
      })
    );
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
    setCursorProximity(1);
    setParticles((prev) =>
      prev.map((p) => ({
        ...p,
        x: p.baseX,
        y: p.baseY,
      }))
    );
  };

  // Magnetic button helpers for desktop
  const handleButtonMagnetic = (
    e: React.MouseEvent<HTMLButtonElement>,
    setter: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>
  ) => {
    // Only on pointer-fine desktop
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * 0.25;
    const y = (e.clientY - (rect.top + rect.height / 2)) * 0.25;
    setter({ x, y });
  };

  const resetButtonMagnetic = (
    setter: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>
  ) => {
    setter({ x: 0, y: 0 });
  };

  // Scroll actions
  const scrollToContact = () => {
    const el = document.getElementById('contact') || document.getElementById('contact-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToProjects = () => {
    const el = document.getElementById('projects') || document.getElementById('projects-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Find social URLs
  const linkedin = socialLinks.find((s) => s.name === 'LinkedIn')?.url || 'https://linkedin.com/in/vaishnavi-kannur-bb510b301';
  const github = socialLinks.find((s) => s.name === 'GitHub')?.url || 'https://github.com/vaishnavi725';
  const leetcode = socialLinks.find((s) => s.name === 'LeetCode')?.url || 'https://leetcode.com/u/VAISH123';

  // Orbiting words around Vaishnavi's profile photo
  const ORBIT_KEYWORDS = [
    { text: 'AI', angle: 0 },
    { text: 'CLOUD', angle: 90 },
    { text: 'CODE', angle: 180 },
    { text: 'CREATE', angle: 270 },
  ];

  return (
    <section
      id="thank-you-experience"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        padding: '110px 24px 80px 24px',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #061525 0%, #0A243F 15%, #EAF6FF 45%, #F8FCFF 100%)',
        color: '#123B5D',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '92vh',
      }}
    >
      {/* ========================================================================= */}
      {/* 1. SOFT LIGHT BACKGROUND ACCENTS                                          */}
      {/* ========================================================================= */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          overflow: 'hidden',
          zIndex: 0,
        }}
      >
        {/* Soft interactive blue spotlight following cursor */}
        <div
          style={{
            position: 'absolute',
            width: '650px',
            height: '650px',
            borderRadius: '50%',
            backgroundColor: 'rgba(185, 228, 250, 0.55)',
            filter: 'blur(120px)',
            left: `calc(50% + ${mousePos.x * 140}px - 325px)`,
            top: `calc(50% + ${mousePos.y * 100}px - 325px)`,
            transition: 'transform 0.4s ease-out',
            opacity: 1.2 - cursorProximity * 0.4,
          }}
        />

        {/* Ambient Top Light Glow */}
        <div
          style={{
            position: 'absolute',
            top: '10%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80vw',
            height: '350px',
            borderRadius: '50%',
            backgroundColor: '#D9F0FF',
            filter: 'blur(130px)',
            opacity: 0.75,
          }}
        />
      </div>

      {/* ========================================================================= */}
      {/* 2. LARGE INTERACTIVE CIRCULAR ELEMENT WITH ROTATING RINGS                 */}
      {/* ========================================================================= */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 'clamp(380px, 60vw, 680px)',
          height: 'clamp(380px, 60vw, 680px)',
          transform: `translate(-50%, -50%) translate(${mousePos.x * 20}px, ${mousePos.y * 16}px) scale(${isBlooming ? 1.08 : 1})`,
          transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      >
        {/* Outer subtle halo circle */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '1.5px solid rgba(25, 118, 210, 0.18)',
            backgroundColor: 'rgba(255, 255, 255, 0.45)',
            boxShadow: isBlooming
              ? '0 0 70px rgba(47, 159, 239, 0.55), inset 0 0 40px rgba(47, 159, 239, 0.25)'
              : '0 15px 50px rgba(25, 118, 210, 0.12), inset 0 0 30px rgba(185, 228, 250, 0.3)',
            transition: 'box-shadow 0.6s ease',
          }}
        />

        {/* Rotating Dashed Ring 1 */}
        <div
          style={{
            position: 'absolute',
            inset: '30px',
            borderRadius: '50%',
            border: '2px dashed rgba(25, 118, 210, 0.35)',
            animation: 'orbitClockwise 38s linear infinite',
          }}
        />

        {/* Counter-Rotating Ring 2 */}
        <div
          style={{
            position: 'absolute',
            inset: '70px',
            borderRadius: '50%',
            border: '1px solid rgba(102, 199, 234, 0.45)',
            animation: 'orbitCounter 48s linear infinite',
          }}
        />

        {/* Inner glow disc that brightens as cursor nears */}
        <div
          style={{
            position: 'absolute',
            inset: '110px',
            borderRadius: '50%',
            backgroundColor: 'rgba(234, 246, 255, 0.65)',
            border: '1px solid rgba(185, 228, 250, 0.5)',
            boxShadow: 'inset 0 0 40px rgba(47, 159, 239, 0.15)',
            filter: `brightness(${Math.max(1, 1.4 - cursorProximity * 0.35)})`,
            transition: 'filter 0.3s ease',
          }}
        />
      </div>

      {/* ========================================================================= */}
      {/* 3. FLOATING THANK-YOU PARTICLES (Magnetic Cursor Reaction)                */}
      {/* ========================================================================= */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '1px',
          height: '1px',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      >
        {particles.map((p) => (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              width: `${p.size}px`,
              height: `${p.size}px`,
              borderRadius: '50%',
              backgroundColor: p.color,
              boxShadow: `0 0 8px ${p.color}`,
              transform: `translate(${p.x}px, ${p.y}px)`,
              transition: 'transform 0.25s ease-out',
              opacity: isBlooming ? 0.95 : 0.7,
            }}
          />
        ))}
      </div>

      {/* ========================================================================= */}
      {/* 4. MAIN INTERACTIVE CONTENT CARD                                          */}
      {/* ========================================================================= */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '820px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: '20px 16px',
        }}
      >
        {/* --- PROFILE AVATAR WITH ORBITING KEYWORDS --- */}
        <div
          style={{
            position: 'relative',
            width: '140px',
            height: '140px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px',
          }}
        >
          {/* Orbiting ring around avatar */}
          <div
            style={{
              position: 'absolute',
              width: '130px',
              height: '130px',
              borderRadius: '50%',
              border: '1.5px dashed rgba(25, 118, 210, 0.4)',
              animation: 'orbitClockwise 22s linear infinite',
            }}
          >
            {ORBIT_KEYWORDS.map((item) => {
              const rad = (item.angle * Math.PI) / 180;
              const x = Math.cos(rad) * 65;
              const y = Math.sin(rad) * 65;
              return (
                <span
                  key={item.text}
                  style={{
                    position: 'absolute',
                    top: `calc(50% + ${y}px - 10px)`,
                    left: `calc(50% + ${x}px - 16px)`,
                    fontSize: '9px',
                    fontFamily: "'Fira Code', monospace",
                    fontWeight: 800,
                    letterSpacing: '0.08em',
                    color: '#1976D2',
                    backgroundColor: '#FFFFFF',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    border: '1px solid #D9F0FF',
                    boxShadow: '0 2px 6px rgba(25, 118, 210, 0.1)',
                  }}
                >
                  {item.text}
                </span>
              );
            })}
          </div>

          {/* Central Profile Image Frame */}
          <div
            style={{
              position: 'relative',
              width: '76px',
              height: '76px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              border: '3px solid #1976D2',
              boxShadow: '0 8px 24px rgba(25, 118, 210, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '3px',
              animation: 'profileFloatGentle 4.5s ease-in-out infinite',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                overflow: 'hidden',
                backgroundColor: '#EAF6FF',
              }}
            >
              <img
                src={personalData.profileImage || '/assets/profile.jpg'}
                alt="Vaishnavi R Kannur"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>

        {/* --- SEQUENTIAL WORD-BY-WORD TITLE --- */}
        <div
          style={{
            perspective: '800px',
            transformStyle: 'preserve-3d',
            marginBottom: '18px',
          }}
        >
          {/* Word 1: THANK YOU */}
          <h2
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(2.5rem, 5.5vw, 4.4rem)',
              lineHeight: 1.08,
              letterSpacing: '-0.02em',
              color: '#123B5D',
              margin: '0 0 6px 0',
              opacity: step1ThankYou ? 1 : 0,
              transform: step1ThankYou
                ? 'translateY(0) scale(1) rotateX(0deg)'
                : 'translateY(35px) scale(0.85) rotateX(25deg)',
              filter: step1ThankYou ? 'blur(0)' : 'blur(8px)',
              transition: 'all 0.65s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            THANK YOU
          </h2>

          {/* Word 2: FOR VISITING */}
          <h3
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(1.8rem, 4vw, 3.2rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
              color: '#123B5D',
              margin: '0 0 6px 0',
              opacity: step2ForVisiting ? 1 : 0,
              transform: step2ForVisiting
                ? 'translateY(0) scale(1) rotateY(0deg)'
                : 'translateY(35px) scale(0.85) rotateY(-18deg)',
              filter: step2ForVisiting ? 'blur(0)' : 'blur(8px)',
              transition: 'all 0.65s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            FOR VISITING
          </h3>

          {/* Word 3: MY PROFILE */}
          <h3
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(2rem, 4.4vw, 3.6rem)',
              lineHeight: 1.1,
              letterSpacing: '0.02em',
              background: 'linear-gradient(90deg, #1976D2 0%, #2F9FEF 50%, #1976D2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: isBlooming
                ? 'drop-shadow(0 0 25px rgba(47, 159, 239, 0.7))'
                : 'drop-shadow(0 0 16px rgba(47, 159, 239, 0.35))',
              margin: '0 0 16px 0',
              opacity: step3MyProfile ? 1 : 0,
              transform: step3MyProfile
                ? 'translateY(0) scale(1) rotateX(0deg)'
                : 'translateY(35px) scale(0.85) rotateX(-20deg)',
              transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            MY PROFILE
          </h3>
        </div>

        {/* --- IDENTITY SUBTITLE --- */}
        <h4
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(1.2rem, 2.4vw, 1.6rem)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#123B5D',
            margin: '0 0 8px 0',
            opacity: step3MyProfile ? 1 : 0,
            transform: step3MyProfile ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease 0.2s',
          }}
        >
          {personalData.name}
        </h4>

        {/* --- INSPIRATIONAL QUOTE --- */}
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)',
            color: '#1976D2',
            fontWeight: 500,
            fontStyle: 'italic',
            letterSpacing: '0.02em',
            maxWidth: '520px',
            lineHeight: 1.6,
            margin: '0 0 32px 0',
            opacity: step3MyProfile ? 1 : 0,
            transform: step3MyProfile ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.6s ease 0.3s',
          }}
        >
          "Let's connect and create something meaningful."
        </p>

        {/* --- INTERACTIVE ACTION BUTTONS --- */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '14px',
            marginBottom: '40px',
          }}
        >
          {/* Button 1: [ LET'S CONNECT → ] */}
          <button
            onClick={scrollToContact}
            onMouseMove={(e) => handleButtonMagnetic(e, setMagneticConnect)}
            onMouseLeave={() => resetButtonMagnetic(setMagneticConnect)}
            onMouseEnter={() => setCursor('CONNECT', 'button')}
            style={{
              padding: '14px 28px',
              borderRadius: '9999px',
              background: 'linear-gradient(90deg, #1976D2 0%, #2F9FEF 100%)',
              color: '#FFFFFF',
              fontFamily: "'Fira Code', monospace",
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              border: 'none',
              boxShadow: '0 6px 22px rgba(25, 118, 210, 0.32)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              transform: `translate(${magneticConnect.x}px, ${magneticConnect.y}px)`,
              transition: 'transform 0.15s ease-out, box-shadow 0.25s ease',
            }}
          >
            <Send style={{ width: '15px', height: '15px' }} />
            <span>LET'S CONNECT</span>
            <ArrowRight style={{ width: '15px', height: '15px' }} />
          </button>

          {/* Button 2: [ VIEW MY WORK → ] */}
          <button
            onClick={scrollToProjects}
            onMouseMove={(e) => handleButtonMagnetic(e, setMagneticWork)}
            onMouseLeave={() => resetButtonMagnetic(setMagneticWork)}
            onMouseEnter={() => setCursor('PROJECTS', 'button')}
            style={{
              padding: '13px 26px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              color: '#1976D2',
              border: '2px solid rgba(25, 118, 210, 0.6)',
              fontFamily: "'Fira Code', monospace",
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              boxShadow: '0 4px 14px rgba(25, 118, 210, 0.08)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              transform: `translate(${magneticWork.x}px, ${magneticWork.y}px)`,
              transition: 'transform 0.15s ease-out, background-color 0.2s ease, border-color 0.2s ease',
            }}
          >
            <Layers style={{ width: '15px', height: '15px' }} />
            <span>VIEW MY WORK</span>
            <ArrowRight style={{ width: '15px', height: '15px' }} />
          </button>

          {/* Button 3: [ BACK TO TOP ↑ ] */}
          <button
            onClick={scrollToTop}
            onMouseMove={(e) => handleButtonMagnetic(e, setMagneticTop)}
            onMouseLeave={() => resetButtonMagnetic(setMagneticTop)}
            onMouseEnter={() => setCursor('TOP', 'button')}
            style={{
              padding: '13px 22px',
              borderRadius: '9999px',
              backgroundColor: '#FFFFFF',
              color: '#123B5D',
              border: '1.5px solid #DCE8F0',
              fontFamily: "'Fira Code', monospace",
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              boxShadow: '0 3px 10px rgba(18, 59, 93, 0.06)',
              display: 'flex',
              alignItems: 'center',
              gap: '7px',
              cursor: 'pointer',
              transform: `translate(${magneticTop.x}px, ${magneticTop.y}px)`,
              transition: 'transform 0.15s ease-out, border-color 0.2s ease',
            }}
          >
            <span>BACK TO TOP</span>
            <ArrowUp style={{ width: '14px', height: '14px', color: '#1976D2' }} />
          </button>
        </div>

        {/* --- SOCIAL CONNECTION ICONS --- */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '18px',
          }}
        >
          {/* LinkedIn */}
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => {
              setHoveredSocial('LinkedIn');
              setCursor('LinkedIn', 'button');
            }}
            onMouseLeave={() => {
              setHoveredSocial(null);
              resetCursor();
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: hoveredSocial === 'LinkedIn' ? '10px 18px' : '10px',
              borderRadius: '9999px',
              backgroundColor: '#FFFFFF',
              border: '1.5px solid #B9E4FA',
              color: '#1976D2',
              boxShadow:
                hoveredSocial === 'LinkedIn'
                  ? '0 0 20px rgba(47, 159, 239, 0.5), 0 4px 14px rgba(25, 118, 210, 0.2)'
                  : '0 2px 8px rgba(25, 118, 210, 0.08)',
              transform: hoveredSocial === 'LinkedIn' ? 'scale(1.08)' : 'scale(1)',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
            title="Connect on LinkedIn"
          >
            <LinkedinIcon className="w-5 h-5 text-[#1976D2]" />
            {hoveredSocial === 'LinkedIn' && (
              <span
                style={{
                  fontFamily: "'Fira Code', monospace",
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#123B5D',
                }}
              >
                LinkedIn
              </span>
            )}
          </a>

          {/* GitHub */}
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => {
              setHoveredSocial('GitHub');
              setCursor('GitHub', 'button');
            }}
            onMouseLeave={() => {
              setHoveredSocial(null);
              resetCursor();
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: hoveredSocial === 'GitHub' ? '10px 18px' : '10px',
              borderRadius: '9999px',
              backgroundColor: '#FFFFFF',
              border: '1.5px solid #B9E4FA',
              color: '#123B5D',
              boxShadow:
                hoveredSocial === 'GitHub'
                  ? '0 0 20px rgba(47, 159, 239, 0.5), 0 4px 14px rgba(25, 118, 210, 0.2)'
                  : '0 2px 8px rgba(25, 118, 210, 0.08)',
              transform: hoveredSocial === 'GitHub' ? 'scale(1.08)' : 'scale(1)',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
            title="Explore GitHub Repositories"
          >
            <GithubIcon className="w-5 h-5 text-[#123B5D]" />
            {hoveredSocial === 'GitHub' && (
              <span
                style={{
                  fontFamily: "'Fira Code', monospace",
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#123B5D',
                }}
              >
                GitHub
              </span>
            )}
          </a>

          {/* LeetCode */}
          <a
            href={leetcode}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => {
              setHoveredSocial('LeetCode');
              setCursor('LeetCode', 'button');
            }}
            onMouseLeave={() => {
              setHoveredSocial(null);
              resetCursor();
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: hoveredSocial === 'LeetCode' ? '10px 18px' : '10px',
              borderRadius: '9999px',
              backgroundColor: '#FFFFFF',
              border: '1.5px solid #B9E4FA',
              color: '#1976D2',
              boxShadow:
                hoveredSocial === 'LeetCode'
                  ? '0 0 20px rgba(47, 159, 239, 0.5), 0 4px 14px rgba(25, 118, 210, 0.2)'
                  : '0 2px 8px rgba(25, 118, 210, 0.08)',
              transform: hoveredSocial === 'LeetCode' ? 'scale(1.08)' : 'scale(1)',
              transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
            title="View LeetCode Profile"
          >
            <LeetCodeIcon className="w-5 h-5 text-[#2F9FEF]" />
            {hoveredSocial === 'LeetCode' && (
              <span
                style={{
                  fontFamily: "'Fira Code', monospace",
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#123B5D',
                }}
              >
                LeetCode
              </span>
            )}
          </a>
        </div>
      </div>
    </section>
  );
};
