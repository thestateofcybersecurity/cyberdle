let hideTimer: ReturnType<typeof setTimeout> | undefined;

export function toast(message: string, ms = 2200): void {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = message;
  el.classList.add('show');
  clearTimeout(hideTimer);
  hideTimer = setTimeout(() => el.classList.remove('show'), ms);
}
