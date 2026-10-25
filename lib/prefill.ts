import type { AwardTitleId } from "./certificate-templates";

/** The hero's quick form hands its values to the full generator through this window event. */
export const PREFILL_EVENT = "dharkhor:prefill";

export type PrefillDetail = { name: string; titleId: AwardTitleId };
