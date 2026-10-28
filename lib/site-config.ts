/**
 * Central brand & contact configuration — customize here for production.
 */
export const siteConfig = {
  name: "Cerity People",
  legalName: "Cerity People Technologies Pvt. Ltd.",
  tagline: "Digitally Enabled. Expertly Managed.",
  description:
    "Practical HR support and technology-driven solutions to help businesses manage people, streamline HR processes, and support growth.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ceritypeople.com",
  locale: "en_US",
  contact: {
    email: "hello@ceritypeople.com",
    phone: "+91 80 1234 5678",
    address: "Level 12, Tech Park Tower, Bengaluru, Karnataka 560001, India",
    businessHours: "Mon–Fri, 9:00 AM – 6:00 PM IST",
  },
  social: {
    linkedin: "https://www.linkedin.com/company/cerity-people",
    facebook: "https://facebook.com/ceritypeople",
    instagram: "https://www.instagram.com/ceritypeople",
    youtube: "https://youtube.com/@ceritypeople",
  },
  colors: {
    primary: "#1677E8",
    gold: "#F59E0B",
    goldLight: "#FDE68A",
    cream: "#FFFBEB",
    navy: "#102840",
    darkBlue: "#082038",
    white: "#FFFFFF",
    softWhite: "#F8F8F8",
  },
} as const;

export const navLinks: { href: string; label: string; navHidden?: boolean }[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/hr-tech", label: "HR Tech" },
  { href: "/consulting", label: "Consulting" },
  { href: "/solutions", label: "Solutions" },
  { href: "/insights", label: "Insights", navHidden: true },
  { href: "/contact", label: "Contact" },
];
