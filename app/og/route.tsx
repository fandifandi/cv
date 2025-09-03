// app/og/route.tsx
import { ImageResponse } from "next/og";

// export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (<div style={{ fontSize: 64, padding: 80 }}>Afandi — Portfolio</div>),
    { width: 1200, height: 630 }
  );
}
