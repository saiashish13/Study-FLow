import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "icon";
};

export function Button({ className, variant = "primary", size = "md", ...props }: ButtonProps) {
  const base =
    "relative inline-flex items-center justify-center gap-2 rounded-xl text-sm font-medium transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 select-none";

  const motion =
    "active:scale-[0.97] active:translate-y-[0.5px] hover:-translate-y-[1px]";

  const variants = {
    primary:
      "bg-primary text-background shadow-[0_1px_2px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.15)] hover:bg-primary-hover hover:shadow-[0_1px_2px_rgba(0,0,0,0.08),0_8px_16px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.15)] dark:inset_0_1px_0_rgba(255,255,255,0.1)",
    secondary:
      "border border-border/80 bg-card/60 text-foreground shadow-sm backdrop-blur-sm hover:bg-muted/80 hover:border-border",
    ghost:
      "text-muted-foreground hover:bg-muted/65 hover:text-foreground",
    danger:
      "bg-danger text-white shadow-[0_1px_2px_rgba(0,0,0,0.08),0_4px_12px_rgba(220,38,38,0.1)] hover:brightness-105"
  };

  const sizes = {
    sm: "h-9 px-3 text-xs rounded-lg gap-1.5",
    md: "h-10 px-4 text-sm gap-2",
    icon: "h-9 w-9 p-0 rounded-lg"
  };

  return (
    <button
      className={cn(
        base,
        motion,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
}
