import { cacheLife } from "next/cache"

export async function CopyrightYear() {
  "use cache"
  cacheLife("weeks")
  return <>{new Date().getFullYear()}</>
}
