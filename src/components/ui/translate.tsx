"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

type Lang = { code: string; label: string; flag: string };

// flag = ISO country code used by flagcdn.com
const LANGUAGES: Lang[] = [
  { code: "en", label: "English", flag: "gb" },
  { code: "fi", label: "Suomi", flag: "fi" },
  { code: "da", label: "Dansk", flag: "dk" },
  { code: "de", label: "Deutsch", flag: "de" },
  { code: "sk", label: "Slovenčina", flag: "sk" },
  { code: "sl", label: "Slovenščina", flag: "si" },
  { code: "ar", label: "العربية", flag: "sa" },
  { code: "it", label: "Italiano", flag: "it" },
];

const INCLUDED_LANGUAGES = LANGUAGES.map((l) => l.code).join(",");
const COOKIE_NAME = "googtrans";

// ---- React vs Google Translate DOM-mutation crash guard ----
function patchDomForTranslate() {
  if ((window as any).__domPatchedForTranslate) return;
  (window as any).__domPatchedForTranslate = true;

  const originalRemoveChild = Node.prototype.removeChild;
  Node.prototype.removeChild = function (child: any) {
    if (child.parentNode !== this) return child;
    return originalRemoveChild.apply(this, arguments as any);
  };

  const originalInsertBefore = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function (newNode: any, referenceNode: any) {
    if (referenceNode && referenceNode.parentNode !== this) return newNode;
    return originalInsertBefore.apply(this, arguments as any);
  };
}

function getCookie(name: string) {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

function setLanguageCookie(code: string) {
  const domain = window.location.hostname;
  if (code === "en") {
    // clear cookie -> back to original site language
    document.cookie = `${COOKIE_NAME}=;path=/;expires=Thu, 01 Jan 1970 00:00:00 UTC`;
    document.cookie = `${COOKIE_NAME}=;path=/;domain=.${domain};expires=Thu, 01 Jan 1970 00:00:00 UTC`;
  } else {
    const value = `/en/${code}`;
    document.cookie = `${COOKIE_NAME}=${value};path=/`;
    document.cookie = `${COOKIE_NAME}=${value};path=/;domain=.${domain}`;
  }
}

export default function TranslateWidget() {
  const initialized = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState("en");
  

//block the suggest google pop-up

useEffect(() => {
  const cleanupGoogleUI = () => {
    // remove the "suggest a better translation" popup
    document
      .querySelectorAll("#goog-gt-tt, .goog-te-balloon-frame, .goog-tooltip")
      .forEach((el) => el.remove());

    // strip the full-text hover-highlight effect
    document.querySelectorAll(".goog-text-highlight").forEach((el) => {
      el.classList.remove("goog-text-highlight");
      (el as HTMLElement).removeAttribute("style");
    });
  };

  cleanupGoogleUI();

  const observer = new MutationObserver(cleanupGoogleUI);

  

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["class", "style"],
  });

  return () => observer.disconnect();
}, []);
  useEffect(() => {
    patchDomForTranslate();

    window.googleTranslateElementInit = () => {
      if (initialized.current) return;
      if (!document.getElementById("google_translate_element")) return;
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: INCLUDED_LANGUAGES,
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        "google_translate_element"
      );
      initialized.current = true;
    };

    if (window.google?.translate) window.googleTranslateElementInit();

    const cookieVal = getCookie(COOKIE_NAME); // "/en/hi"
    const code = cookieVal?.split("/")[2];
    if (code) setCurrent(code);
  }, []);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function selectLanguage(code: string) {
    if (code === current) {
      setOpen(false);
      return;
    }
    setLanguageCookie(code);
    window.location.reload(); // guaranteed, instant-feeling switch
  }

  const activeLang = LANGUAGES.find((l) => l.code === current) ?? LANGUAGES[0];

  return (
    <>
      <Script
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />
      <div
        id="google_translate_element"
        className="notranslate"
        style={{ visibility: "hidden", width: "1px", height: "1px", position: "absolute" }}
      />

      <div ref={containerRef} className="relative notranslate">
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-1.5 rounded-full border border-gray-200 px-2.5 py-1.5 hover:border-red-600 transition-colors"
        >
          <img
            src={`https://flagcdn.com/24x18/${activeLang.flag}.png`}
            alt={activeLang.label}
            className="w-4 h-3 object-cover rounded-sm"
          />
          <ChevronDown size={12} className="text-gray-500" />
        </button>

        {open && (
          <div className="absolute top-full right-0 mt-2 w-40 bg-white shadow-xl rounded-md border-t-2 border-red-600 z-50 py-1">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => selectLanguage(lang.code)}
                className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 transition-colors ${
                  lang.code === current ? "text-red-600 font-medium" : "text-gray-700"
                }`}
              >
                <img
                  src={`https://flagcdn.com/24x18/${lang.flag}.png`}
                  alt={lang.label}
                  className="w-4 h-3 object-cover rounded-sm flex-shrink-0"
                />
                {lang.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}