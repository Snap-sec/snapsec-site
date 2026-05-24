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
              <div className="in-view h-full w-full" style={{ opacity: 1, transform: 'none' }}>
                <div style={{ width: '100%', height: '100%' }}>
                  <canvas style={{ verticalAlign: 'top', width: '632px', height: '290px' }} width="632" height="290"></canvas>
                </div>
              </div>
            </div>
          </div>
          <div className="section-hero__grid pointer-events-none absolute -bottom-md left-1/2 z-0 mx-auto flex w-[170%] -translate-x-1/2 justify-center md:w-[140%] lg:-bottom-56px lg:w-full">
            <span className="block w-full lg:w-[1124px]" style={{ opacity: 1 }}>
              <img alt="Grid" loading="lazy" width="1124" height="680" decoding="async" data-nimg="1" className="pointer-events-none w-full max-w-full select-none lg:w-[1124px] lg:max-w-none" style={{ color: 'transparent' }} srcSet="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fintegrations-grid.3d54a9be.svg&amp;w=1200&amp;q=75&amp;dpl=dpl_HdUvuAVMUSwcPVPp3UAoCb9Pan5s 1x, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fintegrations-grid.3d54a9be.svg&amp;w=3840&amp;q=75&amp;dpl=dpl_HdUvuAVMUSwcPVPp3UAoCb9Pan5s 2x" src="/_next/static/media/integrations-grid.3d54a9be.svg" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
