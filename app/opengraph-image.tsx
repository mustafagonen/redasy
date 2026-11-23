import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "REDASY | Engineering & Industrial Group";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const [symbol, wordmark] = await Promise.all([
    readFile(join(process.cwd(), "public/brand/symbol-white.png")),
    readFile(join(process.cwd(), "public/brand/wordmark-white.png")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#550506",
        }}
      >
        <img src={`data:image/png;base64,${symbol.toString("base64")}`} width={148} height={148} alt="" />
        <img
          src={`data:image/png;base64,${wordmark.toString("base64")}`}
          width={520}
          height={109}
          alt=""
          style={{ marginTop: 28 }}
        />
        <div
          style={{
            marginTop: 28,
            color: "rgba(255,255,255,0.72)",
            fontSize: 26,
            letterSpacing: 5,
          }}
        >
          ENGINEERING & INDUSTRIAL GROUP
        </div>
      </div>
    ),
    { ...size },
  );
}
