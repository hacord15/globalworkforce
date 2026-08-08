// // components/CookieConsent.tsx

// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";

// export default function CookieConsent() {
//   const [visible, setVisible] = useState(false);
//   const [showDetails, setShowDetails] = useState(false);
//   const [preferences, setPreferences] = useState({
//     necessary: true,
//     analytics: false,
//     marketing: false,
//   });

//   useEffect(() => {
//     const consent = localStorage.getItem("sis-cookie-consent");
//     if (!consent) {
//       const timer = setTimeout(() => setVisible(true), 800);
//       return () => clearTimeout(timer);
//     }
//   }, []);

//   const acceptAll = () => {
//     localStorage.setItem(
//       "sis-cookie-consent",
//       JSON.stringify({ necessary: true, analytics: true, marketing: true })
//     );
//     setVisible(false);
//   };

//   const rejectAll = () => {
//     localStorage.setItem(
//       "sis-cookie-consent",
//       JSON.stringify({ necessary: true, analytics: false, marketing: false })
//     );
//     setVisible(false);
//   };

//   const savePreferences = () => {
//     localStorage.setItem("sis-cookie-consent", JSON.stringify(preferences));
//     setVisible(false);
//   };

//   if (!visible) return null;

//   return (
//     <div className="fixed bottom-6 left-6 z-[999] w-[420px] max-w-[calc(100vw-3rem)] bg-[#1a1a1a] rounded-lg shadow-2xl overflow-hidden">

//       {!showDetails ? (
//         /* Simple View — matches screenshot */
//         <div className="p-6">
//           <h3 className="text-white font-bold text-lg mb-3">
//             We value your privacy
//           </h3>
//           <p className="text-gray-300 text-sm leading-relaxed mb-4">
//             By clicking "Accept All Cookies", you agree to the storing of
//             cookies on your device and to the associated processing of data to
//             enhance site navigation, analyze site usage, and assist in our
//             marketing and performance efforts. You may withdraw your consent at
//             any time via the "Manage Preferences" button in our Cookie Notice.{" "}
//             <Link
//               href="/cookies"
//               className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
//             >
//               Cookie Notice
//             </Link>{" "}
//             |{" "}
//             <button
//               onClick={() => setShowDetails(true)}
//               className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors bg-transparent border-none cursor-pointer p-0 text-sm"
//             >
//               Manage Preferences
//             </button>
//           </p>

//           <div className="flex gap-3">
//             <button
//               onClick={rejectAll}
//               className="flex-1 py-3 px-4 bg-[#cc0000] hover:bg-[#aa0000] text-white text-sm font-semibold rounded transition-colors duration-200 cursor-pointer"
//             >
//               Reject Cookies
//             </button>
//             <button
//               onClick={acceptAll}
//               className="flex-1 py-3 px-4 bg-[#cc0000] hover:bg-[#aa0000] text-white text-sm font-semibold rounded transition-colors duration-200 cursor-pointer"
//             >
//               Accept All Cookies
//             </button>
//           </div>
//         </div>
//       ) : (
//         /* Manage Preferences View */
//         <div className="p-6">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-white font-bold text-lg">Manage Preferences</h3>
//             <button
//               onClick={() => setShowDetails(false)}
//               className="text-gray-400 hover:text-white transition-colors cursor-pointer bg-transparent border-none p-1"
//               aria-label="Close"
//             >
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//           </div>

//           <div className="space-y-3 mb-5">
//             {/* Necessary */}
//             <div className="flex items-start justify-between p-3 rounded bg-white/5 border border-white/10">
//               <div className="flex-1 pr-4">
//                 <div className="flex items-center gap-2 mb-1">
//                   <span className="text-white font-semibold text-sm">Necessary</span>
//                   <span className="text-xs px-2 py-0.5 rounded bg-[#cc0000]/20 text-red-400 border border-red-500/20">
//                     Always On
//                   </span>
//                 </div>
//                 <p className="text-gray-500 text-xs leading-relaxed">
//                   Required for the website to function. Cannot be disabled.
//                 </p>
//               </div>
//               <div className="flex-shrink-0 mt-0.5">
//                 <div className="w-10 h-5 bg-[#cc0000] rounded-full relative opacity-50 cursor-not-allowed">
//                   <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full" />
//                 </div>
//               </div>
//             </div>

//             {/* Analytics */}
//             <div className="flex items-start justify-between p-3 rounded bg-white/5 border border-white/10">
//               <div className="flex-1 pr-4">
//                 <span className="text-white font-semibold text-sm block mb-1">Analytics</span>
//                 <p className="text-gray-500 text-xs leading-relaxed">
//                   Help us understand how visitors interact with our site.
//                 </p>
//               </div>
//               <button
//                 onClick={() => setPreferences(p => ({ ...p, analytics: !p.analytics }))}
//                 className={`flex-shrink-0 mt-0.5 w-10 h-5 rounded-full relative transition-colors duration-200 cursor-pointer border-none ${
//                   preferences.analytics ? "bg-[#cc0000]" : "bg-white/20"
//                 }`}
//                 aria-label="Toggle analytics"
//               >
//                 <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all duration-200 ${
//                   preferences.analytics ? "right-0.5" : "left-0.5"
//                 }`} />
//               </button>
//             </div>

//             {/* Marketing */}
//             <div className="flex items-start justify-between p-3 rounded bg-white/5 border border-white/10">
//               <div className="flex-1 pr-4">
//                 <span className="text-white font-semibold text-sm block mb-1">Marketing</span>
//                 <p className="text-gray-500 text-xs leading-relaxed">
//                   Used for personalised ads and campaign tracking.
//                 </p>
//               </div>
//               <button
//                 onClick={() => setPreferences(p => ({ ...p, marketing: !p.marketing }))}
//                 className={`flex-shrink-0 mt-0.5 w-10 h-5 rounded-full relative transition-colors duration-200 cursor-pointer border-none ${
//                   preferences.marketing ? "bg-[#cc0000]" : "bg-white/20"
//                 }`}
//                 aria-label="Toggle marketing"
//               >
//                 <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all duration-200 ${
//                   preferences.marketing ? "right-0.5" : "left-0.5"
//                 }`} />
//               </button>
//             </div>
//           </div>

//           <div className="flex gap-3">
//             <button
//               onClick={rejectAll}
//               className="flex-1 py-3 px-4 bg-[#cc0000] hover:bg-[#aa0000] text-white text-sm font-semibold rounded transition-colors duration-200 cursor-pointer"
//             >
//               Reject All
//             </button>
//             <button
//               onClick={savePreferences}
//               className="flex-1 py-3 px-4 bg-[#cc0000] hover:bg-[#aa0000] text-white text-sm font-semibold rounded transition-colors duration-200 cursor-pointer"
//             >
//               Save Preferences
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }




// components/CookieConsent.tsx

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const POLICY_INTRO = `SIS Global Workforce Private Limited Solutions (hereinafter 'SIS', 'we', 'us', or 'our') is committed to protecting the privacy and personal data of all individuals who visit our website at www.sisglobalworkforce.com (the 'Website'). This Cookie Policy explains what cookies are, how we use them, your choices regarding their use, and how this Policy aligns with the Digital Personal Data Protection Act, 2023 (DPDP Act) and applicable Indian law. By using our Website, you acknowledge that you have read and understood this Cookie Policy. Where cookies process your personal data, your explicit consent will be sought through our cookie consent banner before any non-essential cookies are placed on your device.`;

const COOKIE_CATEGORIES = [
  {
    key: "necessary" as const,
    label: "Necessary",
    badge: "Always Active",
    desc: "Necessary cookies are required to enable the basic features of this site, such as providing secure log-in or adjusting your consent preferences. These cookies do not store any personally identifiable data.",
    locked: true,
  },
  {
    key: "functional" as const,
    label: "Functional",
    desc: "Functional cookies help perform certain functionalities like sharing the content of the website on social media platforms, collecting feedback, and other third-party features.",
    locked: false,
  },
  {
    key: "analytics" as const,
    label: "Analytics",
    desc: "Analytical cookies are used to understand how visitors interact with the website. These cookies help provide information on metrics such as the number of visitors, bounce rate, traffic source, etc.",
    locked: false,
  },
  {
    key: "performance" as const,
    label: "Performance",
    desc: "Performance cookies are used to understand and analyse the key performance indexes of the website which helps in delivering a better user experience for the visitors.",
    locked: false,
  },
  {
    key: "advertisement" as const,
    label: "Advertisement",
    desc: "Advertisement cookies are used to provide visitors with customised advertisements based on the pages you visited previously and to analyse the effectiveness of the ad campaigns.",
    locked: false,
  },
];

type Preferences = {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  performance: boolean;
  advertisement: boolean;
};

const ALL_ON: Preferences = {
  necessary: true,
  functional: true,
  analytics: true,
  performance: true,
  advertisement: true,
};

const ALL_OFF: Preferences = {
  necessary: true,
  functional: false,
  analytics: false,
  performance: false,
  advertisement: false,
};

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<Preferences>(ALL_OFF);

  useEffect(() => {
    const consent = localStorage.getItem("sis-cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem("sis-cookie-consent", JSON.stringify(ALL_ON));
    setVisible(false);
  };

  const rejectAll = () => {
    localStorage.setItem("sis-cookie-consent", JSON.stringify(ALL_OFF));
    setVisible(false);
  };

  const savePreferences = () => {
    localStorage.setItem("sis-cookie-consent", JSON.stringify(preferences));
    setVisible(false);
  };

  const toggleCategory = (key: keyof Preferences) => {
    setPreferences((p) => ({ ...p, [key]: !p[key] }));
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-[999] w-[420px] max-w-[calc(100vw-3rem)] bg-[#1a1a1a] rounded-lg shadow-2xl overflow-hidden">

      {!showDetails ? (
        /* Simple View */
        <div className="p-6">
          <h3 className="text-white font-bold text-lg mb-3">
            We value your privacy
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed mb-4 max-h-[220px] overflow-y-auto pr-1">
            {POLICY_INTRO}{" "}
            <Link
              href="/cookies"
              className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
            >
              Cookie Notice
            </Link>{" "}
            |{" "}
            <button
              onClick={() => setShowDetails(true)}
              className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors bg-transparent border-none cursor-pointer p-0 text-sm"
            >
              Manage Preferences
            </button>
          </p>

          <div className="flex gap-3">
            <button
              onClick={rejectAll}
              className="flex-1 py-3 px-4 bg-[#cc0000] hover:bg-[#aa0000] text-white text-sm font-semibold rounded transition-colors duration-200 cursor-pointer"
            >
              Reject Cookies
            </button>
            <button
              onClick={acceptAll}
              className="flex-1 py-3 px-4 bg-[#cc0000] hover:bg-[#aa0000] text-white text-sm font-semibold rounded transition-colors duration-200 cursor-pointer"
            >
              Accept All Cookies
            </button>
          </div>
        </div>
      ) : (
        /* Manage Preferences View */
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-bold text-lg">Manage Preferences</h3>
            <button
              onClick={() => setShowDetails(false)}
              className="text-gray-400 hover:text-white transition-colors cursor-pointer bg-transparent border-none p-1"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-3 mb-5 max-h-[320px] overflow-y-auto pr-1">
            {COOKIE_CATEGORIES.map((cat) => (
              <div
                key={cat.key}
                className="flex items-start justify-between p-3 rounded bg-white/5 border border-white/10"
              >
                <div className="flex-1 pr-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white font-semibold text-sm">{cat.label}</span>
                    {cat.badge && (
                      <span className="text-xs px-2 py-0.5 rounded bg-[#cc0000]/20 text-red-400 border border-red-500/20">
                        {cat.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-500 text-xs leading-relaxed">{cat.desc}</p>
                </div>

                {cat.locked ? (
                  <div className="flex-shrink-0 mt-0.5">
                    <div className="w-10 h-5 bg-[#cc0000] rounded-full relative opacity-50 cursor-not-allowed">
                      <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full" />
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => toggleCategory(cat.key)}
                    className={`flex-shrink-0 mt-0.5 w-10 h-5 rounded-full relative transition-colors duration-200 cursor-pointer border-none ${
                      preferences[cat.key] ? "bg-[#cc0000]" : "bg-white/20"
                    }`}
                    aria-label={`Toggle ${cat.label.toLowerCase()}`}
                  >
                    <div
                      className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all duration-200 ${
                        preferences[cat.key] ? "right-0.5" : "left-0.5"
                      }`}
                    />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <button
              onClick={rejectAll}
              className="flex-1 py-3 px-4 bg-[#cc0000] hover:bg-[#aa0000] text-white text-sm font-semibold rounded transition-colors duration-200 cursor-pointer"
            >
              Reject All
            </button>
            <button
              onClick={savePreferences}
              className="flex-1 py-3 px-4 bg-[#cc0000] hover:bg-[#aa0000] text-white text-sm font-semibold rounded transition-colors duration-200 cursor-pointer"
            >
              Save Preferences
            </button>
          </div>
        </div>
      )}
    </div>
  );
}