import { ImageResponse } from "next/og"

export const shareImageSize = { width: 1200, height: 630 }
export const shareImageContentType = "image/png"
export const shareImageAlt = "Maria Tesfaye, Full-Stack Software Engineer"

export function ShareImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: "#f4f2ec",
          color: "#1b1916",
          padding: "80px",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 132,
            height: 132,
            border: "1px solid #1b1916",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 42,
            letterSpacing: 2,
          }}
        >
          MT
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: 56,
          }}
        >
          <div style={{ fontSize: 68, lineHeight: 1.05 }}>Maria Tesfaye</div>
          <div style={{ fontSize: 32, marginTop: 20, color: "#5a564f" }}>
            Full-Stack Software Engineer
          </div>
        </div>
      </div>
    ),
    shareImageSize,
  )
}
