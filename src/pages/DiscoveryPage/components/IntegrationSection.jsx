export default function IntegrationSection() {
  return (
    <div className="section-visibility-integration">
      <div className="container bg-white">
        <div className="section-visibility-integration__wrapper relative flex flex-col gap-lg overflow-hidden border-x-[0.5px] border-t-[0.5px] border-gray-600 px-sm pb-xs pt-xxl sm:px-xl lg:gap-lg lg:px-80px lg:pb-64px lg:pt-88px">
          <div className="section-visibility-integration__heading flex flex-col gap-lg items-center justify-center text-center">
            <div className="flex w-full flex-col gap-sm lg:max-w-[524px] items-center text-center mx-auto">
              <h3 className="heading-h1">Seamless Integration for Non-Human Identity Data</h3>
              <p className="subtitle-m w-full lg:max-w-[416px] text-center">Integrates seamlessly and gathers vital information from various systems and tools</p>
            </div>
            <div className="flex w-full flex-col items-center justify-center gap-md sm:flex-row sm:items-center sm:justify-center lg:mt-sm lg:max-w-[204px] lg:flex-col lg:items-center lg:justify-center mx-auto text-center">
              <div className="section-visibility-integration__logo flex items-center gap-xs font-primary text-13 font-medium uppercase leading-140 tracking-[0.16em]">
                Introducing
                <span className="block" style={{ opacity: 1 }}>
                  <img alt="Clutch" loading="lazy" width="171" height="50" decoding="async" data-nimg="1" className="w-96px select-none" style={{ color: 'transparent' }} srcSet="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo-full-black.f177f8fc.svg&amp;w=256&amp;q=75&amp;dpl=dpl_HdUvuAVMUSwcPVPp3UAoCb9Pan5s 1x, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo-full-black.f177f8fc.svg&amp;w=384&amp;q=75&amp;dpl=dpl_HdUvuAVMUSwcPVPp3UAoCb9Pan5s 2x" src="/_next/static/media/logo-full-black.f177f8fc.svg" />
                </span>
              </div>
              <div className="w-full sm:w-auto lg:w-full">
                <a className="group button-primary-m w-full sm:w-auto lg:w-full" href="https://www.clutch.security/book-demo">
                  <span className="block">See Clutch in Action <span className="inline-block tracking-normal transition-transform duration-300 group-hover:translate-x-[2px]">-&gt;</span></span>
                </a>
              </div>
            </div>
          </div>
          <div className="section-visibility-integration__content flex flex-col gap-sm lg:flex-col lg:items-center lg:gap-14px text-center mt-8">
            <div className="section-visibility-integration__info flex w-full flex-col gap-md lg:max-w-[600px] mx-auto items-center text-center mb-8">
              <p className="body-text-m">This information is compiled into a <b>comprehensive inventory of all NHIs and presented in a clear graph view</b>, enabling security teams to understand their Non-Human Identity footprint across the enterprise.</p>
              <p className="body-text-m">With Clutch, you can finally see the full picture of your digital Non‑Human Identity ecosystem, enabling you to <b>secure your NHIs everywhere</b>.</p>
            </div>
            <div className="pointer-events-none relative aspect-[328/385] w-full lg:pointer-events-auto lg:max-w-[328px]">
              <div className="pointer-events-none absolute inset-x-0 top-[13.5%] h-sm w-full bg-gradient-to-b from-white to-transparent"></div>
              <div className="h-full w-full">
                <div className="h-full w-full" style={{ opacity: 1, transform: 'none' }}>
                  <div style={{ width: '100%', height: '100%' }}>
                    <canvas style={{ verticalAlign: 'top', width: '328px', height: '385px' }} width="328" height="385"></canvas>
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-x-0 bottom-[13.5%] h-sm w-full bg-gradient-to-t from-white to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
