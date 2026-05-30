import React from 'react';

const TeamSection = () => {
  const team = [
    {
      name: "Alex Reed",
      role: "CEO & Co-founder",
      image: "https://via.placeholder.com/300x300.png?text=CEO"
    },
    {
      name: "Sarah Jenkins",
      role: "CTO & Co-founder",
      image: "https://via.placeholder.com/300x300.png?text=CTO"
    },
    {
      name: "Michael Chang",
      role: "Chief Product Officer",
      image: "https://via.placeholder.com/300x300.png?text=CPO"
    },
    {
      name: "Elena Rodriguez",
      role: "VP of Engineering",
      image: "https://via.placeholder.com/300x300.png?text=VP+Eng"
    }
  ];

  return (
    <section className="section-team py-64px lg:py-88px bg-gray-50 border-t-[0.5px] border-gray-600">
      <div className="container">
        <div className="flex flex-col gap-lg px-sm sm:px-xl lg:px-80px">
          <div className="text-center">
            <h2 className="heading-h2">Meet the Leadership</h2>
            <p className="body-text-m text-gray-900 mt-sm">Built by veterans in cybersecurity and identity management.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-md mt-lg">
            {team.map((member, idx) => (
              <div key={idx} className="flex flex-col items-center gap-sm text-center">
                <div className="w-full aspect-square rounded-16 overflow-hidden border-[0.5px] border-gray-600 bg-white">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300" />
                </div>
                <div>
                  <h3 className="heading-h6">{member.name}</h3>
                  <p className="body-text-xs text-gray-900">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
