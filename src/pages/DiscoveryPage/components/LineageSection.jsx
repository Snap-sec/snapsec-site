export default function LineageSection() {
  return (
    <>
      <div className="section-visibility-identity">
        <div className="container bg-white">
          <div className="section-visibility-identity__wrapper relative flex flex-col gap-lg overflow-hidden border-x-[0.5px] border-t-[0.5px] border-gray-600 px-sm pt-xxl sm:px-xl lg:gap-64px lg:px-80px lg:pt-88px">
            <div className="section-visibility-identity__heading flex flex-col gap-lg items-center justify-center text-center">
              <div className="flex w-full flex-col gap-sm lg:max-w-[504px] items-center text-center mx-auto">
                <h3 className="heading-h1"><span className="gradient-text-blue">Identity Lineage®</span></h3>
                <p className="subtitle-m w-full lg:max-w-[365px] text-center">Quickly understand the full context of any Non-Human Identity with Clutch's Identity Lineage®</p>
              </div>
              <div className="flex w-full flex-col gap-md sm:flex-row sm:items-center sm:justify-center lg:max-w-[600px] lg:flex-col lg:items-center lg:justify-center mx-auto text-center mt-4">
                <p className="body-text-m"><b>Identity Lineage<sup>®</sup></b> provides a contextualized view of any Non-Human Identity, offering detailed insights into how it operates and empowering security teams with a deep understanding of the organizational ecosystem through simple and intuitive visualization.</p>
              </div>
            </div>
          </div>
          <div className="section-visibility-identity__image w-full border-x-[0.5px] border-gray-600 pt-xxl lg:pt-88px">
            <img alt="Identity Lineage™ Comprehensive NHI Contextualization" loading="lazy" width="2246" height="958" className="w-full object-cover rounded-2xl shadow-xl" src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop" />
          </div>
        </div>
      </div>
      <div className="section-visibility-context">
        <div className="container bg-white">
          <div className="section-visibility-context__wrapper relative flex flex-col gap-xl overflow-hidden border-x-[0.5px] border-t-[0.5px] border-gray-600 px-sm py-xxl sm:px-xl lg:gap-64px lg:px-80px lg:py-88px">
            <p className="large-paragraph-m mx-auto w-full max-w-[961px] text-center">By aggregating and correlating information from various integrations, Clutch creates an intuitive visual mapping of the Non-Human Identity Lineage®. This allows security teams to quickly understand its full context:</p>
            <div className="icons-list grid grid-cols-1 gap-sm lg:grid-cols-2 lg:gap-x-100px justify-items-center">
              <div className="icons-list__item flex gap-xs items-center text-center">
                <img alt="Origin (Source of Truth)" loading="lazy" width="18" height="18" className="h-[18px] w-[18px]" src="https://api.iconify.design/lucide/git-commit.svg" />
                <p className="body-text-m">Origin (Source of Truth)</p>
              </div>
              <div className="icons-list__item flex gap-xs items-center text-center">
                <img alt="Consumers" loading="lazy" width="18" height="18" className="h-[18px] w-[18px]" src="https://api.iconify.design/lucide/users.svg" />
                <p className="body-text-m">Consumers (CI/CD Pipelines, Applications)</p>
              </div>
              <div className="icons-list__item flex gap-xs items-center text-center">
                <img alt="Attribution" loading="lazy" width="18" height="18" className="h-[18px] w-[18px]" src="https://api.iconify.design/lucide/user-cog.svg" />
                <p className="body-text-m">Attribution to the Workforce (Owners, Creators)</p>
              </div>
              <div className="icons-list__item flex gap-xs items-center text-center">
                <img alt="Resources" loading="lazy" width="18" height="18" className="h-[18px] w-[18px]" src="https://api.iconify.design/lucide/folder-lock.svg" />
                <p className="body-text-m">Resources (Access and Permissions)</p>
              </div>
              <div className="icons-list__item flex gap-xs items-center text-center">
                <img alt="Storage" loading="lazy" width="18" height="18" className="h-[18px] w-[18px]" src="https://api.iconify.design/lucide/database.svg" />
                <p className="body-text-m">Storage (Vaults, Password Manager, Code)</p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-md lg:gap-lg">
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
                        <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop" alt="Lineage Dashboard" className="w-full h-full object-cover" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="body-text-m mx-auto w-full max-w-[410px] text-center">This NHI-centric contextual visibility enables not only the quick identification of involved parties and resources, but also provides security teams with the context they need to determine which NHIs present an actual risk.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
