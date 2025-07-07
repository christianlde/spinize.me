'use client';

import { setTheme } from "./setTheme";
import { themeList, type Theme } from "./themes";

export function ThemeSwitcher() {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTheme = e.target.value as Theme;
    setTheme(selectedTheme);
  };

  return (
    <select onChange={handleChange} defaultValue="">
      <option value="" disabled>Select Theme</option>
      {themeList.map(theme => (
        <option key={theme} value={theme}>
          {theme}
        </option>
      ))}
    </select>
  );
}
