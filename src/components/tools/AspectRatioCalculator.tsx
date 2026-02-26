"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RectangleHorizontal } from "lucide-react";

function gcd(a: number, b: number): number {
  a = Math.abs(Math.round(a));
  b = Math.abs(Math.round(b));
  while (b) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

const STANDARD_RATIOS = [
  { label: "16:9", value: 16 / 9 },
  { label: "4:3", value: 4 / 3 },
  { label: "21:9", value: 21 / 9 },
  { label: "1:1", value: 1 },
  { label: "9:16", value: 9 / 16 },
  { label: "3:2", value: 3 / 2 },
  { label: "2.35:1", value: 2.35 },
  { label: "1.85:1", value: 1.85 },
];

export default function AspectRatioCalculator() {
  const [width, setWidth] = useState("1920");
  const [height, setHeight] = useState("1080");

  const calculate = useCallback(() => {
    const w = parseFloat(width) || 0;
    const h = parseFloat(height) || 0;
    if (w <= 0 || h <= 0) return null;

    const d = gcd(w, h);
    const ratioW = w / d;
    const ratioH = h / d;
    const decimal = w / h;

    const nearest = STANDARD_RATIOS.reduce((prev, curr) =>
      Math.abs(curr.value - decimal) < Math.abs(prev.value - decimal) ? curr : prev
    );

    const isStandard = Math.abs(nearest.value - decimal) < 0.02;

    return {
      ratio: `${ratioW}:${ratioH}`,
      decimal: decimal.toFixed(3),
      nearest: nearest.label,
      isStandard,
      pixels: (w * h).toLocaleString(),
      megapixels: ((w * h) / 1_000_000).toFixed(1),
    };
  }, [width, height]);

  const result = calculate();

  const previewW = 200;
  const previewH = result
    ? Math.min(Math.round(previewW / parseFloat(result.decimal)), 160)
    : 112;

  return (
    <Card className="tool-card-glow bg-[#111113] border-white/[0.06] transition-all duration-300 hover:bg-[#151518]">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-sky-500/10 text-sky-400">
            <RectangleHorizontal className="w-5 h-5" />
          </div>
          <div>
            <CardTitle className="text-lg font-semibold text-white">
              Aspect Ratio Calculator
            </CardTitle>
            <p className="text-xs text-zinc-500 mt-0.5">
              Calculate ratio from dimensions, find nearest standard
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label className="text-xs text-zinc-400">Width</Label>
            <div className="relative">
              <Input
                type="number"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                className="bg-white/[0.04] border-white/[0.08] text-white pr-10 h-9 text-sm"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500">
                px
              </span>
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-zinc-400">Height</Label>
            <div className="relative">
              <Input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="bg-white/[0.04] border-white/[0.08] text-white pr-10 h-9 text-sm"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500">
                px
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <div
            className="border border-sky-500/30 bg-sky-500/[0.04] rounded-md flex items-center justify-center"
            style={{ width: previewW, height: previewH }}
          >
            <span className="text-xs text-sky-400/60 font-mono">
              {width} x {height}
            </span>
          </div>
        </div>

        {result && (
          <div className="rounded-lg bg-sky-500/[0.06] border border-sky-500/10 p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-zinc-500">Aspect Ratio</p>
                <p className="text-xl font-mono font-bold text-sky-400">
                  {result.ratio}
                </p>
              </div>
              <div>
                <p className="text-xs text-zinc-500">Decimal</p>
                <p className="text-xl font-mono font-bold text-zinc-300">
                  {result.decimal}
                </p>
              </div>
              <div>
                <p className="text-xs text-zinc-500">Nearest Standard</p>
                <p className="text-lg font-mono font-bold text-white flex items-center gap-2">
                  {result.nearest}
                  {result.isStandard && (
                    <span className="text-[10px] font-normal text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                      Exact Match
                    </span>
                  )}
                </p>
              </div>
              <div>
                <p className="text-xs text-zinc-500">Total Pixels</p>
                <p className="text-lg font-mono font-bold text-zinc-300">
                  {result.megapixels}
                  <span className="text-xs font-normal text-zinc-500 ml-1">MP</span>
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
