"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Volume2 } from "lucide-react";

const SPEAKER_TYPES = [
  { label: "Point Source", angle: 90, description: "Standard PA" },
  { label: "Column", angle: 120, description: "Line array" },
  { label: "Wide", angle: 150, description: "Wide dispersion" },
  { label: "Narrow", angle: 60, description: "Long throw" },
];

export default function SpeakerCoverageCalculator() {
  const [roomWidth, setRoomWidth] = useState("40");
  const [roomLength, setRoomLength] = useState("60");
  const [speakerType, setSpeakerType] = useState(0);
  const [mountHeight, setMountHeight] = useState("10");
  const [unit, setUnit] = useState<"feet" | "meters">("feet");

  const calculate = useCallback(() => {
    const width = parseFloat(roomWidth) || 0;
    const length = parseFloat(roomLength) || 0;
    const height = parseFloat(mountHeight) || 0;
    const angle = SPEAKER_TYPES[speakerType].angle;

    const halfAngle = (angle / 2) * (Math.PI / 180);
    const coverageRadius = height * Math.tan(halfAngle);
    const coverageArea = Math.PI * coverageRadius * coverageRadius;
    const roomArea = width * length;

    const speakersForWidth = Math.max(1, Math.ceil(width / (coverageRadius * 2)));
    const speakersForLength = Math.max(1, Math.ceil(length / (coverageRadius * 2)));
    const totalSpeakers = speakersForWidth * speakersForLength;
    const spacingW = width / speakersForWidth;
    const spacingL = length / speakersForLength;

    const coveragePercent = Math.min(
      100,
      ((totalSpeakers * coverageArea) / roomArea) * 100
    );

    return {
      coverageRadius: coverageRadius.toFixed(1),
      coverageArea: coverageArea.toFixed(0),
      roomArea: roomArea.toFixed(0),
      speakersNeeded: totalSpeakers,
      gridW: speakersForWidth,
      gridL: speakersForLength,
      spacingW: spacingW.toFixed(1),
      spacingL: spacingL.toFixed(1),
      coveragePercent: Math.round(coveragePercent),
    };
  }, [roomWidth, roomLength, speakerType, mountHeight, unit]);

  const result = calculate();
  const unitLabel = unit === "feet" ? "ft" : "m";

  return (
    <Card className="tool-card-glow bg-[#111113] border-white/[0.06] transition-all duration-300 hover:bg-[#151518]">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-indigo-500/10 text-indigo-400">
            <Volume2 className="w-5 h-5" />
          </div>
          <div>
            <CardTitle className="text-lg font-semibold text-white">
              Speaker Coverage
            </CardTitle>
            <p className="text-xs text-zinc-500 mt-0.5">
              Calculate coverage area & speaker count
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label className="text-xs text-zinc-400">Speaker Type</Label>
            <div className="grid grid-cols-4 gap-1.5">
              {SPEAKER_TYPES.map((s, i) => (
                <button
                  key={s.label}
                  onClick={() => setSpeakerType(i)}
                  className={`px-2 py-2 rounded-md text-xs font-medium transition-all ${
                    speakerType === i
                      ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                      : "bg-white/[0.04] text-zinc-400 border border-white/[0.06] hover:bg-white/[0.08]"
                  }`}
                >
                  <div>{s.label}</div>
                  <div className="text-[9px] text-zinc-500 font-normal">{s.angle}°</div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Label className="text-xs text-zinc-400">Room & Mount</Label>
            <div className="flex items-center gap-1">
              {(["feet", "meters"] as const).map((u) => (
                <button
                  key={u}
                  onClick={() => setUnit(u)}
                  className={`px-2 py-0.5 rounded text-[10px] font-medium transition-all ${
                    unit === u
                      ? "bg-indigo-500/20 text-indigo-300"
                      : "text-zinc-500 hover:text-zinc-400"
                  }`}
                >
                  {u}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <Label className="text-[10px] text-zinc-500">Width</Label>
              <div className="relative">
                <Input
                  type="number"
                  value={roomWidth}
                  onChange={(e) => setRoomWidth(e.target.value)}
                  className="bg-white/[0.04] border-white/[0.08] text-white pr-8 h-9 text-sm"
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-zinc-500">
                  {unitLabel}
                </span>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] text-zinc-500">Length</Label>
              <div className="relative">
                <Input
                  type="number"
                  value={roomLength}
                  onChange={(e) => setRoomLength(e.target.value)}
                  className="bg-white/[0.04] border-white/[0.08] text-white pr-8 h-9 text-sm"
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-zinc-500">
                  {unitLabel}
                </span>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] text-zinc-500">Mount Height</Label>
              <div className="relative">
                <Input
                  type="number"
                  value={mountHeight}
                  onChange={(e) => setMountHeight(e.target.value)}
                  className="bg-white/[0.04] border-white/[0.08] text-white pr-8 h-9 text-sm"
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-zinc-500">
                  {unitLabel}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-indigo-500/[0.06] border border-indigo-500/10 p-4 space-y-3">
          <div className="grid grid-cols-3 gap-3">
            <div>
              <p className="text-[10px] text-zinc-500">Speakers Needed</p>
              <p className="text-2xl font-mono font-bold text-indigo-400">
                {result.speakersNeeded}
              </p>
              <p className="text-[10px] text-zinc-500">
                {result.gridW} x {result.gridL} grid
              </p>
            </div>
            <div>
              <p className="text-[10px] text-zinc-500">Coverage Radius</p>
              <p className="text-lg font-mono font-bold text-zinc-300">
                {result.coverageRadius}
                <span className="text-[10px] text-zinc-500 ml-0.5">{unitLabel}</span>
              </p>
            </div>
            <div>
              <p className="text-[10px] text-zinc-500">Coverage</p>
              <p
                className={`text-lg font-mono font-bold ${
                  result.coveragePercent >= 90
                    ? "text-emerald-400"
                    : result.coveragePercent >= 70
                      ? "text-amber-400"
                      : "text-rose-400"
                }`}
              >
                {result.coveragePercent}%
              </p>
            </div>
          </div>
          <div className="text-[10px] text-zinc-500">
            Spacing: {result.spacingW}{unitLabel} x {result.spacingL}{unitLabel}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
