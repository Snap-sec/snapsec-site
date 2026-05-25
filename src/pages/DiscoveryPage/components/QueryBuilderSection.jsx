export default function QueryBuilderSection() {
  return (
    <>
      <div className="section-tailored-insights">
        <div className="container bg-white">
          <div className="section-tailored-insights__wrapper relative flex flex-col gap-xxl overflow-hidden border-x-[0.5px] border-t-[0.5px] border-gray-600 px-sm py-xxl sm:px-xl lg:gap-64px lg:px-80px lg:py-88px">
            <h3 className="heading-h1 w-full lg:max-w-[723px] text-center lg:text-left mx-auto lg:mx-0 mb-8 lg:mb-12">Unlock Tailored Insights Using Clutch's Powerful Query Builder</h3>
            <div className="section-tailored-insights__content flex flex-col gap-lg lg:flex-row lg:items-start lg:justify-between text-center lg:text-left">
              <div className="section-tailored-insights__info flex w-full flex-col gap-xl lg:w-[48%] items-center lg:items-start text-center lg:text-left mx-auto lg:mx-0">
                <div className="section-tailored-insights__info-item flex flex-col gap-sm items-center lg:items-start">
                  <p className="body-heading-xl font-bold">Tailored Data Consumption</p>
                  <p className="body-text-m text-center lg:text-left">Clutch's advanced query builder enables security teams to create multi-conditional queries with detailed granularity, allowing them to consume Clutch's contextualized inventory in the way that best suits their needs and workflows.</p>
                </div>
                <div className="section-tailored-insights__info-item flex flex-col gap-sm items-center lg:items-start">
                  <p className="body-heading-xl font-bold">Flexible Breach Containment Options</p>
                  <p className="body-text-m text-center lg:text-left">Clutch facilitates a wide range of query options, enabling security teams to understand the potential impact of breaches, such as identifying unrotated NHIs from compromised applications, and covering various practices and scenarios.</p>
                </div>
              </div>
              <div className="section-tailored-insights__image flex w-full flex-col gap-sm lg:w-[48%] lg:gap-md items-center lg:items-start text-center lg:text-left mx-auto lg:mx-0 mt-8 lg:mt-0">
                  <img alt="Unlock Tailored Insights" loading="lazy" width="468" height="396" className="w-full lg:max-w-[468px] mx-auto lg:mx-0 rounded-2xl shadow-xl object-cover" src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=800&auto=format&fit=crop" />
                <p className="body-text-xs text-gray-1000 text-center lg:text-left lg:max-w-[468px]">Complex ecosystems, workflows, and technology stacks may require security teams to move beyond inventory lists and actively query data in more dynamic and flexible ways.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="cta-banner-small">
        <div className="container bg-white">
          <div className="relative overflow-hidden border-x-[0.5px] border-y-[0.5px] border-gray-600 px-md py-64px md:px-100px lg:px-80px lg:py-88px lg:py-[115px]" style={{background: 'linear-gradient(0deg, #FCFCFC, #FCFCFC)'}}>
            <div className="absolute inset-0 z-1 hidden lg:block" style={{background: 'conic-gradient(from 92.06deg at 48.62% 114.48%, rgba(255, 255, 255, 0) -135.77deg, rgba(255, 255, 255, 0) 183.44deg, #004DFF 187.2deg, #FFFFFF 190.98deg, #004DFF 197.74deg, #000000 205.59deg, rgba(255, 255, 255, 0) 224.23deg, rgba(255, 255, 255, 0) 543.44deg)', maskImage: 'conic-gradient(from 92.06deg at 48.62% 114.48%, rgba(255, 255, 255, 0) -135.77deg, rgba(255, 255, 255, 0) 183.44deg, #004DFF 187.2deg, #FFFFFF 190.98deg, #004DFF 197.74deg, #000000 205.59deg, rgba(255, 255, 255, 0) 224.23deg, rgba(255, 255, 255, 0) 543.44deg)', transform: 'scaleX(-1)'}}></div>
            <div className="lines pointer-events-none absolute bottom-0 left-0 z-3 hidden h-full w-[673px] select-none lg:block">
              <div className="line-top absolute bottom-[-198px] left-[165px] z-5 h-[753px] w-[1px] rotate-[-58.7deg] bg-black"></div>
              <div className="line-center absolute bottom-[-232px] left-[165px] z-5 h-[710px] w-[4px] rotate-[-65.5deg] bg-black"></div>
              <div className="line-bottom absolute bottom-[-274px] left-[165px] z-5 h-[680px] w-[10px] rotate-[-73deg] bg-black"></div>
            </div>
            <div className="noise absolute inset-0 z-2"></div>
            <div className="cta-banner-small__wrapper relative z-5 mx-auto flex w-full flex-col gap-lg text-center max-w-[800px]">
              <h3 className="heading-h1"><span>Gain Full Visibility and Security for All Non-Human Identities</span></h3>
              <div>
                <a className="group button-primary-m" href="https://www.clutch.security/book-demo">
                  <span className="block">See Clutch in Action <span className="inline-block tracking-normal transition-transform duration-300 group-hover:translate-x-[2px]">-&gt;</span></span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
