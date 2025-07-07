import { themeList, type Theme } from "./themes";

export function setTheme(theme: Theme) {
  if (!themeList.includes(theme)) return;
  document.documentElement.classList.remove(...themeList.map(t => `theme-${t}`));
  document.documentElement.classList.add(`theme-${theme}`);
  // Store new theme in the user's saved theme preference
  localStorage.setItem('theme', theme);
}
