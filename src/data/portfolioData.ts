import type { 
  ProjectItem, 
  ExperienceItem, 
  SkillCategory, 
  AchievementItem, 
  CertificationItem, 
  EducationItem, 
  SocialLink, 
  MetricItem, 
  TimelineMilestone,
  TechUniverseNode
} from '../types/portfolio';

export const personalData = {
  name: "VAISHNAVI R KANNUR",
  title: "Computer Science Engineering Student",
  roleSubtitles: [
    "Computer Science Engineer",
    "Cloud & AI Enthusiast",
    "Full-Stack Developer"
  ],
  headline: "Turning Ideas Into Intelligent Digital Experiences.",
  bio: "Computer Science Engineering student at Nagarjuna College of Engineering and Technology, Bangalore (CGPA 9.5/10). Passionate about cloud architectures, machine learning & Generative AI, enterprise systems like Salesforce, and building reliable, scalable software solutions.",
  location: "Bangalore, Karnataka, India",
  email: "kannurvaishnavi@gmail.com",
  phone: "+91 8073969966",
  cgpa: "9.5 / 10.0",
  college: "Nagarjuna College of Engineering and Technology, Bangalore",
  resumeUrl: "/assets/resume.pdf",
  profileImage: "/assets/profile.jpg",
  statusBadge: "Available for Placements & Internships",
};

export const socialLinks: SocialLink[] = [
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/vaishnavi-kannur-bb510b301",
    handle: "vaishnavi-kannur",
    icon: "Linkedin",
  },
  {
    name: "GitHub",
    url: "https://github.com/vaishnavi725",
    handle: "@vaishnavi725",
    icon: "Github",
  },
  {
    name: "LeetCode",
    url: "https://leetcode.com/u/VAISH123",
    handle: "VAISH123",
    icon: "Code2",
  },
  {
    name: "Email",
    url: "mailto:kannurvaishnavi@gmail.com",
    handle: "kannurvaishnavi@gmail.com",
    icon: "Mail",
  },
];

export const heroOrbitSkills = [
  "AI",
  "CLOUD",
  "JAVA",
  "PYTHON",
  "AWS",
  "SALESFORCE",
  "DSA",
  "IoT"
];

export const keyMetrics: MetricItem[] = [
  {
    label: "Academic Standing",
    value: "9.5 / 10",
    subtitle: "CGPA at NCET Bangalore",
    icon: "GraduationCap",
    color: "from-cyan-400 to-blue-500",
  },
  {
    label: "LeetCode Problems",
    value: "248+",
    subtitle: "88% First-Pass Acceptance",
    icon: "Code2",
    color: "from-amber-400 to-orange-500",
  },
  {
    label: "PwC Micro-Certs",
    value: "5",
    subtitle: "Launchpad Credentials",
    icon: "Award",
    color: "from-purple-400 to-indigo-500",
  },
  {
    label: "LeetCode Badge",
    value: "50 Days",
    subtitle: "Consistency Streak Award",
    icon: "Flame",
    color: "from-rose-400 to-pink-500",
  },
  {
    label: "Hackathon Teams",
    value: "50+",
    subtitle: "Institutional Finalist SIH 2026",
    icon: "Trophy",
    color: "from-emerald-400 to-teal-500",
  },
];

export const journeyTimeline: TimelineMilestone[] = [
  {
    year: "2023",
    title: "Engineering Journey Begins",
    description: "Enrolled in B.E. Computer Science and Engineering at Nagarjuna College of Engineering and Technology, Bangalore. Immersed in Data Structures, Algorithms, Object-Oriented Programming, and System Design.",
    tag: "Academics & Core CS",
    icon: "GraduationCap",
  },
  {
    year: "2024",
    title: "IoT & Hardware Prototyping",
    description: "Built the Soil Moisture Monitoring System for SCINOVA 2024 using Embedded C and Arduino Uno with calibrated analog signal processing.",
    tag: "Embedded Systems & IoT",
    icon: "Cpu",
  },
  {
    year: "2025",
    title: "Python, Machine Learning & AWS",
    description: "Earned Red Hat Python certification (AD141) and NPTEL ML & Deep Learning certification. Commenced AWS Cloud Internship at ToriiMinds, architecting serverless event-driven pipelines.",
    tag: "Cloud & AI Specialization",
    icon: "Cloud",
  },
  {
    year: "2026",
    title: "PwC Launchpad, PayGuard AI & Global Hackathons",
    description: "Selected for PwC Advisory Launchpad (earning 5 micro-certifications), built Salesforce Recruitment Management System, qualified as SIH 2026 institutional finalist, parsed 1,000 pages at HyperAPI Hackathon, and architecting PayGuard AI UPI Fraud Detection system.",
    tag: "Enterprise & Major Projects",
    icon: "Sparkles",
  },
];

export const experienceData: ExperienceItem[] = [
  {
    id: "pwc",
    role: "PwC Advisory Launchpad Participant",
    company: "PwC India",
    period: "Feb 2026 – Aug 2026",
    type: "Professional Program",
    badge: "Corporate Advisory Launchpad",
    location: "Bangalore / Hybrid",
    highlights: [
      "Selected for the prestigious PwC Advisory Launchpad journey, progressing from structured technical e-learning modules to enterprise platform onboarding and corporate integration.",
      "Participated actively in executive business interactions, leadership connects, alumni networking sessions, and master classes gaining deep exposure to enterprise consulting frameworks.",
      "Successfully earned 5 specialized micro-certifications across Salesforce, Java Programming Fundamentals, Modern Data Systems, Soft Skills, and GenAI through rigorous multi-stage assessments.",
      "Gained end-to-end practical consulting exposure, mastering technical solution design and communication within multinational enterprise environments.",
    ],
    microCerts: [
      "Salesforce",
      "Java Programming Fundamentals",
      "Modern Data Systems",
      "Soft Skills",
      "GenAI",
    ],
    skills: ["Salesforce CRM", "Java Fundamentals", "Modern Data Systems", "Generative AI", "Consulting", "Enterprise Architecture"],
  },
  {
    id: "toriiminds",
    role: "AWS Cloud Intern",
    company: "ToriiMinds Pvt. Ltd.",
    period: "Sept 2025 – Jan 2026",
    type: "Internship",
    badge: "Cloud Engineering",
    location: "Bangalore, India",
    highlights: [
      "Architected event-driven serverless workflows utilizing AWS Lambda, Amazon S3, Amazon EC2, and AWS IAM, reducing application execution latency by 40% and maintaining 99.9% service uptime.",
      "Enforced rigorous Role-Based Access Control (RBAC) policies and S3 bucket security controls, achieving 100% compliance with cloud resource governance and infrastructure security audits.",
      "Automated cloud resource provisioning and deployment pipelines, reducing manual configuration overhead by 35% and elevating deployment reliability to 99.5%.",
      "Collaborated with senior cloud architects on monitoring, CloudWatch telemetry alarms, and cost-effective cloud resource scaling strategies.",
    ],
    metrics: [
      { metric: "40%", label: "Latency Reduction" },
      { metric: "99.9%", label: "System Uptime" },
      { metric: "100%", label: "Security Compliance" },
      { metric: "35%", label: "Configuration Overhead Cut" },
    ],
    skills: ["AWS Lambda", "Amazon S3", "Amazon EC2", "AWS IAM", "Serverless Workflows", "RBAC", "Cloud Governance", "Automation"],
  },
];

export const projectsData: ProjectItem[] = [
  {
    id: "payguard-ai",
    title: "PAYGUARD AI",
    subtitle: "UPI Fraud Detection using Machine Learning",
    category: "AI / Machine Learning / FinTech / Fraud Detection",
    categoryTag: "AI / ML",
    status: "CURRENTLY DEVELOPING",
    isMajor: true,
    period: "Current Major Project",
    summary: "Machine-learning-based UPI fraud detection system designed to analyze transaction-related features, identify suspicious patterns, and enhance transaction security through real-time fraud analysis pipelines.",
    technologies: [
      "Python",
      "Machine Learning",
      "Scikit-learn",
      "Pandas",
      "NumPy",
      "Data Processing",
      "Classification",
      "Fraud Detection"
    ],
    visualType: "payguard",
    stats: [
      { value: "Real-Time", label: "Fraud Analysis Pipeline" },
      { value: "ML-Driven", label: "Pattern Detection" },
      { value: "Multi-Factor", label: "Feature Extraction" },
      { value: "Major Prj", label: "Flagship Engineering" },
    ],
    pipelineSteps: [
      "UPI Transaction",
      "Transaction Data",
      "Feature Processing",
      "Machine Learning Model",
      "Fraud Detection",
      "Risk Analysis",
      "Result / Alert"
    ],
    details: {
      problem: "UPI (Unified Payments Interface) transactions in digital payment ecosystems face growing threats from sophisticated phishing scams, anomalous transaction spikes, device spoofing, and dynamic fraud patterns that bypass conventional rule-based filters.",
      solution: "Engineered PAYGUARD AI, a machine-learning-centric anomaly and fraud detection engine. The system processes transaction telemetry, extracts key behavioral features, evaluates risk probabilities using trained classification models, and provides instant risk scoring to safeguard users and payment flows.",
      architecture: [
        "UPI Transaction Ingestion & Telemetry Parser",
        "Data Preprocessing & Anomaly Filtering Layer",
        "Feature Engineering (Amount, Frequency, Time Velocity, Location Shifts)",
        "Trained Machine Learning Classification Model (Scikit-learn)",
        "Risk Probability Scoring & Alert Generation Engine"
      ],
      technologies: [
        "Python (Core ML Engine & Processing)",
        "Scikit-learn (Classification Algorithms & Anomaly Detection)",
        "Pandas & NumPy (Data Wrangling, Matrices & Transformation)",
        "Feature Engineering & Statistical Normalization",
        "Risk Scoring & Alert Generation Framework"
      ],
      keyFeatures: [
        "Real-time processing pipeline analyzing high-frequency UPI transaction events.",
        "Multi-dimensional feature extraction incorporating amount anomalies, transaction timing, and behavioral indicators.",
        "Machine learning model trained for binary fraud classification and suspicious pattern recognition.",
        "Dynamic risk score computation generating tiered warnings (Low, Moderate, High Risk).",
        "Interactive simulation dashboard demonstrating end-to-end data flow from payment input to alert resolution.",
        "Modular architecture allowing easy integration of new features, datasets, and advanced ensemble models."
      ],
      workflowSteps: [
        { title: "UPI Transaction", desc: "User initiates digital payment through UPI gateway." },
        { title: "Preprocessing", desc: "Validates schema, cleans nulls, and standardizes numerical values." },
        { title: "Feature Engineering", desc: "Extracts velocity, amount delta, transaction frequency, and device delta." },
        { title: "ML Model Evaluation", desc: "Passes normalized feature vectors into trained classification models." },
        { title: "Fraud Detection & Risk Score", desc: "Computes calibrated risk probability and triggers protective alerts." }
      ],
      contribution: "Conceptualized and currently developing the machine learning pipeline, data cleaning procedures, feature transformation scripts, and interactive testing interface."
    },
  },
  {
    id: "salesforce-recruitment",
    title: "Salesforce Recruitment Management System",
    subtitle: "Enterprise Hiring Suite & Relational Schema Automation",
    category: "Cloud CRM / Database Design / Business Automation",
    categoryTag: "SALESFORCE",
    status: "Completed",
    period: "Apr 2026 – Jul 2026",
    summary: "End-to-end cloud recruitment platform on Salesforce CRM featuring custom relational schema, automated candidate evaluations via Flow Builder, and real-time executive Lightning analytics.",
    technologies: ["Salesforce CRM", "Flow Builder", "Lightning App Builder", "SOQL", "Database Design"],
    githubUrl: "https://github.com/vaishnavi725/Salesforce-Recruitment-Management-System",
    visualType: "salesforce",
    stats: [
      { value: "95%", label: "Tracking Accuracy" },
      { value: "45%", label: "Overhead Reduced" },
      { value: "99.8%", label: "Data Integrity" },
      { value: "30%", label: "Faster Recruiter Response" },
    ],
    details: {
      problem: "Traditional hiring workflows suffer from fragmented candidate communications, inconsistent interview scoring, redundant data entry, and delayed turnaround times between recruiters and hiring managers.",
      solution: "Engineered a centralized, highly reliable CRM recruitment suite on Salesforce. Designed custom relational data models, automated screening criteria with Flow Builder, and deployed dynamic Lightning dashboards for instantaneous hiring visibility.",
      architecture: [
        "Relational Schema: Candidates, Positions, Job Applications",
        "Declarative Flow Builder Triggers & Automated Evaluation Matrices",
        "Lightning App Builder Manager & Recruiter Consoles",
        "SOQL Data Aggregation and Dynamic Reports"
      ],
      technologies: [
        "Salesforce CRM (Enterprise Platform)",
        "Flow Builder (Automated Candidate Evaluation & Trigger Flows)",
        "Lightning App Builder (Custom Recruiter & Manager Consoles)",
        "SOQL (Salesforce Object Query Language for Data Fetching)",
        "Database Design (Relational Architecture & Lookups)",
        "Validation Rules (Data Hygiene & Input Constraints)"
      ],
      keyFeatures: [
        "End-to-end recruitment platform managing candidate pipelines from application to hiring decision.",
        "Architected 3 custom relational objects with lookup relationships and 15+ custom fields in SOQL.",
        "Eliminated duplicate applicant records, maintaining 99.8% data integrity across the database.",
        "Automated candidate evaluation pipelines using Flow Builder and strict validation rules.",
        "Real-time Lightning dashboards and reports improving recruiter response time by 30%.",
        "Automated status transitions and milestone alerts for candidate tracking."
      ],
      workflowSteps: [
        { title: "Candidate Submission", desc: "Profile details captured with automated duplicate screening." },
        { title: "Position Association", desc: "Linked to open job reqs through relational lookup fields." },
        { title: "Flow Builder Evaluation", desc: "Automated scoring rules evaluate candidate qualifications." },
        { title: "Lightning Dashboard", desc: "Recruiters and managers review pipelines with 30% faster response." }
      ],
      contribution: "Designed the full schema topology from scratch in Salesforce CRM, crafted SOQL queries and validation rules, created declarative automation workflows via Flow Builder, and built interactive Lightning components."
    },
  },
  {
    id: "ai-travel-planner",
    title: "AI Enabled Travel Planner",
    subtitle: "AI-Assisted Itinerary & Interactive Map Exploration",
    category: "AI + Full-Stack Web Application",
    categoryTag: "FULL STACK",
    status: "Completed",
    period: "Web & AI Application",
    summary: "An AI-enabled travel planning web application designed to help users plan and organize trips through an interactive digital map experience, AI-assisted itineraries, and personalized travel details.",
    technologies: [
      "React",
      "JavaScript",
      "Firebase Authentication",
      "Google Maps API",
      "HTML",
      "CSS",
      "AI APIs"
    ],
    visualType: "travel",
    stats: [
      { value: "Interactive", label: "Dynamic Map Routing" },
      { value: "AI-Powered", label: "Smart Itinerary Generation" },
      { value: "Secure", label: "Firebase Authentication" },
      { value: "Responsive", label: "Cross-Device UX" },
    ],
    details: {
      problem: "Planning multi-day travel itineraries across diverse destinations is time-consuming, requiring manual collation of maps, routes, timings, accommodation details, and activity suggestions.",
      solution: "Developed an interactive AI-assisted travel platform integrating React, Google Maps API, and AI APIs. Users authenticate securely via Firebase, generate tailored itineraries based on travel preferences, and visualize travel routes on interactive maps.",
      architecture: [
        "React Component Architecture & State Management",
        "Firebase Auth for Secure User Sessions",
        "Google Maps JavaScript API for Coordinate & Route Plotting",
        "AI API Integration for Destination & Itinerary Generation"
      ],
      technologies: [
        "React (Frontend UI Components)",
        "JavaScript (Application Logic & API Orchestration)",
        "Firebase Authentication (User Management & Security)",
        "Google Maps API (Geospatial Mapping & Markers)",
        "AI APIs (Smart Itinerary Recommendations)",
        "HTML5 & CSS3 (Responsive Layout & Glassmorphic Styling)"
      ],
      keyFeatures: [
        "Secure user authentication and profile session persistence via Firebase Auth.",
        "Interactive trip creation with destination selection and budget parameters.",
        "Trip list management with easy editing, viewing, and itinerary sharing.",
        "Interactive map view with dynamic route lines and pinpoint destination markers.",
        "AI-assisted travel planning delivering curated day-by-day itineraries and local attractions.",
        "Personalized travel details and responsive UI optimized for desktop, tablet, and mobile."
      ],
      workflowSteps: [
        { title: "User Auth", desc: "User signs in securely via Firebase Authentication." },
        { title: "Trip Setup", desc: "Specifies destination, duration, budget, and travel interests." },
        { title: "AI Generation", desc: "AI Assistant creates optimized day-wise travel schedule." },
        { title: "Map Visualization", desc: "Renders interactive markers and path vectors via Google Maps." },
        { title: "Trip Management", desc: "User saves, edits, and manages saved itineraries." }
      ],
      contribution: "Built frontend React interface, integrated Firebase authentication, connected Google Maps API for real-time geospatial rendering, and handled AI prompt-response flows."
    },
  },
  {
    id: "soil-moisture-monitoring",
    title: "Soil Moisture Monitoring System",
    subtitle: "SCINOVA 2024 — Smart IoT Automated Irrigation",
    category: "Embedded Systems / IoT / Signal Processing",
    categoryTag: "IOT",
    status: "Completed",
    period: "May 2024",
    summary: "Smart IoT agricultural irrigation unit featuring continuous soil moisture sensing, Embedded C signal processing on Arduino Uno, and automated water valve actuation via dynamic relay control.",
    technologies: ["Embedded C", "Arduino Uno", "Soil Moisture Sensor", "Signal Processing", "IoT"],
    githubUrl: "https://github.com/vaishnavi725/soil-moisture-sensor",
    visualType: "iot",
    stats: [
      { value: "98.5%", label: "Operational Reliability" },
      { value: "< 2%", label: "Calibration Margin" },
      { value: "35%", label: "Water Conserved" },
      { value: "99.2%", label: "Trigger Accuracy" },
    ],
    details: {
      problem: "Agricultural and landscape irrigation often relies on manual timers or guesswork, causing massive water wastage, soil nutrient leaching, or crop under-hydration during changing weather conditions.",
      solution: "Built a reliable, closed-loop IoT irrigation controller using Arduino Uno and soil moisture sensors. Programmed real-time analog signal processing in Embedded C to map soil conductivity to calibrated moisture scales and actuate precision water valves through dynamic relays.",
      architecture: [
        "Capacitive/Resistive Soil Moisture Sensor Probes",
        "Arduino Uno Microcontroller Hardware Unit",
        "Embedded C Real-Time Analog Signal Processing Firmware",
        "5V Optocoupler Relay Actuator & Solenoid Water Valve"
      ],
      technologies: [
        "Embedded C (Microcontroller Programming & ADC)",
        "Arduino Uno (Microcontroller Platform)",
        "Soil Moisture Sensor (Conductivity & Moisture Transducer)",
        "Analog Signal Processing & ADC Calibration",
        "Relay Control Switches & Solenoid Valve Actuators",
        "IoT Edge Telemetry & Hysteresis Threshold Logic"
      ],
      keyFeatures: [
        "Continuous real-time soil telemetry monitoring with 98.5% operational uptime.",
        "Embedded C signal processing algorithm mapping raw analog voltage into a 0–100% moisture index.",
        "High precision sensor calibration maintaining an error margin strictly under 2%.",
        "Dynamic relay control switches to automate water valve actuation based on programmable soil moisture thresholds.",
        "Reduced overall water consumption by 35% with a measured 99.2% trigger accuracy rate.",
        "Failsafe hardware watchdog routines preventing valve flooding during sensor anomalies."
      ],
      workflowSteps: [
        { title: "Moisture Sensing", desc: "Probe samples soil dielectric impedance and output analog voltage." },
        { title: "ADC Conversion", desc: "Arduino Uno samples 10-bit analog-to-digital signals." },
        { title: "Signal Calibration", desc: "Embedded C firmware calculates normalized moisture percentage." },
        { title: "Hysteresis Decision", desc: "Checks programmable moisture thresholds to avoid relay chatter." },
        { title: "Valve Actuation", desc: "Triggers 5V relay module to open/close irrigation solenoid valve." }
      ],
      contribution: "Engineered the embedded firmware in Embedded C, wired the hardware circuit with Arduino Uno and 5V relay modules, developed the calibration mathematics for raw analog signals, and tuned dynamic hysteresis threshold logic."
    },
  },
];

export const skillCategories: SkillCategory[] = [
  {
    name: "Programming",
    icon: "Terminal",
    description: "Core programming languages for algorithmic problem solving and systems",
    skills: ["C++", "Java", "Python", "SQL"],
  },
  {
    name: "Cloud & DevOps",
    icon: "Cloud",
    description: "Cloud infrastructure, serverless workflows, and version control",
    skills: ["AWS", "EC2", "S3", "IAM", "Lambda", "GCP", "Git", "GitHub"],
  },
  {
    name: "AI & Generative AI",
    icon: "Sparkles",
    description: "Modern artificial intelligence, LLM paradigms, and prompt engineering",
    skills: ["Generative AI", "LLMs", "Prompt Engineering", "Tokens", "Embeddings", "AI APIs"],
  },
  {
    name: "Platforms & Databases",
    icon: "Database",
    description: "Enterprise CRM platforms, schema architecture, and databases",
    skills: ["Salesforce CRM", "Flow Builder", "Lightning App Builder", "MySQL", "MongoDB"],
  },
  {
    name: "Core Concepts",
    icon: "Cpu",
    description: "Fundamental computer science theory and engineering foundations",
    skills: ["DSA", "OOP", "DBMS", "Operating Systems", "Computer Networks", "IoT"],
  },
];

export const techUniverseNodes: TechUniverseNode[] = [
  {
    id: "ai",
    name: "AI & GenAI",
    category: "AI",
    x: 20,
    y: 25,
    color: "#a855f7",
    technologies: ["LLMs", "Embeddings", "GenAI", "AI APIs", "Prompt Engineering", "Scikit-learn"],
  },
  {
    id: "cloud",
    name: "Cloud Computing",
    category: "CLOUD",
    x: 80,
    y: 25,
    color: "#38bdf8",
    technologies: ["AWS Lambda", "Amazon S3", "Amazon EC2", "AWS IAM", "GCP", "Serverless"],
  },
  {
    id: "development",
    name: "Development",
    category: "DEVELOPMENT",
    x: 15,
    y: 75,
    color: "#818cf8",
    technologies: ["React", "TypeScript", "JavaScript", "Python", "Java", "C++"],
  },
  {
    id: "database",
    name: "Databases",
    category: "DATABASE",
    x: 85,
    y: 75,
    color: "#06b6d4",
    technologies: ["SQL", "MySQL", "MongoDB", "DBMS", "Relational Schema"],
  },
  {
    id: "salesforce",
    name: "Salesforce Ecosystem",
    category: "SALESFORCE",
    x: 50,
    y: 15,
    color: "#0ea5e9",
    technologies: ["Salesforce CRM", "Flow Builder", "Lightning App Builder", "SOQL"],
  },
  {
    id: "iot",
    name: "IoT & Embedded",
    category: "IOT",
    x: 50,
    y: 85,
    color: "#10b981",
    technologies: ["Embedded C", "Arduino Uno", "Soil Moisture Sensors", "Signal Processing", "Relays"],
  },
  {
    id: "dsa",
    name: "DSA & Core CS",
    category: "DSA",
    x: 50,
    y: 50,
    color: "#f59e0b",
    technologies: ["248+ LeetCode", "Arrays & Strings", "Trees & Graphs", "DP", "OOP", "OS", "Networks"],
  },
];

export const achievementsData: AchievementItem[] = [
  {
    id: "leetcode",
    title: "LeetCode Problem Solving",
    badge: "248+ Solved",
    highlight: "88% First-Pass Acceptance",
    description: "Demonstrated strong algorithmic problem-solving capabilities by solving 248+ challenges with a distinguished 50 Days Badge on LeetCode.",
    stats: [
      { count: "195", label: "Easy" },
      { count: "50", label: "Medium" },
      { count: "3", label: "Hard" },
      { count: "88%", label: "Acceptance Rate" },
    ],
    badgeDetails: "50 Days Badge Winner",
    link: "https://leetcode.com/u/VAISH123",
    icon: "Code2",
    visualType: "leetcode",
  },
  {
    id: "hyperapi",
    title: "HyperAPI Global Hackathon",
    badge: "Global Hackathon (Bangalore)",
    highlight: "1,000 Pages Under 15 Mins",
    description: "Engineered a high-throughput AI extraction pipeline capable of parsing and extracting structured data from a 1,000-page document in under 15 minutes with 98.4% data accuracy.",
    stats: [
      { count: "1,000", label: "Pages Parsed" },
      { count: "< 15m", label: "Processing Time" },
      { count: "98.4%", label: "Data Accuracy" },
    ],
    icon: "Zap",
    visualType: "hyperapi",
  },
  {
    id: "sih",
    title: "Smart India Hackathon 2026",
    badge: "Institutional Finalist",
    highlight: "Selected Among 50+ Teams",
    description: "Qualified as an institutional round finalist among 50+ highly competitive engineering teams at Nagarjuna College of Engineering and Technology.",
    stats: [
      { count: "Top Finalist", label: "Institutional Round" },
      { count: "50+", label: "Competing Teams" },
    ],
    icon: "Trophy",
    visualType: "sih",
  },
  {
    id: "awssummit",
    title: "AWS Summit Bengaluru 2026",
    badge: "Technical Conference",
    highlight: "Cloud & GenAI Architectures",
    description: "Attended specialized advanced technical tracks covering cloud infrastructure architecture, enterprise Generative AI integrations, and deployment optimization.",
    stats: [
      { count: "Cloud", label: "Architecture Tracks" },
      { count: "GenAI", label: "Enterprise Deployment" },
    ],
    icon: "Cloud",
    visualType: "awssummit",
  },
];

export const certificationsData: CertificationItem[] = [
  {
    id: "pwc-cert",
    title: "PwC Advisory Launchpad Certification",
    issuer: "PwC India",
    year: "2026",
    category: "Professional & Consulting",
    modules: [
      "Salesforce",
      "Java Programming Fundamentals",
      "Modern Data Systems",
      "Soft Skills",
      "GenAI",
    ],
    featured: true,
    description: "Earned comprehensive credentials encompassing 5 specialized micro-certifications across Salesforce development, Java programming, modern data architectures, soft skills, and Generative AI.",
    skillsGained: ["Salesforce CRM", "Java SE", "Modern Data Systems", "Generative AI", "Enterprise Consulting"],
  },
  {
    id: "cisco-cpp",
    title: "C++ Essentials 1",
    issuer: "Cisco Networking Academy",
    year: "2026",
    category: "Programming",
    modules: ["Data Types & Logic", "Pointers & Memory", "Functions & Scoping", "OOP Principles"],
    description: "In-depth certification validating core and intermediate C++ programming, syntax, control structures, and memory management.",
    skillsGained: ["C++ Core", "Pointers & References", "Memory Allocation", "Object-Oriented Design"],
  },
  {
    id: "redhat-python",
    title: "Python Programming with Red Hat (AD141)",
    issuer: "Red Hat",
    year: "2025",
    category: "Programming & Automation",
    modules: ["Scripting & Modules", "Data Handling", "System Automation", "APIs"],
    description: "Industry-standard Red Hat curriculum covering practical Python application development, file operations, scripting, and modular architecture.",
    skillsGained: ["Python 3", "System Automation", "Data Structures", "Module Design"],
  },
  {
    id: "nptel-mldl",
    title: "Machine Learning & Deep Learning: Fundamentals and Applications",
    issuer: "NPTEL",
    year: "2025",
    category: "AI & Machine Learning",
    modules: ["Supervised Learning", "Neural Networks", "Deep Learning Architectures", "Model Evaluation"],
    description: "Rigorous academic certification in ML/DL mathematical fundamentals, neural networks, loss optimization, and real-world classification models.",
    skillsGained: ["Supervised Learning", "Neural Networks", "Feature Engineering", "Model Evaluation"],
  },
];

export const educationData: EducationItem[] = [
  {
    institution: "Nagarjuna College of Engineering and Technology",
    degree: "B.E. in Computer Science and Engineering",
    location: "Bangalore, Karnataka",
    period: "2023 – 2027",
    score: "CGPA: 9.5 / 10.0",
    isCurrent: true,
    highlights: [
      "Maintained an exceptional academic standing with a 9.5 / 10.0 CGPA.",
      "Deep coursework in DSA, Operating Systems, DBMS, Computer Networks, and OOP.",
      "Institutional finalist in Smart India Hackathon 2026 among 50+ teams.",
    ],
  },
  {
    institution: "STJ PU College",
    degree: "Pre-University Course (PCMB — Physics, Chemistry, Mathematics, Biology)",
    location: "Vijayapur, Karnataka",
    period: "2021 – 2023",
    score: "Percentage: 96%",
    isCurrent: false,
    highlights: [
      "Achieved an outstanding score of 96% in the Karnataka State Board Pre-University examinations.",
      "Solid foundations in analytical mathematics and scientific problem solving.",
    ],
  },
];

export const leetcodeStats = {
  totalSolved: 248,
  easy: 195,
  medium: 50,
  hard: 3,
  acceptanceRate: "88%",
  badge: "50 Days LeetCode Badge",
  profileUrl: "https://leetcode.com/u/VAISH123",
  username: "VAISH123",
};

export const terminalCommands: Record<string, string | string[]> = {
  whoami: "Vaishnavi R Kannur — Computer Science Engineering Student | Cloud & AI Enthusiast | Full-Stack Developer",
  skills: "C++ • Java • Python • SQL • AWS (Lambda, S3, EC2, IAM) • Generative AI • Salesforce CRM • IoT • DSA",
  education: "B.E. Computer Science and Engineering @ Nagarjuna College of Engineering and Technology, Bangalore (CGPA: 9.5/10.0 | 2023-2027)",
  projects: [
    "1. PAYGUARD AI — UPI Fraud Detection using ML (Major Project / Currently Developing)",
    "2. Salesforce Recruitment Management System (Salesforce CRM, Flow Builder, SOQL)",
    "3. AI Enabled Travel Planner (React, Google Maps API, Firebase Auth, AI APIs)",
    "4. Soil Moisture Monitoring System (Embedded C, Arduino Uno, IoT — SCINOVA 2024)"
  ],
  experience: [
    "• PwC Advisory Launchpad Participant — PwC India (Feb 2026 – Aug 2026 | 5 Micro-Certs)",
    "• AWS Cloud Intern — ToriiMinds Pvt. Ltd. (Sept 2025 – Jan 2026 | Serverless Architecture)"
  ],
  certifications: [
    "• PwC Advisory Launchpad Certification (5 Micro-Certs: Salesforce, Java, Modern Data, Soft Skills, GenAI)",
    "• Cisco Networking Academy — C++ Essentials 1 (2026)",
    "• Red Hat — Python Programming AD141 (2025)",
    "• NPTEL — Machine Learning & Deep Learning: Fundamentals and Applications (2025)"
  ],
  stats: "CGPA: 9.5/10 | LeetCode: 248+ Solved (88% Acceptance) | 50 Days Badge | SIH 2026 Finalist | 5 PwC Micro-Certs",
  contact: "Email: kannurvaishnavi@gmail.com | Phone: +91 8073969966 | Location: Bangalore, India",
  clear: "__CLEAR__",
  help: "Available commands: whoami, skills, education, projects, experience, certifications, stats, contact, clear, help"
};
