import React from 'react';

const LocationsSection = () => {
  return (
    <section className="section-locations py-64px lg:py-88px bg-white">
      <div className="container">
        <div className="text-center mb-xl">
          <h2 className="heading-h2">Our Offices</h2>
          <p className="body-text-l text-gray-900 mt-sm">Visit us at one of our global locations.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-lg max-w-[800px] mx-auto">
          <div className="flex flex-col gap-sm p-lg border-[0.5px] border-gray-600 rounded-16 bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-300">
            <h3 className="heading-h4">San Francisco</h3>
            <p className="body-text-m text-gray-900">
              123 Market Street, Suite 400<br/>
              San Francisco, CA 94105<br/>
              United States
            </p>
            <a href="mailto:sf@snapsec.io" className="underline-link text-blue-600 font-medium w-fit mt-xs">sf@snapsec.io</a>
          </div>
          <div className="flex flex-col gap-sm p-lg border-[0.5px] border-gray-600 rounded-16 bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-300">
            <h3 className="heading-h4">London</h3>
            <p className="body-text-m text-gray-900">
              100 Bishopsgate, 12th Floor<br/>
              London, EC2N 4AG<br/>
              United Kingdom
            </p>
            <a href="mailto:london@snapsec.io" className="underline-link text-blue-600 font-medium w-fit mt-xs">london@snapsec.io</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationsSection;
