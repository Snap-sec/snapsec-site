import HeroSection from './components/HeroSection';
import ChallengeSection from './components/ChallengeSection';
import SolutionSection from './components/SolutionSection';
import BigTextSection from './components/BigTextSection';
import IntegrationSection from './components/IntegrationSection';
import LineageSection from './components/LineageSection';
import QueryBuilderSection from './components/QueryBuilderSection';

export default function DiscoveryPage() {
  return (
    <main className="relative z-5 bg-white text-black font-body">
      <HeroSection />
      <ChallengeSection />
      <SolutionSection />
      <BigTextSection />
      <IntegrationSection />
      <LineageSection />
      <QueryBuilderSection />
    </main>
  );
}
