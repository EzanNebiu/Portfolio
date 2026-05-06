import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Send, AlertCircle, CheckCircle } from 'lucide-react';
import { personal } from '@/data/personal';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { SectionHeading } from '@/components/common/SectionHeading';
import { Button } from '@/components/common/Button';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/utils/cn';

const contactMethods = [
  {
    icon: Mail,
    label: 'Email',
    value: personal.email,
    href: `mailto:${personal.email}`,
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'Connect on LinkedIn',
    href: personal.linkedInUrl,
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'Follow on GitHub',
    href: personal.gitHubUrl,
  },
];

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const prefersReducedMotion = useReducedMotion();
  const formRef = useRef<HTMLFormElement>(null);
  const submitTimeRef = useRef<number>(0);

  // Email validation regex
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const disposableEmailDomains = [
      'tempmail.com', 'throwaway.email', '10minutemail.com', 'guerrillamail.com',
      'mailinator.com', 'trashmail.com', 'sharklasers.com', 'temp-mail.org',
    ];
    
    if (!emailRegex.test(email)) return false;
    
    const domain = email.split('@')[1]?.toLowerCase();
    return !disposableEmailDomains.includes(domain);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Time-based bot protection (form must be filled for at least 3 seconds)
    const timeSincePageLoad = Date.now() - submitTimeRef.current;
    if (timeSincePageLoad < 3000) {
      setStatus('error');
      setErrorMessage('Please take your time filling out the form.');
      return;
    }

    // Validate email
    if (!isValidEmail(formData.email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    // Basic spam keyword detection
    const spamKeywords = ['viagra', 'casino', 'lottery', 'prize', 'congratulations', 'click here'];
    const messageContent = formData.message.toLowerCase();
    const hasSpam = spamKeywords.some(keyword => messageContent.includes(keyword));
    
    if (hasSpam) {
      setStatus('error');
      setErrorMessage('Your message contains prohibited content.');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      // Using Web3Forms API (free, no backend needed)
      // Get your access key from https://web3forms.com/
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `New Contact Form Message from ${formData.name}`,
          from_name: 'Portfolio Contact Form',
          botcheck: '', // Honeypot field
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setStatus('idle');
        }, 5000);
      } else {
        throw new Error(data.message || 'Failed to send message');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('Failed to send message. Please try again or email me directly.');
      console.error('Form submission error:', error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // Record the first interaction time for bot detection
    if (submitTimeRef.current === 0) {
      submitTimeRef.current = Date.now();
    }

    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    // Clear error message when user starts typing
    if (status === 'error') {
      setStatus('idle');
      setErrorMessage('');
    }
  };

  return (
    <SectionWrapper id="contact" className="bg-navy-800/50 rounded-t-2xl">
      <SectionHeading
        title="Get In Touch"
        subtitle="Have a question or want to work together? I'd love to hear from you!"
      />

      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <motion.a
                key={method.label}
                href={method.href}
                target={method.label !== 'Email' ? '_blank' : undefined}
                rel={method.label !== 'Email' ? 'noopener noreferrer' : undefined}
                className="flex flex-col items-center text-center p-6 bg-navy-700 rounded-xl border border-white/10 hover:border-blue/50 transition-all group"
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={prefersReducedMotion ? {} : { y: -4 }}
              >
                <Icon className="text-blue group-hover:text-blue-light transition-colors mb-3" size={32} />
                <h3 className="text-text-primary font-semibold mb-1">
                  {method.label}
                </h3>
                <p className="text-sm text-text-secondary">
                  {method.value}
                </p>
              </motion.a>
            );
          })}
        </div>

        <motion.div
          className="bg-navy-700 rounded-2xl border border-white/10 p-8"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h3 className="text-xl font-bold text-text-primary mb-6">
            Send a Message
          </h3>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            {/* Honeypot field (hidden from users, catches bots) */}
            <input
              type="text"
              name="botcheck"
              style={{ display: 'none' }}
              tabIndex={-1}
              autoComplete="off"
            />

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-text-secondary mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                minLength={2}
                maxLength={100}
                disabled={status === 'submitting'}
                className={cn(
                  'w-full px-4 py-3 bg-navy-800 border border-white/10 rounded-lg',
                  'text-text-primary placeholder-text-muted',
                  'focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent',
                  'transition-all',
                  'disabled:opacity-50 disabled:cursor-not-allowed'
                )}
                placeholder="Your name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-text-secondary mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                maxLength={255}
                disabled={status === 'submitting'}
                className={cn(
                  'w-full px-4 py-3 bg-navy-800 border border-white/10 rounded-lg',
                  'text-text-primary placeholder-text-muted',
                  'focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent',
                  'transition-all',
                  'disabled:opacity-50 disabled:cursor-not-allowed'
                )}
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-text-secondary mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                minLength={10}
                maxLength={5000}
                rows={5}
                disabled={status === 'submitting'}
                className={cn(
                  'w-full px-4 py-3 bg-navy-800 border border-white/10 rounded-lg',
                  'text-text-primary placeholder-text-muted',
                  'focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent',
                  'transition-all resize-none',
                  'disabled:opacity-50 disabled:cursor-not-allowed'
                )}
                placeholder="Tell me about your project or just say hi..."
              />
            </div>

            <Button 
              variant="primary" 
              type="submit" 
              className="w-full"
              disabled={status === 'submitting'}
            >
              {status === 'submitting' ? 'Sending...' : status === 'success' ? 'Message Sent!' : 'Send Message'}
              {status === 'success' ? <CheckCircle size={18} /> : <Send size={18} />}
            </Button>

            {/* Success Message */}
            {status === 'success' && (
              <motion.div
                className="flex items-center gap-2 p-4 bg-green-500/10 border border-green-500/30 rounded-lg"
                initial={prefersReducedMotion ? {} : { opacity: 0, y: -10 }}
                animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              >
                <CheckCircle className="text-green-400 flex-shrink-0" size={20} />
                <p className="text-green-400 text-sm">
                  Thank you for your message! I'll get back to you soon.
                </p>
              </motion.div>
            )}

            {/* Error Message */}
            {status === 'error' && errorMessage && (
              <motion.div
                className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/30 rounded-lg"
                initial={prefersReducedMotion ? {} : { opacity: 0, y: -10 }}
                animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              >
                <AlertCircle className="text-red-400 flex-shrink-0" size={20} />
                <p className="text-red-400 text-sm">{errorMessage}</p>
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
