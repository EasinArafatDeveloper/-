import type { ButtonHTMLAttributes, Ref } from "react";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-forest text-[#FBF7EC] shadow-[0_1px_0_rgba(255,255,255,0.12)_inset,0_10px_24px_-12px_rgba(24,61,50,0.7)] hover:bg-forest-hover",
  secondary:
    "border border-line bg-surface text-forest hover:border-sage/50 hover:bg-[#FBFAF6]",
  gold: "bg-gold text-[#1E2A20] hover:bg-[#d1b26c] shadow-[0_10px_24px_-14px_rgba(143,111,46,0.9)]",
  ghost: "text-forest hover:bg-forest/[0.06]",
} as const;

const sizes = {
  sm: "h-9 px-3.5 text-sm gap-1.5",
  md: "h-11 px-5 text-[0.95rem] gap-2",
  lg: "h-13 px-6 text-base gap-2.5",
} as const;

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  ref?: Ref<HTMLButtonElement>;
};

export function buttonClasses(variant: keyof typeof variants = "primary", size: keyof typeof sizes = "md") {
  return cn(
    "inline-flex select-none items-center justify-center rounded-xl font-semibold leading-none whitespace-nowrap",
    "transition-[background-color,border-color,transform,box-shadow] duration-200 active:translate-y-px",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest",
    "disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
  );
}

export function Button({ variant = "primary", size = "md", className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={cn(buttonClasses(variant, size), className)} {...props} />;
}
