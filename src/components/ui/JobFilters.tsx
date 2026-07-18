"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";

const JOB_TYPES = ["Full-time", "Part-time", "Remote", "Hybrid", "Contract"];
const EXPERIENCE = ["0–2 years", "2–5 years", "5–10 years", "10+ years"];
const SALARY_RANGES = ["$0–$30k", "$30k–$60k", "$60k–$100k", "$100k+"];

interface ListItem {
  name: string;
  count: number;
}

interface JobFiltersProps {
  isMobile?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function JobFilters({ isMobile = false, isOpen = false, onClose }: JobFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [types, setTypes] = useState<string[]>(
    searchParams.get("types")?.split(",").filter(Boolean) || []
  );
  const [exp, setExp] = useState<string[]>(
    searchParams.get("experience")?.split(",").filter(Boolean) || []
  );
  const [salary, setSalary] = useState<string[]>(
    searchParams.get("salary")?.split(",").filter(Boolean) || []
  );
  const [selectedIndustry, setSelectedIndustry] = useState<string[]>(
    searchParams.get("category")?.split(",").filter(Boolean) || []
  );
  const [selectedCountry, setSelectedCountry] = useState<string[]>(
    searchParams.get("location")?.split(",").filter(Boolean) || []
  );

  const [countries, setCountries] = useState<ListItem[]>([]);
  const [industries, setIndustries] = useState<ListItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://sisglobalapi.neuralinfo.co.in/public/jobs/preview?status=Open"
        );
        const data = await res.json();

        const countryCounts = data.reduce(
          (acc: Record<string, number>, job: { country_name?: string }) => {
            const c = job.country_name || "Other";
            acc[c] = (acc[c] || 0) + 1;
            return acc;
          }, {}
        );
        setCountries(Object.keys(countryCounts).map((c) => ({ name: c, count: countryCounts[c] })));

        const industryCounts = data.reduce(
          (acc: Record<string, number>, job: { category_name?: string }) => {
            const c = job.category_name || "Other";
            acc[c] = (acc[c] || 0) + 1;
            return acc;
          }, {}
        );
        setIndustries(Object.keys(industryCounts).map((c) => ({ name: c, count: industryCounts[c] })));
      } catch (err) {
        console.error("Filter fetch error:", err);
      }
    };
    fetchData();
  }, []);

  const applyFilters = useCallback(
    (newTypes: string[], newExp: string[], newSalary: string[], newIndustry: string[], newCountry: string[]) => {
      const params = new URLSearchParams();
      const q = searchParams.get("q");
      if (q) params.set("q", q);
      if (newCountry.length) params.set("location", newCountry.join(","));
      if (newIndustry.length) params.set("category", newIndustry.join(","));
      if (newExp.length) params.set("experience", newExp.join(","));
      if (newSalary.length) params.set("salary", newSalary.join(","));
      if (newTypes.length) params.set("types", newTypes.join(","));
      router.push(`/jobs?${params.toString()}`);
    },
    [router, searchParams]
  );

  const toggle = (
    arr: string[],
    setArr: (v: string[]) => void,
    val: string,
    key: "types" | "exp" | "salary" | "industry" | "country"
  ) => {
    const next = arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];
    setArr(next);
    applyFilters(
      key === "types" ? next : types,
      key === "exp" ? next : exp,
      key === "salary" ? next : salary,
      key === "industry" ? next : selectedIndustry,
      key === "country" ? next : selectedCountry
    );
  };

  const clearAll = () => {
    setTypes([]); setExp([]); setSalary([]); setSelectedIndustry([]); setSelectedCountry([]);
    router.push("/jobs");
    if (isMobile && onClose) onClose();
  };

  const hasFilters = types.length || exp.length || salary.length || selectedIndustry.length || selectedCountry.length;

  const FilterContent = () => (
    <>
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-brand-grey-100 flex-shrink-0">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={15} className="text-brand-red" />
          <h3 className="font-bold text-brand-grey-900 text-sm" style={{ fontFamily: "var(--font-display)" }}>
            FILTER JOBS
          </h3>
        </div>
        <div className="flex items-center gap-3">
          {hasFilters ? (
            <button onClick={clearAll} className="text-xs text-brand-red hover:underline font-semibold bg-transparent border-none cursor-pointer">
              Clear All
            </button>
          ) : null}
          {isMobile && (
            <button onClick={onClose} className="p-1 hover:bg-brand-grey-100 rounded-lg transition-colors">
              <X size={20} className="text-brand-grey-600" />
            </button>
          )}
        </div>
      </div>

      {/* Scrollable filter body */}
      <div className="overflow-y-auto flex-1 px-5 py-4">
        {/* Country */}
        {countries.length > 0 && (
          <FilterGroup title="Country">
            {countries.map((c) => (
              <label key={c.name} className="flex items-center gap-2.5 py-1.5 cursor-pointer group">
                <input
                  type="checkbox"
                  className="accent-brand-red w-3.5 h-3.5 flex-shrink-0"
                  checked={selectedCountry.includes(c.name)}
                  onChange={() => toggle(selectedCountry, setSelectedCountry, c.name, "country")}
                />
                <span className="text-sm text-brand-grey-600 group-hover:text-brand-red transition-colors flex-1">{c.name}</span>
                <span className="text-xs text-brand-grey-400">({c.count})</span>
              </label>
            ))}
          </FilterGroup>
        )}

        {/* Industry */}
        {industries.length > 0 && (
          <FilterGroup title="Industry">
            {industries.map((ind) => (
              <label key={ind.name} className="flex items-center gap-2.5 py-1.5 cursor-pointer group">
                <input
                  type="checkbox"
                  className="accent-brand-red w-3.5 h-3.5 flex-shrink-0"
                  checked={selectedIndustry.includes(ind.name)}
                  onChange={() => toggle(selectedIndustry, setSelectedIndustry, ind.name, "industry")}
                />
                <span className="text-sm text-brand-grey-600 group-hover:text-brand-red transition-colors flex-1">{ind.name}</span>
                <span className="text-xs text-brand-grey-400">({ind.count})</span>
              </label>
            ))}
          </FilterGroup>
        )}

        {/* Experience */}
        <FilterGroup title="Experience">
          {EXPERIENCE.map((e) => (
            <label key={e} className="flex items-center gap-2.5 py-1.5 cursor-pointer group">
              <input
                type="checkbox"
                className="accent-brand-red w-3.5 h-3.5 flex-shrink-0"
                checked={exp.includes(e)}
                onChange={() => toggle(exp, setExp, e, "exp")}
              />
              <span className="text-sm text-brand-grey-600 group-hover:text-brand-red transition-colors">{e}</span>
            </label>
          ))}
        </FilterGroup>

        {/* Salary */}
        <FilterGroup title="Salary Range">
          {SALARY_RANGES.map((s) => (
            <label key={s} className="flex items-center gap-2.5 py-1.5 cursor-pointer group">
              <input
                type="checkbox"
                className="accent-brand-red w-3.5 h-3.5 flex-shrink-0"
                checked={salary.includes(s)}
                onChange={() => toggle(salary, setSalary, s, "salary")}
              />
              <span className="text-sm text-brand-grey-600 group-hover:text-brand-red transition-colors">{s}</span>
            </label>
          ))}
        </FilterGroup>

        {/* Job Type */}
        <FilterGroup title="Job Type">
          {JOB_TYPES.map((t) => (
            <label key={t} className="flex items-center gap-2.5 py-1.5 cursor-pointer group">
              <input
                type="checkbox"
                className="accent-brand-red w-3.5 h-3.5 flex-shrink-0"
                checked={types.includes(t)}
                onChange={() => toggle(types, setTypes, t, "types")}
              />
              <span className="text-sm text-brand-grey-600 group-hover:text-brand-red transition-colors">{t}</span>
            </label>
          ))}
        </FilterGroup>
      </div>
    </>
  );

  // For mobile: render as sidebar with overlay
  if (isMobile) {
    return (
      <>
        {/* Overlay */}
        <div 
          className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
            isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={onClose}
        />
        
        {/* Sidebar */}
        <div 
          className={`fixed top-0 right-0 h-full w-full max-w-[400px] bg-white z-50 shadow-2xl transition-transform duration-300 ease-in-out flex flex-col ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <FilterContent />
        </div>
      </>
    );
  }

  // For desktop: render as sticky sidebar
  return (
    <div className="bg-white border border-brand-grey-200 rounded-xl sticky top-20 overflow-hidden flex flex-col" style={{ maxHeight: "calc(100vh - 100px)" }}>
      <FilterContent />
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-5 pb-5 border-b border-brand-grey-100 last:border-0 last:mb-0 last:pb-0">
      <p className="text-xs font-bold text-brand-grey-700 uppercase tracking-widest mb-3">{title}</p>
      {children}
    </div>
  );
}