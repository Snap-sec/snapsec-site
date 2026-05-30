import React, { useState } from 'react';

const ContactFormSection = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <section className="section-contact-form py-64px lg:py-88px bg-gray-50 border-y-[0.5px] border-gray-600">
      <div className="container max-w-[800px]">
        <div className="bg-white p-lg sm:p-xl rounded-16 border-[0.5px] border-gray-600 shadow-sm">
          <h2 className="heading-h3 mb-lg text-center">Get in Touch</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-md">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
              <div className="flex flex-col gap-xs">
                <label htmlFor="firstName" className="label-text-m">First Name *</label>
                <input 
                  type="text" 
                  id="firstName" 
                  name="firstName" 
                  required 
                  className="h-[48px] px-sm border-[0.5px] border-gray-400 rounded-8 bg-gray-50 focus:bg-white focus:border-blue-500 focus:outline-none transition-all"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-xs">
                <label htmlFor="lastName" className="label-text-m">Last Name *</label>
                <input 
                  type="text" 
                  id="lastName" 
                  name="lastName" 
                  required 
                  className="h-[48px] px-sm border-[0.5px] border-gray-400 rounded-8 bg-gray-50 focus:bg-white focus:border-blue-500 focus:outline-none transition-all"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex flex-col gap-xs">
              <label htmlFor="email" className="label-text-m">Business Email *</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                required 
                className="h-[48px] px-sm border-[0.5px] border-gray-400 rounded-8 bg-gray-50 focus:bg-white focus:border-blue-500 focus:outline-none transition-all"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-xs">
              <label htmlFor="company" className="label-text-m">Company Name</label>
              <input 
                type="text" 
                id="company" 
                name="company" 
                className="h-[48px] px-sm border-[0.5px] border-gray-400 rounded-8 bg-gray-50 focus:bg-white focus:border-blue-500 focus:outline-none transition-all"
                value={formData.company}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-xs">
              <label htmlFor="message" className="label-text-m">How can we help you? *</label>
              <textarea 
                id="message" 
                name="message" 
                required 
                rows={5}
                className="p-sm border-[0.5px] border-gray-400 rounded-8 bg-gray-50 focus:bg-white focus:border-blue-500 focus:outline-none transition-all resize-none"
                value={formData.message}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="button-primary-l w-full mt-sm">
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;
