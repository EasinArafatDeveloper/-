/** Friend-photo handling. Everything happens in the browser — the photo is never uploaded. */

export const PHOTO_MAX_BYTES = 15 * 1024 * 1024;
const OUTPUT_SIZE = 420; // px, square; plenty for a ~96px circle exported at 2×

export class PhotoError extends Error {}

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new PhotoError("এই ছবিটা খোলা গেল না। JPG, PNG বা WebP ছবি দাও।"));
    };
    img.src = url;
  });
}

/**
 * Validate, centre-crop to a square and shrink the photo, returning a JPEG data URL.
 * The face is usually in the upper-middle of a portrait, so tall images are cropped slightly towards the top.
 */
export async function preparePhoto(file: File): Promise<string> {
  if (!file.type.startsWith("image/")) {
    throw new PhotoError("শুধু ছবি ফাইল দেওয়া যাবে (JPG, PNG বা WebP)।");
  }
  if (file.size > PHOTO_MAX_BYTES) {
    throw new PhotoError("ছবিটা অনেক বড় (১৫ MB-এর বেশি)। একটু ছোট ছবি দাও।");
  }

  const img = await loadImage(file);
  const side = Math.min(img.naturalWidth, img.naturalHeight);
  if (side < 40) throw new PhotoError("ছবিটা খুব ছোট। একটু বড় ছবি দাও।");

  const sx = (img.naturalWidth - side) / 2;
  const extraY = img.naturalHeight - side;
  const sy = extraY > 0 ? extraY * 0.25 : 0;

  const canvas = document.createElement("canvas");
  canvas.width = OUTPUT_SIZE;
  canvas.height = OUTPUT_SIZE;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new PhotoError("ছবিটা প্রসেস করা গেল না। আবার চেষ্টা করো।");
  ctx.imageSmoothingQuality = "high";
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, OUTPUT_SIZE, OUTPUT_SIZE);
  ctx.drawImage(img, sx, sy, side, side, 0, 0, OUTPUT_SIZE, OUTPUT_SIZE);
  return canvas.toDataURL("image/jpeg", 0.9);
}
