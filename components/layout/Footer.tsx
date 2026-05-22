import Link from "next/link";
import { MessageCircle, Instagram, Linkedin, Youtube, type LucideIcon } from "lucide-react";

import { SITE_CONFIG, NAV_LINKS, SOCIAL_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const iconRegistry: Record<string, LucideIcon> = {
  MessageCircle,
  Instagram,
  Linkedin,
  Youtube
};

export function Footer(): React.JSX.Element {
  return (
    <footer className="bg-[#131313] border-t border-outline-variant/20 py-16 px-5 md:px-10">
      <div className="mx-auto max-w-container">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
          {/* Column 1: Brand Info */}
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="font-hanken text-[1.5rem] font-bold tracking-[-0.03em] text-white hover:text-primary transition-colors duration-200"
            >
              {SITE_CONFIG.brandMark}
            </Link>
            <p className="text-body-md text-on-surface-variant leading-relaxed max-w-sm">
              {SITE_CONFIG.tagline}
            </p>
            <p className="text-[12px] text-on-surface-variant/50 font-inter mt-4">
              © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
            </p>
          </div>

          {/* Column 2: Navigation Sitemap */}
          <div className="flex flex-col gap-4">
            <span className="font-inter text-label-caps text-white font-semibold tracking-wider">
              Explore
            </span>
            <nav className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-inter text-body-md text-on-surface-variant hover:text-primary transition-colors duration-200 w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3: Connect & Socials */}
          <div className="flex flex-col gap-4">
            <span className="font-inter text-label-caps text-white font-semibold tracking-wider">
              Connect
            </span>
            <nav className="flex flex-col gap-3">
              {SOCIAL_LINKS.map((link) => {
                const IconComponent = iconRegistry[link.icon] || MessageCircle;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 font-inter text-body-md text-on-surface-variant hover:text-white transition-colors duration-200 group w-fit"
                  >
                    <div className="transition-colors duration-200">
                      <IconComponent className={cn("h-4 w-4 group-hover:stroke-current", link.color)} aria-hidden="true" />
                    </div>
                    <span>{link.label}</span>
                  </a>
                );
              })}
              <div className="border-t border-outline-variant/10 my-2 pt-2">
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="font-inter text-body-sm text-primary hover:underline transition-all duration-200 block"
                >
                  {SITE_CONFIG.email}
                </a>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}

