"use client";

import { useState, useRef, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Scan, Download } from "lucide-react";

const ASPECT_RATIOS = [
  { label: "16:9", width: 1920, height: 1080 },
  { label: "4:3", width: 1440, height: 1080 },
  { label: "21:9", width: 2560, height: 1080 },
  { label: "1:1", width: 1080, height: 1080 },
  { label: "9:16", width: 1080, height: 1920 },
];

export default function SafeAreaOverlay() {
  const [aspectRatio, setAspectRatio] = useState(0);
  const [titleSafe, setTitleSafe] = useState("10");
  const [actionSafe, setActionSafe] = useState("5");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const selectedRatio = ASPECT_RATIOS[aspectRatio];
  const previewWidth = 320;
  const previewHeight = Math.round(
    (selectedRatio.height / selectedRatio.width) * previewWidth
  );

  const drawOverlay = useCallback(
    (forDownload = false) => {
      const width = forDownload ? selectedRatio.width : previewWidth;
      const height = forDownload
        ? selectedRatio.height
        : previewHeight;
      const titlePct = parseFloat(titleSafe) / 100 || 0;
      const actionPct = parseFloat(actionSafe) / 100 || 0;

      const canvas = forDownload
        ? document.createElement("canvas")
        : canvasRef.current;
      if (!canvas) return null;

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return null;

      ctx.clearRect(0, 0, width, height);

      // Action safe
      const ax = width * actionPct;
      const ay = height * actionPct;
      const aw = width - ax * 2;
      const ah = height - ay * 2;
      ctx.strokeStyle = "#06b6d480";
      ctx.lineWidth = forDownload ? 3 : 1.5;
      ctx.setLineDash(forDownload ? [12, 6] : [6, 3]);
      ctx.strokeRect(ax, ay, aw, ah);

      // Title safe
      const tx = width * titlePct;
      const ty = height * titlePct;
      const tw = width - tx * 2;
      const th = height - ty * 2;
      ctx.strokeStyle = "#f59e0b80";
      ctx.lineWidth = forDownload ? 3 : 1.5;
      ctx.setLineDash(forDownload ? [12, 6] : [6, 3]);
      ctx.strokeRect(tx, ty, tw, th);

      // Center crosshair
      ctx.strokeStyle = "#ffffff30";
      ctx.lineWidth = forDownload ? 2 : 1;
      ctx.setLineDash([]);
      const cx = width / 2;
      const cy = height / 2;
      const crossSize = forDownload ? 40 : 15;
      ctx.beginPath();
      ctx.moveTo(cx - crossSize, cy);
      ctx.lineTo(cx + crossSize, cy);
      ctx.moveTo(cx, cy - crossSize);
      ctx.lineTo(cx, cy + crossSize);
      ctx.stroke();

      // Labels
      if (forDownload) {
        ctx.font = "bold 28px monospace";
        ctx.fillStyle = "#06b6d4";
        ctx.fillText("Action Safe", ax + 10, ay + 35);
        ctx.fillStyle = "#f59e0b";
        ctx.fillText("Title Safe", tx + 10, ty + 35);
      }

      return canvas;
    },
    [selectedRatio, titleSafe, actionSafe, previewHeight]
  );

  const handleDownload = () => {
    const canvas = drawOverlay(true);
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `safe-area-${selectedRatio.label.replace(":", "x")}-${selectedRatio.width}x${selectedRatio.height}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  // Draw preview whenever params change
  const drawPreview = () => {
    drawOverlay(false);
  };

  return (
    <Card className="tool-card-glow bg-[#111113] border-white/[0.06] transition-all duration-300 hover:bg-[#151518]">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-amber-500/10 text-amber-400">
            <Scan className="w-5 h-5" />
          </div>
          <div>
            <CardTitle className="text-lg font-semibold text-white">
              Safe Area Overlay
            </CardTitle>
            <p className="text-xs text-zinc-500 mt-0.5">
              Generate title & action safe overlays as PNG
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label className="text-xs text-zinc-400">Aspect Ratio</Label>
            <div className="grid grid-cols-5 gap-1.5">
              {ASPECT_RATIOS.map((ar, i) => (
                <button
                  key={ar.label}
                  onClick={() => setAspectRatio(i)}
                  className={`px-2 py-2 rounded-md text-xs font-medium transition-all ${
                    aspectRatio === i
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                      : "bg-white/[0.04] text-zinc-400 border border-white/[0.06] hover:bg-white/[0.08]"
                  }`}
                >
                  {ar.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs text-zinc-400">Title Safe Margin</Label>
              <div className="relative">
                <Input
                  type="number"
                  value={titleSafe}
                  onChange={(e) => setTitleSafe(e.target.value)}
                  className="bg-white/[0.04] border-white/[0.08] text-white pr-8 h-9 text-sm"
                  min="0"
                  max="25"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500">
                  %
                </span>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-zinc-400">Action Safe Margin</Label>
              <div className="relative">
                <Input
                  type="number"
                  value={actionSafe}
                  onChange={(e) => setActionSafe(e.target.value)}
                  className="bg-white/[0.04] border-white/[0.08] text-white pr-8 h-9 text-sm"
                  min="0"
                  max="25"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-500">
                  %
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3">
          <div
            className="relative bg-zinc-900 rounded-lg border border-white/[0.06] overflow-hidden flex items-center justify-center"
            style={{
              width: previewWidth,
              height: Math.min(previewHeight, 240),
            }}
          >
            <canvas
              ref={(el) => {
                canvasRef.current = el;
                if (el) setTimeout(drawPreview, 0);
              }}
              className="w-full h-full"
              style={{ imageRendering: "auto" }}
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-[10px] text-zinc-600">
                {selectedRatio.width} x {selectedRatio.height}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-zinc-500">
            <div className="flex items-center gap-1">
              <div className="w-3 h-0.5 bg-amber-500/60 rounded" />
              Title Safe ({titleSafe}%)
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-0.5 bg-cyan-500/60 rounded" />
              Action Safe ({actionSafe}%)
            </div>
          </div>
          <Button
            onClick={handleDownload}
            className="w-full bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 h-9 text-sm"
            variant="outline"
          >
            <Download className="w-4 h-4 mr-2" />
            Download PNG ({selectedRatio.width}x{selectedRatio.height})
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
