"use client";

import { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Timer } from "lucide-react";

export default function StreamDelayCalculator() {
  const [encoderDelay, setEncoderDelay] = useState<string>("150");
  const [playerBuffer, setPlayerBuffer] = useState<string>("3");
  const [networkLatency, setNetworkLatency] = useState<string>("50");
  const [segmentDuration, setSegmentDuration] = useState<string>("2");

  const calculate = useCallback(() => {
    const encoder = parseFloat(encoderDelay) || 0;
    const buffer = parseFloat(playerBuffer) || 0;
    const network = parseFloat(networkLatency) || 0;
    const segment = parseFloat(segmentDuration) || 0;

    const totalMs = encoder + network + buffer * 1000 + segment * 1000;
    const totalSec = totalMs / 1000;

    return {
      totalMs: Math.round(totalMs),
      totalSec: totalSec.toFixed(1),
      breakdown: {
        encoding: encoder,
        network: network,
        buffering: buffer * 1000,
        segmenting: segment * 1000,
      },
    };
  }, [encoderDelay, playerBuffer, networkLatency, segmentDuration]);

  const result = calculate();

  return (
    <Card className="tool-card-glow bg-[#111113] border-white/[0.06] transition-all duration-300 hover:bg-[#151518]">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-cyan-500/10 text-cyan-400">
            <Timer className="w-5 h-5" />
          </div>
          <div>
            <CardTitle className="text-lg font-semibold text-white">
              Stream Delay Calculator
            </CardTitle>
            <p className="text-xs text-zinc-500 mt-0.5">
              Calculate total latency from source to viewer
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label className="text-xs text-zinc-400">Encoder Delay</Label>
            <div className="relative">
              <Input
                type="number"
                value={encoderDelay}
                onChange={(e) => setEncoderDelay(e.target.value)}
                className="bg-white/[0.04] border-white/[0.08] text-white pr-10 h-9 text-sm"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500">
                ms
              </span>
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-zinc-400">Player Buffer</Label>
            <div className="relative">
              <Input
                type="number"
                value={playerBuffer}
                onChange={(e) => setPlayerBuffer(e.target.value)}
                className="bg-white/[0.04] border-white/[0.08] text-white pr-10 h-9 text-sm"
                step="0.5"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500">
                sec
              </span>
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-zinc-400">Network Latency</Label>
            <div className="relative">
              <Input
                type="number"
                value={networkLatency}
                onChange={(e) => setNetworkLatency(e.target.value)}
                className="bg-white/[0.04] border-white/[0.08] text-white pr-10 h-9 text-sm"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500">
                ms
              </span>
            </div>
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-zinc-400">Segment Duration</Label>
            <div className="relative">
              <Input
                type="number"
                value={segmentDuration}
                onChange={(e) => setSegmentDuration(e.target.value)}
                className="bg-white/[0.04] border-white/[0.08] text-white pr-10 h-9 text-sm"
                step="0.5"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500">
                sec
              </span>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-cyan-500/[0.06] border border-cyan-500/10 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-zinc-400">Total Delay</span>
            <span className="text-2xl font-mono font-bold text-cyan-400">
              {result.totalSec}s
            </span>
          </div>
          <div className="space-y-1.5">
            {[
              { label: "Encoding", value: result.breakdown.encoding, color: "bg-cyan-400" },
              { label: "Network", value: result.breakdown.network, color: "bg-violet-400" },
              { label: "Buffering", value: result.breakdown.buffering, color: "bg-amber-400" },
              { label: "Segmenting", value: result.breakdown.segmenting, color: "bg-emerald-400" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2 text-xs">
                <div className={`w-2 h-2 rounded-full ${item.color}`} />
                <span className="text-zinc-500 w-20">{item.label}</span>
                <div className="flex-1 h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${item.color} opacity-60`}
                    style={{
                      width: `${result.totalMs > 0 ? (item.value / result.totalMs) * 100 : 0}%`,
                    }}
                  />
                </div>
                <span className="text-zinc-400 font-mono w-16 text-right">
                  {item.value.toFixed(0)}ms
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
