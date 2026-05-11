import satori from "satori";
import sharp from "sharp";
import { readFileSync } from "fs";
import { join } from "path";

const fontData = readFileSync(join(process.cwd(), "public/fonts/atkinson-bold.woff"));
const logoData = readFileSync(join(process.cwd(), "public/android-chrome-192x192.png"));
const logoBase64 = `data:image/png;base64,${logoData.toString("base64")}`;

const BG = "#1B262C";
const CYAN = "#35B6C8";
const LIGHT = "#E4EBEE";
const MUTED = "#7799AC";

export async function generateOgImage(opts: {
  variant: "brand" | "content";
  title: string;
  subtitle?: string;
}): Promise<Buffer> {
  const { variant, title, subtitle } = opts;

  const element =
    variant === "brand"
      ? brandTemplate(title, subtitle)
      : contentTemplate(title, subtitle);

  const svg = await satori(element, {
    width: 1200,
    height: 630,
    fonts: [{ name: "Atkinson", data: fontData, weight: 700, style: "normal" }],
  });

  return sharp(Buffer.from(svg)).png().toBuffer();
}

function brandTemplate(title: string, subtitle?: string) {
  return {
    type: "div",
    props: {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: BG,
        background: `radial-gradient(ellipse at 60% 40%, #1a3a42 0%, ${BG} 60%, #0D2E32 100%)`,
        padding: "80px",
        gap: "28px",
        fontFamily: "Atkinson",
      },
      children: [
        {
          type: "img",
          props: {
            src: logoBase64,
            width: 96,
            height: 96,
            style: { borderRadius: "16px" },
          },
        },
        {
          type: "div",
          props: {
            style: {
              color: LIGHT,
              fontSize: "52px",
              fontWeight: 700,
              textAlign: "center",
              lineHeight: 1.1,
            },
            children: title,
          },
        },
        subtitle
          ? {
              type: "div",
              props: {
                style: {
                  color: CYAN,
                  fontSize: "28px",
                  fontWeight: 700,
                  textAlign: "center",
                  lineHeight: 1.3,
                  maxWidth: "800px",
                },
                children: subtitle,
              },
            }
          : null,
      ].filter(Boolean),
    },
  };
}

function contentTemplate(title: string, subtitle?: string) {
  return {
    type: "div",
    props: {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: BG,
        background: `radial-gradient(ellipse at 70% 30%, #1a3a42 0%, ${BG} 55%, #0D2E32 100%)`,
        padding: "64px 80px",
        fontFamily: "Atkinson",
      },
      children: [
        {
          type: "div",
          props: {
            style: {
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "auto",
            },
            children: [
              {
                type: "img",
                props: {
                  src: logoBase64,
                  width: 56,
                  height: 56,
                  style: { borderRadius: "10px" },
                },
              },
              {
                type: "div",
                props: {
                  style: { color: MUTED, fontSize: "24px", fontWeight: 700 },
                  children: "Undefined Shell",
                },
              },
            ],
          },
        },
        {
          type: "div",
          props: {
            style: {
              color: LIGHT,
              fontSize: "68px",
              fontWeight: 700,
              lineHeight: 1.1,
              maxWidth: "900px",
            },
            children: title,
          },
        },
        subtitle
          ? {
              type: "div",
              props: {
                style: {
                  color: CYAN,
                  fontSize: "30px",
                  fontWeight: 700,
                  marginTop: "24px",
                },
                children: subtitle,
              },
            }
          : null,
      ].filter(Boolean),
    },
  };
}
