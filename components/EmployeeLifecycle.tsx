"use client";

import { useId, useState } from "react";
import Link from "next/link";
import {
  Award,
  BarChart3,
  Building2,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Database,
  DoorOpen,
  FileText,
  Gift,
  GraduationCap,
  Heart,
  IdCard,
  LayoutTemplate,
  LogOut,
  Megaphone,
  MessageCircle,
  Package,
  Search,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  UserPlus,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Stage = {
  id: string;
  name: string;
  title: string;
  body: string;
  cta: string;
  href: string;
  icon: LucideIcon;
  tone: "blue" | "gold";
  capabilities: { label: string; icon: LucideIcon }[];
};

const STAGES: Stage[] = [
  {
    id: "attract",
    name: "Attract",
    title: "Build awareness and connect with the right talent.",
    body: "Strengthen your employer brand, reach the right audience, and create a compelling candidate experience to attract top talent.",
    cta: "Explore Attract Solutions",
    href: "/hr-tech",
    icon: Megaphone,
    tone: "blue",
    capabilities: [
      { label: "Employer Branding", icon: Megaphone },
      { label: "Talent Sourcing", icon: Users },
      { label: "Career Page Management", icon: LayoutTemplate },
      { label: "Talent Pipeline", icon: Database },
      { label: "AI-Powered Job Matching", icon: Sparkles },
      { label: "Candidate Engagement", icon: MessageCircle },
    ],
  },
  {
    id: "recruit",
    name: "Recruit & Hire",
    title: "Find, assess, and hire the people who fit.",
    body: "Run a connected hiring process from requisition to offer — scheduling, assessments, and decisions in one place.",
    cta: "Explore Recruit Solutions",
    href: "/hr-tech",
    icon: Users,
    tone: "blue",
    capabilities: [
      { label: "Job Requisitions", icon: FileText },
      { label: "Interview Scheduling", icon: UserPlus },
      { label: "Candidate Assessment", icon: ClipboardCheck },
      { label: "Offer Letters", icon: FileText },
      { label: "Background Verification", icon: Search },
      { label: "ATS Pipeline", icon: Database },
    ],
  },
  {
    id: "onboard",
    name: "Onboard",
    title: "Welcome new hires with a seamless first day.",
    body: "Automate joining formalities, documents, and day-one tasks so people feel ready from the moment they start.",
    cta: "Explore Onboard Solutions",
    href: "/hr-tech",
    icon: IdCard,
    tone: "blue",
    capabilities: [
      { label: "Digital Onboarding", icon: ClipboardCheck },
      { label: "Document Collection", icon: FileText },
      { label: "Joining Formalities", icon: IdCard },
      { label: "Asset Assignment", icon: Package },
      { label: "Policy Acknowledgements", icon: Building2 },
      { label: "Day-One Readiness", icon: Star },
    ],
  },
  {
    id: "engage",
    name: "Engage",
    title: "Keep people connected, heard, and motivated.",
    body: "Give HR and managers the tools to listen, recognize, and communicate — so engagement stays visible, not assumed.",
    cta: "Explore Engage Solutions",
    href: "/hr-tech",
    icon: Heart,
    tone: "gold",
    capabilities: [
      { label: "Pulse Surveys", icon: MessageCircle },
      { label: "Recognition", icon: Award },
      { label: "Internal Communications", icon: Megaphone },
      { label: "Employee Feedback", icon: Heart },
      { label: "Communities", icon: Users },
      { label: "Wellness Programs", icon: Gift },
    ],
  },
  {
    id: "develop",
    name: "Develop",
    title: "Grow skills, careers, and future leaders.",
    body: "Connect performance, learning, and career paths so development is planned — not left to chance.",
    cta: "Explore Develop Solutions",
    href: "/hr-tech",
    icon: TrendingUp,
    tone: "gold",
    capabilities: [
      { label: "Learning Paths", icon: GraduationCap },
      { label: "Performance Reviews", icon: ClipboardCheck },
      { label: "Goals & KPIs", icon: Target },
      { label: "Career Planning", icon: TrendingUp },
      { label: "Skills Mapping", icon: BarChart3 },
      { label: "Mentoring", icon: Users },
    ],
  },
  {
    id: "retain",
    name: "Retain",
    title: "Support the people you cannot afford to lose.",
    body: "Tie compensation, benefits, and growth into one view so you can act early and keep your best people.",
    cta: "Explore Retain Solutions",
    href: "/hr-tech",
    icon: Award,
    tone: "gold",
    capabilities: [
      { label: "Compensation", icon: Wallet },
      { label: "Benefits", icon: Gift },
      { label: "Career Growth", icon: TrendingUp },
      { label: "Stay Interviews", icon: MessageCircle },
      { label: "Rewards", icon: Star },
      { label: "Internal Mobility", icon: Building2 },
    ],
  },
  {
    id: "transition",
    name: "Transition",
    title: "Handle exits with care, clarity, and compliance.",
    body: "Guide offboarding, knowledge transfer, and settlements so every transition is complete — for the person and the business.",
    cta: "Explore Transition Solutions",
    href: "/hr-tech",
    icon: DoorOpen,
    tone: "gold",
    capabilities: [
      { label: "Resignations", icon: LogOut },
      { label: "Knowledge Transfer", icon: FileText },
      { label: "Exit Interviews", icon: MessageCircle },
      { label: "Full & Final", icon: Wallet },
      { label: "Alumni Network", icon: Users },
      { label: "Compliance Records", icon: ClipboardCheck },
    ],
  },
];

const COUNT = STAGES.length;

function polar(index: number, radius: number) {
  const angle = ((index / COUNT) * 360 - 90) * (Math.PI / 180);
  return {
    x: 50 + Math.cos(angle) * radius,
    y: 50 + Math.sin(angle) * radius,
  };
}

const GAP = 36;

const LABEL_LAYOUT = [
  { transform: `translate(-50%, calc(-100% - ${GAP}px))`, align: "center", nowrap: true },
  { transform: `translate(${GAP}px, -50%)`, align: "left", nowrap: true },
  { transform: `translate(${GAP}px, -50%)`, align: "left", nowrap: true },
  { transform: `translate(-50%, ${GAP}px)`, align: "center", nowrap: true },
  { transform: `translate(calc(-100% - ${GAP}px), -20%)`, align: "right", nowrap: true },
  { transform: `translate(calc(-100% - ${GAP}px), -50%)`, align: "right", nowrap: true },
  { transform: `translate(calc(-100% - ${GAP}px), -50%)`, align: "right", nowrap: true },
] as const;

export function EmployeeLifecycle() {
  const uid = useId();
  const [active, setActive] = useState(0);
  const stage = STAGES[active];
  const StageIcon = stage.icon;

  const prev = () => setActive((i) => (i - 1 + COUNT) % COUNT);
  const next = () => setActive((i) => (i + 1) % COUNT);

  return (
    <div>
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-3 flex items-center justify-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] text-gold">
          <span className="h-px w-10 bg-gold/50" aria-hidden />
          HRMS Platform
          <span className="h-px w-10 bg-gold/50" aria-hidden />
        </p>
        <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
          <span className="text-navy">One Platform for Your</span>
          <span className="mt-1 block text-gold">Entire Employee Lifecycle</span>
        </h2>
      </div>

      <div className="mt-12 grid items-center gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-6">
        <div
          className="relative mx-auto aspect-square w-full max-w-[600px]"
          role="listbox"
          aria-label="Employee lifecycle stages"
          aria-activedescendant={`${uid}-stage-${stage.id}`}
        >
          <svg className="pointer-events-none absolute inset-[18%] h-[64%] w-[64%]" viewBox="0 0 400 400" aria-hidden>
            <defs>
              <linearGradient id={`${uid}-ring`} x1="0.15" y1="0" x2="0.85" y2="1">
                <stop offset="0%" stopColor="#1677E8" />
                <stop offset="42%" stopColor="#1677E8" />
                <stop offset="72%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#F59E0B" />
              </linearGradient>
            </defs>
            <circle
              cx="200"
              cy="200"
              r="188"
              fill="none"
              stroke={`url(#${uid}-ring)`}
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <circle
              cx="200"
              cy="200"
              r="148"
              fill="none"
              stroke="#1677E8"
              strokeWidth="1.25"
              strokeDasharray="2.5 10"
              opacity="0.28"
            />
          </svg>

          <div className="absolute left-1/2 top-1/2 z-10 flex h-[138px] w-[138px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-[rgba(22,119,232,0.12)] bg-white shadow-[0_10px_40px_rgba(22,119,232,0.10)] sm:h-[156px] sm:w-[156px]">
            <Users className="h-9 w-9 text-primary sm:h-10 sm:w-10" strokeWidth={1.6} />
            <p className="mt-2 text-sm font-bold tracking-tight text-navy sm:text-base">Employee</p>
            <span className="mt-1 h-[3px] w-8 rounded-full bg-gold" aria-hidden />
          </div>

          {STAGES.map((item, index) => {
            const node = polar(index, 30);
            const Icon = item.icon;
            const selected = index === active;
            const layout = LABEL_LAYOUT[index];

            return (
              <div key={item.id}>
                <button
                  id={`${uid}-stage-${item.id}`}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  aria-label={`${String(index + 1).padStart(2, "0")}. ${item.name}`}
                  onClick={() => setActive(index)}
                  className={cn(
                    "absolute z-20 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border shadow-[0_8px_24px_rgba(8,32,56,0.08)] transition-all duration-300 sm:h-[52px] sm:w-[52px]",
                    selected
                      ? "scale-110 border-primary bg-primary text-white shadow-[0_10px_28px_rgba(22,119,232,0.35)]"
                      : item.tone === "gold"
                        ? "border-gold/25 bg-white text-gold hover:border-gold/50"
                        : "border-primary/20 bg-white text-primary hover:border-primary/50",
                  )}
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                >
                  <Icon className="h-5 w-5" strokeWidth={1.9} />
                </button>
                <p
                  className={cn(
                    "absolute z-10 hidden text-[12px] font-semibold leading-4 text-navy sm:block",
                    layout.align === "center" && "text-center",
                    layout.align === "left" && "text-left",
                    layout.align === "right" && "text-right",
                    layout.nowrap ? "whitespace-nowrap" : "w-[6.75rem]",
                  )}
                  style={{
                    left: `${node.x}%`,
                    top: `${node.y}%`,
                    transform: layout.transform,
                  }}
                >
                  <span className={cn("mr-1 tabular-nums", item.tone === "gold" ? "text-gold" : "text-primary")}>
                    {String(index + 1).padStart(2, "0")}.
                  </span>
                  {item.name}
                </p>
              </div>
            );
          })}
          <p className="absolute inset-x-0 bottom-1 text-center text-sm font-semibold text-navy sm:hidden">
            {String(active + 1).padStart(2, "0")}. {stage.name}
          </p>
        </div>

        <div className="relative overflow-hidden rounded-[28px] border border-[rgba(8,32,56,0.06)] bg-white p-6 shadow-[0_24px_60px_rgba(8,32,56,0.10)] sm:p-8">
          <div
            className="pointer-events-none absolute -right-8 -top-10 h-40 w-40 rounded-full bg-[rgba(22,119,232,0.10)]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute right-6 top-4 h-28 w-28 rounded-full border-[14px] border-gold-light/70"
            aria-hidden
          />

          <div key={stage.id} className="relative animate-fade-in-up">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-primary">
                  {String(active + 1).padStart(2, "0")}. {stage.name}
                </p>
                <h3 className="mt-3 max-w-[420px] text-2xl font-bold tracking-[-0.03em] text-navy sm:text-[1.75rem] sm:leading-snug">
                  {stage.title}
                </h3>
                <p className="mt-3 max-w-[460px] text-sm leading-6 text-slate-600 sm:text-[15px] sm:leading-7">
                  {stage.body}
                </p>
              </div>

              <div className="relative hidden h-[148px] w-[148px] shrink-0 sm:block">
                <div className="absolute -right-3 -top-4 h-36 w-36 rounded-full bg-[rgba(22,119,232,0.16)]" />
                <div className="absolute -right-1 -top-1 h-[7.5rem] w-[7.5rem] rounded-full border-[12px] border-[#FDE68A]" />
                <div className="relative h-full w-full overflow-hidden rounded-[22px] bg-gradient-to-br from-[#E8F2FF] to-white shadow-[0_12px_30px_rgba(22,119,232,0.12)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/lifecycle-portrait.jpg"
                    alt=""
                    className="h-full w-full object-cover object-[center_20%]"
                  />
                </div>
              </div>
            </div>

            <div className="mt-7">
              <p className="flex items-center gap-2 text-[12px] font-bold text-navy">
                <StageIcon className="h-4 w-4 text-primary" strokeWidth={2} />
                Key Capabilities
              </p>
              <ul className="mt-3 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                {stage.capabilities.map((cap) => {
                  const CapIcon = cap.icon;
                  return (
                    <li
                      key={cap.label}
                      className="flex items-center gap-2.5 rounded-xl border border-[rgba(8,32,56,0.08)] bg-soft-white px-3 py-2.5"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-primary shadow-sm">
                        <CapIcon className="h-4 w-4" strokeWidth={1.8} />
                      </span>
                      <span className="text-[12px] font-semibold leading-4 text-navy">{cap.label}</span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="mt-7 flex items-center justify-between gap-3">
              <Link
                href={stage.href}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-white shadow-[0_10px_24px_rgba(22,119,232,0.28)] transition-colors hover:bg-primary-hover"
              >
                {stage.cta}
                <span aria-hidden>→</span>
              </Link>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={prev}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(8,32,56,0.10)] bg-white text-navy shadow-sm transition-colors hover:border-primary/40 hover:text-primary"
                  aria-label="Previous stage"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(8,32,56,0.10)] bg-white text-navy shadow-sm transition-colors hover:border-primary/40 hover:text-primary"
                  aria-label="Next stage"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
