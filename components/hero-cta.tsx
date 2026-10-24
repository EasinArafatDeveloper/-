"use client";

import { ArrowDown } from "lucide-react";
import { buttonClasses } from "./ui/button";

export function HeroCta() {
  return (
    <a
      href="#generator"
      className={buttonClasses("primary", "lg")}
      onClick={(event) => {
        const target = document.getElementById("generator");
        const input = document.getElementById("friend-name");
        if (!target || !input) return;
        event.preventDefault();
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
        window.setTimeout(() => input.focus({ preventScroll: true }), reduce ? 0 : 450);
        history.replaceState(null, "", "#generator");
      }}
    >
      সার্টিফিকেট বানাই
      <ArrowDown className="size-4.5" aria-hidden="true" />
    </a>
  );
}
