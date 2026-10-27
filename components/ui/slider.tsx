"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface SliderProps {
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  label?: string;
  formatValue?: (val: number) => string;
  description?: string;
  className?: string;
  unit?: string;
  isPositiveDeltaGood?: boolean;
}

export function Slider({
  min,
  max,
  step = 1,
  value,
  onChange,
  label,
  formatValue,
  description,
  className,
  unit = "",
}: SliderProps) {
  const percentage = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));

  return (
    <div className={cn("space-y-2 select-none", className)}>
      {(label || formatValue) && (
        <div className="flex items-center justify-between">
          <div>
            {label && <label className="text-xs font-medium text-slate-200">{label}</label>}
            {description && <p className="text-[11px] text-slate-400 mt-0.5">{description}</p>}
          </div>
          <div className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-slate-800 border border-slate-700/80 text-cyan-300">
            {formatValue ? formatValue(value) : `${value}${unit}`}
          </div>
        </div>
      )}
      <div className="relative flex items-center py-1">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
          style={{
            background: `linear-gradient(to right, #06b6d4 0%, #3b82f6 ${percentage}%, #1e293b ${percentage}%, #1e293b 100%)`,
          }}
        />
      </div>
      <div className="flex justify-between text-[10px] text-slate-400 font-mono">
        <span>{formatValue ? formatValue(min) : `${min}${unit}`}</span>
        <span>{formatValue ? formatValue(max) : `${max}${unit}`}</span>
      </div>
    </div>
  );
}
