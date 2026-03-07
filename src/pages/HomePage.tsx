import React, { useState, useEffect } from 'react';
import VideoBackground from '@/components/VideoBackground';
import { motion, AnimatePresence, easeOut, Easing } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Toaster, toast } from 'sonner';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from '@/components/ui/sheet';
import { HeroPreviewCard } from '@/components/HeroPreviewCard';
import { NavPills } from '@/components/NavPills';
import { HeroDecorations } from '@/components/HeroDecorations';
import { cn } from '@/lib/utils';
import logo from '@/assets/logo.png';
const heroVariants = [
  {
    headline: "Think about it.",
    subhead: "WeTransfer is the simplest way to send your files around the world. Share large files and photos. Transfer up to 2GB free.",
    color: "#2F6BF6"
  },
  {
    headline: "Share effortlessly.",
    subhead: "Quick transfers up to 2GB free without hassle.",
    color: "#10B981"
  },
  {
    headline: "Files in flight.",
    subhead: "Lightning-fast sharing worldwide in seconds.",
    color: "#8B5CF6"
  },
  {
    headline: "Effortless collaboration.",
    subhead: "Team-friendly file exchange with real-time updates.",
    color: "#F59E0B"
  }
];
export function HomePage() {
  const [ctaVariant, setCtaVariant] = useState<'primary' | 'outline'>('primary');
  const [currentVariant, setCurrentVariant] = useState(2);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentVariant(prev => (prev + 1) % heroVariants.length);
    }, 30000); // Cycle every 30 seconds
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);
  const activeVariant = heroVariants[currentVariant];
  const handleCtaClick = () => {
    console.warn('CTA clicked', { timestamp: Date.now(), variant: 'Try it now' });
    toast.success('Coming soon!', {
      description: 'We are preparing something amazing for you.',
    });
  };
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: easeOut,
      },
    },
  };
  const textFadeVariant = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.8, ease: [0.42, 0, 0.58, 1] as Easing } },
    exit: { opacity: 0, transition: { duration: 0.4, ease: [0.42, 0, 0.58, 1] as Easing } },
  };
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white font-sans">
      <img src={logo} alt="App Logo" className="absolute top-4 left-4 sm:top-6 sm:left-6 lg:top-8 lg:left-8 h-14 w-auto z-30 rounded-md hover:scale-105 transition-transform duration-200" />
      <VideoBackground active={currentVariant === 2} />
      <HeroDecorations color={activeVariant.color} />
      <NavPills />
      <main className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="min-h-screen flex items-center py-16 md:py-24">
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center w-full"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="order-2 lg:order-1 flex justify-center">
                <HeroPreviewCard />
              </div>
              <div className="order-1 lg:order-2 text-center lg:text-left">
                  <AnimatePresence mode="wait">
                  <motion.h1
                    key={`headline-${currentVariant}`}
                    variants={textFadeVariant}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold font-display tracking-tighter text-[#17202A]"
                  >
                    {activeVariant.headline}
                  </motion.h1>
                  </AnimatePresence>
                  <AnimatePresence mode="wait">
                  <motion.p
                    key={`subhead-${currentVariant}`}
                    variants={textFadeVariant}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="mt-6 max-w-xl mx-auto lg:mx-0 text-lg md:text-xl text-gray-600"
                  >
                    {activeVariant.subhead}
                  </motion.p>
                </AnimatePresence>
                <motion.div
                  variants={itemVariants}
                  className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
                >
                  <Button
                    size="lg"
                    onClick={handleCtaClick}
                    onMouseEnter={() => setCtaVariant('outline')}
                    onMouseLeave={() => setCtaVariant('primary')}
                    style={{
                      '--variant-color': activeVariant.color,
                      '--variant-color-shadow': `${activeVariant.color}50`, // For shadow with alpha
                    } as React.CSSProperties}
                    className={cn(
                      "w-full sm:w-auto rounded-full px-8 py-6 text-base font-semibold shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 active:scale-95 border-2",
                      ctaVariant === 'primary'
                        ? 'bg-[--variant-color] text-white border-transparent shadow-[0_10px_15px_-3px_var(--variant-color-shadow)]'
                        : 'bg-transparent text-[--variant-color] border-[--variant-color]'
                    )}
                  >
                    Try it now
                  </Button>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button
                        variant="link"
                        aria-label="Learn more about our free trial"
                        className="text-gray-600 font-medium hover:text-[#2F6BF6]"
                      >
                        Learn more about our free trial
                      </Button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>Free Trial Information</SheetTitle>
                        <SheetDescription>
                          <ul className="list-disc list-inside space-y-2 mt-4 text-left">
                            <li>14-day premium access to all features.</li>
                            <li>No credit card required to get started.</li>
                            <li>Unlimited transfers up to 2GB per transfer.</li>
                            <li>Enhanced security and collaboration tools.</li>
                          </ul>
                        </SheetDescription>
                      </SheetHeader>
                    </SheetContent>
                  </Sheet>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Toaster richColors closeButton />
    </div>
  );
}