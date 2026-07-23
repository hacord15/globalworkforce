// /**
//  * SIS Global – Public API Service
//  * ─────────────────────────────────────────────────────────────────────────────
//  * All public endpoints are centralised here.
//  * To point at a different base URL, change BASE_URL only.
//  * To add a new endpoint, add a typed function at the bottom.
//  * ─────────────────────────────────────────────────────────────────────────────
//  */

// // ── Base configuration ────────────────────────────────────────────────────

// const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://sisglobalapi.neuralinfo.co.in";

// /** Generic fetch wrapper — throws on non-2xx responses */
// async function apiFetch<T>(
//   path: string,
//   options: RequestInit = {}
// ): Promise<T> {
//   const res = await fetch(`${BASE_URL}${path}`, {
//     headers: { "Content-Type": "application/json", ...options.headers },
//     ...options,
//   });

//   if (!res.ok) {
//     const body = await res.text().catch(() => res.statusText);
//     throw new Error(body || `HTTP ${res.status}`);
//   }

//   return res.json() as Promise<T>;
// }

// // ── Location types ────────────────────────────────────────────────────────

// export interface ApiCountry {
//   country_id:   number;
//   country_name: string;
//   country_code: string;
//   iso_code:     string;
//   status:       number;
//   created_at:   string;
// }

// export interface ApiState {
//   state_id:     number;
//   state_name:   string;
//   state_code:   string;
//   country_id:   number;
//   country_name: string;
//   status:       number;
//   created_at:   string;
// }

// export interface ApiCity {
//   city_id:      number;
//   city_name:    string;
//   state_id:     number;
//   state_name:   string;
//   country_id:   number;
//   country_name: string;
//   status:       number;
//   created_at:   string;
// }

// // ── Location endpoints ────────────────────────────────────────────────────

// /** Fetch all countries */
// export function fetchCountries(): Promise<ApiCountry[]> {
//   return apiFetch<ApiCountry[]>("/public/location/countries");
// }

// /** Fetch states for a given country */
// export function fetchStates(countryId: number): Promise<ApiState[]> {
//   return apiFetch<ApiState[]>(`/public/location/states?country_id=${countryId}`);
// }

// /** Fetch cities for a given state */
// export function fetchCities(stateId: number): Promise<ApiCity[]> {
//   return apiFetch<ApiCity[]>(`/public/location/cities?state_id=${stateId}`);
// }

// // ── Employer signup ───────────────────────────────────────────────────────

// export interface EmployerSignupPayload {
//   status:              boolean;
//   organisation_name:   string;
//   contact_name:        string;
//   email:               string;
//   phone:               string;
//   alt_phone?:          string;
//   alt_email?:          string;
//   address:             string;
//   address2?:           string;
//   city_id:             number;
//   state_id:            number;
//   country_id:          number;
//   pin:                 string;
//   website?:            string;
//   landline?:           string;
//   cr_licence_number?:  string; // maps to GSTIN / CIN
//   partner_name?:       string;
//   partner_code?:       string;
//   alt_partner_name?:   string;
//   other_info?:         string; // JSON-stringified extra fields (industry, company type, etc.)
// }

// export interface EmployerSignupResponse {
//   success:  boolean;
//   message?: string;
//   data?:    Record<string, unknown>;
// }

// /** Register a new employer */
// export function registerEmployer(
//   payload: EmployerSignupPayload
// ): Promise<EmployerSignupResponse> {
//   return apiFetch<EmployerSignupResponse>("/public/employer-signup", {
//     method: "POST",
//     body:   JSON.stringify(payload),
//   });
// }

// // ── Associate partner signup ──────────────────────────────────────────────

// export interface AssociatePartnerSignupPayload {
//   status:                     boolean;
//   organisation_name:          string;
//   primary_contact:            string;
//   email:                      string;
//   alternate_contact?:         string;
//   alt_email?:                 string;
//   address1:                   string;
//   address2?:                  string;
//   city_id:                    number;
//   state_id:                   number;
//   country_id:                 number;
//   pin:                        string;
//   landline?:                  string;
//   associate_partner_name?:    string;
//   associate_partner_code?:    string;
//   alt_associate_partner_name?: string;
//   other_info?:                string; // JSON-stringified extra fields
// }

// export interface AssociatePartnerSignupResponse {
//   success:  boolean;
//   message?: string;
//   data?:    Record<string, unknown>;
// }

// /** Register a new associate partner */
// export function registerAssociatePartner(
//   payload: AssociatePartnerSignupPayload
// ): Promise<AssociatePartnerSignupResponse> {
//   return apiFetch<AssociatePartnerSignupResponse>("/public/associate-partner-signup", {
//     method: "POST",
//     body:   JSON.stringify(payload),
//   });
// }

// // ── Future endpoints (add below) ──────────────────────────────────────────
// // export function fetchJobCategories(): Promise<JobCategory[]> { ... }
// // export function submitJobApplication(payload): Promise<...> { ... }



// const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://sisglobalapi.neuralinfo.co.in";

// /** Generic fetch wrapper — throws on non-2xx responses */
// async function apiFetch<T>(
//   path: string,
//   options: RequestInit = {}
// ): Promise<T> {
//   const res = await fetch(`${BASE_URL}${path}`, {
//     headers: { "Content-Type": "application/json", ...options.headers },
//     ...options,
//   });

//   if (!res.ok) {
//     const body = await res.text().catch(() => res.statusText);
//     throw new Error(body || `HTTP ${res.status}`);
//   }

//   return res.json() as Promise<T>;
// }

// // ── Location types ────────────────────────────────────────────────────────

// export interface ApiCountry {
//   country_id:   number;
//   country_name: string;
//   country_code: string;
//   iso_code:     string;
//   status:       number;
//   created_at:   string;
// }

// export interface ApiState {
//   state_id:     number;
//   state_name:   string;
//   state_code:   string;
//   country_id:   number;
//   country_name: string;
//   status:       number;
//   created_at:   string;
// }

// export interface ApiCity {
//   city_id:      number;
//   city_name:    string;
//   state_id:     number;
//   state_name:   string;
//   country_id:   number;
//   country_name: string;
//   status:       number;
//   created_at:   string;
// }

// // ── Location endpoints ────────────────────────────────────────────────────

// /** Fetch all countries */
// export function fetchCountries(): Promise<ApiCountry[]> {
//   return apiFetch<ApiCountry[]>("/public/location/countries");
// }

// /** Fetch states for a given country */
// export function fetchStates(countryId: number): Promise<ApiState[]> {
//   return apiFetch<ApiState[]>(`/public/location/states?country_id=${countryId}`);
// }

// /** Fetch cities for a given state */
// export function fetchCities(stateId: number): Promise<ApiCity[]> {
//   return apiFetch<ApiCity[]>(`/public/location/cities?state_id=${stateId}`);
// }

// // ── Employer signup ───────────────────────────────────────────────────────

// export interface EmployerSignupPayload {
//   status:              boolean;
//   organisation_name:   string;
//   contact_name:        string;
//   email:               string;
//   phone:               string;
//   alt_phone?:          string;
//   alt_email?:          string;
//   address:             string;
//   address2?:           string;
//   city_id:             number;
//   state_id:            number;
//   country_id:          number;
//   pin:                 string;
//   website?:            string;
//   landline?:           string;
//   cr_licence_number?:  string; // maps to GSTIN / CIN
//   partner_name?:       string;
//   partner_code?:       string;
//   alt_partner_name?:   string;
//   other_info?:         string; // JSON-stringified extra fields (industry, company type, etc.)
// }

// export interface EmployerSignupResponse {
//   success:  boolean;
//   message?: string;
//   data?:    Record<string, unknown>;
// }

// /** Register a new employer */
// export function registerEmployer(
//   payload: EmployerSignupPayload
// ): Promise<EmployerSignupResponse> {
//   return apiFetch<EmployerSignupResponse>("/public/employer-signup", {
//     method: "POST",
//     body:   JSON.stringify(payload),
//   });
// }

// // ── Associate partner signup ──────────────────────────────────────────────

// export interface AssociatePartnerSignupPayload {
//   status:                     boolean;
//   organisation_name:          string;
//   primary_contact:            string;
//   email:                      string;
//   alternate_contact?:         string;
//   alt_email?:                 string;
//   address1:                   string;
//   address2?:                  string;
//   city_id:                    number;
//   state_id:                   number;
//   country_id:                 number;
//   pin:                        string;
//   landline?:                  string;
//   associate_partner_name?:    string;
//   associate_partner_code?:    string;
//   alt_associate_partner_name?: string;
//   other_info?:                string; // JSON-stringified extra fields
// }

// export interface AssociatePartnerSignupResponse {
//   success:  boolean;
//   message?: string;
//   data?:    Record<string, unknown>;
// }

// /** Register a new associate partner */
// export function registerAssociatePartner(
//   payload: AssociatePartnerSignupPayload
// ): Promise<AssociatePartnerSignupResponse> {
//   return apiFetch<AssociatePartnerSignupResponse>("/public/associate-partner-signup", {
//     method: "POST",
//     body:   JSON.stringify(payload),
//   });
// }

// // ── Website contact-form endpoints (Contact Us page) ──────────────────────

// export interface EmployerRequirementPayload {
//   company:     string;
//   contact:     string;
//   country:     string;
//   workers:     number;
//   requirement: string;
//   email:       string;
//   phone:       string;
// }

// export interface CandidateApplicationPayload {
//   name:              string;
//   phone:             string;
//   trade:             string;
//   experience:        string;
//   country:           string;
//   resume_file_name:  string;
//   resume_file_path:  string;
//   resume:            string; // base64-encoded file content
// }

// export interface WebsiteFormResponse {
//   success?: boolean;
//   message?: string;
//   data?:    Record<string, unknown>;
// }

// /** Submit the "Partner with Us" hiring-requirement form (Contact Us page) */
// export function submitEmployerRequirement(
//   payload: EmployerRequirementPayload
// ): Promise<WebsiteFormResponse> {
//   return apiFetch<WebsiteFormResponse>("/public/website-forms/employer", {
//     method: "POST",
//     body:   JSON.stringify(payload),
//   });
// }

// /** Submit the "Apply for Job" candidate application form (Contact Us page) */
// export function submitCandidateApplication(
//   payload: CandidateApplicationPayload
// ): Promise<WebsiteFormResponse> {
//   return apiFetch<WebsiteFormResponse>("/public/website-forms/candidate", {
//     method: "POST",
//     body:   JSON.stringify(payload),
//   });
// }

// /**
//  * Reads a File as a base64 string (without the `data:...;base64,` prefix)
//  * so it can be sent inside a JSON body — used for the candidate resume upload.
//  */
// export function fileToBase64(file: File): Promise<string> {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onload = () => {
//       const result = reader.result as string;
//       const base64 = result.includes(",") ? result.split(",")[1] : result;
//       resolve(base64);
//     };
//     reader.onerror = () => reject(reader.error ?? new Error("Failed to read the file."));
//     reader.readAsDataURL(file);
//   });
// }

// // ── Future endpoints (add below) ──────────────────────────────────────────
// // export function fetchJobCategories(): Promise<JobCategory[]> { ... }



/**
 * SIS Global – Public API Service
 * ─────────────────────────────────────────────────────────────────────────────
 * All public endpoints are centralised here.
 * To point at a different base URL, change BASE_URL only.
 * To add a new endpoint, add a typed function at the bottom.
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ── Base configuration ────────────────────────────────────────────────────

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://sisglobalapi.neuralinfo.co.in";

// Website-forms (Contact Us page) currently live on a separate API — kept as its
// own base URL until both are merged onto one backend.
const WEBSITE_FORMS_BASE_URL =
  process.env.NEXT_PUBLIC_WEBSITE_FORMS_API_BASE_URL ??
  "https://api.sisglobalworkforce.com";

/** Generic fetch wrapper — throws on non-2xx responses */
async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
  base: string = BASE_URL
): Promise<T> {
  const res = await fetch(`${base}${path}`, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });

  if (!res.ok) {
    const body = await res.text().catch(() => res.statusText);
    throw new Error(body || `HTTP ${res.status}`);
  }

  return res.json() as Promise<T>;
}

// ── Location types ────────────────────────────────────────────────────────

export interface ApiCountry {
  country_id:   number;
  country_name: string;
  country_code: string;
  iso_code:     string;
  status:       number;
  created_at:   string;
}

export interface ApiState {
  state_id:     number;
  state_name:   string;
  state_code:   string;
  country_id:   number;
  country_name: string;
  status:       number;
  created_at:   string;
}

export interface ApiCity {
  city_id:      number;
  city_name:    string;
  state_id:     number;
  state_name:   string;
  country_id:   number;
  country_name: string;
  status:       number;
  created_at:   string;
}

// ── Location endpoints ────────────────────────────────────────────────────

/** Fetch all countries */
export function fetchCountries(): Promise<ApiCountry[]> {
  return apiFetch<ApiCountry[]>("/public/location/countries");
}

/** Fetch states for a given country */
export function fetchStates(countryId: number): Promise<ApiState[]> {
  return apiFetch<ApiState[]>(`/public/location/states?country_id=${countryId}`);
}

/** Fetch cities for a given state */
export function fetchCities(stateId: number): Promise<ApiCity[]> {
  return apiFetch<ApiCity[]>(`/public/location/cities?state_id=${stateId}`);
}

// ── Employer signup ───────────────────────────────────────────────────────

export interface EmployerSignupPayload {
  status:              boolean;
  organisation_name:   string;
  contact_name:        string;
  email:               string;
  phone:               string;
  alt_phone?:          string;
  alt_email?:          string;
  address:             string;
  address2?:           string;
  city_id:             number;
  state_id:            number;
  country_id:          number;
  pin:                 string;
  website?:            string;
  landline?:           string;
  cr_licence_number?:  string; // maps to GSTIN / CIN
  partner_name?:       string;
  partner_code?:       string;
  alt_partner_name?:   string;
  other_info?:         string; // JSON-stringified extra fields (industry, company type, etc.)
}

export interface EmployerSignupResponse {
  success:  boolean;
  message?: string;
  data?:    Record<string, unknown>;
}

/** Register a new employer */
export function registerEmployer(
  payload: EmployerSignupPayload
): Promise<EmployerSignupResponse> {
  return apiFetch<EmployerSignupResponse>("/public/employer-signup", {
    method: "POST",
    body:   JSON.stringify(payload),
  });
}

// ── Associate partner signup ──────────────────────────────────────────────

export interface AssociatePartnerSignupPayload {
  status:                     boolean;
  organisation_name:          string;
  primary_contact:            string;
  email:                      string;
  alternate_contact?:         string;
  alt_email?:                 string;
  address1:                   string;
  address2?:                  string;
  city_id:                    number;
  state_id:                   number;
  country_id:                 number;
  pin:                        string;
  landline?:                  string;
  associate_partner_name?:    string;
  associate_partner_code?:    string;
  alt_associate_partner_name?: string;
  other_info?:                string; // JSON-stringified extra fields
}

export interface AssociatePartnerSignupResponse {
  success:  boolean;
  message?: string;
  data?:    Record<string, unknown>;
}

/** Register a new associate partner */
export function registerAssociatePartner(
  payload: AssociatePartnerSignupPayload
): Promise<AssociatePartnerSignupResponse> {
  return apiFetch<AssociatePartnerSignupResponse>("/public/associate-partner-signup", {
    method: "POST",
    body:   JSON.stringify(payload),
  });
}

// ── Website contact-form endpoints (Contact Us page) ──────────────────────

export interface EmployerRequirementPayload {
  company:     string;
  contact:     string;
  country:     string;
  workers:     number;
  requirement: string;
  email:       string;
  phone:       string;
}

export interface CandidateApplicationPayload {
  name:              string;
  phone:             string;
  trade:             string;
  experience:        string;
  country:           string;
  resume_file_name:  string;
  resume_file_path:  string;
  resume:            string; // base64-encoded file content
}

export interface WebsiteFormResponse {
  success?: boolean;
  message?: string;
  data?:    Record<string, unknown>;
}

/** Submit the "Partner with Us" hiring-requirement form (Contact Us page) */
export function submitEmployerRequirement(
  payload: EmployerRequirementPayload
): Promise<WebsiteFormResponse> {
  return apiFetch<WebsiteFormResponse>(
    "/public/website-forms/employer",
    { method: "POST", body: JSON.stringify(payload) },
    WEBSITE_FORMS_BASE_URL
  );
}

/** Submit the "Apply for Job" candidate application form (Contact Us page) */
export function submitCandidateApplication(
  payload: CandidateApplicationPayload
): Promise<WebsiteFormResponse> {
  return apiFetch<WebsiteFormResponse>(
    "/public/website-forms/candidate",
    { method: "POST", body: JSON.stringify(payload) },
    WEBSITE_FORMS_BASE_URL
  );
}

/**
 * Reads a File as a base64 string (without the `data:...;base64,` prefix)
 * so it can be sent inside a JSON body — used for the candidate resume upload.
 */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.includes(",") ? result.split(",")[1] : result;
      resolve(base64);
    };
    reader.onerror = () => reject(reader.error ?? new Error("Failed to read the file."));
    reader.readAsDataURL(file);
  });
}

// ── Future endpoints (add below) ──────────────────────────────────────────
// export function fetchJobCategories(): Promise<JobCategory[]> { ... }