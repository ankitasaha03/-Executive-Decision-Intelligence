import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "emerald"
    | "cyan";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:pointer-events-none disabled:opacity-50 cursor-pointer active:scale-[0.98]";

    const variantStyles = {
      default:
        "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20 hover:from-cyan-400 hover:to-blue-500 hover:shadow-cyan-500/30",
      destructive:
        "bg-rose-600 text-white hover:bg-rose-500 shadow-lg shadow-rose-900/20",
      outline:
        "border border-slate-700 bg-slate-900/40 text-slate-200 hover:bg-slate-800 hover:text-white hover:border-slate-600",
      secondary:
        "bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700/60",
      ghost:
        "hover:bg-slate-800/80 hover:text-white text-slate-300",
      link: "text-cyan-400 underline-offset-4 hover:underline",
      emerald:
        "bg-emerald-600 text-white hover:bg-emerald-500 shadow-lg shadow-emerald-900/20",
      cyan:
        "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20",
    };

    const sizeStyles = {
      default: "h-9 px-4 py-2",
      sm: "h-8 rounded-md px-3 text-xs",
      lg: "h-11 rounded-lg px-6 text-base font-semibold",
      icon: "h-9 w-9",
    };

    return (
      <button
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
