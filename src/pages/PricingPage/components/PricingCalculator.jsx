import { useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { downloadQuotePdf } from '../utils/generateQuotePdf';
import QuoteRequestModal from './QuoteRequestModal';

const STORAGE_KEY = 'snapsec_pricing_estimate';

const loadSavedState = () => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object') {
      return parsed;
    }
    return null;
  } catch (err) {
    console.warn('Failed to load pricing state from localStorage', err);
    return null;
  }
};

const MODULES = [
  { id: 'vm',   name: 'VM',   fullName: 'Vulnerability Management',            type: 'Fixed',     cost: 3000 },
  { id: 'asm',  name: 'ASM',  fullName: 'Attack Surface Management',           type: 'Per Asset', cost: 10   },
  { id: 'aim',  name: 'AIM',  fullName: 'Asset Inventory Management',          type: 'Per Asset', cost: 1    },
  { id: 'vs',   name: 'VS',   fullName: 'Vulnerability Scanning',              type: 'Per Asset', cost: 20   },
  { id: 'was',  name: 'WAS',  fullName: 'Web Application Scanning',            type: 'Per Asset', cost: 150  },
  { id: 'sca',  name: 'SCA',  fullName: 'Software Composition Analysis',       type: 'Per Asset', cost: 10   },
  { id: 'sast', name: 'SAST', fullName: 'Static Application Security Testing', type: 'Per Asset', cost: 10   },
  { id: 'csm',  name: 'CSM',  fullName: 'Cloud Security Management',           type: 'Per Asset', cost: 250  },
];

const fmt = (v) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(v);

/* ── Toggle switch ─────────────────────────────────────────────── */
const Toggle = ({ on, onToggle, label }) => (
  <button
    type="button"
    role="switch"
    aria-checked={on}
    onClick={(e) => {
      e.stopPropagation();
      onToggle();
    }}
    className="pricing-toggle"
    aria-label={label}
  >
    <span className="pricing-toggle-knob" />
  </button>
);

/* ── Module row ────────────────────────────────────────────────── */
const ModuleRow = ({ mod, isSelected, assetCount, onToggle, onAssetChange }) => {
  const isPerAsset = mod.type === 'Per Asset';
  const lineTotal = isPerAsset ? mod.cost * (assetCount || 0) : mod.cost;

  return (
    <div
      onClick={() => onToggle(mod.id)}
      className={`pricing-row grid items-center gap-x-sm px-xs sm:px-sm py-[12px] rounded-8 border cursor-pointer transition-all duration-150 ${
        isSelected
          ? 'is-active bg-[#F8FAFC] border-gray-400 shadow-[0_1px_2px_rgba(0,0,0,0.03)]'
          : 'bg-white border-gray-200/80 hover:border-gray-400 hover:bg-[#FAFBFB]'
      }`}
      style={{ gridTemplateColumns: '36px 1fr 105px 90px 120px 85px' }}
    >
      {/* Toggle */}
      <Toggle on={isSelected} onToggle={() => onToggle(mod.id)} label={`Toggle ${mod.name}`} />

      {/* Name + Full Name */}
      <div className="flex items-center gap-xs min-w-0 overflow-hidden select-none">
        <span className={`body-text-s font-semibold whitespace-nowrap transition-colors duration-150 ${isSelected ? 'text-black' : 'text-gray-900'}`}>
          {mod.name}
        </span>
        <span className="body-text-xxxs text-gray-800 truncate hidden sm:inline">({mod.fullName})</span>
      </div>

      {/* Pricing Type (Separate clean text column, no label/badge) */}
      <div className="select-none">
        <span className={`body-text-xxs transition-colors duration-150 ${isSelected ? 'text-gray-900 font-medium' : 'text-gray-800'}`}>
          {mod.type}
        </span>
      </div>

      {/* Unit Price */}
      <div className="select-none text-right">
        <span className={`body-text-xxs tabular-nums transition-colors duration-150 ${isSelected ? 'text-black font-semibold' : 'text-gray-900 font-medium'}`}>
          {fmt(mod.cost)}
        </span>
      </div>

      {/* Asset count input */}
      <div className="flex justify-center" onClick={(e) => e.stopPropagation()}>
        {isSelected && isPerAsset ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center">
            <button
              type="button"
              onClick={() => onAssetChange(mod.id, Math.max(1, (assetCount || 0) - 10))}
              className="pricing-stepper-btn w-[26px] h-[26px] rounded-l-4 border border-gray-400 bg-white flex items-center justify-center text-gray-900 hover:bg-gray-100 transition-colors text-[13px] font-medium"
              aria-label={`Decrease asset count for ${mod.name}`}
            >
              −
            </button>
            <input
              type="number"
              min="1"
              value={assetCount || ''}
              placeholder="0"
              onChange={(e) => onAssetChange(mod.id, Math.max(0, parseInt(e.target.value) || 0))}
              className="pricing-asset-input w-[56px] h-[26px] border-y border-gray-400 bg-white text-center text-[13px] font-medium outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <button
              type="button"
              onClick={() => onAssetChange(mod.id, (assetCount || 0) + 10)}
              className="pricing-stepper-btn w-[26px] h-[26px] rounded-r-4 border border-gray-400 bg-white flex items-center justify-center text-gray-900 hover:bg-gray-100 transition-colors text-[13px] font-medium"
              aria-label={`Increase asset count for ${mod.name}`}
            >
              +
            </button>
          </motion.div>
        ) : (
          <span className="body-text-xxxs text-gray-400 select-none">—</span>
        )}
      </div>

      {/* Line total */}
      <span className={`body-text-xs font-semibold text-right tabular-nums transition-colors duration-150 ${isSelected ? 'text-black' : 'text-gray-400'}`}>
        {isSelected ? fmt(lineTotal) : '—'}
      </span>
    </div>
  );
};

/* ── Main calculator ──────────────────────────────────────────── */
const PricingCalculator = () => {
  const [selected, setSelected] = useState(() => {
    const saved = loadSavedState();
    return saved?.selected ?? { aim: true };
  });

  const [assets, setAssets] = useState(() => {
    const saved = loadSavedState();
    return saved?.assets ?? { aim: 20 };
  });

  // Sync to localStorage whenever selected modules or asset counts change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ selected, assets }));
    } catch (err) {
      console.warn('Failed to save pricing state to localStorage', err);
    }
  }, [selected, assets]);

  const toggle = useCallback((id) => {
    setSelected((p) => {
      const n = { ...p };
      if (n[id]) {
        delete n[id];
        setAssets((a) => {
          const na = { ...a };
          delete na[id];
          return na;
        });
      } else {
        n[id] = true;
        const mod = MODULES.find((m) => m.id === id);
        if (mod && mod.type === 'Per Asset') {
          setAssets((a) => (a[id] ? a : { ...a, [id]: 10 }));
        }
      }
      return n;
    });
  }, []);

  const setAssetCount = useCallback((id, c) => setAssets((p) => ({ ...p, [id]: c })), []);

  const resetAll = useCallback(() => {
    setSelected({});
    setAssets({});
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.warn('Failed to clear pricing state', err);
    }
  }, []);

  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selectedList = useMemo(() => MODULES.filter((m) => selected[m.id]), [selected]);
  const total = useMemo(() => MODULES.reduce((s, m) => {
    if (!selected[m.id]) return s;
    return s + (m.type === 'Fixed' ? m.cost : m.cost * (assets[m.id] || 0));
  }, 0), [selected, assets]);
  const count = selectedList.length;

  const handleOpenModal = useCallback(() => {
    if (count === 0) return;
    setIsModalOpen(true);
  }, [count]);

  const handleModalSubmit = useCallback(({ name, email }) => {
    setIsGeneratingPdf(true);
    try {
      downloadQuotePdf({
        selectedList,
        assets,
        total,
        customerName: name,
        customerEmail: email,
      });
      setIsModalOpen(false);
    } catch (err) {
      console.error('Failed to generate PDF quote', err);
    } finally {
      setTimeout(() => setIsGeneratingPdf(false), 500);
    }
  }, [selectedList, assets, total]);

  return (
    <div className="pricing-page-wrapper mt-120px lg:mt-140px">
      <div className="container bg-white">
        <div className="section-border section-border-top relative flex flex-col lg:flex-row lg:min-h-[calc(100vh-140px)]">

          {/* ───── LEFT: module selector ───── */}
          <div className="flex-1 flex flex-col px-sm py-lg sm:px-xl lg:px-xl lg:py-xl border-b lg:border-b-0 lg:border-r-[0.5px] border-gray-600 overflow-y-auto">
            {/* Header */}
            <div className="flex flex-col gap-xxs mb-lg">
              <span className="label-text-m text-gray-800">Pricing</span>
              <h1 className="heading-h4">Build Your Plan</h1>
              <p className="body-text-xxs text-gray-800 max-w-[420px]">
                Select modules and enter your asset counts to get an instant estimate.
              </p>
            </div>

            {/* Table wrapper */}
            <div className="overflow-x-auto -mx-xs sm:mx-0">
              <div className="min-w-[620px]">
                {/* Table header */}
                <div
                  className="grid items-center gap-x-sm px-xs sm:px-sm pb-[10px] mb-[8px] border-b border-gray-200 select-none"
                  style={{ gridTemplateColumns: '36px 1fr 105px 90px 120px 85px' }}
                >
                  <span className="col-span-2 label-text-s text-gray-800">Module</span>
                  <span className="label-text-s text-gray-800">Pricing Type</span>
                  <span className="label-text-s text-gray-800 text-right">Unit Price</span>
                  <span className="label-text-s text-gray-800 text-center">Assets</span>
                  <span className="label-text-s text-gray-800 text-right">Subtotal</span>
                </div>

                {/* Module rows with space between */}
                <div className="flex flex-col gap-y-[8px]">
                  {MODULES.map((mod) => (
                    <ModuleRow
                      key={mod.id}
                      mod={mod}
                      isSelected={!!selected[mod.id]}
                      assetCount={assets[mod.id] || 0}
                      onToggle={toggle}
                      onAssetChange={setAssetCount}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ───── RIGHT: summary panel ───── */}
          <div className="lg:w-[360px] xl:w-[400px] flex flex-col bg-[#FAFBFB] px-sm py-lg sm:px-xl lg:px-xl lg:py-xl justify-between">
            {/* Top section: Header & Selected list */}
            <div>
              {/* Summary header */}
              <div className="flex items-center justify-between mb-lg">
                <div className="flex flex-col gap-xxs">
                  <span className="label-text-m text-gray-800">Summary</span>
                  <h2 className="body-heading-xl">Your Estimate</h2>
                </div>
                {count > 0 && (
                  <div className="flex items-center gap-xs">
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-gray-200 text-gray-900 tabular-nums">
                      {count} {count === 1 ? 'module' : 'modules'}
                    </span>
                    <button
                      type="button"
                      onClick={resetAll}
                      className="text-[11px] text-gray-800 hover:text-black underline cursor-pointer transition-colors"
                      title="Reset estimate"
                    >
                      Reset
                    </button>
                  </div>
                )}
              </div>

              {/* Selected modules list */}
              <div className="flex flex-col">
                <AnimatePresence mode="popLayout">
                  {count === 0 ? (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center text-center py-xl"
                    >
                      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-sm">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                      </div>
                      <p className="body-text-xxs font-medium text-gray-800">No modules selected</p>
                      <p className="body-text-xxxs text-gray-500 mt-xxs max-w-[200px]">
                        Toggle modules on the left to customize your estimate
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="list"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col divide-y divide-gray-200/80"
                    >
                      {selectedList.map((mod) => {
                        const isPA = mod.type === 'Per Asset';
                        const ac = assets[mod.id] || 0;
                        const lt = isPA ? mod.cost * ac : mod.cost;
                        return (
                          <motion.div
                            key={mod.id}
                            layout
                            initial={{ opacity: 0, x: 8 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -8 }}
                            className="group flex items-center justify-between py-[12px]"
                          >
                            <div className="flex items-center gap-xs">
                              <button
                                type="button"
                                onClick={() => toggle(mod.id)}
                                className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-black p-0.5 rounded cursor-pointer"
                                aria-label={`Remove ${mod.name}`}
                                title={`Remove ${mod.name}`}
                              >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <line x1="18" y1="6" x2="6" y2="18" />
                                  <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                              </button>
                              <div className="flex flex-col">
                                <span className="body-text-xs font-semibold text-black">
                                  {mod.name} <span className="font-normal text-gray-800 text-[11px]">({mod.fullName})</span>
                                </span>
                                <span className="body-text-xxxs text-gray-800">
                                  {isPA ? `${ac} asset${ac !== 1 ? 's' : ''} × ${fmt(mod.cost)}` : 'Fixed base price'}
                                </span>
                              </div>
                            </div>
                            <span className="body-text-s font-semibold tabular-nums text-black">{fmt(lt)}</span>
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Bottom section: Total + CTA */}
            <div className="border-t border-gray-300 pt-md mt-lg flex flex-col gap-md">
              <div className="flex items-baseline justify-between">
                <span className="body-heading-s text-gray-900">Estimated Total</span>
                <div className="flex items-baseline gap-xxs">
                  <motion.span
                    key={total}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="heading-h4 tabular-nums tracking-tight text-black"
                  >
                    {fmt(total)}
                  </motion.span>
                  <span className="body-text-xxxs text-gray-800">/yr</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleOpenModal}
                disabled={count === 0 || isGeneratingPdf}
                className={`group button-primary-m w-full justify-center transition-all ${
                  count === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                }`}
                title={count === 0 ? 'Select at least one module to generate quote' : 'Enter details & download quote PDF'}
              >
                <span className="flex items-center gap-xs">
                  {isGeneratingPdf ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Generating PDF...
                    </>
                  ) : (
                    <>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                      Generate Quote
                    </>
                  )}
                </span>
              </button>

              <p className="body-text-xxxs text-gray-500 text-center leading-relaxed">
                Volume discounts available for enterprise.{' '}
                <Link to="/contact-us" className="underline hover:text-black transition-colors">Talk to sales</Link>
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Name & Email Prompt Modal */}
      <QuoteRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        selectedCount={count}
        total={total}
        fmt={fmt}
        isGenerating={isGeneratingPdf}
      />
    </div>
  );
};

export default PricingCalculator;
