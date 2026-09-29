import type { CollectionBeforeChangeHook } from "payload";
import sharp from "sharp";

/**
 * Generates a tiny (16px wide) WebP data URL for every uploaded image so the
 * site can show a blur-up placeholder without an extra request.
 */
export const generateBlurDataURL: CollectionBeforeChangeHook = async ({ data, req }) => {
  const file = req.file;
  if (!file?.data || !file.mimetype?.startsWith("image/") || file.mimetype === "image/svg+xml") {
    return data;
  }
  try {
    const buffer = await sharp(file.data)
      .resize(16, undefined, { fit: "inside" })
      .webp({ quality: 40 })
      .toBuffer();
    return { ...data, blurDataURL: `data:image/webp;base64,${buffer.toString("base64")}` };
  } catch (error) {
    req.payload.logger.warn({ err: error }, "Could not generate blurDataURL");
    return data;
  }
};
