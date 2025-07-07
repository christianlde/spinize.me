// hooks/useAddToHomeScreenPrompt.ts
export function useiOSSafariPrompt() {
  const isIos = typeof window !== 'undefined' &&
    /iphone|ipod/.test(window.navigator.userAgent.toLowerCase());
  const isInStandaloneMode = typeof window !== 'undefined' &&
    ('standalone' in window.navigator) && (window.navigator.standalone);

  return isIos && !isInStandaloneMode;
}
