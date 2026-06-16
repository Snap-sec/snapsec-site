import React from 'react';

const RedTeamLeadersSection = () => {
  const team = [
    {
      name: "Imran Parray",
      role: "Founder",
      initials: "IP",
      tag: "FND",
      photo: "/images/leadership/imran.jpg",
      linkedin: "https://www.linkedin.com/in/imran-parray/"
    },
    {
      name: "Ahmed Al Johani",
      role: "Co-founder",
      initials: "AA",
      tag: "COF",
      photo: "/images/leadership/ahmed.jpg",
      linkedin: "https://www.linkedin.com/in/aaljohani/"
    },
    {
      name: "Imran Nisar",
      role: "Head of Security",
      initials: "IN",
      tag: "SEC",
      photo: "/images/red-team/imran nissar.jpeg",
      linkedin: "https://www.linkedin.com"
    },
    {
      name: "Mohammed Owaise",
      role: "Security Manager",
      initials: "MO",
      tag: "SEC",
      photo: "/images/leadership/owais.png",
      linkedin: "https://www.linkedin.com/in/mohammadowaiss/"
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
              Offensive Security Team
            </span>
            <h2 className="text-[28px] sm:text-[36px] font-semibold leading-[1.2] text-black tracking-tight">
              Meet our Red Team Leaders
            </h2>
            <p className="text-[14px] sm:text-[15px] text-gray-900 font-normal">
              Led by veteran ethical hackers with extensive backgrounds in offensive security.
            </p>
          </div>

          {/* Grid of Team Members - 4 columns on desktop */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-md md:gap-lg mt-md max-w-[1200px]">
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
                  <div className="flex items-center justify-between gap-xs">
                    <h3 className="text-[15px] sm:text-[16px] font-semibold text-black leading-snug group-hover:text-primary transition-colors">
                      {member.name}
                    </h3>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-[#0077B5] transition-colors shrink-0 p-[2px]"
                      aria-label={`${member.name} LinkedIn Profile`}
                    >
                      <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                  </div>
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

export default RedTeamLeadersSection;
