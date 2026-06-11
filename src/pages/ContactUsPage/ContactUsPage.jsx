import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useForm, ValidationError } from '@formspree/react';

const ContactUsPage = () => {
  const [state, handleSubmit] = useForm('mgoblqbe');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    query: '',
  });

  const [phonePrefix, setPhonePrefix] = useState('+966');
  const [showPrefixDropdown, setShowPrefixDropdown] = useState(false);

  const dropdownRef = useRef(null);

  const countries = [
    { code: '+966', flag: '🇸🇦', name: 'Saudi Arabia' },
    { code: '+1', flag: '🇺🇸', name: 'United States' },
    { code: '+44', flag: '🇬🇧', name: 'United Kingdom' },
    { code: '+49', flag: '🇩🇪', name: 'Germany' },
    { code: '+33', flag: '🇫🇷', name: 'France' },
    { code: '+91', flag: '🇮🇳', name: 'India' },
    { code: '+61', flag: '🇦🇺', name: 'Australia' },
    { code: '+81', flag: '🇯🇵', name: 'Japan' },
  ];

  // Close country dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowPrefixDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Pre-populate query field from URL search params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlQuery = params.get('query');
    if (urlQuery) {
      setFormData(prev => ({ ...prev, query: urlQuery }));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main className="content z-1 relative flex flex-col bg-white" style={{ fontFamily: "'Inter', sans-serif" }}>
      <section className="section-contact mt-[100px] lg:mt-[120px] pb-64px lg:pb-88px bg-white">
        <div className="container">
          {/* Main outer border container matching Discovery solutions sections */}
          <div className="section-border section-border-top grid grid-cols-1 lg:grid-cols-2 border-b border-gray-600">

            {/* Left Column: Brand, Info, Social Links */}
            <div className="flex flex-col items-center lg:items-start px-sm sm:px-xl lg:px-80px py-lg lg:py-88px border-b border-gray-600 lg:border-b-0 lg:border-r lg:border-gray-600 justify-between gap-xl">
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-md w-full">


                {/* Heading */}
                <h1 className="text-[40px] sm:text-[48px] font-semibold leading-[1.15] text-black tracking-tight mt-xs max-w-[420px]">
                  Get in Touch with Snapsec Team
                </h1>

                {/* Email link info block */}
                <div className="flex flex-col gap-xxs mt-sm">
                  <span className="text-[12px] font-semibold text-gray-900 tracking-[0.16em] uppercase">
                    Email
                  </span>
                  <a
                    href="mailto:support@snapsec.co"
                    className="text-[20px] sm:text-[24px] font-semibold text-black hover:text-primary transition-colors"
                  >
                    support@snapsec.co
                  </a>

                </div>

                {/* WhatsApp info block */}
                <div className="flex flex-col gap-xxs mt-sm">
                  <span className="text-[12px] font-semibold text-gray-900 tracking-[0.16em] uppercase">
                    WhatsApp
                  </span>
                  <a
                    href="https://wa.me/917780908136"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[20px] sm:text-[24px] font-semibold text-black hover:text-primary transition-colors"
                  >
                    +91 77809 08136
                  </a>
                </div>
              </div>

              {/* Social Channels Section */}
              <div className="flex flex-col gap-xs w-full items-center lg:items-start mt-lg">
                <span className="text-[12px] font-semibold text-gray-900 tracking-[0.16em] uppercase">
                  We're also here
                </span>
                <div className="flex items-center gap-md mt-xxs">
                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/company/snapsec"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black hover:text-primary transition-colors"
                    aria-label="LinkedIn"
                  >
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>

                  {/* X (Twitter) */}
                  <a
                    href="https://x.com/snapsec_co"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black hover:text-primary transition-colors"
                    aria-label="X"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>

                  {/* YouTube */}
                  <a
                    href="https://www.youtube.com/@snapsec"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black hover:text-primary transition-colors"
                    aria-label="YouTube"
                  >
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.163c-.272-1.016-1.073-1.815-2.09-2.087-1.843-.497-9.257-.497-9.257-.497s-7.414 0-9.258.497c-1.016.272-1.817 1.07-2.088 2.087-.497 1.842-.497 5.69-.497 5.69s0 3.847.497 5.69c.271 1.016 1.072 1.818 2.088 2.09 1.844.496 9.258.496 9.258.496s7.414 0 9.257-.496c1.017-.272 1.818-1.074 2.09-2.09.497-1.843.497-5.69.497-5.69s0-3.848-.497-5.69zm-14.288 9.252v-6.84l6.19 3.42-6.19 3.42z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Dynamic Form Block */}
            <div className="px-sm sm:px-xl lg:px-80px py-lg lg:py-88px bg-white flex flex-col justify-center">
              {state.succeeded ? (
                <div className="flex flex-col items-center text-center gap-md max-w-[500px] w-full mx-auto py-xl">
                  <div className="w-16 h-16 rounded-full bg-[#E8F5E9] border border-[#C8E6C9] flex items-center justify-center text-[#2E7D32] mb-xs">
                    <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-[24px] font-bold text-black tracking-tight font-['Space_Grotesk']">Message Sent!</h2>
                  <p className="text-[14px] text-gray-900 leading-[1.6] max-w-[320px]">
                    Thank you for reaching out. We have received your inquiry and will get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-sm max-w-[500px] w-full mx-auto">
                  <input type="hidden" name="phone_prefix" value={phonePrefix} />

                  {/* Full Name */}
                  <div className="flex flex-col gap-[6px]">
                    <label htmlFor="fullName" className="text-[13px] font-semibold text-black leading-none">
                      Full name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      required
                      placeholder="John Doc"
                      className="h-[48px] px-sm border border-gray-600 rounded-[6px] bg-white focus:border-black focus:outline-none transition-all placeholder-gray-500 text-[14px] font-normal"
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                    <ValidationError prefix="Full Name" field="fullName" errors={state.errors} className="text-red-500 text-[12px] mt-[2px]" />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-[6px]">
                    <label htmlFor="email" className="text-[13px] font-semibold text-black leading-none">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="johndoc@example.com"
                      className="h-[48px] px-sm border border-gray-600 rounded-[6px] bg-white focus:border-black focus:outline-none transition-all placeholder-gray-500 text-[14px] font-normal"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-[12px] mt-[2px]" />
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-[6px]">
                    <label htmlFor="phone" className="text-[13px] font-semibold text-black leading-none">
                      Phone
                    </label>
                    <div
                      ref={dropdownRef}
                      className="relative flex items-center h-[48px] border border-gray-600 rounded-[6px] bg-white focus-within:border-black transition-all"
                    >
                      {/* Country Trigger inside the same box without borders */}
                      <button
                        type="button"
                        className="flex items-center gap-[4px] px-sm h-full hover:bg-gray-50 transition-colors select-none rounded-l-[6px]"
                        onClick={() => setShowPrefixDropdown(!showPrefixDropdown)}
                      >
                        <span className="text-[18px] leading-none">
                          {countries.find((c) => c.code === phonePrefix)?.flag}
                        </span>
                        <svg width="8" height="6" viewBox="0 0 8 6" fill="none" className="text-gray-900 mt-[1px]">
                          <path d="M1 1.5L4 4.5L7 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="text-[14px] font-medium text-black ml-[4px]">
                          {phonePrefix}
                        </span>
                      </button>

                      {/* Dropdown Panel */}
                      {showPrefixDropdown && (
                        <div className="absolute left-0 top-full mt-[4px] z-50 bg-white border border-gray-600 rounded-[6px] shadow-lg max-h-[220px] overflow-y-auto w-[180px]">
                          {countries.map((c) => (
                            <button
                              key={c.code}
                              type="button"
                              className="flex items-center gap-xs px-sm py-[8px] w-full text-left hover:bg-gray-100 transition-colors"
                              onClick={() => {
                                setPhonePrefix(c.code);
                                setShowPrefixDropdown(false);
                              }}
                            >
                              <span className="text-[18px]">{c.flag}</span>
                              <span className="text-[14px] font-medium text-black">{c.code}</span>
                              <span className="text-[11px] text-gray-500 truncate ml-auto">{c.name}</span>
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Numeric Input part of the same clean box */}
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder=" "
                        className="flex-1 h-full px-sm outline-none bg-transparent text-[14px] font-normal border-none"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <ValidationError prefix="Phone" field="phone" errors={state.errors} className="text-red-500 text-[12px] mt-[2px]" />
                  </div>

                  {/* Company */}
                  <div className="flex flex-col gap-[6px]">
                    <label htmlFor="company" className="text-[13px] font-semibold text-black leading-none">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      placeholder="Contoso"
                      className="h-[48px] px-sm border border-gray-600 rounded-[6px] bg-white focus:border-black focus:outline-none transition-all placeholder-gray-500 text-[14px] font-normal"
                      value={formData.company}
                      onChange={handleChange}
                    />
                    <ValidationError prefix="Company" field="company" errors={state.errors} className="text-red-500 text-[12px] mt-[2px]" />
                  </div>

                  {/* Query / Message */}
                  <div className="flex flex-col gap-[6px]">
                    <label htmlFor="query" className="text-[13px] font-semibold text-black leading-none">
                      How can we help you?
                    </label>
                    <textarea
                      id="query"
                      name="query"
                      rows={4}
                      placeholder="Tell us about your security needs, questions, or comments..."
                      className="py-xs px-sm border border-gray-600 rounded-[6px] bg-white focus:border-black focus:outline-none transition-all placeholder-gray-500 text-[14px] font-normal resize-none"
                      value={formData.query}
                      onChange={handleChange}
                    />
                    <ValidationError prefix="Query" field="query" errors={state.errors} className="text-red-500 text-[12px] mt-[2px]" />
                  </div>

                  {/* Consent notice text */}
                  <p className="text-[11px] text-gray-900 leading-[1.5] mt-xs font-normal">
                    By submitting this form, I confirm that I have read the privacy policy and agree that my name and email address will be collected and used by Snapsec for the purposes of sending marketing communication, promotions and updates. You can withdraw your consent at any time by unsubscribing or contacting us via{' '}
                    <a href="mailto:support@snapsec.co" className="underline font-medium hover:text-black transition-colors">
                      support@snapsec.co
                    </a>
                  </p>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={state.submitting}
                    className="h-[48px] w-full mt-sm bg-black text-white hover:bg-[#222] transition-colors font-semibold text-[15px] rounded-[6px] text-center flex items-center justify-center cursor-pointer disabled:opacity-50"
                  >
                    {state.submitting ? 'Submitting...' : 'Submit'}
                  </button>

                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactUsPage;
