"use client";

import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Subtitles, Download } from "lucide-react";

const STYLES = [
  { label: "Minimal", id: "minimal" },
  { label: "Modern", id: "modern" },
  { label: "Bold", id: "bold" },
  { label: "Elegant", id: "elegant" },
];

export default function LowerThirdBuilder() {
  const [name, setName] = useState("John Smith");
  const [title, setTitle] = useState("Senior Producer");
  const [accentColor, setAccentColor] = useState("#06b6d4");
  const [bgColor, setBgColor] = useState("#000000");
  const [style, setStyle] = useState(0);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 800;
    canvas.height = 200;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, 800, 200);

    const selectedStyle = STYLES[style].id;

    if (selectedStyle === "minimal") {
      ctx.fillStyle = bgColor + "e0";
      ctx.fillRect(40, 80, 400, 80);
      ctx.fillStyle = accentColor;
      ctx.fillRect(40, 80, 4, 80);
      ctx.font = "bold 24px sans-serif";
      ctx.fillStyle = "#ffffff";
      ctx.fillText(name, 60, 115);
      ctx.font = "16px sans-serif";
      ctx.fillStyle = "#aaaaaa";
      ctx.fillText(title, 60, 142);
    } else if (selectedStyle === "modern") {
      ctx.fillStyle = accentColor;
      ctx.fillRect(40, 80, 400, 4);
      ctx.fillStyle = bgColor + "e0";
      ctx.fillRect(40, 84, 400, 76);
      ctx.font = "bold 26px sans-serif";
      ctx.fillStyle = "#ffffff";
      ctx.fillText(name, 56, 118);
      ctx.font = "14px sans-serif";
      ctx.fillStyle = accentColor;
      ctx.fillText(title.toUpperCase(), 56, 142);
    } else if (selectedStyle === "bold") {
      ctx.fillStyle = accentColor;
      ctx.fillRect(40, 80, 400, 80);
      ctx.font = "bold 28px sans-serif";
      ctx.fillStyle = "#000000";
      ctx.fillText(name, 56, 118);
      ctx.font = "bold 14px sans-serif";
      ctx.fillStyle = "#00000099";
      ctx.fillText(title.toUpperCase(), 56, 142);
    } else {
      const gradient = ctx.createLinearGradient(40, 80, 440, 160);
      gradient.addColorStop(0, bgColor + "f0");
      gradient.addColorStop(1, bgColor + "80");
      ctx.fillStyle = gradient;
      ctx.fillRect(40, 80, 400, 80);
      ctx.fillStyle = accentColor + "60";
      ctx.fillRect(40, 155, 400, 1);
      ctx.font = "italic bold 24px serif";
      ctx.fillStyle = "#ffffff";
      ctx.fillText(name, 56, 116);
      ctx.font = "italic 15px serif";
      ctx.fillStyle = accentColor;
      ctx.fillText(title, 56, 142);
    }

    const link = document.createElement("a");
    link.download = `lower-third-${name.toLowerCase().replace(/\s+/g, "-")}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const renderPreview = () => {
    const selectedStyle = STYLES[style].id;

    if (selectedStyle === "minimal") {
      return (
        <div className="flex items-stretch" style={{ backgroundColor: bgColor + "e0" }}>
          <div className="w-1 shrink-0" style={{ backgroundColor: accentColor }} />
          <div className="px-4 py-3">
            <p className="text-white font-semibold text-sm">{name || "Name"}</p>
            <p className="text-zinc-400 text-xs mt-0.5">{title || "Title"}</p>
          </div>
        </div>
      );
    }
    if (selectedStyle === "modern") {
      return (
        <div>
          <div className="h-1" style={{ backgroundColor: accentColor }} />
          <div className="px-4 py-3" style={{ backgroundColor: bgColor + "e0" }}>
            <p className="text-white font-bold text-sm">{name || "Name"}</p>
            <p className="text-xs mt-0.5 tracking-wider font-medium" style={{ color: accentColor }}>
              {(title || "Title").toUpperCase()}
            </p>
          </div>
        </div>
      );
    }
    if (selectedStyle === "bold") {
      return (
        <div className="px-4 py-3" style={{ backgroundColor: accentColor }}>
          <p className="text-black font-bold text-sm">{name || "Name"}</p>
          <p className="text-black/60 text-xs mt-0.5 tracking-wider font-bold">
            {(title || "Title").toUpperCase()}
          </p>
        </div>
      );
    }
    return (
      <div
        className="px-4 py-3 border-b"
        style={{
          background: `linear-gradient(90deg, ${bgColor}f0, ${bgColor}80)`,
          borderColor: accentColor + "60",
        }}
      >
        <p className="text-white font-bold italic text-sm font-serif">{name || "Name"}</p>
        <p className="text-xs mt-0.5 italic font-serif" style={{ color: accentColor }}>
          {title || "Title"}
        </p>
      </div>
    );
  };

  return (
    <Card className="tool-card-glow bg-[#111113] border-white/[0.06] transition-all duration-300 hover:bg-[#151518]">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-pink-500/10 text-pink-400">
            <Subtitles className="w-5 h-5" />
          </div>
          <div>
            <CardTitle className="text-lg font-semibold text-white">
              Lower Third Builder
            </CardTitle>
            <p className="text-xs text-zinc-500 mt-0.5">
              Quick name strap generator with download
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs text-zinc-400">Name</Label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white/[0.04] border-white/[0.08] text-white h-9 text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-zinc-400">Title</Label>
              <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-white/[0.04] border-white/[0.08] text-white h-9 text-sm"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs text-zinc-400">Style</Label>
            <div className="grid grid-cols-4 gap-1.5">
              {STYLES.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setStyle(i)}
                  className={`px-3 py-2 rounded-md text-xs font-medium transition-all ${
                    style === i
                      ? "bg-pink-500/20 text-pink-300 border border-pink-500/30"
                      : "bg-white/[0.04] text-zinc-400 border border-white/[0.06] hover:bg-white/[0.08]"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs text-zinc-400">Accent Color</Label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                  className="w-9 h-9 rounded-md cursor-pointer bg-transparent border border-white/[0.08]"
                />
                <Input
                  type="text"
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                  className="bg-white/[0.04] border-white/[0.08] text-white h-9 text-xs font-mono flex-1"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-zinc-400">Background</Label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-9 h-9 rounded-md cursor-pointer bg-transparent border border-white/[0.08]"
                />
                <Input
                  type="text"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="bg-white/[0.04] border-white/[0.08] text-white h-9 text-xs font-mono flex-1"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div
            ref={previewRef}
            className="rounded-lg overflow-hidden border border-white/[0.06]"
          >
            <div className="bg-zinc-900/50 p-6 flex items-end justify-start min-h-[100px]">
              <div className="w-full max-w-[300px]">{renderPreview()}</div>
            </div>
          </div>
          <Button
            onClick={handleDownload}
            className="w-full bg-pink-500/10 text-pink-400 border border-pink-500/20 hover:bg-pink-500/20 h-9 text-sm"
            variant="outline"
          >
            <Download className="w-4 h-4 mr-2" />
            Download PNG
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
