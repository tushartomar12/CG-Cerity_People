import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { Logo } from "./Logo";
import {
  IconFacebook,
  IconInstagram,
  IconLinkedIn,
  IconYouTube,
} from "./SocialIcons";

const footerColumns = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/contact" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "HR Technology",
    links: [
      { label: "HRMS", href: "/hr-tech" },
      { label: "Recruitment", href: "/hr-tech" },
      { label: "Payroll", href: "/hr-tech" },
      { label: "Attendance", href: "/hr-tech" },
      { label: "Leave Management", href: "/hr-tech" },
      { label: "Performance", href: "/hr-tech" },
    ],
  },
  {
    title: "Consulting",
    links: [
      { label: "HR Consulting", href: "/consulting" },
      { label: "Payroll Consulting", href: "/consulting" },
      { label: "Compliance", href: "/consulting" },
      { label: "HR Strategy", href: "/consulting" },
      { label: "Digital Transformation", href: "/consulting" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Insights", href: "/insights" },
      { label: "Guides", href: "/insights" },
      { label: "FAQs", href: "/#faq" },
    ],
  },
];

const social = [
  { href: siteConfig.social.linkedin, label: "LinkedIn", icon: IconLinkedIn },
  { href: siteConfig.social.facebook, label: "Facebook", icon: IconFacebook },
  { href: siteConfig.social.instagram, label: "Instagram", icon: IconInstagram },
  { href: siteConfig.social.youtube, label: "YouTube", icon: IconYouTube },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="container py-14">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-600">
              {siteConfig.description}
            </p>
            <div className="mt-6 flex gap-3">
              {social.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition-colors hover:border-slate-300 hover:text-navy"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" aria-hidden />
                </a>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            {footerColumns.map((col) => (
              <div key={col.title}>
                <h3 className="text-sm font-semibold text-navy">{col.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-slate-600 hover:text-navy"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 border-t border-slate-200 pt-8 lg:grid lg:grid-cols-2 lg:gap-6">
          <div className="text-sm text-slate-600">
            <p className="font-medium text-navy">Contact</p>
            <p className="mt-2">
              <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-navy">
                {siteConfig.contact.email}
              </a>
            </p>
            <p>
              <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`} className="hover:text-navy">
                {siteConfig.contact.phone}
              </a>
            </p>
            <p className="mt-1 max-w-md">{siteConfig.contact.address}</p>
          </div>
          <div className="mt-6 flex flex-wrap items-end justify-start gap-4 text-sm text-slate-500 lg:mt-0 lg:justify-end">
            <Link href="/privacy" className="hover:text-navy">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-navy">
              Terms & Conditions
            </Link>
            <Link href="/cookies" className="hover:text-navy">
              Cookie Policy
            </Link>
          </div>
        </div>
        <p className="mt-8 text-center text-sm text-slate-500">
          Copyright © {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
