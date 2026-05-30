import React from 'react';

const ValuesSection = () => {
  const values = [
    {
      title: "Innovation First",
      description: "We constantly push the boundaries of what's possible in identity security to stay ahead of emerging threats."
    },
    {
      title: "Seamless Security",
      description: "Security should enable, not hinder. We build tools that integrate effortlessly into your existing workflows."
    },
    {
      title: "Absolute Trust",
      description: "In the world of secrets and identities, trust is everything. We prioritize transparency and reliability above all."
    }
  ];

  return (
    <section className="section-values py-64px lg:py-88px bg-white">
      <div className="container">
        <div className="flex flex-col gap-lg px-sm sm:px-xl lg:px-80px">
          <div className="text-center">
            <h2 className="heading-h2">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
            {values.map((value, idx) => (
              <div key={idx} className="flex flex-col gap-sm p-lg border-[0.5px] border-gray-600 rounded-16 bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-300">
                <h3 className="heading-h4">{value.title}</h3>
                <p className="body-text-s text-gray-900">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;
