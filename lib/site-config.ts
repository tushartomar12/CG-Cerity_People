/**
 * Central brand & contact configuration — customize here for production.
 */
export const siteConfig = {
  name: "Cerity People",
  legalName: "Cerity People Technologies Pvt. Ltd.",
  tagline: "HR Technology & Consulting",
  description:
    "Modern HRMS, payroll, and HR consulting for growing businesses. Simplify HR operations, improve compliance, and scale your workforce.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ceritypeople.com",
  locale: "en_US",
  contact: {
    email: "hello@ceritypeople.com",
    phone: "+91 80 1234 5678",
    address: "Level 12, Tech Park Tower, Bengaluru, Karnataka 560001, India",
    businessHours: "Mon–Fri, 9:00 AM – 6:00 PM IST",
  },
  social: {
    linkedin: "https://linkedin.com/company/ceritypeople",
    facebook: "https://facebook.com/ceritypeople",
    instagram: "https://instagram.com/ceritypeople",
    youtube: "https://youtube.com/@ceritypeople",
  },
  colors: {
    navy: "#0f2744",
    blue: "#1d4ed8",
    accent: "#0d9488",
  },
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/hr-tech", label: "HR Tech" },
  { href: "/consulting", label: "Consulting" },
  { href: "/solutions", label: "Solutions" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
] as const;
