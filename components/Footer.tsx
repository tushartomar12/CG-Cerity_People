"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
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
      { label: "Guides", href: "/insights" },
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
  const pathname = usePathname();
  const isContact = pathname === "/contact" || pathname.startsWith("/contact/");

  return (
    <footer
      className={cn(
        "relative overflow-hidden border-t",
        isContact ? "border-white/15" : "border-[rgba(8,32,56,0.08)]",
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-70" />
      <div className="container relative py-14">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo inverted={isContact} />
            <p
              className={cn(
                "mt-4 max-w-sm text-sm leading-relaxed",
                isContact ? "text-white/80" : "text-slate-600",
              )}
            >
              {siteConfig.description}
            </p>
            <div className="mt-6 flex gap-3">
              {social.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-lg border transition-colors",
                    isContact
                      ? "border-white/20 bg-white/10 text-white hover:border-gold/50 hover:text-gold-light"
                      : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-navy",
                  )}
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
                <h3 className={cn("text-sm font-semibold", isContact ? "text-white" : "text-navy")}>
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className={cn(
                          "text-sm",
                          isContact ? "text-white/80 hover:text-gold-light" : "text-slate-600 hover:text-navy",
                        )}
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
        <div
          className={cn(
            "mt-10 border-t pt-8 lg:grid lg:grid-cols-2 lg:gap-6",
            isContact ? "border-white/15" : "border-slate-200",
          )}
        >
          <div className={cn("text-sm", isContact ? "text-white/80" : "text-slate-600")}>
            <p className={cn("font-medium", isContact ? "text-white" : "text-navy")}>Contact</p>
            <p className="mt-2">
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className={isContact ? "hover:text-gold-light" : "hover:text-navy"}
              >
                {siteConfig.contact.email}
              </a>
            </p>
            <p>
              <a
                href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                className={isContact ? "hover:text-gold-light" : "hover:text-navy"}
              >
                {siteConfig.contact.phone}
              </a>
            </p>
            <p className="mt-1 max-w-md">{siteConfig.contact.address}</p>
          </div>
          <div
            className={cn(
              "mt-6 flex flex-wrap items-end justify-start gap-4 text-sm lg:mt-0 lg:justify-end",
              isContact ? "text-white/70" : "text-slate-500",
            )}
          >
            <Link href="/privacy" className={isContact ? "hover:text-gold-light" : "hover:text-navy"}>
              Privacy Policy
            </Link>
            <Link href="/terms" className={isContact ? "hover:text-gold-light" : "hover:text-navy"}>
              Terms & Conditions
            </Link>
            <Link href="/cookies" className={isContact ? "hover:text-gold-light" : "hover:text-navy"}>
              Cookie Policy
            </Link>
          </div>
        </div>
        <p className={cn("mt-8 text-center text-sm", isContact ? "text-white/70" : "text-slate-500")}>
          Copyright © {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
