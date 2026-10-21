import { ImageResponse } from "next/og"

export const size = { width: 32, height: 32 }
export const contentType = "image/png"

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1b1916",
          color: "#f4f2ec",
          fontSize: 12,
          letterSpacing: 0.5,
        }}
      >
        MT
      </div>
    ),
    size,
  )
}
