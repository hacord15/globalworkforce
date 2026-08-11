export const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "https://sisglobalapi.neuralinfo.co.in";

const WEBSITE_FORMS_BASE_URL =
  process.env.NEXT_PUBLIC_WEBSITE_FORMS_API_BASE_URL ??
  "https://api.sisglobalworkforce.com";



/**
 * Generic fetch wrapper — throws on non-2xx responses.
 * If the error response body is JSON with a `message` field, that's used
 * as the Error message; otherwise falls back to raw text / statusText.
 */
async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
  base: string = BASE_URL,
): Promise<T> {
  const res = await fetch(`${base}${path}`, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });

  if (!res.ok) {
    const raw = await res.text().catch(() => "");
    let message = raw || res.statusText || `HTTP ${res.status}`;

    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (parsed?.message) message = parsed.message;
      } catch {
        // body wasn't JSON — keep the raw text as the message
      }
    }

    throw new Error(message);
  }

  return res.json() as Promise<T>;
}

// ── Location types ────────────────────────────────────────────────────────

export interface ApiCountry {
  country_id: number;
  country_name: string;
  country_code: string;
  iso_code: string;
  status: number;
  created_at: string;
}

export interface ApiState {
  state_id: number;
  state_name: string;
  state_code: string;
  country_id: number;
  country_name: string;
  status: number;
  created_at: string;
}

export interface ApiCity {
  city_id: number;
  city_name: string;
  state_id: number;
  state_name: string;
  country_id: number;
  country_name: string;
  status: number;
  created_at: string;
}

// ── Location endpoints ────────────────────────────────────────────────────

/** Fetch all countries */
export function fetchCountries(): Promise<ApiCountry[]> {
  return apiFetch<ApiCountry[]>("/public/location/countries");
}

/** Fetch states for a given country */
export function fetchStates(countryId: number): Promise<ApiState[]> {
  return apiFetch<ApiState[]>(
    `/public/location/states?country_id=${countryId}`,
  );
}

/** Fetch cities for a given state */
export function fetchCities(stateId: number): Promise<ApiCity[]> {
  return apiFetch<ApiCity[]>(`/public/location/cities?state_id=${stateId}`);
}

// ── Employer signup ───────────────────────────────────────────────────────

export interface EmployerSignupPayload {
  status: boolean;
  organisation_name: string;
  contact_name: string;
  email: string;
  phone: string;
  alt_phone?: string;
  alt_email?: string;
  address: string;
  address2?: string;
  city_id: number;
  state_id: number;
  country_id: number;
  pin: string;
  website?: string;
  landline?: string;
  cr_licence_number?: string; // maps to GSTIN / CIN
  partner_name?: string;
  partner_code?: string;
  alt_partner_name?: string;
  other_info?: string; // JSON-stringified extra fields (industry, company type, etc.)
}

export interface EmployerSignupResponse {
  success: boolean;
  message?: string;
  data?: Record<string, unknown>;
}

/** Register a new employer */
export function registerEmployer(
  payload: EmployerSignupPayload,
): Promise<EmployerSignupResponse> {
  return apiFetch<EmployerSignupResponse>("/public/employer-signup", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

// ── Associate partner signup ──────────────────────────────────────────────

export interface AssociatePartnerSignupPayload {
  status: boolean;
  organisation_name: string;
  primary_contact: string;
  email: string;
  alternate_contact?: string;
  alt_email?: string;
  address1: string;
  address2?: string;
  city_id: number;
  state_id: number;
  country_id: number;
  pin: string;
  landline?: string;
  associate_partner_name?: string;
  associate_partner_code?: string;
  alt_associate_partner_name?: string;
  other_info?: string; // JSON-stringified extra fields
}

export interface AssociatePartnerSignupResponse {
  success: boolean;
  message?: string;
  data?: Record<string, unknown>;
}

/** Register a new associate partner */
export function registerAssociatePartner(
  payload: AssociatePartnerSignupPayload,
): Promise<AssociatePartnerSignupResponse> {
  return apiFetch<AssociatePartnerSignupResponse>(
    "/public/associate-partner-signup",
    {
      method: "POST",
      body: JSON.stringify(payload),
    },
  );
}

// ── Candidate signup (Register page) ───────────────────────────────────────

export interface CandidateSignupPayload {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  passport_number?: string;
  dob?: string | null;
  gender?: string | null;
  country_id?: number | null;
  state_id?: number | null;
  city_id?: number | null;
  experience?: string | null;
  international_experience?: number | null;
}

export interface CandidateSignupResponse {
  candidate_id: number;
  username: string;
  emailed: boolean;
  user_created: boolean;
  existing_user_used: boolean;
  auth_error?: string | null;
}

/**
 * Register a new candidate.
 * Uses `CANDIDATE_SIGNUP_BASE_URL` (fixed, not env-driven) instead of the
 * general `BASE_URL`.
 */
export function registerCandidate(
  payload: CandidateSignupPayload,
): Promise<CandidateSignupResponse> {
  return apiFetch<CandidateSignupResponse>(
    "/public/candidate-signup",
    { method: "POST", body: JSON.stringify(payload) },
    BASE_URL,
  );
}

// ── Public job listings ─────────────────────────────────────────────────────

export interface ApiJobPreview {
  symbol: string;
  job_id: number;
  job_title: string;
  category_name?: string;
  city_name?: string;
  state_name?: string;
  country_name?: string;
  employment_type_name?: string;
  salary_min?: number | string;
  salary_max?: number | string;
  created_at: string;
  min_experience?: number | string;
  status?: string;
}

/** Fetch preview list of jobs for the Find Jobs page (default status: Open) */
export function fetchJobsPreview(
  status: string = "Open",
): Promise<ApiJobPreview[]> {
  return apiFetch<ApiJobPreview[]>(
    `/public/jobs/preview?status=${encodeURIComponent(status)}`,
    { cache: "no-store" },
  );
}

export interface ApiJobDetail {
  symbol: any;
  job_id: number;
  job_title: string;
  category_name?: string;
  employment_type_name?: string;
  salary_min?: number | string;
  salary_max?: number | string;
  created_at: string;
  min_experience?: number | string;
  job_description?: string;
  compensation_text?: string;
  job_code?: string;
  status?: string;
  vacancy?: number;
  country_name?: string;
}

export interface ApiJobLocation {
  city_name?: string;
  state_name?: string;
  country_name?: string;
}

export interface ApiJobDocument {
  document_name: string;
  is_required: boolean;
}

export interface ApiJobDetailResponse {
  symbol: any;
  job: ApiJobDetail;
  locations?: ApiJobLocation[];
  documents?: ApiJobDocument[];
  job_specific_documents?: ApiJobDocument[];
}

/** Fetch full detail for a single job (Job Detail page) */
export function fetchJobDetail(
  id: string | number,
): Promise<ApiJobDetailResponse> {
  return apiFetch<ApiJobDetailResponse>(`/public/jobs/${id}`, {
    cache: "no-store",
  });
}

// ── Website forms (Contact Us / Feedback pages) ────────────────────────────

export interface WebsiteFormResponse {
  success?: boolean;
  message?: string;
  data?: Record<string, unknown>;
  submission_id?: number;
  submission_code?: string | null;
  form_type?: "EMPLOYER" | "CANDIDATE";
  created_at?: string;
  feedback_id?: number;
  feedback_code?: string | null;
}

export interface EmployerRequirementPayload {
  company: string;
  contact: string;
  country: string;
  workers: number;
  requirement: string;
  email: string;
  phone: string;
}

/** Submit the "Partner with Us" hiring-requirement form */
export function submitEmployerRequirement(
  payload: EmployerRequirementPayload,
): Promise<WebsiteFormResponse> {
  return apiFetch<WebsiteFormResponse>(
    "/public/website-forms/employer",
    { method: "POST", body: JSON.stringify(payload) },
    WEBSITE_FORMS_BASE_URL,
  );
}

export interface CandidateApplicationPayload {
  name: string;
  phone: string;
  trade: string;
  experience: string;
  country: string;
  resume_file_name?: string | null;
  resume_file_path?: string | null;
}

/**
 * Submit the "Apply for Job" candidate application form.
 * Upload the resume first via `requestPublicUploadPresign` + a direct PUT
 * to the returned URL, then pass the resulting file name/path here.
 */
export function submitCandidateApplication(
  payload: CandidateApplicationPayload,
): Promise<WebsiteFormResponse> {
  return apiFetch<WebsiteFormResponse>(
    "/public/website-forms/candidate",
    { method: "POST", body: JSON.stringify(payload) },
    WEBSITE_FORMS_BASE_URL,
  );
}

export interface FeedbackPayload {
  fullName: string;
  email: string;
  feedbackType: string;
  subject: string;
  message: string;
  privacyConsent: boolean;
}

/** Submit the site feedback form */
export function submitFeedback(
  payload: FeedbackPayload,
): Promise<WebsiteFormResponse> {
  return apiFetch<WebsiteFormResponse>(
    "/public/feedback",
    { method: "POST", body: JSON.stringify(payload) },
    WEBSITE_FORMS_BASE_URL,
  );
}

// ── Direct-to-bucket upload (resume, attachments) ──────────────────────────

export interface PublicUploadPresignResponse {
  url: string;
  bucket: string;
  object_key: string;
  expiry_seconds: number;
}

export interface PublicUploadPresignPayload {
  fileName: string;
  contentType?: string;
  folder?: string;
  expirySeconds?: number;
}

/**
 * Request a presigned URL, then PUT the file directly to `url` from the
 * client — keeps large files out of the JSON payload.
 */
export function requestPublicUploadPresign(
  payload: PublicUploadPresignPayload,
): Promise<PublicUploadPresignResponse> {
  return apiFetch<PublicUploadPresignResponse>(
    "/public/uploads/presign",
    { method: "POST", body: JSON.stringify(payload) },
    WEBSITE_FORMS_BASE_URL,
  );
}

// ── Future endpoints (add below) ──────────────────────────────────────────
// export function fetchJobCategories(): Promise<JobCategory[]> { ... }