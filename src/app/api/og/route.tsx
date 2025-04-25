import { getTranslations } from "next-intl/server";
import { ImageResponse } from "next/og";
import React from "react";

// This is a minimal reproduction of OpenGraph image generation with next/og
// Demonstrates font loading, next-intl translations, and SVG image fetching

let interRegular: ArrayBuffer;
let interBold: ArrayBuffer;

export async function GET() {
  if (!interRegular || !interBold) {
    console.log("Loading fonts...");
    [interRegular, interBold] = await Promise.all([
      fetch(
        new URL("/fonts/Inter-Regular.ttf", process.env.NEXT_BASE_URL)
      ).then((res) => res.arrayBuffer()),
      fetch(new URL("/fonts/Inter-Bold.ttf", process.env.NEXT_BASE_URL)).then(
        (res) => res.arrayBuffer()
      ),
    ]);
    console.log("Fonts loaded successfully");
  }

  try {
    // Hardcoded values for reproduction
    const title = "OG Image Demo";
    const type = "example";
    const locale = "en";

    const t = await getTranslations({ locale, namespace: "Og" });

    const fontSize = title.length > 80 ? "55px" : "70px";
    const backgroundColor = "linear-gradient(90deg, #0070f3 0%, #00a1f3 100%)";
    const textColor = "#fff";

    // Example SVG icon (GitHub logo)
    const iconUrl =
      "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/github.svg";
    let iconImage;

    try {
      console.log("Fetching icon...");
      const iconRes = await fetch(iconUrl);
      iconImage = await iconRes.arrayBuffer();
      console.log("Icon fetched successfully");
    } catch (error) {
      console.error("Failed to fetch icon:", error);
    }

    return new ImageResponse(
      (
        <div
          tw="flex relative flex-col p-12 w-full h-full items-start"
          style={{
            color: textColor,
            background: backgroundColor,
          }}
        >
          <div tw="flex flex-col flex-1 py-2">
            <div
              tw="flex text-3xl font-bold tracking-tight"
              style={{ fontFamily: "Inter Bold", fontWeight: "normal" }}
            >
              Next.js OG Image
            </div>
            <div
              tw="flex text-xl uppercase font-bold tracking-tight"
              style={{ fontFamily: "Inter", fontWeight: "normal" }}
            >
              {t(type)}
            </div>
            <div
              tw="flex leading-[1.1] text-[80px] font-bold pt-6"
              style={{
                fontFamily: "Inter Bold",
                fontWeight: "bold",
                marginLeft: "-3px",
                fontSize,
              }}
            >
              {title}
            </div>
          </div>
          <div tw="flex items-center w-full justify-between">
            <div
              tw="flex text-xl"
              style={{ fontFamily: "Inter", fontWeight: "normal" }}
            >
              example.com
            </div>
            {iconImage && (
              <img
                src={iconUrl}
                width={64}
                height={64}
                style={{
                  borderRadius: "4px",
                  filter: "invert(1)",
                }}
              />
            )}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Inter",
            data: interRegular,
            weight: 400,
          },
          {
            name: "Inter Bold",
            data: interBold,
            weight: 700,
          },
        ],
      }
    );
  } catch (error) {
    console.error("OG Image generation error:", error);
    return new Response(`Failed to generate image`, {
      status: 500,
    });
  }
}
