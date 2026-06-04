import React from 'react';

const TeamSection = () => {
  const team = [
    {
      name: "Imran Parray",
      role: "Founder",
      initials: "IP",
      tag: "FND",
      photo: "/images/leadership/imran.jpg"
    },
    {
      name: "Ahmed Al Johani",
      role: "Co-founder",
      initials: "AA",
      tag: "COF",
      photo: "/images/leadership/ahmed.jpg"
    },
    {
      name: "Mubashir Mehraj",
      role: "VP of Sales",
      initials: "MM",
      tag: "SLS",
      photo: null
    },
    {
      name: "Shoaib Hussan Wani",
      role: "VP of Engineering",
      initials: "SW",
      tag: "ENG",
      photo: "/images/leadership/shoaib.png"
    },
    {
      name: "Mohammed Owaise",
      role: "Security Manager",
      initials: "MO",
      tag: "SEC",
      photo: "/images/leadership/owais.png"
    }
  ];

  return (
    <section className="section-team bg-white" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="container">
        {/* Main outer border container matching other pages */}
        <div className="section-border flex flex-col gap-xl px-sm py-xxl sm:px-xl lg:px-80px lg:py-88px border-b border-gray-600 border-x-[0.5px] bg-[#FAFAFA]">
          
          {/* Header */}
          <div className="flex flex-col gap-sm">
            <span className="text-[12px] font-semibold text-gray-900 tracking-[0.16em] uppercase">
              The Team
            </span>
            <h2 className="text-[28px] sm:text-[36px] font-semibold leading-[1.2] text-black tracking-tight">
              Meet the Leadership
            </h2>
            <p className="text-[14px] sm:text-[15px] text-gray-900 font-normal">
              Built by veterans in cybersecurity and identity management.
            </p>
          </div>

          {/* Grid of Team Members - 5 columns on desktop */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-md md:gap-lg mt-md">
            {team.map((member, idx) => (
              <div key={idx} className="flex flex-col gap-xs group">
                {/* CSS Avatar Wrapper */}
                <div className="w-full aspect-square rounded-[8px] border-[0.5px] border-gray-600 bg-white overflow-hidden flex items-center justify-center relative transition-all duration-300 group-hover:border-black group-hover:shadow-[0_4px_20px_-10px_rgba(0,0,0,0.1)]">
                  {member.photo ? (
                    <img 
                      src={member.photo} 
                      alt={member.name} 
                      className="w-full h-full object-cover select-none pointer-events-none group-hover:scale-[1.03] transition-transform duration-300"
                    />
                  ) : (
                    <>
                      {/* Subtle Background Pattern Grid */}
                      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
                        backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
                        backgroundSize: '16px 16px'
                      }} />
                      
                      {/* Initials Text */}
                      <span className="text-[36px] sm:text-[40px] font-bold text-black tracking-tight opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300 select-none">
                        {member.initials}
                      </span>
                    </>
                  )}

                  {/* Corner Department Badge */}
                  <span className="absolute bottom-xs right-xs rounded-[4px] px-[6px] py-[2px] text-[8px] font-bold tracking-[0.06em] uppercase bg-[#F5F5F5] text-black border border-gray-300 z-10">
                    {member.tag}
                  </span>
                </div>

                {/* Details */}
                <div className="flex flex-col mt-xxs">
                  <h3 className="text-[15px] sm:text-[16px] font-semibold text-black leading-snug group-hover:text-primary transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-[12px] sm:text-[13px] text-gray-900 font-normal">
                    {member.role}
                  </p>
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
