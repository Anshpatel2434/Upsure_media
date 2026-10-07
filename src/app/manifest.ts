import type { MetadataRoute } from "next";

/** Web app manifest: name, colours and icons for "Add to home screen". */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Upsure Media – Brand & growth agency",
    short_name: "Upsure Media",
    description: "We grow brands people love.",
    start_url: "/",
    display: "browser",
    background_color: "#faf8f3",
    theme_color: "#faf8f3",
    icons: [
      { src: "/icon/192", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon/512", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon/512", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
