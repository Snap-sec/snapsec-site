export default function ChallengeSection() {
  return (
    <div className="section-platform-challenge">
      <div className="container bg-white">
        <div className="section-platform-challenge__wrapper relative flex flex-col items-center gap-lg overflow-hidden border-x-[0.5px] border-gray-600 px-sm sm:px-xl lg:gap-88px lg:px-80px">
          <h2 className="heading-h2 mx-auto w-full max-w-[632px] text-center">The Challenge</h2>
          <div className="section-platform-challenge__content grid grid-cols-1 gap-md lg:grid-cols-2 lg:gap-0 lg:divide-x-[0.5px] lg:divide-gray-600">
            <div className="section-platform-challenge__content-item border-b-[0.5px] border-gray-600 pb-md lg:border-b-0 lg:pb-88px lg:pr-96px">
              <p className="body-text-m w-full lg:max-w-[386px]">
                <span>The proliferation of Non-Human Identities across the entire enterprise, combined with their dynamic nature and decentralization, poses a major challenge for organizations seeking centralized and comprehensive visibility.</span>
              </p>
            </div>
            <div className="section-platform-challenge__content-item pb-lg lg:pb-88px lg:pl-96px">
              <p className="body-text-m w-full lg:max-w-[386px]">
                <span>There is a critical need for a context-based inventory that allows security teams to understand which Non-Human Identities exist, their business context, where they are stored, who has access to them, their owners, and their level of privilege.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
