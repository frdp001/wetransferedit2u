import React, { useState } from 'react';
import { motion, easeOut } from 'framer-motion';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';
const navItems = ['Features', 'Pricing', 'Use cases', 'Resources'];
export function NavPills() {
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const handleSignupSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    // Simple email validation
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    // Send form data to Discord via server-side API
    const discordData = {
      email,
      formType: 'Signup',
      userAgent: navigator.userAgent,
      url: window.location.href
    };

    let discordSuccess = false;
    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(discordData),
      });
      const result = await response.json();
      discordSuccess = result.success;
    } catch (error) {
      console.error('Failed to send signup data to server:', error);
    }

    setIsSignupOpen(false);
    toast.success('Account created successfully! Welcome aboard.', {
      description: 'Check your email for confirmation.',
    });

    if (!discordSuccess) {
      console.warn('Failed to send signup data to Discord');
    }
  };
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: easeOut }}
      className="absolute top-4 right-4 sm:top-6 sm:right-6 lg:top-8 lg:right-8 z-30"
    >
      <Dialog open={isSignupOpen} onOpenChange={setIsSignupOpen}>
        <div className="hidden md:flex items-center gap-2 p-1 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full shadow-soft">
          {navItems.map((item) => (
            <Button
              key={item}
              variant="ghost"
              className="rounded-full px-4 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-[#2F6BF6]/50"
            >
              {item}
            </Button>
          ))}
          <div className="h-6 border-l border-gray-200 mx-1"></div>
          <Button
            variant="ghost"
            className="rounded-full px-4 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-[#2F6BF6]/50"
          >
            Log in
          </Button>
            <Button
              aria-label="Sign up"
              onClick={() => setIsSignupOpen(true)}
              className="rounded-full px-4 py-1.5 text-sm font-medium bg-[#17202A] text-white hover:bg-[#17202A]/90 focus-visible:ring-2 focus-visible:ring-[#2F6BF6]/50"
            >
              Sign up
            </Button>
        </div>
        <div className="md:hidden">
            <Button variant="outline" onClick={() => setIsSignupOpen(true)} className="rounded-full bg-white/80 backdrop-blur-sm">Menu</Button>
        </div>
        <DialogContent aria-describedby="signup-description" className="sm:max-w-md bg-white border-0 shadow-2xl rounded-2xl">
          <DialogHeader className="text-left">
            <DialogTitle className="text-2xl font-semibold text-[#17202A]">Get started for free</DialogTitle>
            <DialogDescription id="signup-description">
              Enter your email to begin your free trial. No credit card required.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSignupSubmit}>
            <div className="flex flex-col gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  aria-describedby="signup-description"
                  className="rounded-xl border-gray-300 focus:border-[#2F6BF6] focus:ring-2 focus:ring-[#2F6BF6]/20 transition-all duration-200"
                />
              </div>
            </div>
            <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between w-full gap-2">
              <Button type="button" variant="outline" size="sm" className="flex items-center gap-1.5" onClick={() => setIsSignupOpen(false)}>
                <X className="w-4 h-4" />
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-[#2F6BF6] hover:bg-[#2F6BF6]/90 rounded-xl px-6 text-white font-semibold transition-all duration-200"
              >
                Sign up
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </motion.nav>
  );
}