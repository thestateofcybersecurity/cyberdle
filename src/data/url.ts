/**
 * Returns `raw` if it is an absolute https URL with a host and no embedded
 * credentials, otherwise null. Used by the dataset validator and again at
 * render time, so a link scheme such as javascript: or data: can never reach an
 * href even if a bad entry slips past review.
 */
export function httpsUrl(raw: unknown): string | null {
  if (typeof raw !== 'string' || raw !== raw.trim()) return null;
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return null;
  }
  if (url.protocol !== 'https:' || !url.hostname.includes('.')) return null;
  if (url.username !== '' || url.password !== '') return null;
  return raw;
}
