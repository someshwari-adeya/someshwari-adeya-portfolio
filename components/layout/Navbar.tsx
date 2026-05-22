"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { NAV_ARIA, NAV_LINKS, PAGE_IDS, SITE_CONFIG, UI_COPY } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Navbar(): React.JSX.Element {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState("");

  useEffect(() => {
    // If pathname is not "/", activeHref matches page prefix
    if (pathname !== "/") {
      if (pathname.startsWith("/projects")) {
        setActiveHref("/projects");
      } else if (pathname.startsWith("/about")) {
        setActiveHref("/about");
      } else if (pathname.startsWith("/blog")) {
        setActiveHref("/blog");
      } else {
        setActiveHref(pathname);
      }
      
      const onScrollStatic = (): void => {
        setIsScrolled(window.scrollY > 24);
      };
      
      onScrollStatic();
      window.addEventListener("scroll", onScrollStatic, { passive: true });
      return () => {
        window.removeEventListener("scroll", onScrollStatic);
      };
    }

    // Pathname is "/"
    const handleScrollAndHash = () => {
      const hash = window.location.hash;
      if (hash) {
        setActiveHref(`/${hash}`);
        return;
      }

      // Track scroll positions for approach and services
      const sections = ["approach", "services"];
      let currentSection = "";
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            currentSection = sectionId;
            break;
          }
        }
      }

      if (currentSection) {
        setActiveHref(`/#${currentSection}`);
      } else {
        if (window.scrollY < 200) {
          setActiveHref("/#approach");
        }
      }
    };

    const onScroll = (): void => {
      setIsScrolled(window.scrollY > 24);
      handleScrollAndHash();
    };

    const onHashChange = (): void => {
      handleScrollAndHash();
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("hashchange", onHashChange);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [pathname]);

  const navLinkClassName = useMemo(
    () =>
      "relative pb-2 text-label-caps text-on-surface-variant hover:text-primary",
    []
  );

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        isScrolled
          ? "border-b border-outline-variant bg-surface-container-lowest/85 shadow-navbar backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex max-w-container items-center justify-between gap-6 px-5 py-4 md:px-10">
        <Link
          href={pathname === "/" ? `#${PAGE_IDS.top}` : "/"}
          className="font-hanken text-xl font-bold tracking-[-0.03em] text-on-surface"
        >
          {SITE_CONFIG.brandMark}
        </Link>

        <nav
          aria-label={NAV_ARIA.navLabel}
          className="hidden items-center gap-8 md:flex"
        >
          {NAV_LINKS.map((link) => {
            const isActive = activeHref === link.href || (link.href === "/projects" && activeHref.startsWith("/projects"));

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  navLinkClassName,
                  isActive ? "text-primary" : undefined
                )}
                onClick={() => setActiveHref(link.href)}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute inset-x-0 bottom-0 h-px origin-left bg-primary transition-transform duration-300",
                    isActive ? "scale-x-100" : "scale-x-0"
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Button asChild variant="primary">
            <Link href={`mailto:${SITE_CONFIG.email}`}>{SITE_CONFIG.consultationLabel}</Link>
          </Button>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <button
              type="button"
              aria-label={NAV_ARIA.openMenu}
              className="inline-flex items-center justify-center rounded border border-outline-variant p-2 text-on-surface md:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader className="pr-10">
              <SheetTitle>{SITE_CONFIG.brandMark}</SheetTitle>
              <SheetDescription>{UI_COPY.mobileMenuDescription}</SheetDescription>
            </SheetHeader>
            <div className="mt-8 flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <SheetClose asChild key={link.href}>
                  <Link
                    href={link.href}
                    className="rounded border border-transparent px-1 py-2 font-hanken text-xl font-medium text-on-surface transition-colors hover:text-primary"
                    onClick={() => setActiveHref(link.href)}
                  >
                    {link.label}
                  </Link>
                </SheetClose>
              ))}
            </div>
            <Button asChild variant="primary" className="mt-8 w-full">
              <Link href={`mailto:${SITE_CONFIG.email}`}>{SITE_CONFIG.consultationLabel}</Link>
            </Button>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

