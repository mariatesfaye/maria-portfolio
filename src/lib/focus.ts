const selector = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "textarea:not([disabled])",
  "select:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(", ")

export function getFocusable(root: HTMLElement): HTMLElement[] {
  return [...root.querySelectorAll<HTMLElement>(selector)].filter((node) => {
    if (node.tabIndex < 0) return false
    if (node.getAttribute("aria-hidden") === "true") return false
    return node.getClientRects().length > 0
  })
}
