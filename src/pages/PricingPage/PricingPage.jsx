import SEOHead from '../../components/SEOHead';
import { OrganizationSchema, BreadcrumbSchema } from '../../components/StructuredData';
import PricingCalculator from './components/PricingCalculator';

const PricingPage = () => {
  return (
    <main className="content z-1 relative flex flex-col bg-white">
      <SEOHead
        title="Pricing — Build Your Custom Security Stack | Snapsec"
        description="Pick the security modules you need and build a custom pricing plan. Snapsec offers flexible per-asset and fixed pricing for VM, ASM, AIM, VS, WAS, SCA, SAST, and CSM."
        canonicalUrl="https://snapsec.co/pricing"
      />
      <OrganizationSchema />
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://snapsec.co/' },
        { name: 'Pricing', url: 'https://snapsec.co/pricing' },
      ]} />
      <PricingCalculator />
    </main>
  );
};

export default PricingPage;
