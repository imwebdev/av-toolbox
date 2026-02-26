"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Radio, Copy, Check } from "lucide-react";

const PRESETS = [
  {
    label: "YouTube",
    server: "rtmp://a.rtmp.youtube.com/live2",
    color: "text-red-400",
  },
  {
    label: "Twitch",
    server: "rtmp://live.twitch.tv/app",
    color: "text-violet-400",
  },
  {
    label: "Facebook",
    server: "rtmps://live-api-s.facebook.com:443/rtmp",
    color: "text-blue-400",
  },
  {
    label: "Custom",
    server: "",
    color: "text-zinc-400",
  },
];

export default function RtmpUrlBuilder() {
  const [preset, setPreset] = useState(0);
  const [server, setServer] = useState(PRESETS[0].server);
  const [streamKey, setStreamKey] = useState("");
  const [copied, setCopied] = useState(false);
  const [showKey, setShowKey] = useState(false);

  const fullUrl = streamKey ? `${server}/${streamKey}` : server;

  const handlePreset = (index: number) => {
    setPreset(index);
    if (PRESETS[index].server) {
      setServer(PRESETS[index].server);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const ta = document.createElement("textarea");
      ta.value = fullUrl;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Card className="tool-card-glow bg-[#111113] border-white/[0.06] transition-all duration-300 hover:bg-[#151518]">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400">
            <Radio className="w-5 h-5" />
          </div>
          <div>
            <CardTitle className="text-lg font-semibold text-white">
              RTMP URL Builder
            </CardTitle>
            <p className="text-xs text-zinc-500 mt-0.5">
              Build formatted RTMP/RTMPS streaming URLs
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="space-y-1.5">
            <Label className="text-xs text-zinc-400">Platform Preset</Label>
            <div className="grid grid-cols-4 gap-1.5">
              {PRESETS.map((p, i) => (
                <button
                  key={p.label}
                  onClick={() => handlePreset(i)}
                  className={`px-3 py-2 rounded-md text-xs font-medium transition-all ${
                    preset === i
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      : "bg-white/[0.04] text-zinc-400 border border-white/[0.06] hover:bg-white/[0.08]"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs text-zinc-400">Server URL</Label>
            <Input
              type="text"
              value={server}
              onChange={(e) => setServer(e.target.value)}
              className="bg-white/[0.04] border-white/[0.08] text-white h-9 text-sm font-mono"
              placeholder="rtmp://your.server/live"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label className="text-xs text-zinc-400">Stream Key</Label>
              <button
                onClick={() => setShowKey(!showKey)}
                className="text-[10px] text-zinc-500 hover:text-zinc-400 transition-colors"
              >
                {showKey ? "Hide" : "Show"}
              </button>
            </div>
            <Input
              type={showKey ? "text" : "password"}
              value={streamKey}
              onChange={(e) => setStreamKey(e.target.value)}
              className="bg-white/[0.04] border-white/[0.08] text-white h-9 text-sm font-mono"
              placeholder="your-stream-key"
            />
          </div>
        </div>

        <div className="rounded-lg bg-emerald-500/[0.06] border border-emerald-500/10 p-4 space-y-3">
          <div>
            <p className="text-xs text-zinc-500 mb-1.5">Full URL</p>
            <p className="text-sm font-mono text-emerald-400 break-all leading-relaxed">
              {fullUrl || "Enter server URL..."}
            </p>
          </div>
          <Button
            onClick={handleCopy}
            className="w-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 h-9 text-sm"
            variant="outline"
            disabled={!server}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Copied
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copy Full URL
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
