import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";
import { useRef } from "react";
import { AboutSection } from "./components/AboutSection";
import { Background } from "./components/Background";
import { BusinessInfo } from "./components/BusinessInfo";
import { FloatingContactBar } from "./components/FloatingContactBar";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { ProfileCard } from "./components/ProfileCard";
import { ServicesSection } from "./components/ServicesSection";
import { ToastProvider } from "./components/ToastProvider";

export default function App() {
  const actionsRef = useRef<HTMLDivElement>(null);

  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <ToastProvider>
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <Background />
          <div id="top" className="relative min-h-dvh">
            <Header />
            <main id="main" tabIndex={-1} className="mx-auto max-w-[1200px] px-4 pt-3 outline-none sm:px-6 lg:px-8 lg:pt-6">
              <div className="mx-auto grid w-full max-w-xl items-start gap-5 lg:max-w-none lg:grid-cols-[minmax(0,25rem)_minmax(0,1fr)] lg:gap-8">
                <div className="lg:[@media(min-height:880px)]:sticky lg:[@media(min-height:880px)]:top-24">
                  <ProfileCard actionsRef={actionsRef} />
                </div>
                <div className="grid gap-5 lg:gap-6">
                  <AboutSection />
                  <ServicesSection />
                  <BusinessInfo />
                </div>
              </div>
            </main>
            <Footer />
          </div>
          <FloatingContactBar watchRef={actionsRef} />
        </ToastProvider>
      </MotionConfig>
    </LazyMotion>
  );
}
