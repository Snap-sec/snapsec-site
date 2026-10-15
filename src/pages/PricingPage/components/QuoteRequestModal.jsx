import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const QuoteRequestModal = ({
  isOpen,
  onClose,
  onSubmit,
  selectedCount,
  total,
  fmt,
  isGenerating,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  // Pre-populate previously stored info
  useEffect(() => {
    if (isOpen) {
      try {
        const savedName = localStorage.getItem('snapsec_quote_name') || '';
        const savedEmail = localStorage.getItem('snapsec_quote_email') || '';
        setName(savedName);
        setEmail(savedEmail);
        setError('');
      } catch {
        // Ignore localStorage error
      }
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your full name');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    // Save for convenience
    try {
      localStorage.setItem('snapsec_quote_name', name.trim());
      localStorage.setItem('snapsec_quote_email', email.trim());
    } catch {
      // Ignore
    }

    setError('');
    onSubmit({ name: name.trim(), email: email.trim() });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-sm sm:p-md">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-[2px]"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-[440px] bg-white rounded-12 border border-gray-300 shadow-2xl p-md sm:p-lg"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 text-gray-500 hover:text-black rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Header */}
            <div className="flex flex-col gap-xxs mb-md pr-6">
              <span className="label-text-s text-gray-800">Generate Quote</span>
              <h3 className="body-heading-xl text-black">Your Contact Details</h3>
              <p className="body-text-xxs text-gray-800">
                Please provide your name and email to personalize and download your official PDF quote.
              </p>
            </div>

            {/* Estimate Snapshot */}
            <div className="mb-md p-sm bg-[#F8FAFC] border border-gray-200 rounded-8 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="body-text-xxxs text-gray-800 font-medium">Selected Stack</span>
                <span className="body-text-xs font-semibold text-black">
                  {selectedCount} {selectedCount === 1 ? 'module' : 'modules'}
                </span>
              </div>
              <div className="flex flex-col text-right">
                <span className="body-text-xxxs text-gray-800 font-medium">Estimated Total</span>
                <span className="body-text-s font-bold text-black tabular-nums">
                  {fmt(total)} <span className="text-[10px] font-normal text-gray-800">/yr</span>
                </span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-sm">
              <div className="flex flex-col gap-xxs">
                <label htmlFor="quote-name" className="body-text-xxs font-medium text-gray-900">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="quote-name"
                  type="text"
                  required
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Morgan"
                  className="w-full h-[42px] px-sm rounded-6 border border-gray-300 bg-white text-[14px] text-black outline-none transition-colors focus:border-black focus:ring-1 focus:ring-black"
                />
              </div>

              <div className="flex flex-col gap-xxs">
                <label htmlFor="quote-email" className="body-text-xxs font-medium text-gray-900">
                  Work Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="quote-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. alex@company.com"
                  className="w-full h-[42px] px-sm rounded-6 border border-gray-300 bg-white text-[14px] text-black outline-none transition-colors focus:border-black focus:ring-1 focus:ring-black"
                />
              </div>

              {error && (
                <p className="text-[12px] text-red-600 font-medium">{error}</p>
              )}

              <button
                type="submit"
                disabled={isGenerating}
                className="group button-primary-m w-full justify-center mt-xs cursor-pointer"
              >
                <span className="flex items-center gap-xs">
                  {isGenerating ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Creating PDF...
                    </>
                  ) : (
                    <>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                      Download Quote PDF
                    </>
                  )}
                </span>
              </button>

              <p className="text-[11px] text-gray-500 text-center mt-xxs">
                Instant PDF download • Valid for 30 days
              </p>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default QuoteRequestModal;
