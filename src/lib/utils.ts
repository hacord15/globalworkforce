// src/lib/utils.ts

// ── Slug helpers ──────────────────────────────────────────────────────────

export function slugify(str: string): string {
  return (str || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/-$/, "");
}

// Extract leading numeric ID from a slug like "25-db-engineer-india"
export function extractIdFromSlug(slug: string): number | null {
  const match = slug.match(/^(\d+)/);
  return match ? parseInt(match[1], 10) : null;
}

// Build full job slug: "25-db-engineer-india"
export function buildJobSlug(id: number, title: string, location: string): string {
  return `${id}-${slugify(title)}-${slugify(location)}`.replace(/-+/g, "-");
}

// ── Location formatter ────────────────────────────────────────────────────
// Combines city, state, country into "City, State, Country"
// Skips empty/null/undefined parts and avoids duplicates

export function formatLocation(
  city?:    string | null,
  state?:   string | null,
  country?: string | null
): string {
  return [city, state, country]
    .filter((part): part is string => !!part && part.trim() !== "" && part.trim() !== "—")
    .filter((part, idx, arr) => arr.indexOf(part) === idx) // remove duplicates
    .join(", ");
}