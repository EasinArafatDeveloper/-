import { getFontEmbedCSS, toBlob } from "html-to-image";

/** 540×675 CSS px × 2 = 1080×1350 px — the 4:5 portrait size social apps like. */
export const EXPORT_PIXEL_RATIO = 2;

const fontCssCache = new Map<string, Promise<string>>();
let warmedUp = false;

/** Make sure every font used inside the certificate is loaded for the exact text it shows. */
async function waitForFonts(node: HTMLElement): Promise<void> {
  if (typeof document === "undefined" || !("fonts" in document)) return;

  const families = new Set<string>();
  for (const el of [node, ...Array.from(node.querySelectorAll<HTMLElement>("*"))]) {
    families.add(getComputedStyle(el).fontFamily);
  }
  const sample = (node.textContent ?? "").slice(0, 500) || "বাংলা";

  await Promise.all(
    Array.from(families).map((family) =>
      document.fonts.load(`16px ${family}`, sample).catch(() => []),
    ),
  );
  await document.fonts.ready;
}

/** Render the certificate DOM node to a PNG blob. Never includes anything outside the node. */
export async function renderCertificateBlob(node: HTMLElement, cacheKey: string): Promise<Blob> {
  await waitForFonts(node);

  let fontCss = fontCssCache.get(cacheKey);
  if (!fontCss) {
    fontCss = getFontEmbedCSS(node);
    fontCssCache.set(cacheKey, fontCss);
    fontCss.catch(() => fontCssCache.delete(cacheKey));
  }
  const fontEmbedCSS = await fontCss;

  const options = {
    pixelRatio: EXPORT_PIXEL_RATIO,
    width: node.offsetWidth,
    height: node.offsetHeight,
    cacheBust: false,
    fontEmbedCSS,
    style: { transform: "none", margin: "0" },
  };

  // Some browsers (notably Safari) drop fonts on the very first render; a throwaway pass fixes it.
  if (!warmedUp) {
    await toBlob(node, options).catch(() => null);
    warmedUp = true;
  }

  const blob = await toBlob(node, options);
  if (!blob || blob.size === 0) throw new Error("Empty image");
  return blob;
}

/** Safe, readable file name. Keeps Bengali letters, removes characters file systems reject. */
export function certificateFileName(name: string): string {
  const slug = Array.from(
    name
      .normalize("NFC")
      .replace(/[\\/:*?"<>|\u0000-\u001F\u007F]/g, "")
      .replace(/[.\s]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, ""),
  )
    .slice(0, 40)
    .join("");
  return `ধারখোর-সার্টিফিকেট${slug ? `-${slug}` : ""}.png`;
}

export function downloadBlob(blob: Blob, fileName: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.rel = "noopener";
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 10_000);
}

export function canShareFile(file: File): boolean {
  return (
    typeof navigator !== "undefined" &&
    typeof navigator.share === "function" &&
    typeof navigator.canShare === "function" &&
    navigator.canShare({ files: [file] })
  );
}

export async function copyText(text: string): Promise<void> {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      // Permission denied or document not focused — try the legacy path below.
    }
  }
  const area = document.createElement("textarea");
  area.value = text;
  area.setAttribute("readonly", "");
  area.style.position = "fixed";
  area.style.opacity = "0";
  document.body.appendChild(area);
  area.select();
  const ok = document.execCommand("copy");
  area.remove();
  if (!ok) throw new Error("Copy failed");
}
