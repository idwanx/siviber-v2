import { ArrowUpRight, Badge, CirclePlay, SunIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import AppLogo from "@/components/app-logo";
import { BackgroundPattern } from "@/components/background-pattern";
import { Link } from "@inertiajs/react";
import Hero from "./hero";
import Footer from "./footer";

const Navbar = () => {
  return (
    <>
      <nav className="fixed z-10 top-6 inset-x-4 h-14 xs:h-16 bg-background/50 backdrop-blur-sm border dark:border-slate-700/70 max-w-screen-xl mx-auto rounded-full">
        <div className="h-full flex items-center justify-between mx-auto px-4">
          <AppLogo />
          {/* Desktop Menu */}
          <NavMenu className="hidden md:block" />

          <div className="flex items-center gap-3">
            <Button size="icon" variant="outline">
              <SunIcon />
            </Button>
            <Button variant="outline" className="hidden sm:inline-flex">
              Sign In
            </Button>
            <Button className="hidden xs:inline-flex">Get Started</Button>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <NavigationSheet />
            </div>
          </div>
        </div>
      </nav>
      <main className="pt-16 xs:pt-20 sm:pt-24">
        <Hero />
        {/* <Features />
        <Pricing />
        <FAQ />
        <Testimonials />
        <CTABanner /> */}
        {/* <Footer /> */}
      </main>
    </>
  );
};

export default Navbar;
