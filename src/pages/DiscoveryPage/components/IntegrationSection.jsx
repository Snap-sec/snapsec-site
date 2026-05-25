export default function IntegrationSection() {
  return (
    <div className="section-visibility-integration">
      <div className="container bg-white">
        <div className="section-visibility-integration__wrapper relative overflow-hidden border-x-[0.5px] border-t-[0.5px] border-gray-600 px-sm py-12 sm:px-xl lg:px-80px lg:py-16">

          {/* ROW 1: Heading (left) + CTA (right) — same vertical level */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 lg:gap-16 mb-10 lg:mb-16">
            <div className="flex flex-col gap-2 lg:max-w-[524px]">
              <h3 className="heading-h1">Seamless Integration for Non-Human Identity Data</h3>
              <p className="subtitle-m">Integrates seamlessly and gathers vital information from various systems and tools</p>
            </div>
            <div className="flex flex-col gap-3 items-start lg:items-end shrink-0">
              <div className="flex items-center gap-2 font-primary text-13 font-medium uppercase leading-140 tracking-[0.16em]">
                Introducing
                <span className="font-bold text-2xl tracking-tight text-primary">SnapSec</span>
              </div>
              <a className="group button-primary-m" href="https://www.clutch.security/book-demo">
                <span className="block">See SnapSec in Action <span className="inline-block tracking-normal transition-transform duration-300 group-hover:translate-x-[2px]">-&gt;</span></span>
              </a>
            </div>
          </div>

          {/* ROW 2: Paragraphs (left) + Image (right) — same vertical level */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 lg:gap-16">
            <div className="flex flex-col gap-4 lg:max-w-[500px]">
              <p className="body-text-m">This information is compiled into a <b>comprehensive inventory of all NHIs and presented in a clear graph view</b>, enabling security teams to understand their Non-Human Identity footprint across the enterprise.</p>
              <p className="body-text-m">With Clutch, you can finally see the full picture of your digital Non‑Human Identity ecosystem, enabling you to <b>secure your NHIs everywhere</b>.</p>
            </div>
            <div className="relative aspect-[328/385] w-full shrink-0 lg:max-w-[328px]">
              <div className="pointer-events-none absolute inset-x-0 top-[13.5%] h-sm w-full bg-gradient-to-b from-white to-transparent z-10"></div>
              <div className="h-full w-full overflow-hidden rounded-12">
                <img
                  src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop"
                  alt="Integrations"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="pointer-events-none absolute inset-x-0 bottom-[13.5%] h-sm w-full bg-gradient-to-t from-white to-transparent z-10"></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
