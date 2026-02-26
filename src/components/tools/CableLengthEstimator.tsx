"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Cable } from "lucide-react";

const ROUTING_TYPES = [
  { label: "Direct", factor: 1.0, description: "Straight run" },
  { label: "Wall Run", factor: 1.3, description: "+30% for routing" },
  { label: "Ceiling", factor: 1.5, description: "+50% for drops" },
  { label: "Floor Box", factor: 1.4, description: "+40% for floor" },
];

const CABLE_TYPES = [
  { label: "HDMI", maxLength: 50, unit: "ft", note: "Active cable recommended >25ft" },
  { label: "SDI", maxLength: 300, unit: "ft", note: "No signal loss in range" },
  { label: "Cat6", maxLength: 328, unit: "ft", note: "Max 100m per spec" },
  { label: "XLR", maxLength: 1000, unit: "ft", note: "Balanced audio, very long runs OK" },
  { label: "USB", maxLength: 16, unit: "ft", note: "USB 3.0 max, use extender beyond" },
];

export default function CableLengthEstimator() {
  const [roomLength, setRoomLength] = useState("30");
  const [roomWidth, setRoomWidth] = useState("20");
  const [routing, setRouting] = useState(1);
  const [cableType, setCableType] = useState(0);
  const [unit, setUnit] = useState<"feet" | "meters">("feet");

  const calculate = useCallback(() => {
    const length = parseFloat(roomLength) || 0;
    const width = parseFloat(roomWidth) || 0;
    const routingFactor = ROUTING_TYPES[routing].factor;
    const cable = CABLE_TYPES[cableType];

    const diagonal = Math.sqrt(length * length + width * width);
    const estimated = diagonal * routingFactor;
    const withSlack = estimated * 1.1; // 10% slack
    const recommended = Math.ceil(withSlack / 5) * 5; // Round up to nearest 5

    const maxLen = unit === "meters" ? cable.maxLength * 0.3048 : cable.maxLength;
    const withinSpec = recommended <= maxLen;

    return {
      diagonal: diagonal.toFixed(1),
      estimated: estimated.toFixed(1),
      withSlack: withSlack.toFixed(1),
      recommended,
      withinSpec,
      maxLength: Math.round(maxLen),
      cableNote: cable.note,
    };
  }, [roomLength, roomWidth, routing, cableType, unit]);

  const result = calculate();

  return (
    <Card className="tool-card-glow bg-[#111113] border-white/[0.06] transition-all duration-300 hover:bg-[#151518]">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-lime-500/10 text-lime-400">
            <Cable className="w-5 h-5" />
          </div>
          <div>
            <CardTitle className="text-lg font-semibold text-white">
              Cable Length Estimator
            </CardTitle>
            <p className="text-xs text-zinc-500 mt-0.5">
              Calculate cable runs with routing & slack
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-xs text-zinc-400">Room Dimensions</Label>
            <div className="flex items-center gap-1">
              {(["feet", "meters"] as const).map((u) => (
                <button
                  key={u}
                  onClick={() => setUnit(u)}
                  className={`px-2 py-0.5 rounded text-[10px] font-medium transition-all ${
                    unit === u
                      ? "bg-lime-500/20 text-lime-300"
                      : "text-zinc-500 hover:text-zinc-400"
                  }`}
                >
                  {u}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="relative">
              <Input
                type="number"
                value={roomLength}
                onChange={(e) => setRoomLength(e.target.value)}
                className="bg-white/[0.04] border-white/[0.08] text-white pr-10 h-9 text-sm"
                placeholder="Length"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500">
                {unit === "feet" ? "ft" : "m"}
              </span>
            </div>
            <div className="relative">
              <Input
                type="number"
                value={roomWidth}
                onChange={(e) => setRoomWidth(e.target.value)}
                className="bg-white/[0.04] border-white/[0.08] text-white pr-10 h-9 text-sm"
                placeholder="Width"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500">
                {unit === "feet" ? "ft" : "m"}
              </span>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs text-zinc-400">Cable Type</Label>
            <div className="grid grid-cols-5 gap-1">
              {CABLE_TYPES.map((c, i) => (
                <button
                  key={c.label}
                  onClick={() => setCableType(i)}
                  className={`px-2 py-2 rounded-md text-[11px] font-medium transition-all ${
                    cableType === i
                      ? "bg-lime-500/20 text-lime-300 border border-lime-500/30"
                      : "bg-white/[0.04] text-zinc-400 border border-white/[0.06] hover:bg-white/[0.08]"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs text-zinc-400">Routing</Label>
            <div className="grid grid-cols-4 gap-1.5">
              {ROUTING_TYPES.map((r, i) => (
                <button
                  key={r.label}
                  onClick={() => setRouting(i)}
                  className={`px-2 py-2 rounded-md text-xs font-medium transition-all ${
                    routing === i
                      ? "bg-lime-500/20 text-lime-300 border border-lime-500/30"
                      : "bg-white/[0.04] text-zinc-400 border border-white/[0.06] hover:bg-white/[0.08]"
                  }`}
                >
                  <div>{r.label}</div>
                  <div className="text-[9px] text-zinc-500 font-normal mt-0.5">
                    {r.description}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-lime-500/[0.06] border border-lime-500/10 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-zinc-500">Recommended Length</p>
              <p className="text-2xl font-mono font-bold text-lime-400">
                {result.recommended}
                <span className="text-sm font-normal text-zinc-500 ml-1">
                  {unit === "feet" ? "ft" : "m"}
                </span>
              </p>
            </div>
            <div
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                result.withinSpec
                  ? "text-emerald-400 bg-emerald-500/10"
                  : "text-rose-400 bg-rose-500/10"
              }`}
            >
              {result.withinSpec ? "Within Spec" : "Over Max Length"}
            </div>
          </div>
          <div className="text-[10px] text-zinc-500">
            Diagonal: {result.diagonal}{unit === "feet" ? "ft" : "m"} |
            Routed: {result.estimated}{unit === "feet" ? "ft" : "m"} |
            +10% slack | Max: {result.maxLength}{unit === "feet" ? "ft" : "m"}
          </div>
          <p className="text-[10px] text-zinc-500 italic">{result.cableNote}</p>
        </div>
      </CardContent>
    </Card>
  );
}
