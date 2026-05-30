import React from 'react';

const MissionSection = () => {
  return (
    <section className="section-mission py-64px lg:py-88px bg-gray-50 border-y-[0.5px] border-gray-600">
      <div className="container">
        <div className="mx-auto max-w-[800px] flex flex-col gap-md text-center px-sm">
          <h2 className="heading-h2">Our Mission</h2>
          <p className="body-text-l text-gray-900">
            As the AI era accelerates, the number of machine identities, automated agents, and API secrets is exploding. 
            Traditional security models were built for human identities and simply cannot keep up with the scale and speed of machine-to-machine interactions. 
            Our mission is to provide organizations with the visibility, governance, and protection they need to embrace AI and automation securely.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
