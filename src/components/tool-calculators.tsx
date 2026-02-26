'use client';

import { useState } from 'react';
import type { Tool } from '@/lib/tools-data';

// Shared button group component
function ButtonGroup({ options, value, onChange, color }: {
  options: { label: string; value: string }[];
  value: string;
  onChange: (v: string) => void;
  color: string;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(opt => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`px-3.5 py-2 text-sm font-medium rounded-lg border transition-all ${
            value === opt.value
              ? 'text-white border-transparent shadow-sm'
              : 'text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 bg-white dark:bg-zinc-800'
          }`}
          style={value === opt.value ? { backgroundColor: color } : undefined}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

// Shared result display
function ResultCard({ label, value, unit, highlight = false, color }: {
  label: string;
  value: string;
  unit: string;
  highlight?: boolean;
  color: string;
}) {
  return (
    <div className={`rounded-xl p-4 ${highlight ? 'border-2' : 'border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50'}`}
      style={highlight ? { borderColor: color, backgroundColor: `${color}08` } : undefined}
    >
      <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">{label}</p>
      <p className="text-2xl font-bold font-mono tracking-tight" style={highlight ? { color } : undefined}>
        <span className={highlight ? '' : 'text-zinc-900 dark:text-white'}>{value}</span>
        <span className="text-sm font-normal text-zinc-400 dark:text-zinc-500 ml-1">{unit}</span>
      </p>
    </div>
  );
}

// Input field
function InputField({ label, value, onChange, unit, min, max }: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  unit: string;
  min?: number;
  max?: number;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">{label}</label>
      <div className="flex items-center gap-2">
        <input
          type="number"
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          min={min}
          max={max}
          className="w-full px-3 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
        <span className="text-sm text-zinc-400 dark:text-zinc-500 whitespace-nowrap">{unit}</span>
      </div>
    </div>
  );
}

// === STREAM DELAY CALCULATOR ===
function StreamDelayCalc({ color }: { color: string }) {
  const [encoder, setEncoder] = useState(150);
  const [buffer, setBuffer] = useState(3);
  const [network, setNetwork] = useState(50);
  const [segment, setSegment] = useState(2);

  const totalMs = encoder + network + (buffer * 1000) + (segment * 1000);
  const totalSec = (totalMs / 1000).toFixed(1);

  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden">
      <div className="p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-5">
            <InputField label="Encoder Delay" value={encoder} onChange={setEncoder} unit="ms" min={0} max={5000} />
            <InputField label="Player Buffer" value={buffer} onChange={setBuffer} unit="sec" min={0} max={30} />
            <InputField label="Network Latency" value={network} onChange={setNetwork} unit="ms" min={0} max={2000} />
            <InputField label="Segment Duration" value={segment} onChange={setSegment} unit="sec" min={0} max={30} />
          </div>

          <div className="space-y-4">
            <ResultCard label="Total Delay" value={totalSec} unit="seconds" highlight color={color} />
            <div className="grid grid-cols-2 gap-3">
              <ResultCard label="Encoding" value={`${encoder}`} unit="ms" color={color} />
              <ResultCard label="Network" value={`${network}`} unit="ms" color={color} />
              <ResultCard label="Buffering" value={`${buffer * 1000}`} unit="ms" color={color} />
              <ResultCard label="Segmenting" value={`${segment * 1000}`} unit="ms" color={color} />
            </div>

            {/* Pipeline bar */}
            <div className="mt-4 rounded-lg bg-zinc-100 dark:bg-zinc-800 p-4">
              <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-3">Pipeline Breakdown</p>
              <div className="flex rounded-full overflow-hidden h-3">
                <div className="bg-blue-500 transition-all" style={{ width: `${(encoder / totalMs) * 100}%` }} title={`Encoding: ${encoder}ms`} />
                <div className="bg-amber-500 transition-all" style={{ width: `${(network / totalMs) * 100}%` }} title={`Network: ${network}ms`} />
                <div className="bg-violet-500 transition-all" style={{ width: `${((buffer * 1000) / totalMs) * 100}%` }} title={`Buffer: ${buffer}s`} />
                <div className="bg-emerald-500 transition-all" style={{ width: `${((segment * 1000) / totalMs) * 100}%` }} title={`Segment: ${segment}s`} />
              </div>
              <div className="flex justify-between mt-2 text-[10px] text-zinc-400 dark:text-zinc-500">
                <span>Encoding</span>
                <span>Network</span>
                <span>Buffer</span>
                <span>Segment</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// === BITRATE CALCULATOR ===
function BitrateCalc({ color }: { color: string }) {
  const [resolution, setResolution] = useState('1080p');
  const [fps, setFps] = useState('60');
  const [codec, setCodec] = useState('H.264');
  const [quality, setQuality] = useState('High');

  const baseBitrates: Record<string, number> = { '720p': 3000, '1080p': 6000, '1440p': 10000, '4K': 18000 };
  const fpsMultipliers: Record<string, number> = { '24': 0.7, '25': 0.72, '30': 0.8, '50': 0.95, '60': 1.0 };
  const codecMultipliers: Record<string, number> = { 'H.264': 1.0, 'H.265/HEVC': 0.6, 'AV1': 0.5, 'VP9': 0.65 };
  const qualityMultipliers: Record<string, number> = { 'Low': 0.5, 'Medium': 0.75, 'High': 1.0, 'Ultra': 1.4 };

  const baseBitrate = baseBitrates[resolution] || 6000;
  const videoBitrate = Math.round(baseBitrate * (fpsMultipliers[fps] || 1) * (codecMultipliers[codec] || 1) * (qualityMultipliers[quality] || 1));
  const audioBitrate = 128;
  const totalBitrate = videoBitrate + audioBitrate;
  const minUpload = Math.round(totalBitrate * 1.3);

  const formatBitrate = (kbps: number) => kbps >= 1000 ? `${(kbps / 1000).toFixed(1)}` : `${kbps}`;
  const bitrateUnit = (kbps: number) => kbps >= 1000 ? 'Mbps' : 'kbps';

  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden">
      <div className="p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Resolution</label>
              <ButtonGroup options={[{ label: '720p', value: '720p' }, { label: '1080p', value: '1080p' }, { label: '1440p', value: '1440p' }, { label: '4K', value: '4K' }]} value={resolution} onChange={setResolution} color={color} />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Frame Rate</label>
              <ButtonGroup options={[{ label: '24fps', value: '24' }, { label: '25fps', value: '25' }, { label: '30fps', value: '30' }, { label: '50fps', value: '50' }, { label: '60fps', value: '60' }]} value={fps} onChange={setFps} color={color} />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Codec</label>
              <ButtonGroup options={[{ label: 'H.264', value: 'H.264' }, { label: 'H.265/HEVC', value: 'H.265/HEVC' }, { label: 'AV1', value: 'AV1' }, { label: 'VP9', value: 'VP9' }]} value={codec} onChange={setCodec} color={color} />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Quality</label>
              <ButtonGroup options={[{ label: 'Low', value: 'Low' }, { label: 'Medium', value: 'Medium' }, { label: 'High', value: 'High' }, { label: 'Ultra', value: 'Ultra' }]} value={quality} onChange={setQuality} color={color} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <ResultCard label="Video Bitrate" value={formatBitrate(videoBitrate)} unit={bitrateUnit(videoBitrate)} highlight color={color} />
            <ResultCard label="Audio Bitrate" value={`${audioBitrate}`} unit="kbps" color={color} />
            <ResultCard label="Total Bitrate" value={formatBitrate(totalBitrate)} unit={bitrateUnit(totalBitrate)} color={color} />
            <ResultCard label="Min Upload Speed" value={formatBitrate(minUpload)} unit={bitrateUnit(minUpload)} color={color} />
          </div>
        </div>
      </div>
    </div>
  );
}

// === SAFE AREA OVERLAY ===
function SafeAreaCalc({ color }: { color: string }) {
  const [resolution, setResolution] = useState('1080p');
  const resolutions: Record<string, { w: number; h: number }> = {
    '720p': { w: 1280, h: 720 },
    '1080p': { w: 1920, h: 1080 },
    '1440p': { w: 2560, h: 1440 },
    '4K': { w: 3840, h: 2160 },
  };
  const res = resolutions[resolution] || resolutions['1080p'];

  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden">
      <div className="p-6 sm:p-8">
        <div className="mb-5">
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Resolution</label>
          <ButtonGroup options={Object.keys(resolutions).map(r => ({ label: r, value: r }))} value={resolution} onChange={setResolution} color={color} />
        </div>

        <div className="relative aspect-video bg-zinc-900 dark:bg-zinc-800 rounded-xl overflow-hidden">
          {/* Action safe (90%) */}
          <div className="absolute border-2 border-dashed border-amber-500/60" style={{ top: '5%', left: '5%', right: '5%', bottom: '5%' }}>
            <span className="absolute top-1 left-2 text-[10px] font-mono text-amber-500">Action Safe (90%)</span>
          </div>
          {/* Title safe (80%) */}
          <div className="absolute border-2 border-blue-500/80" style={{ top: '10%', left: '10%', right: '10%', bottom: '10%' }}>
            <span className="absolute top-1 left-2 text-[10px] font-mono text-blue-400">Title Safe (80%)</span>
          </div>
          {/* Center cross */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8">
            <div className="absolute top-1/2 left-0 right-0 h-px bg-zinc-500/40" />
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-zinc-500/40" />
          </div>
          {/* Resolution label */}
          <div className="absolute bottom-3 right-3 text-[11px] font-mono text-zinc-400 bg-black/40 px-2 py-1 rounded">
            {res.w}x{res.h}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
          <ResultCard label="Full Frame" value={`${res.w}x${res.h}`} unit="" color={color} />
          <ResultCard label="Action Safe" value={`${Math.round(res.w * 0.9)}x${Math.round(res.h * 0.9)}`} unit="" color={color} />
          <ResultCard label="Title Safe" value={`${Math.round(res.w * 0.8)}x${Math.round(res.h * 0.8)}`} unit="" color={color} />
          <ResultCard label="Title Margin" value={`${Math.round(res.w * 0.1)}`} unit="px each side" color={color} />
        </div>
      </div>
    </div>
  );
}

// === RTMP URL BUILDER ===
function RtmpCalc({ color }: { color: string }) {
  const [platform, setPlatform] = useState('youtube');
  const [streamKey, setStreamKey] = useState('');
  const [protocol, setProtocol] = useState('rtmps');

  const platforms: Record<string, { name: string; rtmp: string; rtmps: string }> = {
    youtube: { name: 'YouTube', rtmp: 'rtmp://a.rtmp.youtube.com/live2', rtmps: 'rtmps://a.rtmp.youtube.com/live2' },
    twitch: { name: 'Twitch', rtmp: 'rtmp://live.twitch.tv/app', rtmps: 'rtmps://live.twitch.tv/app' },
    facebook: { name: 'Facebook', rtmp: 'rtmp://live-api-s.facebook.com:80/rtmp', rtmps: 'rtmps://live-api-s.facebook.com:443/rtmp' },
    custom: { name: 'Custom', rtmp: '', rtmps: '' },
  };

  const p = platforms[platform];
  const url = protocol === 'rtmps' ? p.rtmps : p.rtmp;
  const fullUrl = streamKey ? `${url}/${streamKey}` : url;

  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden">
      <div className="p-6 sm:p-8 space-y-5">
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Platform</label>
          <ButtonGroup options={Object.entries(platforms).map(([k, v]) => ({ label: v.name, value: k }))} value={platform} onChange={setPlatform} color={color} />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Protocol</label>
          <ButtonGroup options={[{ label: 'RTMPS (Secure)', value: 'rtmps' }, { label: 'RTMP', value: 'rtmp' }]} value={protocol} onChange={setProtocol} color={color} />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Stream Key</label>
          <input
            type="text"
            value={streamKey}
            onChange={e => setStreamKey(e.target.value)}
            placeholder="Paste your stream key here"
            className="w-full px-3 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-mono"
          />
        </div>

        <div className="rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 p-4">
          <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-2">Server URL</p>
          <p className="font-mono text-sm text-zinc-900 dark:text-white break-all">{url || 'Enter custom URL'}</p>
        </div>

        {streamKey && (
          <div className="rounded-xl border-2 p-4" style={{ borderColor: color, backgroundColor: `${color}08` }}>
            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-2">Full Stream URL</p>
            <p className="font-mono text-sm break-all" style={{ color }}>{fullUrl}</p>
          </div>
        )}
      </div>
    </div>
  );
}

// === COUNTDOWN GENERATOR ===
function CountdownCalc({ color }: { color: string }) {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);

  const totalSeconds = hours * 3600 + minutes * 60 + seconds;
  const displayH = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const displayM = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const displayS = String(totalSeconds % 60).padStart(2, '0');

  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden">
      <div className="p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-5">
            <InputField label="Hours" value={hours} onChange={setHours} unit="h" min={0} max={24} />
            <InputField label="Minutes" value={minutes} onChange={setMinutes} unit="m" min={0} max={59} />
            <InputField label="Seconds" value={seconds} onChange={setSeconds} unit="s" min={0} max={59} />
          </div>

          <div className="flex items-center justify-center">
            <div className="text-center">
              <p className="text-xs font-medium text-zinc-400 dark:text-zinc-500 mb-4 uppercase tracking-wider">Preview</p>
              <div className="rounded-2xl bg-zinc-900 dark:bg-zinc-800 p-8 sm:p-12 min-w-[280px]">
                <p className="text-xs text-zinc-500 mb-3 uppercase tracking-widest">Starting Soon</p>
                <p className="font-mono text-5xl sm:text-6xl font-bold text-white tracking-wider">
                  {displayH}:{displayM}:{displayS}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// === LOWER THIRD BUILDER ===
function LowerThirdCalc({ color }: { color: string }) {
  const [name, setName] = useState('John Smith');
  const [title, setTitle] = useState('Senior Producer');
  const [bgColor, setBgColor] = useState('#3B82F6');
  const [style, setStyle] = useState('modern');

  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden">
      <div className="p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Title / Role</label>
              <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Accent Color</label>
              <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="w-12 h-10 rounded-lg border border-zinc-200 dark:border-zinc-700 cursor-pointer" />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Style</label>
              <ButtonGroup options={[{ label: 'Modern', value: 'modern' }, { label: 'Classic', value: 'classic' }, { label: 'Minimal', value: 'minimal' }]} value={style} onChange={setStyle} color={color} />
            </div>
          </div>

          {/* Preview */}
          <div className="flex items-end justify-center">
            <div className="relative w-full aspect-video bg-zinc-900 dark:bg-zinc-800 rounded-xl overflow-hidden">
              <div className="absolute bottom-0 left-0 right-0 p-6">
                {style === 'modern' && (
                  <div className="flex items-stretch gap-0 max-w-xs">
                    <div className="w-1 rounded-l-lg" style={{ backgroundColor: bgColor }} />
                    <div className="bg-black/80 backdrop-blur-sm px-4 py-3 rounded-r-lg">
                      <p className="text-white font-bold text-sm">{name}</p>
                      <p className="text-zinc-400 text-xs">{title}</p>
                    </div>
                  </div>
                )}
                {style === 'classic' && (
                  <div className="max-w-xs">
                    <div className="px-4 py-2.5 text-white font-bold text-sm" style={{ backgroundColor: bgColor }}>{name}</div>
                    <div className="bg-zinc-800 px-4 py-2 text-zinc-300 text-xs">{title}</div>
                  </div>
                )}
                {style === 'minimal' && (
                  <div className="max-w-xs bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg border-l-2" style={{ borderColor: bgColor }}>
                    <p className="text-white font-medium text-sm">{name}</p>
                    <p className="text-zinc-400 text-xs">{title}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// === AUDIO DELAY CALCULATOR ===
function AudioDelayCalc({ color }: { color: string }) {
  const [distance, setDistance] = useState(80);
  const [unit, setUnit] = useState('feet');
  const [temp, setTemp] = useState(72);

  const speedOfSound = unit === 'feet'
    ? 1052 + (1.106 * temp)
    : 331.3 + (0.606 * ((temp - 32) * 5 / 9));

  const distanceInUnit = distance;
  const delayMs = (distanceInUnit / speedOfSound) * 1000;

  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden">
      <div className="p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-5">
            <InputField label="Distance" value={distance} onChange={setDistance} unit={unit} min={0} max={10000} />
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Unit</label>
              <ButtonGroup options={[{ label: 'Feet', value: 'feet' }, { label: 'Meters', value: 'meters' }]} value={unit} onChange={setUnit} color={color} />
            </div>
            <InputField label="Temperature" value={temp} onChange={setTemp} unit={unit === 'feet' ? '°F' : '°C'} min={-40} max={130} />
          </div>

          <div className="space-y-4">
            <ResultCard label="Propagation Delay" value={delayMs.toFixed(1)} unit="ms" highlight color={color} />
            <ResultCard label="Speed of Sound" value={speedOfSound.toFixed(1)} unit={unit === 'feet' ? 'ft/s' : 'm/s'} color={color} />
            <ResultCard label="Recommended Delay" value={(delayMs + 10).toFixed(1)} unit="ms (+10ms Haas)" color={color} />
          </div>
        </div>
      </div>
    </div>
  );
}

// === ASPECT RATIO CALCULATOR ===
function AspectRatioCalc({ color }: { color: string }) {
  const [width, setWidth] = useState(1920);
  const [height, setHeight] = useState(1080);

  function gcd(a: number, b: number): number { return b === 0 ? a : gcd(b, a % b); }
  const g = gcd(Math.abs(width), Math.abs(height)) || 1;
  const ratioW = width / g;
  const ratioH = height / g;
  const totalPixels = width * height;
  const megapixels = (totalPixels / 1000000).toFixed(1);

  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden">
      <div className="p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-5">
            <InputField label="Width" value={width} onChange={setWidth} unit="px" min={1} max={15360} />
            <InputField label="Height" value={height} onChange={setHeight} unit="px" min={1} max={8640} />

            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Quick Presets</label>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: '720p', w: 1280, h: 720 },
                  { label: '1080p', w: 1920, h: 1080 },
                  { label: '1440p', w: 2560, h: 1440 },
                  { label: '4K', w: 3840, h: 2160 },
                  { label: '4:3', w: 1440, h: 1080 },
                  { label: '21:9', w: 2560, h: 1080 },
                ].map(p => (
                  <button key={p.label} onClick={() => { setWidth(p.w); setHeight(p.h); }} className="px-3 py-1.5 text-xs font-medium rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-600 bg-white dark:bg-zinc-800 transition-colors">
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <ResultCard label="Aspect Ratio" value={`${ratioW}:${ratioH}`} unit="" highlight color={color} />
            <div className="grid grid-cols-2 gap-3">
              <ResultCard label="Total Pixels" value={totalPixels.toLocaleString()} unit="px" color={color} />
              <ResultCard label="Megapixels" value={megapixels} unit="MP" color={color} />
            </div>

            {/* Visual ratio */}
            <div className="rounded-xl bg-zinc-50 dark:bg-zinc-800/50 p-4">
              <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-3">Visual Ratio</p>
              <div className="flex justify-center">
                <div
                  className="border-2 rounded-lg max-w-full"
                  style={{
                    borderColor: color,
                    width: `${Math.min(200, 200 * (width / height))}px`,
                    height: `${Math.min(200, 200 * (height / width))}px`,
                    maxHeight: '150px',
                    maxWidth: '100%',
                    backgroundColor: `${color}10`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// === CABLE LENGTH ESTIMATOR ===
function CableLengthCalc({ color }: { color: string }) {
  const [cableType, setCableType] = useState('hdmi');
  const [resolution, setResolution] = useState('1080p60');
  const [distance, setDistance] = useState(30);

  const maxDistances: Record<string, Record<string, number>> = {
    hdmi: { '1080p30': 50, '1080p60': 45, '4K30': 25, '4K60': 16 },
    sdi: { '1080p30': 330, '1080p60': 260, '4K30': 200, '4K60': 165 },
    usb: { '1080p30': 16, '1080p60': 16, '4K30': 10, '4K60': 6 },
    cat6: { '1080p30': 330, '1080p60': 330, '4K30': 230, '4K60': 165 },
    fiber: { '1080p30': 1000, '1080p60': 1000, '4K30': 1000, '4K60': 1000 },
  };

  const maxDist = maxDistances[cableType]?.[resolution] || 50;
  const isWithinLimit = distance <= maxDist;
  const percentUsed = Math.min(100, (distance / maxDist) * 100);

  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden">
      <div className="p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Cable Type</label>
              <ButtonGroup options={[
                { label: 'HDMI', value: 'hdmi' },
                { label: 'SDI', value: 'sdi' },
                { label: 'USB', value: 'usb' },
                { label: 'Cat6/HDBaseT', value: 'cat6' },
                { label: 'Fiber', value: 'fiber' },
              ]} value={cableType} onChange={setCableType} color={color} />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Signal Resolution</label>
              <ButtonGroup options={[
                { label: '1080p30', value: '1080p30' },
                { label: '1080p60', value: '1080p60' },
                { label: '4K30', value: '4K30' },
                { label: '4K60', value: '4K60' },
              ]} value={resolution} onChange={setResolution} color={color} />
            </div>
            <InputField label="Planned Distance" value={distance} onChange={setDistance} unit="ft" min={1} max={5000} />
          </div>

          <div className="space-y-4">
            <div className={`rounded-xl p-4 border-2 ${isWithinLimit ? 'border-emerald-500 bg-emerald-500/5' : 'border-red-500 bg-red-500/5'}`}>
              <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">Status</p>
              <p className={`text-lg font-bold ${isWithinLimit ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                {isWithinLimit ? 'Within safe limit' : 'Exceeds maximum distance'}
              </p>
            </div>
            <ResultCard label="Maximum Distance" value={`${maxDist}`} unit="ft" highlight color={color} />
            <ResultCard label="Your Distance" value={`${distance}`} unit="ft" color={color} />

            {/* Progress bar */}
            <div className="rounded-xl bg-zinc-50 dark:bg-zinc-800/50 p-4">
              <div className="flex justify-between text-xs text-zinc-500 dark:text-zinc-400 mb-2">
                <span>0 ft</span>
                <span>{maxDist} ft max</span>
              </div>
              <div className="w-full h-3 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${isWithinLimit ? 'bg-emerald-500' : 'bg-red-500'}`}
                  style={{ width: `${percentUsed}%` }}
                />
              </div>
            </div>

            {!isWithinLimit && (
              <div className="rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4">
                <p className="text-xs font-medium text-amber-700 dark:text-amber-400 mb-1">Recommendation</p>
                <p className="text-sm text-amber-600 dark:text-amber-400">
                  Consider using {cableType === 'hdmi' ? 'an active optical HDMI cable or SDI with a converter' : 'fiber optic with appropriate converters'} for this distance.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// === SPEAKER COVERAGE CALCULATOR ===
function SpeakerCoverageCalc({ color }: { color: string }) {
  const [hAngle, setHAngle] = useState(90);
  const [vAngle, setVAngle] = useState(50);
  const [throwDist, setThrowDist] = useState(40);
  const [sensitivity, setSensitivity] = useState(95);

  const coverageWidth = 2 * throwDist * Math.tan((hAngle / 2) * Math.PI / 180);
  const coverageHeight = 2 * throwDist * Math.tan((vAngle / 2) * Math.PI / 180);
  const coverageArea = coverageWidth * coverageHeight;
  const splAtDist = sensitivity - 20 * Math.log10(throwDist * 0.3048);

  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden">
      <div className="p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-5">
            <InputField label="Horizontal Dispersion" value={hAngle} onChange={setHAngle} unit="°" min={10} max={180} />
            <InputField label="Vertical Dispersion" value={vAngle} onChange={setVAngle} unit="°" min={10} max={180} />
            <InputField label="Throw Distance" value={throwDist} onChange={setThrowDist} unit="ft" min={1} max={500} />
            <InputField label="Sensitivity (1W/1m)" value={sensitivity} onChange={setSensitivity} unit="dB SPL" min={80} max={120} />
          </div>

          <div className="space-y-4">
            <ResultCard label="Coverage Width" value={coverageWidth.toFixed(1)} unit="ft" highlight color={color} />
            <div className="grid grid-cols-2 gap-3">
              <ResultCard label="Coverage Height" value={coverageHeight.toFixed(1)} unit="ft" color={color} />
              <ResultCard label="Coverage Area" value={coverageArea.toFixed(0)} unit="sq ft" color={color} />
            </div>
            <ResultCard label="SPL at Distance" value={splAtDist.toFixed(1)} unit="dB" color={color} />

            {/* Visual coverage */}
            <div className="rounded-xl bg-zinc-50 dark:bg-zinc-800/50 p-4">
              <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-3">Coverage Pattern</p>
              <div className="relative h-32 flex items-end justify-center">
                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 border-2 rounded-t-full"
                  style={{
                    borderColor: color,
                    backgroundColor: `${color}10`,
                    width: `${Math.min(100, hAngle)}%`,
                    height: `${Math.min(100, 40 + throwDist)}%`,
                    borderBottom: 'none',
                  }}
                />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// === MAIN ROUTER ===
export function ToolCalculator({ slug, tool }: { slug: string; tool: Tool }) {
  const color = tool.color;
  switch (slug) {
    case 'stream-delay-calculator': return <StreamDelayCalc color={color} />;
    case 'bitrate-calculator': return <BitrateCalc color={color} />;
    case 'safe-area-overlay': return <SafeAreaCalc color={color} />;
    case 'rtmp-url-builder': return <RtmpCalc color={color} />;
    case 'countdown-generator': return <CountdownCalc color={color} />;
    case 'lower-third-builder': return <LowerThirdCalc color={color} />;
    case 'audio-delay-calculator': return <AudioDelayCalc color={color} />;
    case 'aspect-ratio-calculator': return <AspectRatioCalc color={color} />;
    case 'cable-length-estimator': return <CableLengthCalc color={color} />;
    case 'speaker-coverage-calculator': return <SpeakerCoverageCalc color={color} />;
    default: return <div className="p-8 text-center text-zinc-500">Calculator coming soon</div>;
  }
}
