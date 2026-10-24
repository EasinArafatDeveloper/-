"use client";

import { useSyncExternalStore } from "react";
import { formatBengaliDate } from "./utils";

let cached: string | null = null;

const subscribe = () => () => {};
const getSnapshot = () => (cached ??= formatBengaliDate(new Date()));
const getServerSnapshot = () => "";

/** Today's date in Bengali, computed in the visitor's browser (the page itself is static). */
export function useTodayLabel(): string {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
