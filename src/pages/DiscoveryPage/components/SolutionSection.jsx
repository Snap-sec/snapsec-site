export default function SolutionSection() {
  return (
    <div className="section-solution">
      <div className="container bg-white">
        <div className="section-solution__wrapper relative flex flex-col gap-xxl overflow-hidden border-x-[0.5px] border-t-[0.5px] border-gray-600 px-sm py-xxl sm:px-xl lg:gap-64px lg:px-80px lg:py-88px">
          <div className="section-solution__heading mx-auto flex w-full max-w-[734px] flex-col items-center gap-sm text-center">
            <h3 className="heading-h1">The Clutch Solution</h3>
            <p className="subtitle-m mx-auto w-full max-w-[320px]">Complete and Contextualized Visibility. Clear. Simplified</p>
          </div>
          <div className="section-solution__content flex flex-col gap-xxl">
            <div className="icons-cards-simple grid grid-cols-1 gap-lg lg:gap-md lg:grid-cols-3">
              <div className="icons-cards-simple__item flex gap-midmd lg:flex-col lg:gap-sm items-center text-center">
                  <img alt="Discovery" loading="lazy" width="48" height="48" className="h-xl w-xl lg:h-xxl lg:w-xxl" src="https://api.iconify.design/lucide/eye.svg" />
                <div className="flex flex-col gap-xxs lg:gap-xs [&_br]:hidden lg:[&_br]:inline-block items-center">
                  <p className="body-heading-m"><span>Discovery</span></p>
                  <p className="body-text-s [&_br]:hidden lg:[&_br]:inline"><span>Continuously discover any NHI <br /> with no blind spots</span></p>
                </div>
              </div>
              <div className="icons-cards-simple__item flex gap-midmd lg:flex-col lg:gap-sm items-center text-center">
                  <img alt="Inventory" loading="lazy" width="48" height="48" className="h-xl w-xl lg:h-xxl lg:w-xxl" src="https://api.iconify.design/lucide/database.svg" />
                <div className="flex flex-col gap-xxs lg:gap-xs [&_br]:hidden lg:[&_br]:inline-block items-center">
                  <p className="body-heading-m"><span>Inventory</span></p>
                  <p className="body-text-s [&_br]:hidden lg:[&_br]:inline"><span>Catalog and correlate all NHIs <br /> across dispersed ecosystems</span></p>
                </div>
              </div>
              <div className="icons-cards-simple__item flex gap-midmd lg:flex-col lg:gap-sm items-center text-center">
                  <img alt="Context" loading="lazy" width="48" height="48" className="h-xl w-xl lg:h-xxl lg:w-xxl" src="https://api.iconify.design/lucide/network.svg" />
                <div className="flex flex-col gap-xxs lg:gap-xs [&_br]:hidden lg:[&_br]:inline-block items-center">
                  <p className="body-heading-m"><span>Context</span></p>
                  <p className="body-text-s [&_br]:hidden lg:[&_br]:inline"><span>Understand all NHIs through deep <br /> contextualization and enrichment</span></p>
                </div>
              </div>
            </div>
            <div className="screen rounded-8" style={{ boxShadow: '0px 2px 2px 0px #0000000A' }}>
              <div className="screen__topbar relative flex h-lg items-center rounded-t-8 border-[0.5px] border-gray-600 px-midsm">
                <div className="screen__topbar-dots flex items-center gap-xs">
                  <div className="screen__topbar-dot h-[3px] w-[3px] rounded-full bg-gray-700"></div>
                  <div className="screen__topbar-dot h-[3px] w-[3px] rounded-full bg-gray-700"></div>
                  <div className="screen__topbar-dot h-[3px] w-[3px] rounded-full bg-gray-700"></div>
                </div>
                <div className="screen__topbar-title absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-xxs">
                    <img alt="Icon" loading="lazy" width="11" height="12" className="h-midsm w-[11px]" src="https://api.iconify.design/lucide/shield.svg" />
                  <p className="font-secondary text-12 leading-140 text-gray-900">clutch.security</p>
                </div>
              </div>
              <div className="screen__wrapper flex flex-col items-center overflow-hidden rounded-b-8 border-x-[0.5px] border-b-[0.5px] border-gray-600 aspect-[960/538]">
                <div className="h-full w-full">
                  <div className="h-full w-full">
                    <div className="h-full w-full" style={{ opacity: 1, transform: 'none' }}>
                      <img src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1000&auto=format&fit=crop" alt="Platform UI" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <a className="group button-primary-m" href="https://www.clutch.security/book-demo">
              <span className="block">See Clutch in Action {/* */} <span className="inline-block tracking-normal transition-transform duration-300 group-hover:translate-x-[2px]">-&gt;</span></span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
