export function normalizeUrl(url: string): string {
  let normalized = url.trim();
  
  // If user forgot protocol, default to https
  if (!/^https?:\/\//i.test(normalized)) {
    normalized = 'https://' + normalized;
  }
  
  // Remove trailing slash
  normalized = normalized.replace(/\/+$/, '');
  
  return normalized;
}