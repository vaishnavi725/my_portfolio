import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  Sparkles,
  RotateCcw,
  ShieldCheck,
  AlertTriangle,
  ChevronRight,
  Zap,
} from 'lucide-react';

interface CinematicIntroProps {
  onComplete: () => void;
}

// Tech Skill Node Model inside Digital Brain Network
interface TechSkillNode {
  id: string;
  name: string;
  shortName: string;
  category: 'AI/ML' | 'PROGRAMMING' | 'FRONTEND/BACKEND' | 'DATABASE' | 'CLOUD/DEVOPS' | 'CRM';
  x: number;
  y: number;
  brainAnchor: { x: number; y: number };
  curvedControl: { x: number; y: number };
  revealOrder: number;
  badgeBg: string;
  badgeBorder: string;
  textColor: string;
  domain: string;
  tags: string[];
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onComplete }) => {
  // Outer Laptop Storyboard:
  // 'closed'        -> 0.0s - 0.4s: Stylized 3D laptop sits closed on desk
  // 'opening'       -> 0.4s - 2.0s: Lid smoothly opens upward, screen powers on with soft blue glow
  // 'screen_active' -> 2.0s+: Content animates inside the laptop screen
  const [stage, setStage] = useState<'closed' | 'opening' | 'screen_active'>('closed');

  // Replay key to force remounting of animations
  const [introReplayKey, setIntroReplayKey] = useState<number>(0);

  // Screen Scene State Machine:
  // 1. 'brain_forming'      (0.0s - 3.2s): glowing dot expands, blue particles, dual-hemisphere cyber brain draws
  // 2. 'brain_activating'   (3.2s - 4.8s): left/right hemispheres separate, glowing synaptic bridge activates with photons
  // 3. 'skills_connecting'  (4.8s - 12.0s): skills connect one by one out of brain (Python -> React -> ML -> AWS -> Salesforce -> others)
  // 4. 'network_converge'   (12.0s - 13.5s): entire network converges into central glowing circular nexus
  // 5. 'profile_reveal'     (13.5s - 18.5s): glowing circle opens, profile photo book-opens, 3 rings build, word-by-word reveal
  // 6. 'projects_showcase'  (18.5s+): featured project cards (PayGuard AI, Travel Planner, Salesforce CRM) with live interactive demo
  const [screenScene, setScreenScene] = useState<
    'brain_forming' | 'brain_activating' | 'skills_connecting' | 'network_converge' | 'profile_reveal' | 'projects_showcase'
  >('brain_forming');

  // How many skills are currently revealed (0 to 19)
  const [connectedSkillsCount, setConnectedSkillsCount] = useState<number>(0);

  // Hovered skill node for interactive tooltip and path highlight
  const [hoveredSkillId, setHoveredSkillId] = useState<string | null>(null);

  // Profile photo book-opened state (activates interactive 3D mouse tilt after opening)
  const [isBookOpened, setIsBookOpened] = useState<boolean>(false);

  // Subtle 3D mouse tilt interaction on photo after opening
  const [photoTilt, setPhotoTilt] = useState<{ rotateX: number; rotateY: number }>({ rotateX: 0, rotateY: 0 });

  // Interactive click ripples for profile photo
  const [profileRipples, setProfileRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  // Profile image error fallback
  const [imageError, setImageError] = useState(false);

  // Active Project Tab in Showcase
  const [activeProjectTab, setActiveProjectTab] = useState<'payguard' | 'travel' | 'salesforce'>('payguard');

  // Interactive state for PayGuard AI live simulator
  const [payguardAnomalous, setPayguardAnomalous] = useState<boolean>(false);
  const [payguardAnalyzing, setPayguardAnalyzing] = useState<boolean>(false);

  // Interactive state for Travel Planner stop selector
  const [selectedTravelStop, setSelectedTravelStop] = useState<number>(0);

  // Interactive state for Salesforce CRM relational node
  const [activeSalesforceNode, setActiveSalesforceNode] = useState<'candidate' | 'application' | 'position' | 'all'>('all');

  // Mouse tilt perspective (-1 to 1) for 3D laptop parallax
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Exiting transition zoom into main portfolio
  const [isExiting, setIsExiting] = useState(false);

  // Store timeouts for cancellation/replay
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearAllTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  // Mouse movement tracking for 3D laptop parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Storyboard execution: Closed Laptop -> Laptop Opens -> Screen Lights Up -> Sequential Cinematic Flow
  const startCinematicSequence = () => {
    clearAllTimers();
    setStage('closed');
    setScreenScene('brain_forming');
    setConnectedSkillsCount(0);
    setHoveredSkillId(null);
    setIsBookOpened(false);
    setPhotoTilt({ rotateX: 0, rotateY: 0 });
    setIntroReplayKey((prev) => prev + 1);

    // 0.4s: Laptop lid starts opening upward
    const t1 = setTimeout(() => {
      setStage('opening');
    }, 400);

    // 2.0s: Screen turns on with radiant blue glow & brain begins forming
    const t2 = setTimeout(() => {
      setStage('screen_active');
      setScreenScene('brain_forming');
    }, 2000);

    // 4.6s (2.6s after screen on): Brain wakes up and activates (two halves separate)
    const t3 = setTimeout(() => {
      setScreenScene('brain_activating');
    }, 4600);

    // 6.2s (4.2s after screen on): Skills start connecting out of the brain one by one
    const t4 = setTimeout(() => {
      setScreenScene('skills_connecting');
      // Sequential reveal of 19 skills:
      // Python (1) -> React (2) -> ML (3) -> AWS (4) -> Salesforce (5) -> Deep Learning (6) -> GenAI (7) -> others
      const skillDelays = [
        300,   // 1: Python
        800,   // 2: React
        1300,  // 3: Machine Learning
        1800,  // 4: AWS
        2300,  // 5: Salesforce
        2800,  // 6: Deep Learning
        3300,  // 7: Generative AI
        3700,  // 8: C++
        4100,  // 9: Java
        4500,  // 10: JavaScript
        4900,  // 11: Node.js
        5300,  // 12: Flask
        5700,  // 13: FastAPI
        6100,  // 14: MySQL
        6500,  // 15: MongoDB
        6900,  // 16: Google Cloud
        7300,  // 17: Firebase
        7700,  // 18: Docker
        8100,  // 19: Git & GitHub
      ];

      skillDelays.forEach((delay, idx) => {
        const sTimer = setTimeout(() => {
          setConnectedSkillsCount(idx + 1);
        }, delay);
        timersRef.current.push(sTimer);
      });
    }, 6200);

    // 15.0s: Network converges toward the center
    const t5 = setTimeout(() => {
      setScreenScene('network_converge');
    }, 15200);

    // 16.5s: Profile Photo book-opens & rings form
    const t6 = setTimeout(() => {
      setScreenScene('profile_reveal');
      const photoTimer = setTimeout(() => {
        setIsBookOpened(true);
      }, 1200);
      timersRef.current.push(photoTimer);
    }, 16500);

    // 23.0s: Automatic transition into Featured Projects showcase (or user can click earlier)
    const t7 = setTimeout(() => {
      setScreenScene('projects_showcase');
    }, 23500);

    timersRef.current.push(t1, t2, t3, t4, t5, t6, t7);
  };

  // Run on mount
  useEffect(() => {
    startCinematicSequence();
    return clearAllTimers;
  }, []);

  // Replay animation: reset to closed laptop and play complete sequence again
  const handleReplay = () => {
    startCinematicSequence();
  };

  // Direct manual jump to specific chapter inside the laptop screen
  const jumpToScene = (
    target: 'brain_forming' | 'skills_connecting' | 'profile_reveal' | 'projects_showcase'
  ) => {
    clearAllTimers();
    if (stage === 'closed' || stage === 'opening') {
      setStage('screen_active');
    }
    setScreenScene(target);
    if (target === 'skills_connecting') {
      setConnectedSkillsCount(19);
    }
    if (target === 'profile_reveal') {
      setIsBookOpened(true);
    }
  };

  // Profile photo interactive mouse tilt
  const handlePhotoMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isBookOpened) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(-1, Math.min(1, ((e.clientX - rect.left) / rect.width - 0.5) * 2));
    const y = Math.max(-1, Math.min(1, ((e.clientY - rect.top) / rect.height - 0.5) * 2));
    setPhotoTilt({
      rotateY: x * 3,
      rotateX: -y * 2,
    });
  };

  const handlePhotoMouseLeave = () => {
    setPhotoTilt({ rotateX: 0, rotateY: 0 });
  };

  const handleProfileClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newRipple = { id: Date.now(), x, y };
    setProfileRipples((prev) => [...prev.slice(-3), newRipple]);
    setTimeout(() => {
      setProfileRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 750);
  };

  // Enter main portfolio with smooth zoom-through transition
  const handleEnterPortfolio = () => {
    if (isExiting) return;
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 550);
  };

  // Trigger PayGuard simulation
  const handleSimulatePayguard = (anomalous: boolean) => {
    if (payguardAnalyzing) return;
    setPayguardAnalyzing(true);
    setTimeout(() => {
      setPayguardAnomalous(anomalous);
      setPayguardAnalyzing(false);
    }, 600);
  };

  // =========================================================================
  // ALL 19 CORE SKILLS WITH CATEGORIZED POSITIONING (SVG ViewBox 800 x 500)
  // Categories:
  // TOP: AI / ML (Machine Learning, Deep Learning, Generative AI)
  // LEFT: PROGRAMMING (Python, C++, Java, JavaScript)
  // RIGHT: FRONTEND / BACKEND (React, Node.js, Flask, FastAPI)
  // BOTTOM-LEFT: DATABASE (MySQL, MongoDB)
  // BOTTOM-RIGHT: CLOUD / DEVOPS (AWS, Google Cloud, Firebase, Docker)
  // ONE SIDE: CRM (Salesforce)
  // SPECIAL: Git & GitHub
  // =========================================================================
  const skillsData: TechSkillNode[] = [
    // 1. Python (Order 1 - Left)
    {
      id: 'python',
      name: 'Python',
      shortName: 'Python',
      category: 'PROGRAMMING',
      x: 180,
      y: 155,
      brainAnchor: { x: 335, y: 200 },
      curvedControl: { x: 245, y: 165 },
      revealOrder: 1,
      badgeBg: 'rgba(255, 255, 255, 0.95)',
      badgeBorder: '#3776AB',
      textColor: '#123B5D',
      domain: 'Programming & Backend',
      tags: ['Data Processing', 'AI / ML', 'Backend APIs'],
    },
    // 2. React (Order 2 - Right)
    {
      id: 'react',
      name: 'React',
      shortName: 'React',
      category: 'FRONTEND/BACKEND',
      x: 620,
      y: 155,
      brainAnchor: { x: 465, y: 200 },
      curvedControl: { x: 555, y: 165 },
      revealOrder: 2,
      badgeBg: 'rgba(255, 255, 255, 0.95)',
      badgeBorder: '#00B4D8',
      textColor: '#123B5D',
      domain: 'Frontend UI',
      tags: ['Component Architecture', 'Hooks', 'Virtual DOM'],
    },
    // 3. Machine Learning (Order 3 - Top)
    {
      id: 'ml',
      name: 'Machine Learning',
      shortName: 'ML',
      category: 'AI/ML',
      x: 300,
      y: 75,
      brainAnchor: { x: 365, y: 175 },
      curvedControl: { x: 320, y: 120 },
      revealOrder: 3,
      badgeBg: 'rgba(255, 255, 255, 0.95)',
      badgeBorder: '#1976D2',
      textColor: '#123B5D',
      domain: 'AI & Data Science',
      tags: ['Scikit-learn', 'Classification', 'Anomaly Detection'],
    },
    // 4. AWS (Order 4 - Bottom Right)
    {
      id: 'aws',
      name: 'AWS',
      shortName: 'AWS',
      category: 'CLOUD/DEVOPS',
      x: 460,
      y: 440,
      brainAnchor: { x: 430, y: 310 },
      curvedControl: { x: 450, y: 380 },
      revealOrder: 4,
      badgeBg: 'rgba(255, 255, 255, 0.95)',
      badgeBorder: '#FF9900',
      textColor: '#123B5D',
      domain: 'Cloud Infrastructure',
      tags: ['Serverless', 'Lambda', 'S3 & IAM'],
    },
    // 5. Salesforce (Order 5 - Side)
    {
      id: 'salesforce',
      name: 'Salesforce',
      shortName: 'Salesforce',
      category: 'CRM',
      x: 230,
      y: 260,
      brainAnchor: { x: 330, y: 245 },
      curvedControl: { x: 275, y: 250 },
      revealOrder: 5,
      badgeBg: 'rgba(255, 255, 255, 0.95)',
      badgeBorder: '#00A1E0',
      textColor: '#123B5D',
      domain: 'Enterprise CRM',
      tags: ['Flow Builder', 'Custom Objects', 'SOQL Queries'],
    },
    // 6. Deep Learning (Order 6 - Top)
    {
      id: 'dl',
      name: 'Deep Learning',
      shortName: 'Deep Learning',
      category: 'AI/ML',
      x: 400,
      y: 55,
      brainAnchor: { x: 400, y: 170 },
      curvedControl: { x: 400, y: 110 },
      revealOrder: 6,
      badgeBg: 'rgba(255, 255, 255, 0.95)',
      badgeBorder: '#2F9FEF',
      textColor: '#123B5D',
      domain: 'AI & Neural Systems',
      tags: ['PyTorch', 'CNNs & Embeddings', 'Pattern Recognition'],
    },
    // 7. Generative AI (Order 7 - Top)
    {
      id: 'genai',
      name: 'Generative AI',
      shortName: 'Gen AI',
      category: 'AI/ML',
      x: 500,
      y: 75,
      brainAnchor: { x: 435, y: 175 },
      curvedControl: { x: 480, y: 120 },
      revealOrder: 7,
      badgeBg: 'rgba(255, 255, 255, 0.95)',
      badgeBorder: '#66C7EA',
      textColor: '#123B5D',
      domain: 'Modern AI',
      tags: ['LLM Orchestration', 'Prompt Engineering', 'AI Agents'],
    },
    // 8. C++ (Order 8 - Left)
    {
      id: 'cpp',
      name: 'C++',
      shortName: 'C++',
      category: 'PROGRAMMING',
      x: 100,
      y: 220,
      brainAnchor: { x: 325, y: 220 },
      curvedControl: { x: 200, y: 220 },
      revealOrder: 8,
      badgeBg: 'rgba(255, 255, 255, 0.95)',
      badgeBorder: '#00599C',
      textColor: '#123B5D',
      domain: 'Core Programming',
      tags: ['Algorithms', 'OOP', 'Data Structures (248+ LeetCode)'],
    },
    // 9. Java (Order 9 - Left)
    {
      id: 'java',
      name: 'Java',
      shortName: 'Java',
      category: 'PROGRAMMING',
      x: 110,
      y: 300,
      brainAnchor: { x: 330, y: 260 },
      curvedControl: { x: 200, y: 285 },
      revealOrder: 9,
      badgeBg: 'rgba(255, 255, 255, 0.95)',
      badgeBorder: '#E76F00',
      textColor: '#123B5D',
      domain: 'Core Programming',
      tags: ['OOP Architecture', 'Java Fundamentals', 'Enterprise Code'],
    },
    // 10. JavaScript (Order 10 - Left)
    {
      id: 'js',
      name: 'JavaScript',
      shortName: 'JS',
      category: 'PROGRAMMING',
      x: 185,
      y: 375,
      brainAnchor: { x: 340, y: 290 },
      curvedControl: { x: 250, y: 345 },
      revealOrder: 10,
      badgeBg: 'rgba(255, 255, 255, 0.95)',
      badgeBorder: '#D4AC0D',
      textColor: '#123B5D',
      domain: 'Web Technologies',
      tags: ['ES6+', 'Async / Await', 'DOM Manipulation'],
    },
    // 11. Node.js (Order 11 - Right)
    {
      id: 'nodejs',
      name: 'Node.js',
      shortName: 'Node.js',
      category: 'FRONTEND/BACKEND',
      x: 700,
      y: 220,
      brainAnchor: { x: 475, y: 220 },
      curvedControl: { x: 600, y: 220 },
      revealOrder: 11,
      badgeBg: 'rgba(255, 255, 255, 0.95)',
      badgeBorder: '#339933',
      textColor: '#123B5D',
      domain: 'Backend Runtime',
      tags: ['Event-Driven I/O', 'REST APIs', 'Server Logic'],
    },
    // 12. Flask (Order 12 - Right)
    {
      id: 'flask',
      name: 'Flask',
      shortName: 'Flask',
      category: 'FRONTEND/BACKEND',
      x: 690,
      y: 300,
      brainAnchor: { x: 470, y: 260 },
      curvedControl: { x: 600, y: 285 },
      revealOrder: 12,
      badgeBg: 'rgba(255, 255, 255, 0.95)',
      badgeBorder: '#1976D2',
      textColor: '#123B5D',
      domain: 'Python Backend',
      tags: ['Microframework', 'Lightweight APIs', 'Model Serving'],
    },
    // 13. FastAPI (Order 13 - Right)
    {
      id: 'fastapi',
      name: 'FastAPI',
      shortName: 'FastAPI',
      category: 'FRONTEND/BACKEND',
      x: 620,
      y: 375,
      brainAnchor: { x: 460, y: 290 },
      curvedControl: { x: 550, y: 345 },
      revealOrder: 13,
      badgeBg: 'rgba(255, 255, 255, 0.95)',
      badgeBorder: '#009688',
      textColor: '#123B5D',
      domain: 'Async Python Backend',
      tags: ['Pydantic Validation', 'OpenAPI Specs', 'High Concurrency'],
    },
    // 14. MySQL (Order 14 - Bottom Left)
    {
      id: 'mysql',
      name: 'MySQL',
      shortName: 'MySQL',
      category: 'DATABASE',
      x: 265,
      y: 435,
      brainAnchor: { x: 350, y: 305 },
      curvedControl: { x: 295, y: 380 },
      revealOrder: 14,
      badgeBg: 'rgba(255, 255, 255, 0.95)',
      badgeBorder: '#00758F',
      textColor: '#123B5D',
      domain: 'Relational Database',
      tags: ['ACID Compliance', 'Relational Joins', 'Indexed Queries'],
    },
    // 15. MongoDB (Order 15 - Bottom Left)
    {
      id: 'mongodb',
      name: 'MongoDB',
      shortName: 'MongoDB',
      category: 'DATABASE',
      x: 345,
      y: 455,
      brainAnchor: { x: 370, y: 310 },
      curvedControl: { x: 350, y: 390 },
      revealOrder: 15,
      badgeBg: 'rgba(255, 255, 255, 0.95)',
      badgeBorder: '#47A248',
      textColor: '#123B5D',
      domain: 'NoSQL Database',
      tags: ['BSON Documents', 'Aggregation Pipelines', 'Dynamic Schema'],
    },
    // 16. Google Cloud (Order 16 - Bottom Right)
    {
      id: 'gcp',
      name: 'Google Cloud',
      shortName: 'GCP',
      category: 'CLOUD/DEVOPS',
      x: 535,
      y: 435,
      brainAnchor: { x: 450, y: 305 },
      curvedControl: { x: 505, y: 380 },
      revealOrder: 16,
      badgeBg: 'rgba(255, 255, 255, 0.95)',
      badgeBorder: '#4285F4',
      textColor: '#123B5D',
      domain: 'Cloud Services',
      tags: ['Compute Engine', 'Cloud Storage', 'Cloud Run'],
    },
    // 17. Firebase (Order 17 - Bottom Right)
    {
      id: 'firebase',
      name: 'Firebase',
      shortName: 'Firebase',
      category: 'CLOUD/DEVOPS',
      x: 605,
      y: 455,
      brainAnchor: { x: 465, y: 300 },
      curvedControl: { x: 550, y: 395 },
      revealOrder: 17,
      badgeBg: 'rgba(255, 255, 255, 0.95)',
      badgeBorder: '#FFA000',
      textColor: '#123B5D',
      domain: 'Cloud BaaS',
      tags: ['Firebase Auth', 'Firestore DB', 'Real-Time Sync'],
    },
    // 18. Docker (Order 18 - Bottom Right)
    {
      id: 'docker',
      name: 'Docker',
      shortName: 'Docker',
      category: 'CLOUD/DEVOPS',
      x: 710,
      y: 410,
      brainAnchor: { x: 475, y: 280 },
      curvedControl: { x: 615, y: 365 },
      revealOrder: 18,
      badgeBg: 'rgba(255, 255, 255, 0.95)',
      badgeBorder: '#2496ED',
      textColor: '#123B5D',
      domain: 'DevOps & Containers',
      tags: ['Containerization', 'Dockerfile', 'Microservices'],
    },
    // 19. Git & GitHub (Order 19 - Top Left)
    {
      id: 'github',
      name: 'Git & GitHub',
      shortName: 'GitHub',
      category: 'PROGRAMMING',
      x: 220,
      y: 85,
      brainAnchor: { x: 350, y: 185 },
      curvedControl: { x: 275, y: 125 },
      revealOrder: 19,
      badgeBg: 'rgba(255, 255, 255, 0.95)',
      badgeBorder: '#24292e',
      textColor: '#123B5D',
      domain: 'Version Control',
      tags: ['Branch Workflows', 'CI/CD Actions', 'Open Source'],
    },
  ];

  // Helper function to render authentic technology vector SVGs
  const renderSkillIcon = (id: string) => {
    switch (id) {
      case 'python':
        return (
          <svg viewBox="0 0 24 24" width="14" height="14">
            <path
              fill="#3776AB"
              d="M11.9 2c-3.1 0-5 .6-5 2.5v1.9h5v.6H4.7c-2 0-3.7 1.2-3.7 3.5 0 2.4 1.5 3.5 3.5 3.5h1.4v-2c0-1.8 1.5-3.3 3.3-3.3h5V6.8c0-2-1.9-4.8-6.3-4.8zm-1.8 1.4c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9z"
            />
            <path
              fill="#FFD43B"
              d="M12.1 22c3.1 0 5-.6 5-2.5v-1.9h-5v-.6h7.2c2 0 3.7-1.2 3.7-3.5 0-2.4-1.5-3.5-3.5-3.5h-1.4v2c0 1.8-1.5 3.3-3.3 3.3h-5v1.9c0 2 1.9 4.8 6.3 4.8zm1.8-1.4c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9z"
            />
          </svg>
        );
      case 'react':
        return (
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#00B4D8" strokeWidth="1.5">
            <circle cx="12" cy="12" r="2.2" fill="#00B4D8" />
            <ellipse cx="12" cy="12" rx="9" ry="3.5" />
            <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(60 12 12)" />
            <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(120 12 12)" />
          </svg>
        );
      case 'ml':
        return (
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#1976D2" strokeWidth="1.5">
            <circle cx="6" cy="6" r="2" fill="#1976D2" />
            <circle cx="18" cy="6" r="2" fill="#1976D2" />
            <circle cx="12" cy="12" r="2" fill="#2F9FEF" />
            <circle cx="6" cy="18" r="2" fill="#1976D2" />
            <circle cx="18" cy="18" r="2" fill="#1976D2" />
            <line x1="6" y1="6" x2="12" y2="12" stroke="#66C7EA" />
            <line x1="18" y1="6" x2="12" y2="12" stroke="#66C7EA" />
            <line x1="6" y1="18" x2="12" y2="12" stroke="#66C7EA" />
            <line x1="18" y1="18" x2="12" y2="12" stroke="#66C7EA" />
          </svg>
        );
      case 'dl':
        return (
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#2F9FEF" strokeWidth="1.4">
            <circle cx="5" cy="5" r="1.5" fill="#2F9FEF" />
            <circle cx="5" cy="12" r="1.5" fill="#2F9FEF" />
            <circle cx="5" cy="19" r="1.5" fill="#2F9FEF" />
            <circle cx="12" cy="8" r="1.5" fill="#66C7EA" />
            <circle cx="12" cy="16" r="1.5" fill="#66C7EA" />
            <circle cx="19" cy="12" r="1.5" fill="#1976D2" />
            <line x1="5" y1="5" x2="12" y2="8" stroke="currentColor" />
            <line x1="5" y1="12" x2="12" y2="8" stroke="currentColor" />
            <line x1="5" y1="12" x2="12" y2="16" stroke="currentColor" />
            <line x1="5" y1="19" x2="12" y2="16" stroke="currentColor" />
            <line x1="12" y1="8" x2="19" y2="12" stroke="currentColor" />
            <line x1="12" y1="16" x2="19" y2="12" stroke="currentColor" />
          </svg>
        );
      case 'genai':
        return (
          <svg viewBox="0 0 24 24" width="14" height="14" fill="#1976D2">
            <path d="M12 2L14.4 8.6L21 11L14.4 13.4L12 20L9.6 13.4L3 11L9.6 8.6L12 2Z" />
          </svg>
        );
      case 'aws':
        return (
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#FF9900" strokeWidth="1.6">
            <path d="M6 15c-2.2 0-4-1.8-4-4 0-2 1.5-3.6 3.5-3.9C6.2 4.3 8.8 2 12 2c3.5 0 6.3 2.6 6.8 6 .2 0 .5-.1.8-.1 2.5 0 4.4 2 4.4 4.5 0 2.5-2 4.5-4.5 4.5H6z" />
            <path d="M5 18c4 3 10 3 14 0" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M17 18l2 2" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        );
      case 'salesforce':
        return (
          <svg viewBox="0 0 24 24" width="14" height="14" fill="#00A1E0">
            <path d="M19.4 9.4c-.6-2.5-2.9-4.4-5.6-4.4-1.7 0-3.3.8-4.3 2.1-.7-.4-1.5-.7-2.3-.7-2.6 0-4.7 2.1-4.7 4.7 0 .5.1 1 .3 1.4-1.7.5-2.8 2.1-2.8 3.9 0 2.3 1.9 4.2 4.2 4.2h15.1c2.1 0 3.7-1.7 3.7-3.7 0-1.8-1.3-3.3-3-3.6-.1-1.6-.9-3-2.6-3.9z" />
          </svg>
        );
      case 'cpp':
        return (
          <span style={{ fontWeight: 900, fontSize: '10px', color: '#00599C', fontFamily: 'monospace' }}>
            C++
          </span>
        );
      case 'java':
        return (
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#E76F00" strokeWidth="1.6">
            <path d="M6 9h10v6c0 2.2-1.8 4-4 4H8c-2.2 0-4-1.8-4-4V9z" />
            <path d="M16 11h2a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2h-2" />
            <path d="M8 5c.5-1 1-1 1-2M12 5c.5-1 1-1 1-2M14 5c.5-1 1-1 1-2" strokeLinecap="round" />
          </svg>
        );
      case 'js':
        return (
          <div
            style={{
              width: '13px',
              height: '13px',
              backgroundColor: '#F7DF1E',
              color: '#000000',
              fontWeight: 900,
              fontSize: '8.5px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '2px',
            }}
          >
            JS
          </div>
        );
      case 'nodejs':
        return (
          <svg viewBox="0 0 24 24" width="14" height="14" fill="#339933">
            <path d="M12 2L3 7.2v9.6L12 22l9-5.2V7.2L12 2zm0 2.3l6.9 4v7.4L12 19.7l-6.9-4V8.3L12 4.3z" />
          </svg>
        );
      case 'flask':
        return (
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#1976D2" strokeWidth="1.6">
            <path d="M9 3h6v4l4.5 9c.8 1.6-.3 3.5-2.1 3.5H6.6c-1.8 0-2.9-1.9-2.1-3.5L9 7V3z" />
            <line x1="8" y1="3" x2="16" y2="3" />
            <circle cx="11" cy="15" r="1" fill="#2F9FEF" />
            <circle cx="14" cy="13" r="1" fill="#2F9FEF" />
          </svg>
        );
      case 'fastapi':
        return (
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#009688" strokeWidth="1.5" />
            <path d="M13 4L7 13h5l-1 7 7-10h-5l1-6z" fill="#009688" />
          </svg>
        );
      case 'mysql':
        return (
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#00758F" strokeWidth="1.6">
            <ellipse cx="12" cy="6" rx="8" ry="3" />
            <path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6" />
            <path d="M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
          </svg>
        );
      case 'mongodb':
        return (
          <svg viewBox="0 0 24 24" width="14" height="14" fill="#47A248">
            <path d="M12 2C11.5 5 8 9 8 13.5c0 3 2 5.5 4 6.5 2-1 4-3.5 4-6.5C16 9 12.5 5 12 2z" />
          </svg>
        );
      case 'gcp':
        return (
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#4285F4" strokeWidth="1.6">
            <path d="M18 10h-1.3A6 6 0 0 0 6 12a4 4 0 0 0 .5 8H18a5 5 0 0 0 0-10z" />
          </svg>
        );
      case 'firebase':
        return (
          <svg viewBox="0 0 24 24" width="14" height="14" fill="#FFA000">
            <path d="M5.5 18.5L8.2 3.8c.1-.5.7-.7 1-.3L12 7.5l2.8-4c.3-.4.9-.2 1 .3L18.5 18.5c.2 1-.5 1.8-1.5 1.8h-10c-1 0-1.7-.8-1.5-1.8z" />
          </svg>
        );
      case 'docker':
        return (
          <svg viewBox="0 0 24 24" width="14" height="14" fill="#2496ED">
            <rect x="3" y="10" width="3" height="3" />
            <rect x="7" y="10" width="3" height="3" />
            <rect x="11" y="10" width="3" height="3" />
            <rect x="7" y="6" width="3" height="3" />
            <path d="M22 13c-.4-.1-1.3-.2-2-.2-1.2 0-2.4.4-3.3 1.2-1.3-.2-3.7-.2-5.7.8H2c.5 3.3 3.3 6.2 7.5 6.2 6.5 0 11.2-3.8 12.5-8z" />
          </svg>
        );
      case 'github':
        return (
          <svg viewBox="0 0 24 24" width="14" height="14" fill="#24292e">
            <path
              fillRule="evenodd"
              d="M12 2C6.5 2 2 6.5 2 12c0 4.4 2.9 8.2 6.8 9.5.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.2-3.4-1.2-.5-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.2-.2-4.5-1.1-4.5-4.9 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.6 0 0 .8-.3 2.8 1 .8-.2 1.7-.3 2.5-.3.9 0 1.7.1 2.5.3 1.9-1.3 2.8-1 2.8-1 .6 1.4.2 2.4.1 2.6.6.7 1 1.6 1 2.7 0 3.8-2.3 4.7-4.6 4.9.4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5C19.1 20.2 22 16.4 22 12c0-5.5-4.5-10-10-10z"
            />
          </svg>
        );
      default:
        return <Zap style={{ width: '13px', height: '13px', color: '#1976D2' }} />;
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: '#F8FCFF',
        backgroundImage: 'radial-gradient(ellipse at 50% 30%, #FFFFFF 0%, #F0F8FF 50%, #E3F2FD 100%)',
        color: '#123B5D',
        overflowY: 'auto',
        overflowX: 'hidden',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s ease',
        opacity: isExiting ? 0 : 1,
        transform: isExiting ? 'scale(1.1) filter(blur(8px))' : 'scale(1)',
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
        <div
          style={{
            position: 'absolute',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            backgroundColor: 'rgba(185, 228, 250, 0.45)',
            filter: 'blur(110px)',
            left: `calc(50% + ${mousePos.x * 160}px - 300px)`,
            top: `calc(50% + ${mousePos.y * 120}px - 300px)`,
            transition: 'transform 0.4s ease-out',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '-10%',
            left: '-10%',
            width: '45vw',
            height: '45vw',
            borderRadius: '50%',
            backgroundColor: '#D9F0FF',
            filter: 'blur(120px)',
            opacity: 0.7,
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-10%',
            right: '-10%',
            width: '48vw',
            height: '48vw',
            borderRadius: '50%',
            backgroundColor: '#B9E4FA',
            filter: 'blur(130px)',
            opacity: 0.65,
          }}
        />
      </div>

      {/* ========================================================================= */}
      {/* 2. TOP HEADER: LOGO, STATUS & ACTIONS                                     */}
      {/* ========================================================================= */}
      <header
        style={{
          position: 'relative',
          zIndex: 150,
          width: '100%',
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '16px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Brand Monogram */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              backgroundColor: '#FFFFFF',
              border: '1.5px solid #B9E4FA',
              boxShadow: '0 4px 14px rgba(25, 118, 210, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 900,
              fontSize: '15px',
              color: '#1976D2',
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            VK
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
            <span
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 800,
                fontSize: '14px',
                letterSpacing: '0.06em',
                color: '#123B5D',
              }}
            >
              VAISHNAVI R KANNUR
            </span>
            <span
              style={{
                fontFamily: "'Fira Code', monospace",
                fontSize: '10.5px',
                color: '#1976D2',
                fontWeight: 600,
              }}
            >
              {stage === 'closed'
                ? 'STANDBY • CLOSED LAPTOP'
                : stage === 'opening'
                ? 'OPENING LAPTOP LID...'
                : screenScene === 'brain_forming'
                ? 'DIGITAL BRAIN AWAKENING...'
                : screenScene === 'brain_activating'
                ? 'NEURAL HEMISPHERES CONNECTING...'
                : screenScene === 'skills_connecting'
                ? `SKILLS NETWORK ACTIVE (${connectedSkillsCount}/19 CONNECTED)`
                : screenScene === 'network_converge'
                ? 'CONVERGING KNOWLEDGE IDENTITY...'
                : screenScene === 'profile_reveal'
                ? 'WELCOME TO MY PROFILE'
                : 'FEATURED PROJECTS SHOWCASE'}
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={handleReplay}
            style={{
              padding: '7px 15px',
              borderRadius: '9999px',
              fontSize: '11px',
              fontFamily: "'Fira Code', monospace",
              fontWeight: 600,
              color: '#1976D2',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: '1px solid #B9E4FA',
              boxShadow: '0 2px 8px rgba(25, 118, 210, 0.08)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease',
            }}
            title="Replay cinematic entrance"
          >
            <RotateCcw style={{ width: '12px', height: '12px' }} />
            <span>REPLAY</span>
          </button>

          <button
            onClick={handleEnterPortfolio}
            style={{
              padding: '8px 20px',
              borderRadius: '9999px',
              fontSize: '12px',
              fontFamily: "'Fira Code', monospace",
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#FFFFFF',
              backgroundColor: '#1976D2',
              backgroundImage: 'linear-gradient(135deg, #1976D2 0%, #2F9FEF 100%)',
              border: '1px solid rgba(47, 159, 239, 0.4)',
              boxShadow: '0 4px 14px rgba(25, 118, 210, 0.25)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.04)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(25, 118, 210, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 14px rgba(25, 118, 210, 0.25)';
            }}
          >
            <Sparkles style={{ width: '14px', height: '14px' }} />
            <span>ENTER SITE &rarr;</span>
          </button>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 3. MAIN CINEMATIC EXPERIENCE: 3D LAPTOP IS THE MAIN OUTER OBJECT           */}
      {/* ========================================================================= */}
      <main
        style={{
          position: 'relative',
          zIndex: 100,
          width: '100%',
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '12px 24px',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          perspective: '1400px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transform: `rotateX(${mousePos.y * -3.5}deg) rotateY(${mousePos.x * 4.5}deg)`,
            transition: 'transform 0.25s ease-out',
            transformStyle: 'preserve-3d',
            position: 'relative',
            width: '100%',
            maxWidth: '780px',
          }}
        >
          {/* --- LAPTOP LID (SCREEN) --- */}
          <div
            style={{
              width: 'clamp(330px, 88vw, 780px)',
              height: 'clamp(300px, 56vw, 510px)',
              backgroundColor: '#FFFFFF',
              backgroundImage: 'linear-gradient(145deg, #FFFFFF 0%, #F5F9FD 50%, #DCE8F0 100%)',
              borderRadius: '16px 16px 4px 4px',
              border: '3px solid #DCE8F0',
              boxShadow:
                stage === 'closed'
                  ? '0 12px 30px rgba(18, 59, 93, 0.15)'
                  : '0 20px 55px rgba(25, 118, 210, 0.22), 0 0 35px rgba(47, 159, 239, 0.25)',
              padding: '12px 12px 16px 12px',
              display: 'flex',
              flexDirection: 'column',
              transformOrigin: 'bottom center',
              transform: stage === 'closed' ? 'rotateX(-78deg)' : 'rotateX(0deg)',
              transition: 'transform 1.8s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 1.5s ease',
              position: 'relative',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Webcam & Mic at Top Center */}
            <div
              style={{
                position: 'absolute',
                top: '5px',
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                zIndex: 35,
              }}
            >
              <div style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#1976D2' }} />
              <div style={{ width: '3px', height: '3px', borderRadius: '50%', backgroundColor: '#B9E4FA' }} />
            </div>

            {/* Inner Laptop Screen Surface */}
            <div
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '10px',
                backgroundColor: '#F8FCFF',
                backgroundImage: 'radial-gradient(circle at center, #FFFFFF 0%, #EAF6FF 70%, #D9F0FF 100%)',
                border: '1.5px solid #B9E4FA',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow:
                  stage === 'closed'
                    ? 'none'
                    : 'inset 0 0 40px rgba(47, 159, 239, 0.18), 0 0 25px rgba(47, 159, 239, 0.22)',
                filter: stage === 'closed' ? 'brightness(0.15)' : 'brightness(1)',
                transition: 'filter 1.2s ease-out, box-shadow 1.2s ease-out',
              }}
            >
              {/* Screen Glossy Diagonal Reflection */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '65%',
                  height: '100%',
                  background:
                    'linear-gradient(125deg, transparent 40%, rgba(255, 255, 255, 0.45) 50%, transparent 60%)',
                  pointerEvents: 'none',
                  zIndex: 40,
                }}
              />

              {/* =================================================================== */}
              {/* CONTENT ANIMATION INSIDE THE LAPTOP SCREEN                          */}
              {/* =================================================================== */}
              {stage !== 'closed' && (
                <div
                  key={`laptop-content-${introReplayKey}`}
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 10px',
                    zIndex: 20,
                    userSelect: 'none',
                  }}
                >
                  {/* --- TOP MICRO-BAR: CHAPTER CONTROLS & STATUS --- */}
                  <div
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '2px 8px',
                      zIndex: 35,
                      borderBottom: '1px solid rgba(185, 228, 250, 0.6)',
                      background: 'rgba(255, 255, 255, 0.75)',
                      backdropFilter: 'blur(8px)',
                      borderRadius: '6px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span
                        style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          backgroundColor: '#2F9FEF',
                          boxShadow: '0 0 8px #2F9FEF',
                          display: 'inline-block',
                        }}
                      />
                      <span
                        style={{
                          fontFamily: "'Fira Code', monospace",
                          fontSize: 'clamp(8px, 1.2vw, 10px)',
                          fontWeight: 700,
                          color: '#1976D2',
                          letterSpacing: '0.04em',
                        }}
                      >
                        NEURAL SYSTEM: ACTIVE
                      </span>
                    </div>

                    {/* Interactive Chapter Pills to navigate smoothly */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <button
                        onClick={() => jumpToScene('brain_forming')}
                        style={{
                          padding: '2px 7px',
                          borderRadius: '9999px',
                          fontSize: 'clamp(8px, 1.1vw, 9.5px)',
                          fontFamily: "'Fira Code', monospace",
                          fontWeight: 600,
                          border: '1px solid',
                          borderColor:
                            screenScene === 'brain_forming' || screenScene === 'brain_activating'
                              ? '#1976D2'
                              : 'transparent',
                          backgroundColor:
                            screenScene === 'brain_forming' || screenScene === 'brain_activating'
                              ? 'rgba(25, 118, 210, 0.12)'
                              : 'transparent',
                          color:
                            screenScene === 'brain_forming' || screenScene === 'brain_activating'
                              ? '#1976D2'
                              : '#607D8B',
                          cursor: 'pointer',
                        }}
                      >
                        🧠 Brain
                      </button>

                      <button
                        onClick={() => jumpToScene('skills_connecting')}
                        style={{
                          padding: '2px 7px',
                          borderRadius: '9999px',
                          fontSize: 'clamp(8px, 1.1vw, 9.5px)',
                          fontFamily: "'Fira Code', monospace",
                          fontWeight: 600,
                          border: '1px solid',
                          borderColor: screenScene === 'skills_connecting' ? '#1976D2' : 'transparent',
                          backgroundColor:
                            screenScene === 'skills_connecting' ? 'rgba(25, 118, 210, 0.12)' : 'transparent',
                          color: screenScene === 'skills_connecting' ? '#1976D2' : '#607D8B',
                          cursor: 'pointer',
                        }}
                      >
                        ⚡ Skills
                      </button>

                      <button
                        onClick={() => jumpToScene('profile_reveal')}
                        style={{
                          padding: '2px 7px',
                          borderRadius: '9999px',
                          fontSize: 'clamp(8px, 1.1vw, 9.5px)',
                          fontFamily: "'Fira Code', monospace",
                          fontWeight: 600,
                          border: '1px solid',
                          borderColor: screenScene === 'profile_reveal' ? '#1976D2' : 'transparent',
                          backgroundColor:
                            screenScene === 'profile_reveal' ? 'rgba(25, 118, 210, 0.12)' : 'transparent',
                          color: screenScene === 'profile_reveal' ? '#1976D2' : '#607D8B',
                          cursor: 'pointer',
                        }}
                      >
                        👤 Profile
                      </button>

                      <button
                        onClick={() => jumpToScene('projects_showcase')}
                        style={{
                          padding: '2px 7px',
                          borderRadius: '9999px',
                          fontSize: 'clamp(8px, 1.1vw, 9.5px)',
                          fontFamily: "'Fira Code', monospace",
                          fontWeight: 600,
                          border: '1px solid',
                          borderColor: screenScene === 'projects_showcase' ? '#1976D2' : 'transparent',
                          backgroundColor:
                            screenScene === 'projects_showcase' ? 'rgba(25, 118, 210, 0.12)' : 'transparent',
                          color: screenScene === 'projects_showcase' ? '#1976D2' : '#607D8B',
                          cursor: 'pointer',
                        }}
                      >
                        🚀 Projects
                      </button>
                    </div>
                  </div>

                  {/* =================================================================== */}
                  {/* SCENE A & B: DIGITAL BRAIN & NEURAL SKILLS NETWORK                  */}
                  {/* =================================================================== */}
                  {(screenScene === 'brain_forming' ||
                    screenScene === 'brain_activating' ||
                    screenScene === 'skills_connecting' ||
                    screenScene === 'network_converge') && (
                    <div
                      style={{
                        position: 'relative',
                        width: '100%',
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        animation: screenScene === 'network_converge' ? 'brainConvergeCenter 1.4s ease-in forwards' : undefined,
                      }}
                    >
                      {/* Interactive Canvas/SVG (800 x 500 space) */}
                      <svg
                        viewBox="0 0 800 500"
                        style={{
                          width: '100%',
                          height: '100%',
                          maxHeight: '430px',
                          overflow: 'visible',
                        }}
                      >
                        <defs>
                          {/* Radial Glow behind Brain */}
                          <radialGradient id="brainCoreGlow" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#2F9FEF" stopOpacity="0.45" />
                            <stop offset="60%" stopColor="#66C7EA" stopOpacity="0.18" />
                            <stop offset="100%" stopColor="#2F9FEF" stopOpacity="0" />
                          </radialGradient>

                          {/* Linear Gradient for Synaptic Bridges */}
                          <linearGradient id="synapticGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#1976D2" stopOpacity="0.8" />
                            <stop offset="50%" stopColor="#66C7EA" stopOpacity="1" />
                            <stop offset="100%" stopColor="#1976D2" stopOpacity="0.8" />
                          </linearGradient>

                          {/* Glow Filter */}
                          <filter id="cyanGlow" x="-30%" y="-30%" width="160%" height="160%">
                            <feGaussianBlur stdDeviation="4" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                          </filter>
                        </defs>

                        {/* Central Soft Ambient Glow */}
                        <circle cx="400" cy="245" r="160" fill="url(#brainCoreGlow)" pointerEvents="none" />

                        {/* --- 1. CONNECTING LINES FROM BRAIN TO SKILLS --- */}
                        {skillsData.map((skill) => {
                          const isRevealed =
                            screenScene === 'skills_connecting'
                              ? skill.revealOrder <= connectedSkillsCount
                              : screenScene === 'network_converge';
                          const isHovered = hoveredSkillId === skill.id;

                          if (!isRevealed) return null;

                          const pathD = `M ${skill.brainAnchor.x} ${skill.brainAnchor.y} Q ${skill.curvedControl.x} ${skill.curvedControl.y} ${skill.x} ${skill.y}`;

                          return (
                            <g key={`line-${skill.id}`}>
                              {/* Background subtle connecting line */}
                              <path
                                d={pathD}
                                fill="none"
                                stroke={isHovered ? '#1976D2' : '#66C7EA'}
                                strokeWidth={isHovered ? '2.5' : '1.3'}
                                strokeOpacity={isHovered ? 1 : 0.65}
                                strokeDasharray="3 3"
                                style={{ transition: 'stroke-width 0.2s, stroke-opacity 0.2s' }}
                              />

                              {/* Traveling Photon on Line */}
                              <circle
                                r={isHovered ? '4' : '2.8'}
                                fill="#2F9FEF"
                                filter="url(#cyanGlow)"
                              >
                                <animateMotion
                                  path={pathD}
                                  dur={isHovered ? '1.4s' : '3.2s'}
                                  repeatCount="indefinite"
                                />
                              </circle>
                            </g>
                          );
                        })}

                        {/* --- 2. DIGITAL BRAIN (DUAL HEMISPHERES) --- */}
                        <g id="digital-brain-group">
                          {/* LEFT HEMISPHERE */}
                          <g
                            style={{
                              transform:
                                screenScene === 'brain_activating' ||
                                screenScene === 'skills_connecting' ||
                                screenScene === 'network_converge'
                                  ? 'translateX(-15px)'
                                  : 'translateX(0)',
                              transition: 'transform 1.4s cubic-bezier(0.16, 1, 0.3, 1)',
                              transformOrigin: '400px 245px',
                            }}
                          >
                            {/* Left Outer Cortex Contour */}
                            <path
                              d="M 390 170 C 365 160, 335 172, 320 195 C 305 220, 310 250, 320 270 C 330 290, 350 310, 375 316 C 388 318, 395 308, 395 292 C 395 270, 390 250, 390 220 Z"
                              fill="rgba(47, 159, 239, 0.08)"
                              stroke="#1976D2"
                              strokeWidth="2.2"
                              strokeLinecap="round"
                              filter="url(#cyanGlow)"
                            />

                            {/* Left Internal Neural Folds */}
                            <path
                              d="M 335 195 C 345 205, 365 210, 385 205 M 325 240 C 345 245, 360 235, 388 245 M 335 275 C 350 280, 370 270, 392 280"
                              fill="none"
                              stroke="#2F9FEF"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                              strokeDasharray="4 2"
                            />

                            {/* Left Hemisphere Neural Nodes */}
                            {[
                              { cx: 335, cy: 195 },
                              { cx: 360, cy: 180 },
                              { cx: 325, cy: 235 },
                              { cx: 355, cy: 230 },
                              { cx: 385, cy: 215 },
                              { cx: 335, cy: 275 },
                              { cx: 365, cy: 270 },
                              { cx: 385, cy: 290 },
                            ].map((pt, i) => (
                              <circle
                                key={`l-node-${i}`}
                                cx={pt.cx}
                                cy={pt.cy}
                                r="3.2"
                                fill="#FFFFFF"
                                stroke="#1976D2"
                                strokeWidth="1.8"
                              >
                                <animate
                                  attributeName="r"
                                  values="2.8;4.2;2.8"
                                  dur={`${2 + (i % 3) * 0.5}s`}
                                  repeatCount="indefinite"
                                />
                              </circle>
                            ))}
                          </g>

                          {/* RIGHT HEMISPHERE */}
                          <g
                            style={{
                              transform:
                                screenScene === 'brain_activating' ||
                                screenScene === 'skills_connecting' ||
                                screenScene === 'network_converge'
                                  ? 'translateX(15px)'
                                  : 'translateX(0)',
                              transition: 'transform 1.4s cubic-bezier(0.16, 1, 0.3, 1)',
                              transformOrigin: '400px 245px',
                            }}
                          >
                            {/* Right Outer Cortex Contour */}
                            <path
                              d="M 410 170 C 435 160, 465 172, 480 195 C 495 220, 490 250, 480 270 C 470 290, 450 310, 425 316 C 412 318, 405 308, 405 292 C 405 270, 410 250, 410 220 Z"
                              fill="rgba(47, 159, 239, 0.08)"
                              stroke="#1976D2"
                              strokeWidth="2.2"
                              strokeLinecap="round"
                              filter="url(#cyanGlow)"
                            />

                            {/* Right Internal Neural Folds */}
                            <path
                              d="M 465 195 C 455 205, 435 210, 415 205 M 475 240 C 455 245, 440 235, 412 245 M 465 275 C 450 280, 430 270, 408 280"
                              fill="none"
                              stroke="#2F9FEF"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                              strokeDasharray="4 2"
                            />

                            {/* Right Hemisphere Neural Nodes */}
                            {[
                              { cx: 465, cy: 195 },
                              { cx: 440, cy: 180 },
                              { cx: 475, cy: 235 },
                              { cx: 445, cy: 230 },
                              { cx: 415, cy: 215 },
                              { cx: 465, cy: 275 },
                              { cx: 435, cy: 270 },
                              { cx: 415, cy: 290 },
                            ].map((pt, i) => (
                              <circle
                                key={`r-node-${i}`}
                                cx={pt.cx}
                                cy={pt.cy}
                                r="3.2"
                                fill="#FFFFFF"
                                stroke="#1976D2"
                                strokeWidth="1.8"
                              >
                                <animate
                                  attributeName="r"
                                  values="2.8;4.2;2.8"
                                  dur={`${2.2 + (i % 3) * 0.4}s`}
                                  repeatCount="indefinite"
                                />
                              </circle>
                            ))}
                          </g>

                          {/* SYNAPTIC BRIDGE (Appears when hemispheres separate) */}
                          {(screenScene === 'brain_activating' ||
                            screenScene === 'skills_connecting' ||
                            screenScene === 'network_converge') && (
                            <g id="synaptic-bridge-group">
                              {[190, 215, 240, 265, 290].map((yBridge, i) => (
                                <g key={`bridge-${i}`}>
                                  <line
                                    x1="382"
                                    y1={yBridge}
                                    x2="418"
                                    y2={yBridge}
                                    stroke="url(#synapticGrad)"
                                    strokeWidth="1.8"
                                    strokeDasharray="2 2"
                                    className="animate-synaptic-pulse"
                                  />
                                  <circle cx="400" cy={yBridge} r="2.2" fill="#66C7EA">
                                    <animate
                                      attributeName="opacity"
                                      values="0.3;1;0.3"
                                      dur="1.2s"
                                      repeatCount="indefinite"
                                    />
                                  </circle>
                                </g>
                              ))}
                            </g>
                          )}

                          {/* Brain Central Branding Monogram in Core */}
                          <circle cx="400" cy="245" r="14" fill="#FFFFFF" stroke="#B9E4FA" strokeWidth="1.5" />
                          <text
                            x="400"
                            y="249"
                            textAnchor="middle"
                            fontFamily="'Outfit', sans-serif"
                            fontWeight="900"
                            fontSize="9"
                            fill="#1976D2"
                          >
                            AI
                          </text>
                        </g>

                        {/* --- 3. SKILL NODES (REVEALED SEQUENTIALLY) --- */}
                        {skillsData.map((skill) => {
                          const isRevealed =
                            screenScene === 'skills_connecting'
                              ? skill.revealOrder <= connectedSkillsCount
                              : screenScene === 'network_converge';
                          const isHovered = hoveredSkillId === skill.id;

                          if (!isRevealed) return null;

                          return (
                            <g
                              key={`skill-${skill.id}`}
                              transform={`translate(${skill.x}, ${skill.y})`}
                              style={{
                                cursor: 'pointer',
                                transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                              }}
                              onMouseEnter={() => setHoveredSkillId(skill.id)}
                              onMouseLeave={() => setHoveredSkillId(null)}
                            >
                              {/* Background Aura if Hovered */}
                              {isHovered && (
                                <circle
                                  cx="0"
                                  cy="0"
                                  r="26"
                                  fill="rgba(47, 159, 239, 0.2)"
                                  filter="url(#cyanGlow)"
                                />
                              )}

                              {/* Node Outer Ring */}
                              <circle
                                cx="0"
                                cy="0"
                                r={isHovered ? '17' : '14'}
                                fill="#FFFFFF"
                                stroke={isHovered ? '#1976D2' : skill.badgeBorder}
                                strokeWidth={isHovered ? '2.5' : '1.5'}
                                filter="drop-shadow(0 2px 6px rgba(25, 118, 210, 0.18))"
                                style={{ transition: 'all 0.2s ease' }}
                              />

                              {/* Vector Icon in Center of Circle */}
                              <foreignObject
                                x="-8"
                                y="-8"
                                width="16"
                                height="16"
                                style={{ pointerEvents: 'none' }}
                              >
                                <div
                                  style={{
                                    width: '16px',
                                    height: '16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                  }}
                                >
                                  {renderSkillIcon(skill.id)}
                                </div>
                              </foreignObject>

                              {/* Skill Text Label Below/Beside */}
                              <text
                                x="0"
                                y={skill.y > 380 ? -20 : 25}
                                textAnchor="middle"
                                fontFamily="'Outfit', sans-serif"
                                fontWeight={isHovered ? '800' : '700'}
                                fontSize="10.5"
                                fill={isHovered ? '#1976D2' : '#123B5D'}
                                filter={isHovered ? 'drop-shadow(0 0 4px rgba(47, 159, 239, 0.4))' : undefined}
                              >
                                {skill.name}
                              </text>
                            </g>
                          );
                        })}
                      </svg>

                      {/* --- INTERACTIVE HOVER TOOLTIP CARD --- */}
                      {hoveredSkillId && (
                        <div
                          style={{
                            position: 'absolute',
                            bottom: '12px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            backdropFilter: 'blur(12px)',
                            border: '1.5px solid #2F9FEF',
                            boxShadow: '0 8px 24px rgba(25, 118, 210, 0.25)',
                            borderRadius: '10px',
                            padding: '8px 14px',
                            zIndex: 45,
                            pointerEvents: 'none',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '3px',
                          }}
                        >
                          {(() => {
                            const node = skillsData.find((s) => s.id === hoveredSkillId);
                            if (!node) return null;
                            return (
                              <>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                  <span
                                    style={{
                                      fontFamily: "'Outfit', sans-serif",
                                      fontWeight: 800,
                                      fontSize: '12px',
                                      color: '#123B5D',
                                      textTransform: 'uppercase',
                                    }}
                                  >
                                    {node.name}
                                  </span>
                                  <span
                                    style={{
                                      fontSize: '9px',
                                      fontFamily: "'Fira Code', monospace",
                                      fontWeight: 700,
                                      padding: '1px 6px',
                                      borderRadius: '4px',
                                      backgroundColor: 'rgba(25, 118, 210, 0.1)',
                                      color: '#1976D2',
                                    }}
                                  >
                                    {node.category}
                                  </span>
                                </div>
                                <div
                                  style={{
                                    fontFamily: "'Fira Code', monospace",
                                    fontSize: '9.5px',
                                    color: '#546E7A',
                                    display: 'flex',
                                    gap: '6px',
                                  }}
                                >
                                  {node.tags.map((tag, idx) => (
                                    <span key={idx}>
                                      {tag}
                                      {idx < node.tags.length - 1 && ' • '}
                                    </span>
                                  ))}
                                </div>
                              </>
                            );
                          })()}
                        </div>
                      )}
                    </div>
                  )}

                  {/* =================================================================== */}
                  {/* SCENE C: PROFILE REVEAL (BOOK-OPENING PHOTO & WORD-BY-WORD REVEAL) */}
                  {/* =================================================================== */}
                  {screenScene === 'profile_reveal' && (
                    <div
                      style={{
                        position: 'relative',
                        width: '100%',
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        zIndex: 25,
                      }}
                    >
                      {/* Word-by-Word Animation: WELCOME TO MY PROFILE */}
                      <div
                        style={{
                          perspective: '800px',
                          transformStyle: 'preserve-3d',
                          marginBottom: '6px',
                          lineHeight: 1.15,
                        }}
                      >
                        <span
                          className="laptop-word-welcome"
                          style={{
                            fontFamily: "'Outfit', sans-serif",
                            fontWeight: 900,
                            fontSize: 'clamp(1rem, 2.3vw, 1.45rem)',
                            letterSpacing: '0.04em',
                            color: '#123B5D',
                            marginRight: '0.32em',
                          }}
                        >
                          WELCOME
                        </span>
                        <span
                          className="laptop-word-to"
                          style={{
                            fontFamily: "'Outfit', sans-serif",
                            fontWeight: 900,
                            fontSize: 'clamp(1rem, 2.3vw, 1.45rem)',
                            letterSpacing: '0.04em',
                            color: '#123B5D',
                            marginRight: '0.32em',
                          }}
                        >
                          TO
                        </span>
                        <span
                          className="laptop-word-my"
                          style={{
                            fontFamily: "'Outfit', sans-serif",
                            fontWeight: 900,
                            fontSize: 'clamp(1rem, 2.3vw, 1.45rem)',
                            letterSpacing: '0.04em',
                            color: '#123B5D',
                            marginRight: '0.32em',
                          }}
                        >
                          MY
                        </span>
                        <span
                          className="laptop-word-profile"
                          style={{
                            fontFamily: "'Outfit', sans-serif",
                            fontWeight: 900,
                            fontSize: 'clamp(1rem, 2.3vw, 1.45rem)',
                            letterSpacing: '0.04em',
                            background: 'linear-gradient(90deg, #1976D2 0%, #2F9FEF 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            filter: 'drop-shadow(0 0 16px rgba(47, 159, 239, 0.55))',
                          }}
                        >
                          PROFILE
                        </span>
                      </div>

                      {/* 3D Book-Opening Profile Photo with Concentric Rings */}
                      <div
                        className="laptop-photo-stage"
                        style={{
                          position: 'relative',
                          width: 'clamp(84px, 13vw, 102px)',
                          height: 'clamp(84px, 13vw, 102px)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '4px 0 8px 0',
                        }}
                      >
                        <div
                          className="laptop-floating-assembly"
                          style={{
                            position: 'relative',
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transformStyle: 'preserve-3d',
                          }}
                        >
                          {/* Ring 1: One thin blue outer ring */}
                          <div
                            className="laptop-ring-1"
                            style={{
                              position: 'absolute',
                              inset: '-14px',
                              borderRadius: '50%',
                              border: '1.2px solid rgba(25, 118, 210, 0.45)',
                              boxShadow: '0 0 10px rgba(25, 118, 210, 0.15)',
                              pointerEvents: 'none',
                              zIndex: 11,
                            }}
                          >
                            <div
                              style={{
                                position: 'absolute',
                                top: '0',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: '5px',
                                height: '5px',
                                borderRadius: '50%',
                                backgroundColor: '#1976D2',
                                boxShadow: '0 0 6px #2F9FEF',
                              }}
                            />
                          </div>

                          {/* Ring 2: One soft cyan glowing ring */}
                          <div
                            className="laptop-ring-2"
                            style={{
                              position: 'absolute',
                              inset: '-8px',
                              borderRadius: '50%',
                              border: '1.2px solid rgba(102, 199, 234, 0.65)',
                              boxShadow: '0 0 10px rgba(102, 199, 234, 0.35)',
                              pointerEvents: 'none',
                              zIndex: 12,
                            }}
                          />

                          {/* Ring 3: One very subtle dashed ring */}
                          <div
                            className="laptop-ring-3"
                            style={{
                              position: 'absolute',
                              inset: '-3px',
                              borderRadius: '50%',
                              border: '1px dashed rgba(25, 118, 210, 0.35)',
                              pointerEvents: 'none',
                              zIndex: 13,
                            }}
                          />

                          {/* Outer Circular Frame */}
                          <div
                            className="laptop-circular-frame"
                            style={{
                              position: 'absolute',
                              inset: 0,
                              borderRadius: '50%',
                              backgroundColor: '#FFFFFF',
                              border: '3px solid #FFFFFF',
                              boxShadow: '0 8px 24px rgba(25, 118, 210, 0.2), 0 0 16px rgba(102, 199, 234, 0.25)',
                              pointerEvents: 'none',
                              zIndex: 19,
                            }}
                          />

                          {/* The Book-Opening Profile Photo Layer */}
                          <div
                            onClick={handleProfileClick}
                            onMouseMove={handlePhotoMouseMove}
                            onMouseLeave={handlePhotoMouseLeave}
                            title="Click to interact with profile"
                            style={{
                              position: 'relative',
                              zIndex: 25,
                              width: '100%',
                              height: '100%',
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              padding: '4px',
                              cursor: 'pointer',
                              transformStyle: 'preserve-3d',
                            }}
                          >
                            <div
                              className="laptop-book-photo"
                              style={{
                                position: 'relative',
                                width: '100%',
                                height: '100%',
                                borderRadius: '50%',
                                overflow: 'hidden',
                                backgroundColor: '#EAF6FF',
                                border: '1.5px solid #B9E4FA',
                                display: 'flex',
                                alignItems: 'center',
                                justifySelf: 'center',
                                transform: isBookOpened
                                  ? `rotateY(${photoTilt.rotateY}deg) rotateX(${photoTilt.rotateX}deg)`
                                  : undefined,
                                transition: isBookOpened ? 'transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)' : undefined,
                              }}
                            >
                              {/* Realistic Page Spine Shadow */}
                              <div
                                className="laptop-spine-shadow"
                                style={{
                                  position: 'absolute',
                                  top: 0,
                                  left: 0,
                                  bottom: 0,
                                  pointerEvents: 'none',
                                  zIndex: 13,
                                }}
                              />

                              {/* Light Sweep from LEFT -> RIGHT across photo */}
                              <div
                                className="laptop-light-sweep"
                                style={{
                                  position: 'absolute',
                                  inset: 0,
                                  width: '100%',
                                  height: '100%',
                                  background:
                                    'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.8) 45%, rgba(102, 199, 234, 0.5) 55%, transparent 100%)',
                                  pointerEvents: 'none',
                                  zIndex: 14,
                                }}
                              />

                              {/* Interactive Click Ripples */}
                              {profileRipples.map((ripple) => (
                                <span
                                  key={ripple.id}
                                  style={{
                                    position: 'absolute',
                                    top: ripple.y - 25,
                                    left: ripple.x - 25,
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '50%',
                                    border: '2px solid #2F9FEF',
                                    backgroundColor: 'rgba(47, 159, 239, 0.25)',
                                    pointerEvents: 'none',
                                    animation: 'clickRippleEffect 0.75s ease-out forwards',
                                    zIndex: 15,
                                  }}
                                />
                              ))}

                              {/* The EXACT Profile Photo */}
                              {!imageError ? (
                                <img
                                  src="/assets/profile.jpg"
                                  alt="Vaishnavi R Kannur"
                                  onError={() => setImageError(true)}
                                  style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    display: 'block',
                                    userSelect: 'none',
                                  }}
                                  loading="eager"
                                />
                              ) : (
                                <div
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#1976D2',
                                    fontFamily: "'Outfit', sans-serif",
                                    fontWeight: 800,
                                    fontSize: '14px',
                                  }}
                                >
                                  VK
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Name Reveal */}
                      <h2
                        className="laptop-name-reveal"
                        style={{
                          fontFamily: "'Outfit', sans-serif",
                          fontWeight: 800,
                          fontSize: 'clamp(0.95rem, 2vw, 1.25rem)',
                          letterSpacing: '0.06em',
                          textTransform: 'uppercase',
                          color: '#123B5D',
                          margin: '0 0 2px 0',
                        }}
                      >
                        VAISHNAVI R KANNUR
                      </h2>

                      {/* Subtitle */}
                      <p
                        className="laptop-subtitle-reveal"
                        style={{
                          fontFamily: "'Fira Code', monospace",
                          fontWeight: 600,
                          fontSize: 'clamp(0.72rem, 1.4vw, 0.85rem)',
                          color: '#1976D2',
                          letterSpacing: '0.03em',
                          margin: '0 0 6px 0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                        }}
                      >
                        <span
                          style={{
                            width: '5px',
                            height: '5px',
                            borderRadius: '50%',
                            backgroundColor: '#2F9FEF',
                          }}
                        />
                        <span>Computer Science Engineer</span>
                      </p>

                      {/* Pills: AI • CLOUD • SOFTWARE • DEVELOPMENT */}
                      <div
                        className="laptop-pills-reveal"
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                          fontFamily: "'Fira Code', monospace",
                          fontWeight: 700,
                          fontSize: 'clamp(8px, 1.2vw, 10px)',
                          color: '#123B5D',
                          marginBottom: '8px',
                        }}
                      >
                        {['AI', 'CLOUD', 'SOFTWARE', 'DEVELOPMENT'].map((pill, i) => (
                          <React.Fragment key={pill}>
                            <span
                              style={{
                                padding: '2px 7px',
                                borderRadius: '4px',
                                backgroundColor: '#FFFFFF',
                                border: '1px solid #D9F0FF',
                                boxShadow: '0 1px 3px rgba(25, 118, 210, 0.06)',
                                display: 'inline-block',
                              }}
                            >
                              {pill}
                            </span>
                            {i < 3 && <span style={{ color: '#2F9FEF', fontWeight: 'bold' }}>•</span>}
                          </React.Fragment>
                        ))}
                      </div>

                      {/* Transition button into Featured Projects */}
                      <div className="laptop-btn-reveal" style={{ display: 'flex', gap: '8px' }}>
                        <button
                          onClick={() => jumpToScene('projects_showcase')}
                          style={{
                            padding: '6px 16px',
                            borderRadius: '9999px',
                            backgroundColor: '#1976D2',
                            backgroundImage: 'linear-gradient(135deg, #1976D2 0%, #2F9FEF 100%)',
                            color: '#FFFFFF',
                            border: '1px solid rgba(47, 159, 239, 0.4)',
                            boxShadow: '0 4px 14px rgba(25, 118, 210, 0.3)',
                            fontFamily: "'Fira Code', monospace",
                            fontSize: 'clamp(9.5px, 1.3vw, 11px)',
                            fontWeight: 700,
                            letterSpacing: '0.06em',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            transition: 'all 0.2s ease',
                          }}
                        >
                          <span>VIEW FEATURED PROJECTS</span>
                          <ChevronRight style={{ width: '13px', height: '13px' }} />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* =================================================================== */}
                  {/* SCENE D: FEATURED PROJECTS SHOWCASE INSIDE LAPTOP SCREEN             */}
                  {/* =================================================================== */}
                  {screenScene === 'projects_showcase' && (
                    <div
                      style={{
                        position: 'relative',
                        width: '100%',
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        textAlign: 'left',
                        zIndex: 25,
                        padding: '4px 6px',
                      }}
                    >
                      {/* Project Selection Tabs */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          width: '100%',
                          justifyContent: 'center',
                          marginBottom: '6px',
                        }}
                      >
                        {[
                          { id: 'payguard', label: '🛡️ PAYGUARD AI (UPI Fraud)', tag: 'Flagship ML' },
                          { id: 'travel', label: '🗺️ AI TRAVEL PLANNER', tag: 'Web & Maps' },
                          { id: 'salesforce', label: '⚡ SALESFORCE CRM', tag: 'Cloud Suite' },
                        ].map((tab) => (
                          <button
                            key={tab.id}
                            onClick={() => setActiveProjectTab(tab.id as any)}
                            style={{
                              padding: '4px 10px',
                              borderRadius: '6px',
                              fontSize: 'clamp(8.5px, 1.1vw, 10px)',
                              fontFamily: "'Fira Code', monospace",
                              fontWeight: activeProjectTab === tab.id ? 700 : 500,
                              backgroundColor:
                                activeProjectTab === tab.id ? '#FFFFFF' : 'rgba(255, 255, 255, 0.5)',
                              border: '1.5px solid',
                              borderColor: activeProjectTab === tab.id ? '#1976D2' : '#D9F0FF',
                              color: activeProjectTab === tab.id ? '#1976D2' : '#546E7A',
                              boxShadow:
                                activeProjectTab === tab.id
                                  ? '0 2px 8px rgba(25, 118, 210, 0.15)'
                                  : 'none',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                              transition: 'all 0.2s ease',
                            }}
                          >
                            <span>{tab.label}</span>
                          </button>
                        ))}
                      </div>

                      {/* Project Card Content Body */}
                      <div
                        style={{
                          width: '100%',
                          flex: 1,
                          backgroundColor: '#FFFFFF',
                          borderRadius: '8px',
                          border: '1px solid #B9E4FA',
                          boxShadow: '0 4px 16px rgba(25, 118, 210, 0.08)',
                          padding: '10px 14px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          overflowY: 'auto',
                        }}
                      >
                        {/* 1. PAYGUARD AI TAB */}
                        {activeProjectTab === 'payguard' && (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <div>
                                <h3
                                  style={{
                                    fontFamily: "'Outfit', sans-serif",
                                    fontWeight: 800,
                                    fontSize: 'clamp(12px, 1.8vw, 15px)',
                                    color: '#123B5D',
                                    margin: 0,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                  }}
                                >
                                  <span>PAYGUARD AI</span>
                                  <span style={{ fontSize: '11px', color: '#1976D2', fontWeight: 600 }}>
                                    — UPI Fraud Detection
                                  </span>
                                </h3>
                                <p
                                  style={{
                                    margin: 0,
                                    fontSize: '10px',
                                    fontFamily: "'Fira Code', monospace",
                                    color: '#546E7A',
                                  }}
                                >
                                  Machine Learning Pipeline for Real-Time Transaction Security
                                </p>
                              </div>

                              {/* Interactive Simulation Switch Buttons */}
                              <div style={{ display: 'flex', gap: '6px' }}>
                                <button
                                  onClick={() => handleSimulatePayguard(false)}
                                  disabled={payguardAnalyzing}
                                  style={{
                                    padding: '3px 8px',
                                    borderRadius: '4px',
                                    fontSize: '9.5px',
                                    fontFamily: "'Fira Code', monospace",
                                    fontWeight: 600,
                                    backgroundColor: !payguardAnomalous ? '#E8F5E9' : '#F5F5F5',
                                    color: !payguardAnomalous ? '#2E7D32' : '#616161',
                                    border: '1px solid',
                                    borderColor: !payguardAnomalous ? '#81C784' : '#E0E0E0',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                  }}
                                >
                                  <ShieldCheck style={{ width: '11px', height: '11px' }} />
                                  <span>Normal Txn</span>
                                </button>
                                <button
                                  onClick={() => handleSimulatePayguard(true)}
                                  disabled={payguardAnalyzing}
                                  style={{
                                    padding: '3px 8px',
                                    borderRadius: '4px',
                                    fontSize: '9.5px',
                                    fontFamily: "'Fira Code', monospace",
                                    fontWeight: 600,
                                    backgroundColor: payguardAnomalous ? '#FFEBEE' : '#F5F5F5',
                                    color: payguardAnomalous ? '#C62828' : '#616161',
                                    border: '1px solid',
                                    borderColor: payguardAnomalous ? '#E57373' : '#E0E0E0',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                  }}
                                >
                                  <AlertTriangle style={{ width: '11px', height: '11px' }} />
                                  <span>Simulate Anomaly</span>
                                </button>
                              </div>
                            </div>

                            {/* Digital Pipeline Flow Visualization */}
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                backgroundColor: '#F0F8FF',
                                border: '1px solid #D9F0FF',
                                borderRadius: '6px',
                                padding: '8px 10px',
                                gap: '4px',
                              }}
                            >
                              {[
                                { step: '1. UPI Txn', val: payguardAnomalous ? '₹ 89,500' : '₹ 4,850' },
                                { step: '2. Features', val: payguardAnomalous ? 'High Velocity' : 'Matched Device' },
                                { step: '3. ML Model', val: 'Scikit-learn' },
                                {
                                  step: '4. Risk Score',
                                  val: payguardAnomalous ? '94 / 100 (HIGH)' : '8 / 100 (LOW)',
                                  isRisk: true,
                                },
                                {
                                  step: '5. Action',
                                  val: payguardAnomalous ? 'FLAGGED SUSPICIOUS' : 'VERIFIED GENUINE',
                                  isStatus: true,
                                },
                              ].map((item, idx) => (
                                <React.Fragment key={idx}>
                                  <div style={{ textAlign: 'center', flex: 1 }}>
                                    <div
                                      style={{
                                        fontSize: '8px',
                                        fontFamily: "'Fira Code', monospace",
                                        color: '#78909C',
                                        fontWeight: 600,
                                      }}
                                    >
                                      {item.step}
                                    </div>
                                    <div
                                      style={{
                                        fontSize: '9.5px',
                                        fontFamily: "'Fira Code', monospace",
                                        fontWeight: 700,
                                        color: item.isRisk
                                          ? payguardAnomalous
                                            ? '#D32F2F'
                                            : '#2E7D32'
                                          : item.isStatus
                                          ? payguardAnomalous
                                            ? '#C62828'
                                            : '#1976D2'
                                          : '#123B5D',
                                      }}
                                    >
                                      {item.val}
                                    </div>
                                  </div>
                                  {idx < 4 && (
                                    <span style={{ color: '#2F9FEF', fontSize: '10px', fontWeight: 'bold' }}>
                                      &rarr;
                                    </span>
                                  )}
                                </React.Fragment>
                              ))}
                            </div>

                            {/* Tech Stack */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                              <span style={{ fontSize: '9px', fontFamily: "'Fira Code', monospace", color: '#546E7A' }}>
                                Tech Stack:
                              </span>
                              {['Python', 'Machine Learning', 'Scikit-learn', 'Pandas', 'NumPy', 'Risk Scoring'].map(
                                (t) => (
                                  <span
                                    key={t}
                                    style={{
                                      fontSize: '9px',
                                      fontFamily: "'Fira Code', monospace",
                                      fontWeight: 600,
                                      backgroundColor: '#F5F9FD',
                                      border: '1px solid #D9F0FF',
                                      padding: '1px 5px',
                                      borderRadius: '3px',
                                      color: '#1976D2',
                                    }}
                                  >
                                    {t}
                                  </span>
                                )
                              )}
                            </div>
                          </div>
                        )}

                        {/* 2. AI TRAVEL PLANNER TAB */}
                        {activeProjectTab === 'travel' && (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <div>
                                <h3
                                  style={{
                                    fontFamily: "'Outfit', sans-serif",
                                    fontWeight: 800,
                                    fontSize: 'clamp(12px, 1.8vw, 15px)',
                                    color: '#123B5D',
                                    margin: 0,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                  }}
                                >
                                  <span>AI ENABLED TRAVEL PLANNER</span>
                                </h3>
                                <p
                                  style={{
                                    margin: 0,
                                    fontSize: '10px',
                                    fontFamily: "'Fira Code', monospace",
                                    color: '#546E7A',
                                  }}
                                >
                                  Smart Itinerary Generation with Interactive Map Routing
                                </p>
                              </div>
                              <span
                                style={{
                                  fontSize: '9px',
                                  fontFamily: "'Fira Code', monospace",
                                  fontWeight: 700,
                                  color: '#00796B',
                                  backgroundColor: '#E0F2F1',
                                  padding: '2px 7px',
                                  borderRadius: '9999px',
                                  border: '1px solid #80CBC4',
                                }}
                              >
                                Google Maps &amp; AI
                              </span>
                            </div>

                            {/* Interactive Stop Route Cards */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
                              {[
                                {
                                  name: 'Tokyo',
                                  day: 'Day 1-3',
                                  desc: 'AI curated tech hubs & cultural itinerary',
                                  coords: '35.6762° N, 139.6503° E',
                                },
                                {
                                  name: 'Kyoto',
                                  day: 'Day 4-5',
                                  desc: 'Historic temple route & transit vectors',
                                  coords: '35.0116° N, 135.7681° E',
                                },
                                {
                                  name: 'Osaka',
                                  day: 'Day 6-7',
                                  desc: 'Culinary map exploration & bookings',
                                  coords: '34.6937° N, 135.5023° E',
                                },
                              ].map((stop, idx) => (
                                <div
                                  key={stop.name}
                                  onClick={() => setSelectedTravelStop(idx)}
                                  style={{
                                    padding: '6px 8px',
                                    borderRadius: '6px',
                                    backgroundColor: selectedTravelStop === idx ? '#F0F8FF' : '#FAFAFA',
                                    border: '1.5px solid',
                                    borderColor: selectedTravelStop === idx ? '#1976D2' : '#E0E0E0',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                  }}
                                >
                                  <div
                                    style={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'space-between',
                                      marginBottom: '2px',
                                    }}
                                  >
                                    <span
                                      style={{
                                        fontFamily: "'Outfit', sans-serif",
                                        fontWeight: 800,
                                        fontSize: '11px',
                                        color: '#123B5D',
                                      }}
                                    >
                                      {stop.name}
                                    </span>
                                    <span
                                      style={{
                                        fontFamily: "'Fira Code', monospace",
                                        fontSize: '8.5px',
                                        color: '#1976D2',
                                      }}
                                    >
                                      {stop.day}
                                    </span>
                                  </div>
                                  <div
                                    style={{
                                      fontSize: '8.5px',
                                      fontFamily: "'Fira Code', monospace",
                                      color: '#78909C',
                                      lineHeight: 1.2,
                                    }}
                                  >
                                    {stop.desc}
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Tech Stack */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                              <span style={{ fontSize: '9px', fontFamily: "'Fira Code', monospace", color: '#546E7A' }}>
                                Tech Stack:
                              </span>
                              {['React', 'JavaScript', 'Firebase Auth', 'Google Maps API', 'AI APIs', 'HTML/CSS'].map(
                                (t) => (
                                  <span
                                    key={t}
                                    style={{
                                      fontSize: '9px',
                                      fontFamily: "'Fira Code', monospace",
                                      fontWeight: 600,
                                      backgroundColor: '#F5F9FD',
                                      border: '1px solid #D9F0FF',
                                      padding: '1px 5px',
                                      borderRadius: '3px',
                                      color: '#1976D2',
                                    }}
                                  >
                                    {t}
                                  </span>
                                )
                              )}
                            </div>
                          </div>
                        )}

                        {/* 3. SALESFORCE CRM TAB */}
                        {activeProjectTab === 'salesforce' && (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <div>
                                <h3
                                  style={{
                                    fontFamily: "'Outfit', sans-serif",
                                    fontWeight: 800,
                                    fontSize: 'clamp(12px, 1.8vw, 15px)',
                                    color: '#123B5D',
                                    margin: 0,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                  }}
                                >
                                  <span>SALESFORCE RECRUITMENT MANAGEMENT</span>
                                </h3>
                                <p
                                  style={{
                                    margin: 0,
                                    fontSize: '10px',
                                    fontFamily: "'Fira Code', monospace",
                                    color: '#546E7A',
                                  }}
                                >
                                  Relational Schema Topology &amp; Flow Builder Automation
                                </p>
                              </div>
                              <span
                                style={{
                                  fontSize: '9px',
                                  fontFamily: "'Fira Code', monospace",
                                  fontWeight: 700,
                                  color: '#0277BD',
                                  backgroundColor: '#E1F5FE',
                                  padding: '2px 7px',
                                  borderRadius: '9999px',
                                  border: '1px solid #81D4FA',
                                }}
                              >
                                Flow Builder Automated
                              </span>
                            </div>

                            {/* Schema Nodes */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
                              {[
                                {
                                  id: 'candidate',
                                  name: 'Candidate__c',
                                  desc: 'Profile, Skills, SOQL duplicate screening',
                                  metric: '99.8% Data Integrity',
                                },
                                {
                                  id: 'application',
                                  name: 'Job_Application__c',
                                  desc: 'Automated Flow Builder evaluation matrices',
                                  metric: '45% Overhead Cut',
                                },
                                {
                                  id: 'position',
                                  name: 'Position__c',
                                  desc: 'Department lookups, headcount & status',
                                  metric: '30% Faster Hiring',
                                },
                              ].map((node) => (
                                <div
                                  key={node.name}
                                  onClick={() =>
                                    setActiveSalesforceNode(
                                      activeSalesforceNode === node.id ? 'all' : (node.id as any)
                                    )
                                  }
                                  style={{
                                    padding: '6px 8px',
                                    borderRadius: '6px',
                                    backgroundColor:
                                      activeSalesforceNode === node.id || activeSalesforceNode === 'all'
                                        ? '#F0F8FF'
                                        : '#F5F9FD',
                                    border: '1.5px solid',
                                    borderColor: activeSalesforceNode === node.id ? '#1976D2' : '#D9F0FF',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                  }}
                                >
                                  <div
                                    style={{
                                      fontFamily: "'Outfit', sans-serif",
                                      fontWeight: 800,
                                      fontSize: '10.5px',
                                      color: '#123B5D',
                                      marginBottom: '2px',
                                    }}
                                  >
                                    {node.name}
                                  </div>
                                  <div
                                    style={{
                                      fontSize: '8.5px',
                                      fontFamily: "'Fira Code', monospace",
                                      color: '#78909C',
                                      lineHeight: 1.2,
                                      marginBottom: '4px',
                                    }}
                                  >
                                    {node.desc}
                                  </div>
                                  <div
                                    style={{
                                      fontSize: '8.5px',
                                      fontFamily: "'Fira Code', monospace",
                                      fontWeight: 700,
                                      color: '#1976D2',
                                    }}
                                  >
                                    {node.metric}
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Tech Stack */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                              <span style={{ fontSize: '9px', fontFamily: "'Fira Code', monospace", color: '#546E7A' }}>
                                Tech Stack:
                              </span>
                              {[
                                'Salesforce CRM',
                                'Flow Builder',
                                'Lightning App Builder',
                                'SOQL',
                                'Database Design',
                                'Validation Rules',
                              ].map((t) => (
                                <span
                                  key={t}
                                  style={{
                                    fontSize: '9px',
                                    fontFamily: "'Fira Code', monospace",
                                    fontWeight: 600,
                                    backgroundColor: '#F5F9FD',
                                    border: '1px solid #D9F0FF',
                                    padding: '1px 5px',
                                    borderRadius: '3px',
                                    color: '#1976D2',
                                  }}
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Bottom Action inside Showcase */}
                      <div
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginTop: '6px',
                        }}
                      >
                        <button
                          onClick={() => jumpToScene('profile_reveal')}
                          style={{
                            fontSize: '9.5px',
                            fontFamily: "'Fira Code', monospace",
                            color: '#1976D2',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                          }}
                        >
                          &larr; Back to Profile
                        </button>

                        <button
                          onClick={handleEnterPortfolio}
                          style={{
                            padding: '6px 18px',
                            borderRadius: '9999px',
                            backgroundColor: '#1976D2',
                            backgroundImage: 'linear-gradient(135deg, #1976D2 0%, #2F9FEF 100%)',
                            color: '#FFFFFF',
                            border: '1px solid rgba(47, 159, 239, 0.4)',
                            boxShadow: '0 4px 14px rgba(25, 118, 210, 0.3)',
                            fontFamily: "'Fira Code', monospace",
                            fontSize: 'clamp(9.5px, 1.3vw, 11px)',
                            fontWeight: 700,
                            letterSpacing: '0.06em',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            transition: 'all 0.2s ease',
                          }}
                        >
                          <span>ENTER MY PORTFOLIO</span>
                          <ArrowRight style={{ width: '13px', height: '13px' }} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* --- LAPTOP BASE (KEYBOARD DECK) --- */}
          <div
            style={{
              width: 'clamp(360px, 94vw, 840px)',
              height: '18px',
              backgroundColor: '#EAF0F6',
              backgroundImage: 'linear-gradient(180deg, #FFFFFF 0%, #EAF0F6 60%, #DCE8F0 100%)',
              borderRadius: '0 0 18px 18px',
              border: '2px solid #DCE8F0',
              borderTop: 'none',
              boxShadow: '0 30px 60px -10px rgba(18, 59, 93, 0.22), inset 0 2px 4px rgba(255, 255, 255, 0.8)',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Trackpad notch */}
            <div
              style={{
                width: '90px',
                height: '4px',
                backgroundColor: '#DCE8F0',
                borderRadius: '0 0 4px 4px',
              }}
            />
          </div>

          {/* Desk Shadow */}
          <div
            style={{
              width: '85%',
              height: '16px',
              borderRadius: '50%',
              backgroundColor: 'rgba(25, 118, 210, 0.15)',
              filter: 'blur(12px)',
              marginTop: '10px',
            }}
          />
        </div>
      </main>

      {/* ========================================================================= */}
      {/* 4. FOOTER STATUS BAR                                                      */}
      {/* ========================================================================= */}
      <footer
        style={{
          position: 'relative',
          zIndex: 150,
          width: '100%',
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '12px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '11px',
          fontFamily: "'Fira Code', monospace",
          color: '#1976D2',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: '#2F9FEF',
              boxShadow: '0 0 8px #2F9FEF',
            }}
          />
          <span>DIGITAL BRAIN &bull; KNOWLEDGE NETWORK &bull; PROFILE IDENTITY</span>
        </div>
        <div style={{ color: '#123B5D', opacity: 0.65 }}>
          CLICK CHAPTERS OR ENTER MY PORTFOLIO
        </div>
      </footer>
    </div>
  );
};
