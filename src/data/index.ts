import { images } from "@/lib/images";
import type { Industry, NavItem, Stat, RecruitmentStep, CountryData, WhyCard } from "@/types";
import {
  HeartPulse,
  Hotel,
  Cog,
  Truck,
  Wrench,
  MonitorSmartphone,
  RefreshCcw,
  Bot,
  BarChart3,
  Zap,
  ShieldCheck,
  Building2,
  ClipboardList,
  Search,
  Target,
  Bookmark,
  Handshake,
  PartyPopper,
} from "lucide-react";
export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/sis-global",children: [
      { label: "SIS Global", href: "/sis-global" },
      { label: "SIS Group", href: "/sis-group" },
    ], },
  // {
  //   label: "Solutions",
  //   href: "/solutions",
  //   children: [
  //     { label: "Permanent Staffing", href: "/" },
  //     { label: "Contract Staffing", href: "/" },
  //     { label: "Payroll Management", href: "/" },
  //     { label: "HR Consulting", href: "/" },
  //   ],
  // },
 
  { label: "Countries", href: "/countries" },
  { label: "Industries", href: "/industries" },
  
  
  // { label: "Employer", href: "/employers" },
  // { label: "Associate Partner", href: "/associate-partner" },
  { label: "Jobs", href: "/jobs" },
  { label: "Contact Us",  href: "/contact" },
];

export const stats: Stat[] = [
  { value: 9317, label: "Live Jobs" },
  { value: 1253, label: "Companies" },
  { value: 5624, label: "Candidates" },
  { value: 2918, label: "Placements" },
];

export const STATS_About = [];

// export const industry_img = {  
//   healthcare: "/assets/industries/healthcare.jpg",
//   hospitality: "/assets/industries/hospitality.jpg",
//   oil_gas: "/assets/industries/oil-gas.jpg",
//   logistics: "/assets/industries/logistics.jpg",
//   engineering_mep: "/assets/industries/engineering-mep.jpg",
//   it_technology: "/assets/industries/it-technology.jpg",
// };

export const industries = [
  {
    id: "healthcare",
    title: "Healthcare",
    description:
      "",
      bulletpoints: [
        "Nurses",
        "Caregivers",
        "Medical Technicians",
        "MRI Technologists",
      ],
    icon: HeartPulse,
    image:images.industries.healthcare,
    href: "/industries/healthcare",
  },

  {
    id: "hospitality",
    title: "Hospitality",
    description:
      "",
      bulletpoints: [
        "Chefs",
        "Front Office Staff",
        "Bartenders",
        "Housekeeping",
      ],
    icon: Hotel,
    image:images.industries.hospitality,
    href: "/industries/hospitality",
  },

  {
    id: "oil-gas",
    title: "Oil & Gas",
    description:
      "",
      bulletpoints: [
        "Rig Operators",
        "Welders",
        "QA/QC Professionals",
        "Maintenance Engineers",
      ],
    icon: Cog,
    image:images.industries.oil_gas,
    href: "/industries/oil-gas",
  },

  {
    id: "logistics",
    title: "Logistics & Warehousing",
    description:
      "",
      bulletpoints: [
        "Warehouse Supervisors",
        "Inventory Controllers",
        "Forklift Operators",
        
      ],
    icon: Truck,
    image:images.industries.logistics,
    href: "/industries/logistics",
  },

  {
    id: "engineering-mep",
    title: "Engineering & Technical",
    description:
      "",
      bulletpoints: [
        
        "Fabricators",
        "Electricians",
        "Steel Fixers",
        "Pipe Fitters",
      ],
    icon: Wrench,
    image:images.industries.engineering_mep,
    href: "/industries/engineering-mep",
  },

  {
    id: "it-technology",
    title: "Education ",
    description:
      "",
      bulletpoints: [
        "Teachers",
        "Lab Assistants",
        "Administrative Staff",
        
      ],
    icon: MonitorSmartphone,
    image:images.industries.it_technology,
    href: "/industries/it-technology",
  },
];

export const whyCards: WhyCard[] = [
  {
    id: 1,
    title: "Long-Term Employment",
    description:
      "Stable and skilled workforce deployment for ongoing business operations.",
    icon: RefreshCcw,
  },
  {
    id: 2,
    title: "Short-Term Staffing",
    description:
      "Rapid workforce mobilisation for seasonal or project-based requirements.",
    icon: Bot,
  },
  {
    id: 3,
    title: "Event Hiring",
    description:
      "Temporary staffing solutions for exhibitions, hospitality events, industrial shutdowns, and corporate events.",
    icon: BarChart3,
  },
  {
    id: 4,
    title: "Contract Staffing",
    description:
      "Flexible workforce deployment with payroll and compliance support.",
    icon: Zap,
  },
  // {
  //   id: 5,
  //   title: "Compliance Guaranteed",
  //   description:
  //     "We stay ahead of labor regulations, ensuring full legal compliance across all geographies and industry sectors.",
  //   icon: ShieldCheck,
  // },
  // {
  //   id: 6,
  //   title: "Backed by SIS India",
  //   description:
  //     "As a venture of SIS India Ltd., we bring decades of operational excellence and a national network to every engagement.",
  //   icon: Building2,
  // },
];

export const recruitmentSteps: RecruitmentStep[] = [
  {
    id: 1,
    title: "Requirement Analysis",
    description:
      "We deep-dive into your business needs, culture, and specific role requirements to define the ideal candidate profile.",
    icon: ClipboardList,
  },
  {
    id: 2,
    title: "Talent Sourcing",
    description:
      "Our team leverages multiple channels — database, job boards, referrals, and headhunting — to identify qualified candidates.",
    icon: Search,
  },
  {
    id: 3,
    title: "Screening & Assessment",
    description:
      "Rigorous multi-stage screening including skill tests, background verification, and structured interviews.",
    icon: Target,
  },
  {
    id: 4,
    title: "Shortlisting",
    description:
      "Only the top-matched candidates are presented to you with detailed profiles and assessment reports.",
    icon: Bookmark,
  },
  {
    id: 5,
    title: "Client Interview",
    description:
      "We coordinate and facilitate interviews, providing support to both clients and candidates throughout the process.",
    icon: Handshake,
  },
  {
    id: 6,
    title: "Offer & Onboarding",
    description:
      "Seamless offer management, document verification, and a structured onboarding process for smooth joining.",
    icon: PartyPopper,
  },
];

export const countriesData: CountryData[] = [
  { name: "United States", projects: 128, coordinates: [-95, 38] },
  { name: "United Kingdom", projects: 84, coordinates: [-2, 54] },
  { name: "India", projects: 246, coordinates: [78, 22] },
  { name: "Singapore", projects: 63, coordinates: [103.8, 1.3] },
  { name: "Australia", projects: 52, coordinates: [133, -25] },
  { name: "UAE", projects: 41, coordinates: [54, 24] },
];
