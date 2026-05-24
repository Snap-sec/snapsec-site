export default function QueryBuilderSection() {
  return (
    <>
      <div className="section-tailored-insights">
        <div className="container bg-white">
          <div className="section-tailored-insights__wrapper relative flex flex-col gap-xxl overflow-hidden border-x-[0.5px] border-t-[0.5px] border-gray-600 px-sm py-xxl sm:px-xl lg:gap-64px lg:px-80px lg:py-88px">
            <h3 className="heading-h1 w-full lg:max-w-[723px]">Unlock Tailored Insights Using Clutch's Powerful Query Builder</h3>
            <div className="section-tailored-insights__content flex flex-col gap-lg lg:flex-row lg:items-center lg:justify-between">
              <div className="section-tailored-insights__info flex w-full flex-col gap-xl lg:max-w-[386px]">
                <div className="section-tailored-insights__info-item flex flex-col gap-sm">
                  <p className="body-heading-xl">Tailored Data Consumption</p>
                  <p className="body-text-m">Clutch's advanced query builder enables security teams to create multi-conditional queries with detailed granularity, allowing them to consume Clutch's contextualized inventory in the way that best suits their needs and workflows.</p>
                </div>
                <div className="section-tailored-insights__info-item flex flex-col gap-sm">
                  <p className="body-heading-xl">Flexible Breach Containment Options</p>
                  <p className="body-text-m">Clutch facilitates a wide range of query options, enabling security teams to understand the potential impact of breaches, such as identifying unrotated NHIs from compromised applications, and covering various practices and scenarios.</p>
                </div>
              </div>
              <div className="section-tailored-insights__image flex w-full flex-col gap-sm lg:max-w-[468px] lg:gap-md">
                <span className="block" style={{opacity: 1}}>
                  <img alt="Unlock Tailored Insights Using Clutch's Powerful Query Builder" loading="lazy" width="468" height="396" decoding="async" data-nimg="1" className="w-full" style={{color: 'transparent'}} srcSet="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fvisibility-tailored-insights-image.b775a34c.svg&amp;w=640&amp;q=75&amp;dpl=dpl_HdUvuAVMUSwcPVPp3UAoCb9Pan5s 1x, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fvisibility-tailored-insights-image.b775a34c.svg&amp;w=1080&amp;q=75&amp;dpl=dpl_HdUvuAVMUSwcPVPp3UAoCb9Pan5s 2x" src="/_next/static/media/visibility-tailored-insights-image.b775a34c.svg" />
                </span>
                <p className="body-text-xs text-gray-1000">Complex ecosystems, workflows, and technology stacks may require security teams to move beyond inventory lists and actively query data in more dynamic and flexible ways.</p>
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
