export interface Project {
  id: string;
  number: string;
  title: string;
  tagline: string;
  category: string;
  description: string;
  longDescription: string;
  technologies: string[];
  highlights: string[];
  metrics: { label: string; value: string }[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  accentColor: string;
  architectureDetails: {
    dataIngestion: string;
    processing: string;
    delivery: string;
  };
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  type: string;
  description: string[];
  technologies: string[];
  highlight: string;
}

export interface SkillCategory {
  category: string;
  iconName: string;
  description: string;
  skills: {
    name: string;
    level: string; // e.g. "Core", "Advanced", "Specialized"
    description: string;
  }[];
}

export const PERSONAL_INFO = {
  name: "AMAN RAJ",
  title: "FULL-STACK SOFTWARE ENGINEER",
  location: "Bengaluru, India",
  email: "amanraj5687@gmail.com",
  phone: "+91-7277045036",
  phoneDisplay: "+91 72770 45036",
  linkedIn: "https://linkedin.com/in/amanraj24",
  github: "https://github.com/amanraj2408",
  heroTagline: "Building Scalable Digital Products & Intelligent Systems.",
  heroSubtext:
    "Full-Stack Software Engineer specializing in modern web technologies, backend systems and AI integration.",
  roles: [
    "Full-Stack Engineer",
    "React & Next.js Developer",
    "Backend Developer",
    "Real-Time Systems Engineer",
    "AI Integration Developer",
  ],
  aboutSummary:
    "I am a Full-Stack Software Engineer with 2+ years of experience building responsive web applications, backend services and real-time data platforms. I enjoy solving complex engineering problems and building reliable, scalable software products. My experience includes frontend engineering, API development, database architecture, real-time communication and AI-powered video analytics.",
  stats: [
    { label: "Years Experience", value: "2+" },
    { label: "Core Enterprise Architectures", value: "3" },
    { label: "Public GitHub Repositories", value: "39" },
    { label: "Real-Time Telemetry Latency", value: "<50ms" },
  ],
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Frontend",
    iconName: "Layout",
    description: "High-performance reactive interfaces with modern state management",
    skills: [
      { name: "React.js", level: "Core", description: "Virtual DOM optimization, custom hooks & concurrency" },
      { name: "Next.js", level: "Core", description: "App Router, SSR, SSG, Server Actions & edge streaming" },
      { name: "TypeScript", level: "Core", description: "Strict static typing, interfaces & generic architecture" },
      { name: "JavaScript", level: "Core", description: "ES6+, async/await, event loops & browser APIs" },
      { name: "Redux Toolkit", level: "Advanced", description: "Predictable centralized state slices & RTK Query" },
      { name: "React Query", level: "Advanced", description: "Server-state caching, optimistic updates & refetching" },
      { name: "Tailwind CSS", level: "Core", description: "Utility-first design systems, responsive & micro-animations" },
    ],
  },
  {
    category: "Backend",
    iconName: "Server",
    description: "Robust, scalable API gateways and asynchronous microservices",
    skills: [
      { name: "Node.js", level: "Core", description: "Event-driven runtime for high-throughput I/O services" },
      { name: "Express.js", level: "Core", description: "RESTful architecture, middleware pipelines & rate limiting" },
      { name: "Python", level: "Core", description: "Scientific scripting, ML pipelines & asynchronous services" },
      { name: "FastAPI", level: "Advanced", description: "High-speed ASGI microservices with Pydantic validation" },
      { name: "Java", level: "Specialized", description: "Object-oriented backend design & enterprise concurrency" },
      { name: "Spring Boot", level: "Specialized", description: "Dependency injection, JPA & enterprise services" },
    ],
  },
  {
    category: "Database",
    iconName: "Database",
    description: "Relational integrity, spatial indexing and NoSQL storage",
    skills: [
      { name: "PostgreSQL", level: "Core", description: "Relational schema design, complex joins & indexing" },
      { name: "MongoDB", level: "Core", description: "Document-oriented aggregations & flexible JSON storage" },
      { name: "MySQL", level: "Advanced", description: "ACID transactions, normalization & connection pooling" },
      { name: "SQLite", level: "Advanced", description: "Lightweight embedded storage & fast local testing" },
    ],
  },
  {
    category: "Cloud & DevOps",
    iconName: "Cloud",
    description: "Containerized deployment pipelines and scalable cloud storage",
    skills: [
      { name: "AWS", level: "Advanced", description: "Cloud computing infrastructure & identity management" },
      { name: "S3", level: "Advanced", description: "Secure object storage, signed URLs & telemetry flight logs" },
      { name: "EC2", level: "Advanced", description: "Compute instances, Linux server administration & security groups" },
      { name: "Docker", level: "Core", description: "Containerization, multi-stage builds & Docker Compose" },
      { name: "Jenkins", level: "Specialized", description: "Automated test runs & deployment orchestration" },
      { name: "GitHub Actions", level: "Advanced", description: "Continuous integration, automated linting & deployments" },
    ],
  },
  {
    category: "AI & Vision",
    iconName: "Cpu",
    description: "Edge computer vision and deep learning inference pipelines",
    skills: [
      { name: "YOLOv8", level: "Advanced", description: "Real-time object detection & bounding box inference" },
      { name: "PyTorch", level: "Advanced", description: "Tensor computation, deep learning model evaluation" },
      { name: "OpenCV", level: "Advanced", description: "Video frame manipulation, color spaces & edge detection" },
      { name: "RT-DETR", level: "Specialized", description: "Real-time transformer-based object detection" },
      { name: "Computer Vision", level: "Advanced", description: "Intrusion confirmation logic & motion vector tracking" },
    ],
  },
  {
    category: "Real-Time & Protocols",
    iconName: "Radio",
    description: "Low-latency bidirectional messaging and video telemetry streaming",
    skills: [
      { name: "MQTT", level: "Core", description: "Lightweight pub/sub protocol for IoT drone telemetry" },
      { name: "WebSockets", level: "Core", description: "Full-duplex persistent browser connections" },
      { name: "EMQX", level: "Advanced", description: "Massively scalable distributed MQTT message broker" },
      { name: "RTSP", level: "Advanced", description: "Real-Time Streaming Protocol for IP camera ingestion" },
    ],
  },
];

export const FEATURED_PROJECTS: Project[] = [
  {
    id: "sentinx-os",
    number: "01",
    title: "SENTINX OS",
    tagline: "Real-time drone operations and telemetry platform",
    category: "Autonomous Systems & IoT",
    description:
      "A mission-critical real-time drone operations platform integrating DJI Pilot 2 telemetry, live flight tracking, MQTT/WebSocket data pipelines, and spatial analytics.",
    longDescription:
      "SENTINX OS is engineered to provide drone operators and enterprise command centers with zero-latency situational awareness. By ingesting DJI Pilot 2 telemetry streams via MQTT and EMQX, the system broadcasts real-time drone coordinates, battery state, pitch, roll, and GPS heading to a reactive Next.js dashboard via WebSockets with sub-50ms latency.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "MQTT",
      "EMQX",
      "WebSockets",
      "PostgreSQL",
      "Prisma",
      "AWS S3",
      "Leaflet",
    ],
    highlights: [
      "DJI Pilot 2 integration with bidirectional telemetry pipeline",
      "Real-time drone telemetry streaming with sub-50ms latency",
      "Distributed MQTT communication through EMQX clustering",
      "WebSocket updates powering reactive cockpit dashboard",
      "Flight analytics with real-time speed, altitude & attitude sensors",
      "Interactive Leaflet maps with live flight path breadcrumbs",
      "Cloud flight-log storage in AWS S3 for post-mission auditing",
      "Multi-flight comparison tool to analyze historic mission data",
    ],
    metrics: [
      { label: "Telemetry Latency", value: "< 50ms" },
      { label: "Protocol", value: "MQTT / WebSockets" },
      { label: "Map Engine", value: "Leaflet GIS" },
      { label: "Hardware Support", value: "DJI Pilot 2" },
    ],
    accentColor: "#6366f1", // Indigo
    featured: true,
    githubUrl: "https://github.com/amanraj2408",
    architectureDetails: {
      dataIngestion: "DJI Pilot 2 hardware emits telemetry packets via lightweight MQTT topic subscriptions.",
      processing: "EMQX broker distributes data to Node.js microservices for validation, spatial coordinate transformation, and PostgreSQL persistence via Prisma.",
      delivery: "WebSocket servers stream broadcast packets directly to interactive Leaflet visualizers and cockpit instruments in the Next.js client.",
    },
  },
  {
    id: "flytsense",
    number: "02",
    title: "FLYTSENSE",
    tagline: "AI-powered intrusion detection and video monitoring system",
    category: "Computer Vision & Edge AI",
    description:
      "An intelligent computer vision platform processing live RTSP security streams, executing YOLOv8 person detection, intrusion verification, and duplicate alert suppression.",
    longDescription:
      "FLYTSENSE solves security fatigue by eliminating false alarms in live surveillance. Connecting directly to IP camera feeds using RTSP and MediaMTX, the Python/FastAPI backend passes frames through fine-tuned YOLOv8 deep learning models. Intelligent spatial-temporal algorithms confirm genuine perimeter breaches while suppressing repetitive redundant notifications before uploading snapshots to AWS S3.",
    technologies: [
      "Python",
      "FastAPI",
      "PyTorch",
      "YOLOv8",
      "OpenCV",
      "RTSP",
      "MediaMTX",
      "AWS S3",
      "Docker",
      "Next.js",
    ],
    highlights: [
      "Real-time multi-camera monitoring with RTSP ingestion via MediaMTX",
      "High-precision YOLOv8 person & intruder detection",
      "Hardware-accelerated video stream processing using OpenCV & PyTorch",
      "Intrusion confirmation logic to prevent transient false triggers",
      "Duplicate alert suppression with spatial-temporal cooling windows",
      "Automated cloud snapshot storage in AWS S3 with signed evidence links",
      "Docker containerized microservices ready for edge deployment",
      "FastAPI asynchronous backend with real-time alert websocket push",
    ],
    metrics: [
      { label: "Detection Model", value: "YOLOv8 Vision" },
      { label: "Inference Speed", value: "~28 FPS" },
      { label: "False Alarm Reduction", value: "92%" },
      { label: "Stream Protocol", value: "RTSP / MediaMTX" },
    ],
    accentColor: "#06b6d4", // Electric Cyan
    featured: true,
    githubUrl: "https://github.com/amanraj2408",
    architectureDetails: {
      dataIngestion: "RTSP streams captured from IP cameras and relayed by low-latency MediaMTX media server.",
      processing: "FastAPI workers decode frames via OpenCV; PyTorch runs YOLOv8 inference; spatial tracker verifies boundary crossings and filters noise.",
      delivery: "Confirmed breach snapshots uploaded to AWS S3, triggering real-time alerts pushed to the security dashboard.",
    },
  },
  {
    id: "freshkart",
    number: "03",
    title: "FRESHKART",
    tagline: "Grocery shopping application inspired by modern quick-commerce",
    category: "Full-Stack Web & E-Commerce",
    description:
      "A fast, responsive quick-commerce web application featuring instant category search, dynamic cart management, and seamless end-to-end checkout.",
    longDescription:
      "FRESHKART delivers an intuitive, lightning-fast shopping experience modeled after modern quick-commerce standards. Built with a scalable frontend architecture, the platform features reactive state management for instant cart calculations, optimized product filtering, and robust order placement workflows.",
    technologies: [
      "React.js",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Tailwind CSS",
      "Redux Toolkit",
    ],
    highlights: [
      "Instant category and keyword product search with live debounce",
      "Dynamic real-time cart state management with quantity calculations",
      "Verified catalog management with inventory tracking",
      "Responsive mobile-first layout optimized for speed",
      "Clean RESTful API backend handling products, orders, and authentication",
      "Optimistic UI updates for frictionless shopping flows",
    ],
    metrics: [
      { label: "Search Latency", value: "< 20ms" },
      { label: "Architecture", value: "Full-Stack MERN" },
      { label: "State Management", value: "Redux Toolkit" },
      { label: "Design", value: "Mobile First" },
    ],
    accentColor: "#10b981", // Emerald
    featured: true,
    githubUrl: "https://github.com/amanraj2408/freshkart",
    architectureDetails: {
      dataIngestion: "Client triggers reactive state dispatches on product selection and quantity adjustments.",
      processing: "Express backend validates item quantities, checks stock levels in MongoDB, and computes pricing.",
      delivery: "Instant UI feedback via Redux Toolkit with persistent local session caching.",
    },
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "proto-corp",
    company: "PROTO CORP PVT. LTD.",
    role: "Software Engineer – Full Stack",
    period: "December 2025 – Present",
    location: "Bengaluru, India",
    type: "Full-time",
    description: [
      "Architecting and developing end-to-end full-stack architectures for autonomous drone operations and real-time telemetry systems.",
      "Engineering scalable MQTT and WebSocket communication pipelines via EMQX, processing high-frequency sensor telemetry with sub-50ms latency.",
      "Building high-performance interactive web dashboards using Next.js, TypeScript, and Leaflet for geospatial tracking and flight analytics.",
      "Designing robust PostgreSQL database schemas with Prisma ORM and integrating AWS S3 for secure, searchable flight-log archives.",
    ],
    technologies: ["Next.js", "TypeScript", "Node.js", "MQTT", "EMQX", "WebSockets", "PostgreSQL", "Prisma", "AWS S3", "Leaflet"],
    highlight: "Engineered sub-50ms drone telemetry streaming for mission-critical operations.",
  },
  {
    id: "bireena-info-tech",
    company: "BIREENA INFO TECH",
    role: "Software Developer – Frontend & Backend",
    period: "August 2025 – November 2025",
    location: "Bengaluru, India",
    type: "Full-time",
    description: [
      "Developed responsive, high-performance web applications using React.js, Next.js, and Node.js backend services.",
      "Designed and consumed RESTful APIs, implementing robust authentication, authorization, and role-based access control.",
      "Optimized frontend bundle sizes and database query execution times, achieving an estimated 35% reduction in page load latency.",
      "Collaborated with cross-functional design and product teams to translate complex business requirements into intuitive UI workflows.",
    ],
    technologies: ["React.js", "Next.js", "JavaScript", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "REST APIs"],
    highlight: "Reduced page load latency by 35% through query optimization and code splitting.",
  },
  {
    id: "crio-do",
    company: "CRIO.DO",
    role: "Full Stack Developer Apprentice",
    period: "August 2024 – August 2025",
    location: "Bengaluru, India (Remote)",
    type: "Apprenticeship",
    description: [
      "Completed rigorous work-like project experience building full-stack web applications from architectural inception to cloud deployment.",
      "Engineered full-stack features following clean code principles, test-driven development (TDD), and modular design patterns.",
      "Containerized microservices using Docker and implemented automated CI/CD workflows using GitHub Actions.",
      "Mastered backend database design, asynchronous event queues, and real-time client-server communication.",
    ],
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Docker", "Git", "RESTful Architecture", "Jest"],
    highlight: "Built and deployed multiple production-ready full-stack applications with clean architecture.",
  },
];

export const EDUCATION = {
  degree: "B.Tech Mechanical Engineering",
  institution: "MAKAUT, West Bengal",
  period: "2019 – 2023",
  cgpa: "8.58 / 10",
  description:
    "Graduated with First Class Honours. Active in robotics, computational mechanics, and automated control systems, laying the mathematical and algorithmic foundation for computer vision and software engineering.",
};

export const ACHIEVEMENTS = [
  {
    id: "best-project",
    title: "Best Project Award",
    subtitle: "University TechFest 2023",
    description: "Awarded 1st place among 75+ competing university engineering teams for innovative automated robotics design.",
    icon: "Award",
    metric: "Rank 1 of 75+ Teams",
  },
  {
    id: "entrepreneurship-summit",
    title: "Presenter & Finalist",
    subtitle: "Global Entrepreneurship Summit 2023",
    description: "Selected to pitch scalable technology solutions and IoT hardware-software architectures to industry leaders and angel investors.",
    icon: "Presentation",
    metric: "Selected Presenter",
  },
  {
    id: "robotics-club-head",
    title: "Head of Robotics Club",
    subtitle: "Robotics & Automation Society",
    description: "Led the university robotics society; mentored 100+ junior engineers in microcontrollers, sensor integration, and C/Python programming.",
    icon: "Users",
    metric: "100+ Students Mentored",
  },
];

export const GITHUB_FEATURED_REPOS = [
  {
    name: "freshkart",
    description: "Modern quick-commerce grocery shopping application with instant search and dynamic cart state management.",
    language: "JavaScript / Dart",
    stars: 3,
    url: "https://github.com/amanraj2408/freshkart",
  },
  {
    name: "logiceye-dashboard",
    description: "Video intelligence and camera analytics dashboard for live stream surveillance.",
    language: "JavaScript",
    stars: 2,
    url: "https://github.com/amanraj2408/logiceye-dashboard",
  },
  {
    name: "CCTV-Dashboard",
    description: "Camera feed monitoring and alert tracking interface for security and intrusion events.",
    language: "JavaScript",
    stars: 2,
    url: "https://github.com/amanraj2408/CCTV-Dashboard",
  },
  {
    name: "ai-assistant",
    description: "Interactive AI assistant powered by modern LLMs and reactive streaming interface.",
    language: "TypeScript",
    stars: 4,
    url: "https://github.com/amanraj2408/ai-assistant",
  },
  {
    name: "Fitness-AI",
    description: "AI-assisted pose tracking and workout analytics engine utilizing computer vision.",
    language: "TypeScript",
    stars: 3,
    url: "https://github.com/amanraj2408/Fitness-AI",
  },
  {
    name: "Mera-Event",
    description: "Event discovery and ticket reservation web application with responsive UI.",
    language: "TypeScript",
    stars: 2,
    url: "https://github.com/amanraj2408/Mera-Event",
  },
];

