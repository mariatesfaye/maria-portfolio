export async function copyText(value: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value)
      return true
    }
  } catch {
    // Fall through to the selection fallback.
  }

  try {
    const field = document.createElement("textarea")
    field.value = value
    field.setAttribute("readonly", "")
    field.style.position = "fixed"
    field.style.top = "0"
    field.style.left = "0"
    field.style.opacity = "0"
    document.body.appendChild(field)
    field.focus()
    field.select()
    const copied = document.execCommand("copy")
    field.remove()
    return copied
  } catch {
    return false
  }
}
