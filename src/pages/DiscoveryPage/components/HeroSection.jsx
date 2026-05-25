export default function HeroSection() {
  return (
    <div className="section-visibility-hero mt-120px overflow-hidden lg:mt-140px">
      <div className="container bg-white">
        <div className="section-visibility-hero__wrapper relative flex flex-col gap-xxl overflow-hidden border-x-[0.5px] border-gray-600 px-sm pb-64px sm:px-xl lg:px-80px lg:pb-88px">
          <div className="section-visibility-hero__heading mx-auto flex w-full max-w-[506px] flex-col items-center gap-md text-center">
            <h1 className="heading-hero w-full lg:mx-auto lg:max-w-[480px] [&_br]:hidden lg:[&_br]:inline-block">Discovery <br /> &amp; Inventory</h1>
            <p className="subtitle-m mx-auto w-full max-w-[340px] !text-center">Clutch automatically discovers and correlates all Non-Human Identities into a contextualized inventory</p>
          </div>
          <div className="pointer-events-none relative z-1 mx-auto aspect-[632/290] w-full max-w-[632px] lg:pointer-events-auto">
            <div className="h-full w-full">
              <div className="in-view h-full w-full flex items-center justify-center overflow-hidden rounded-12 shadow-lg" style={{ opacity: 1, transform: 'none' }}>
                <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop" alt="Dashboard" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
          <div className="section-hero__grid pointer-events-none absolute -bottom-md left-1/2 z-0 mx-auto flex w-[170%] -translate-x-1/2 justify-center md:w-[140%] lg:-bottom-56px lg:w-full">
            <span className="block w-full lg:w-[1124px]" style={{ opacity: 1 }}>
              <img alt="Grid" loading="lazy" width="1124" height="680" className="pointer-events-none w-full max-w-full select-none lg:w-[1124px] lg:max-w-none opacity-20" src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
