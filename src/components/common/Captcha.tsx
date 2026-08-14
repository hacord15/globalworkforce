// src/components/common/Captcha.tsx
"use client";

import { forwardRef, useImperativeHandle, useRef, useState, useCallback } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { AlertCircle } from "lucide-react";

export type CaptchaHandle = {
  reset: () => void;
  isVerified: () => boolean;
};

type CaptchaProps = {
  onVerifiedChange?: (verified: boolean) => void; // parent ko notify karne ke liye
  className?: string;
  showErrorHint?: boolean; // agar submit try hua bina verify ke, to warning dikhani ho
  triedSubmit?: boolean;
};

// ── Reusable CAPTCHA ─────────────────────────────────────────────────────
// Usage: bas <Captcha ref={captchaRef} onVerifiedChange={setCaptchaVerified} />
// Reset karna ho to: captchaRef.current?.reset()
const Captcha = forwardRef<CaptchaHandle, CaptchaProps>(function Captcha(
  { onVerifiedChange, className = "", showErrorHint = false, triedSubmit = false },
  ref
) {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [verified, setVerified] = useState(false);

  const setVerifiedState = useCallback(
    (v: boolean) => {
      setVerified(v);
      onVerifiedChange?.(v);
    },
    [onVerifiedChange]
  );

  const handleChange = (token: string | null) => setVerifiedState(Boolean(token));
  const handleExpired = () => setVerifiedState(false);
  const handleErrored = () => setVerifiedState(false);

  useImperativeHandle(ref, () => ({
    reset: () => {
      recaptchaRef.current?.reset();
      setVerifiedState(false);
    },
    isVerified: () => verified,
  }));

  return (
    <div className={`flex flex-col items-center gap-1.5 ${className}`}>
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
        onChange={handleChange}
        onExpired={handleExpired}
        onErrored={handleErrored}
      />
      {showErrorHint && triedSubmit && !verified && (
        <p className="flex items-center gap-1 text-[11px] text-brand-red">
          <AlertCircle size={10} /> Please complete the CAPTCHA verification.
        </p>
      )}
    </div>
  );
});

export default Captcha;