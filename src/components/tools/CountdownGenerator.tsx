"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Clock, Copy, Check, Play, Pause, RotateCcw } from "lucide-react";

export default function CountdownGenerator() {
  const [hours, setHours] = useState("0");
  const [minutes, setMinutes] = useState("10");
  const [seconds, setSeconds] = useState("0");
  const [isRunning, setIsRunning] = useState(false);
  const [remainingMs, setRemainingMs] = useState(0);
  const [copied, setCopied] = useState(false);

  const totalInputMs =
    ((parseInt(hours) || 0) * 3600 +
      (parseInt(minutes) || 0) * 60 +
      (parseInt(seconds) || 0)) *
    1000;

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setRemainingMs((prev) => {
        if (prev <= 100) {
          setIsRunning(false);
          return 0;
        }
        return prev - 100;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStart = () => {
    if (remainingMs <= 0) {
      setRemainingMs(totalInputMs);
    }
    setIsRunning(true);
  };

  const handlePause = () => setIsRunning(false);

  const handleReset = () => {
    setIsRunning(false);
    setRemainingMs(0);
  };

  const displayMs = isRunning || remainingMs > 0 ? remainingMs : totalInputMs;

  const formatTime = useCallback((ms: number) => {
    const totalSec = Math.ceil(ms / 1000);
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    if (h > 0) {
      return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    }
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  }, []);

  const progress =
    totalInputMs > 0
      ? ((totalInputMs - displayMs) / totalInputMs) * 100
      : 0;

  const obsUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/?countdown=${totalInputMs}`
      : "";

  const handleCopyObs = async () => {
    try {
      await navigator.clipboard.writeText(obsUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <Card className="tool-card-glow bg-[#111113] border-white/[0.06] transition-all duration-300 hover:bg-[#151518]">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-rose-500/10 text-rose-400">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <CardTitle className="text-lg font-semibold text-white">
              Countdown Timer
            </CardTitle>
            <p className="text-xs text-zinc-500 mt-0.5">
              Embeddable countdown for streams & events
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <div className="space-y-1.5">
            <Label className="text-xs text-zinc-400">Hours</Label>
            <Input
              type="number"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              className="bg-white/[0.04] border-white/[0.08] text-white h-9 text-sm text-center"
              min="0"
              max="23"
              disabled={isRunning}
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-zinc-400">Minutes</Label>
            <Input
              type="number"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
              className="bg-white/[0.04] border-white/[0.08] text-white h-9 text-sm text-center"
              min="0"
              max="59"
              disabled={isRunning}
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-zinc-400">Seconds</Label>
            <Input
              type="number"
              value={seconds}
              onChange={(e) => setSeconds(e.target.value)}
              className="bg-white/[0.04] border-white/[0.08] text-white h-9 text-sm text-center"
              min="0"
              max="59"
              disabled={isRunning}
            />
          </div>
        </div>

        <div className="rounded-lg bg-rose-500/[0.06] border border-rose-500/10 p-5 text-center space-y-3">
          <div
            className={`text-4xl font-mono font-bold tracking-wider ${
              remainingMs > 0 && remainingMs < 10000
                ? "text-rose-400"
                : "text-white"
            }`}
          >
            {formatTime(displayMs)}
          </div>
          <div className="w-full h-1 bg-white/[0.06] rounded-full overflow-hidden">
            <div
              className="h-full bg-rose-400/60 rounded-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center justify-center gap-2">
            {!isRunning ? (
              <Button
                onClick={handleStart}
                className="bg-rose-500/20 text-rose-300 border border-rose-500/30 hover:bg-rose-500/30 h-8 px-4 text-xs"
                variant="outline"
                disabled={totalInputMs <= 0}
              >
                <Play className="w-3 h-3 mr-1.5" />
                {remainingMs > 0 ? "Resume" : "Start"}
              </Button>
            ) : (
              <Button
                onClick={handlePause}
                className="bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500/30 h-8 px-4 text-xs"
                variant="outline"
              >
                <Pause className="w-3 h-3 mr-1.5" />
                Pause
              </Button>
            )}
            <Button
              onClick={handleReset}
              className="bg-white/[0.04] text-zinc-400 border border-white/[0.06] hover:bg-white/[0.08] h-8 px-4 text-xs"
              variant="outline"
            >
              <RotateCcw className="w-3 h-3 mr-1.5" />
              Reset
            </Button>
          </div>
        </div>

        <Button
          onClick={handleCopyObs}
          className="w-full bg-white/[0.04] text-zinc-400 border border-white/[0.06] hover:bg-white/[0.08] h-8 text-xs"
          variant="outline"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 mr-1.5" />
              OBS URL Copied
            </>
          ) : (
            <>
              <Copy className="w-3 h-3 mr-1.5" />
              Copy OBS Browser Source URL
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
