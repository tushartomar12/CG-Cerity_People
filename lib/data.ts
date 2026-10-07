export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  readMinutes: number;
  imageGradient: string;
};


export const trustLogos = [
  "Northline Group",
  "Apex Retail",
  "Helix Health",
  "Summit Finance",
  "BluePeak IT",
  "Horizon Logistics",
];

export const hrChallenges = [
  {
    title: "Manual HR processes",
    description:
      "Spreadsheets and email chains slow down every HR task and increase error risk.",
    icon: "clipboard",
  },
  {
    title: "Payroll complexity",
    description:
      "Tax rules, deductions, and multi-location payroll make each cycle stressful.",
    icon: "calculator",
  },
  {
    title: "Compliance challenges",
    description:
      "Changing regulations demand accurate records, audits, and timely reporting.",
    icon: "shield",
  },
  {
    title: "Scattered employee data",
    description:
      "Profiles, documents, and history live in disconnected tools and folders.",
    icon: "database",
  },
  {
    title: "Time-consuming recruitment",
    description:
      "Hiring teams lose hours coordinating interviews, offers, and onboarding.",
    icon: "users",
  },
  {
    title: "Lack of HR analytics",
    description:
      "Leaders lack real-time visibility into headcount, attrition, and workforce costs.",
    icon: "chart",
  },
] as const;

export const hrTechModules = [
  { title: "Employee Management", description: "Central profiles, org structure, and records." },
  { title: "Recruitment & ATS", description: "End-to-end hiring pipelines and candidate tracking." },
  { title: "Onboarding", description: "Automated tasks, documents, and day-one readiness." },
  { title: "Attendance", description: "Track shifts, hours, and policy compliance." },
  { title: "Leave Management", description: "Policies, balances, approvals, and calendars." },
  { title: "Payroll", description: "Accurate pay runs, deductions, and payslips." },
  { title: "Performance", description: "Goals, reviews, KPIs, and development plans." },
  { title: "Expense Management", description: "Submit, approve, and reconcile employee expenses." },
  { title: "Asset Management", description: "Assign and track laptops, IDs, and equipment." },
  { title: "HR Analytics", description: "Dashboards for workforce and operational insights." },
];

export const consultingServices = [
  { title: "HR Strategy", description: "Align people plans with business growth objectives." },
  { title: "HR Process Consulting", description: "Streamline workflows across the employee lifecycle." },
  { title: "Payroll Consulting", description: "Improve accuracy, controls, and payroll governance." },
  { title: "Compliance Consulting", description: "Stay audit-ready with employment law expertise." },
  { title: "Workforce Planning", description: "Structure teams and capacity for scale." },
  { title: "HR Digital Transformation", description: "Move from manual HR to integrated automation." },
];

export const whyChooseUs = [
  {
    title: "Technology + Human Expertise",
    description: "Platform power backed by consultants who understand your context.",
  },
  {
    title: "Scalable Solutions",
    description: "Start simple and expand modules as your organization grows.",
  },
  {
    title: "Compliance Focused",
    description: "Built-in controls and advisory support for regulated environments.",
  },
  {
    title: "Data-Driven Decisions",
    description: "Analytics that help HR and leadership act with confidence.",
  },
  {
    title: "Automation First",
    description: "Reduce repetitive work so teams focus on people and strategy.",
  },
  {
    title: "Dedicated Support",
    description: "Implementation, training, and ongoing success partnership.",
  },
];

export const stats = [
  { value: 500, suffix: "+", label: "Businesses Supported" },
  { value: 50, suffix: "K+", label: "Employees Managed" },
  { value: 20, suffix: "+", label: "HR Processes Automated" },
  { value: 10, suffix: "+", label: "Countries Supported" },
];

export const approachSteps = [
  {
    step: "01",
    title: "Understand",
    description: "Assess your HR maturity, pain points, and business priorities.",
  },
  {
    step: "02",
    title: "Design",
    description: "Define the right mix of technology, process, and policy.",
  },
  {
    step: "03",
    title: "Implement",
    description: "Configure platforms, migrate data, and train your teams.",
  },
  {
    step: "04",
    title: "Optimize",
    description: "Measure outcomes and continuously improve HR operations.",
  },
];

export const teamMembers = [
  {
    name: "Priya Sharma",
    role: "Chief Executive Officer",
    bio: "15+ years leading HR transformation programs for global enterprises.",
  },
  {
    name: "Michael Chen",
    role: "Head of HR Technology",
    bio: "Product and implementation leader specializing in HRMS and payroll platforms.",
  },
  {
    name: "Anita Desai",
    role: "Director, HR Consulting",
    bio: "Advises leadership teams on workforce strategy, compliance, and org design.",
  },
  {
    name: "James Okonkwo",
    role: "VP, Customer Success",
    bio: "Ensures clients achieve measurable ROI from HR technology and consulting.",
  },
];

export const hrmsModulesDetailed = [
  {
    title: "Employee Management",
    description:
      "Centralized employee profiles, documents, organizational structures and employee records.",
  },
  {
    title: "Recruitment / ATS",
    description:
      "Manage candidates, vacancies, interviews and recruitment workflows.",
  },
  {
    title: "Interview Management",
    description: "Schedule interviews, collect feedback and manage hiring decisions.",
  },
  {
    title: "Offer Management",
    description: "Generate professional offer letters and manage approvals.",
  },
  {
    title: "Digital Offer Letter & E-Signature",
    description: "Allow candidates to digitally review and sign documents.",
  },
  {
    title: "Background Verification",
    description: "Manage BGV workflows, documents, verification levels and status.",
  },
 
];

export const consultingServicesDetailed = [
  {
    title: "HR Strategy Consulting",
    description: "Design HR strategies aligned with business goals.",
  },
  {
    title: "HR Process Consulting",
    description: "Review and optimize existing HR workflows.",
  },
  {
    title: "Payroll Consulting",
    description: "Improve payroll processes, controls and accuracy.",
  },
  {
    title: "HR Compliance Consulting",
    description: "Support organizations with HR and employment compliance requirements.",
  },
  {
    title: "Workforce Planning",
    description: "Build effective workforce structures and resource plans.",
  },
  {
    title: "Performance Management",
    description: "Design goal-setting and performance review frameworks.",
  },
  
];

export const solutionsByNeed = [
  "HR Automation",
  "Payroll Automation",
  "Employee Management",
  "Workforce Management",
  "Recruitment",
  "Compliance",
  "HR Analytics",
  "Digital Transformation",
];

export const companySizes = [
  {
    title: "Startups",
    description: "Simple and scalable HR systems that grow with your team.",
  },
  {
    title: "SMBs",
    description: "Automate HR and payroll operations without enterprise complexity.",
  },
  {
    title: "Enterprises",
    description: "Advanced workforce management, integrations, and HR analytics.",
  },
];

export const industries = [
  { title: "IT & Technology", description: "Fast-growing teams and remote workforce support." },
  { title: "Healthcare", description: "Shift scheduling, compliance, and credential tracking." },
  { title: "Manufacturing", description: "Attendance, shifts, and shop-floor workforce visibility." },
  { title: "Retail", description: "High-volume hiring and multi-location payroll." },
  { title: "Professional Services", description: "Utilization, timesheets, and project staffing." },
  { title: "Financial Services", description: "Audit trails, controls, and regulated HR data." },
  { title: "Education", description: "Faculty HR, leave, and academic calendar alignment." },
  { title: "Hospitality", description: "Seasonal hiring and flexible shift management." },
  { title: "Logistics", description: "Distributed teams, attendance, and compliance." },
  { title: "Startups", description: "Lean HR stack from day one to scale-up." },
];

export const insightCategories = [
  "All",
  "HR Technology",
  "Payroll",
  "HR Compliance",
  "Recruitment",
  "Employee Management",
  "HR Strategy",
  "Workforce Management",
  "HR Trends",
];

export const blogPosts: BlogPost[] = [
  {
    slug: "how-hr-automation-can-transform-your-business",
    title: "How HR Automation Can Transform Your Business",
    description:
      "Discover where automation delivers the fastest ROI across payroll, onboarding, and compliance.",
    category: "HR Technology",
    date: "2026-02-18",
    readMinutes: 7,
    imageGradient: "from-blue-600 to-slate-800",
  },
  {
    slug: "complete-guide-to-hrms",
    title: "Complete Guide to HRMS",
    description:
      "Everything leaders should evaluate when selecting a human resource management system.",
    category: "HR Technology",
    date: "2026-02-05",
    readMinutes: 12,
    imageGradient: "from-slate-700 to-blue-900",
  },
  {
    slug: "how-to-digitize-employee-onboarding",
    title: "How to Digitize Employee Onboarding",
    description:
      "A practical roadmap to paperless onboarding that improves new hire experience.",
    category: "Employee Management",
    date: "2026-01-22",
    readMinutes: 8,
    imageGradient: "from-teal-600 to-slate-800",
  },
  {
    slug: "payroll-automation-benefits-and-challenges",
    title: "Payroll Automation: Benefits and Challenges",
    description:
      "Balance accuracy, compliance, and employee trust when automating payroll.",
    category: "Payroll",
    date: "2026-01-10",
    readMinutes: 9,
    imageGradient: "from-indigo-600 to-slate-900",
  },
  {
    slug: "hr-compliance-checklist-for-growing-businesses",
    title: "HR Compliance Checklist for Growing Businesses",
    description:
      "Essential compliance steps as headcount and geographic footprint expand.",
    category: "HR Compliance",
    date: "2025-12-15",
    readMinutes: 10,
    imageGradient: "from-slate-600 to-blue-800",
  },
  {
    slug: "building-a-modern-recruitment-workflow",
    title: "Building a Modern Recruitment Workflow",
    description:
      "Structure your ATS pipeline from requisition to offer with measurable SLAs.",
    category: "Recruitment",
    date: "2025-12-01",
    readMinutes: 6,
    imageGradient: "from-blue-500 to-teal-800",
  },
  {
    slug: "workforce-planning-for-scale-ups",
    title: "Workforce Planning for Scale-Ups",
    description:
      "Align hiring plans with revenue targets and operational capacity.",
    category: "Workforce Management",
    date: "2025-11-20",
    readMinutes: 8,
    imageGradient: "from-slate-800 to-teal-700",
  },
  {
    slug: "hr-trends-2026",
    title: "HR Trends to Watch in 2026",
    description:
      "AI-assisted HR, skills-based hiring, and the rise of people analytics.",
    category: "HR Trends",
    date: "2025-11-08",
    readMinutes: 5,
    imageGradient: "from-violet-600 to-slate-900",
  },
];

export const contactServices = [
  "HRMS",
  "Payroll",
  "Recruitment",
  "HR Consulting",
  "Compliance Consulting",
  "HR Digital Transformation",
  "Other",
] as const;

export const testimonials = [
  {
    quote:
      "We cut payroll processing time by more than half and finally have one source of truth for employee data. The consulting team made adoption easy for our managers.",
    author: "Sarah Mitchell",
    role: "HR Director",
    company: "Northline Group",
  },
  {
    quote:
      "From recruitment to onboarding, everything is connected. Our leadership now has real visibility into headcount and attrition without waiting on manual reports.",
    author: "Raj Patel",
    role: "COO",
    company: "BluePeak IT",
  },
  {
    quote:
      "Compliance used to keep us up at night. With structured workflows and expert guidance, audits are smoother and our finance team trusts every pay run.",
    author: "Elena Vasquez",
    role: "Head of People Operations",
    company: "Summit Finance",
  },
] as const;

export const homeFaqs = [
  {
    question: "Do you offer both HR software and consulting?",
    answer:
      "Yes. We provide an integrated HRMS platform plus advisory services for strategy, compliance, payroll, and digital transformation.",
  },
  {
    question: "Can the HRMS scale as our company grows?",
    answer:
      "Our modules are designed for startups through enterprise teams, with flexible licensing and phased rollouts.",
  },
  {
    question: "How long does implementation typically take?",
    answer:
      "Core HR and payroll can go live in weeks; larger multi-module deployments are phased based on your priorities.",
  },
];

export const companySizesForm = [
  "1–50",
  "51–200",
  "201–500",
  "501–2000",
  "2000+",
] as const;
