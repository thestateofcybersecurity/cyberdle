export function applyTheme(theme: 'dark' | 'light'): void {
  if (theme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
}

export function applyColorblind(on: boolean): void {
  if (on) {
    document.documentElement.setAttribute('data-colorblind', '');
  } else {
    document.documentElement.removeAttribute('data-colorblind');
  }
}
