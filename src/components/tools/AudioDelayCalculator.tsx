"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AudioLines } from "lucide-react";

export default function AudioDelayCalculator() {
  const [distanceFromStage, setDistanceFromStage] = useState("30");
  const [frameDelay, setFrameDelay] = useState("2");
  const [cameraLatency, setCameraLatency] = useState("40");
  const [unit, setUnit] = useState<"feet" | "meters">("feet");

  const calculate = useCallback(() => {
    const distance = parseFloat(distanceFromStage) || 0;
    const frames = parseFloat(frameDelay) || 0;
    const camLat = parseFloat(cameraLatency) || 0;

    const speedOfSound = unit === "feet" ? 1125 : 343; // ft/s or m/s
    const soundTravelMs = (distance / speedOfSound) * 1000;
    const frameDelayMs = (frames / 30) * 1000; // assuming 30fps
    const totalVideoDelay = frameDelayMs + camLat;
    const audioDelay = Math.max(0, totalVideoDelay - soundTravelMs);

    return {
      soundTravelMs: soundTravelMs.toFixed(1),
      videoDelayMs: totalVideoDelay.toFixed(1),
      recommendedDelay: audioDelay.toFixed(1),
      syncStatus:
        audioDelay < 5
          ? "In Sync"
          : audioDelay < 30
            ? "Slight Offset"
            : "Needs Correction",
      syncColor:
        audioDelay < 5
          ? "text-emerald-400"
          : audioDelay < 30
            ? "text-amber-400"
            : "text-rose-400",
    };
  }, [distanceFromStage, frameDelay, cameraLatency, unit]);

  const result = calculate();

  return (
    <Card className="tool-card-glow bg-[#111113] border-white/[0.06] transition-all duration-300 hover:bg-[#151518]">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-orange-500/10 text-orange-400">
            <AudioLines className="w-5 h-5" />
          </div>
          <div>
            <CardTitle className="text-lg font-semibold text-white">
              Audio Delay Calculator
            </CardTitle>
            <p className="text-xs text-zinc-500 mt-0.5">
              Calculate lip sync compensation for live events
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label className="text-xs text-zinc-400">Distance from Stage</Label>
              <div className="flex items-center gap-1">
                {(["feet", "meters"] as const).map((u) => (
                  <button
                    key={u}
                    onClick={() => setUnit(u)}
                    className={`px-2 py-0.5 rounded text-[10px] font-medium transition-all ${
                      unit === u
                        ? "bg-orange-500/20 text-orange-300"
                        : "text-zinc-500 hover:text-zinc-400"
                    }`}
                  >
                    {u}
                  </button>
                ))}
              </div>
            </div>
            <div className="relative">
              <Input
                type="number"
                value={distanceFromStage}
                onChange={(e) => setDistanceFromStage(e.target.value)}
                className="bg-white/[0.04] border-white/[0.08] text-white pr-10 h-9 text-sm"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500">
                {unit === "feet" ? "ft" : "m"}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs text-zinc-400">Frame Delay</Label>
              <div className="relative">
                <Input
                  type="number"
                  value={frameDelay}
                  onChange={(e) => setFrameDelay(e.target.value)}
                  className="bg-white/[0.04] border-white/[0.08] text-white pr-14 h-9 text-sm"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500">
                  frames
                </span>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-zinc-400">Camera Latency</Label>
              <div className="relative">
                <Input
                  type="number"
                  value={cameraLatency}
                  onChange={(e) => setCameraLatency(e.target.value)}
                  className="bg-white/[0.04] border-white/[0.08] text-white pr-10 h-9 text-sm"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500">
                  ms
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-orange-500/[0.06] border border-orange-500/10 p-4 space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-zinc-500">Sound Travel</p>
              <p className="text-lg font-mono font-bold text-zinc-300">
                {result.soundTravelMs}
                <span className="text-xs font-normal text-zinc-500 ml-1">ms</span>
              </p>
            </div>
            <div>
              <p className="text-xs text-zinc-500">Video Delay</p>
              <p className="text-lg font-mono font-bold text-zinc-300">
                {result.videoDelayMs}
                <span className="text-xs font-normal text-zinc-500 ml-1">ms</span>
              </p>
            </div>
          </div>
          <div className="pt-2 border-t border-white/[0.06]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-zinc-500">Audio Delay to Add</p>
                <p className="text-2xl font-mono font-bold text-orange-400">
                  {result.recommendedDelay}
                  <span className="text-sm font-normal text-zinc-500 ml-1">ms</span>
                </p>
              </div>
              <div
                className={`px-3 py-1 rounded-full text-xs font-medium ${result.syncColor} bg-white/[0.04]`}
              >
                {result.syncStatus}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
