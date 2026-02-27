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
    <div className="flex flex-wrap" style={{ gap: '8px' }}>
      {options.map(opt => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`text-sm font-medium rounded-lg border transition-all ${
            value === opt.value
              ? 'text-white border-transparent shadow-sm'
              : 'text-[#8a8580] border-[#2a2a2a] hover:border-[#3a3a3a] bg-[#1e1e1e]'
          }`}
          style={{ padding: '8px 14px', ...(value === opt.value ? { backgroundColor: color } : {}) }}
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
    <div
      className={`rounded-xl ${highlight ? 'border-2' : 'border border-[#2a2a2a] bg-[#1a1a1a]'}`}
      style={{
        padding: '16px',
        ...(highlight ? { borderColor: color, backgroundColor: `${color}08` } : {}),
      }}
    >
      <p className="text-xs font-medium text-[#6a6560]" style={{ marginBottom: '4px' }}>{label}</p>
      <p className="text-2xl font-bold font-mono tracking-tight" style={highlight ? { color } : undefined}>
        <span className={highlight ? '' : 'text-[#f0ece8]'}>{value}</span>
        <span className="text-sm font-normal text-[#5a5550]" style={{ marginLeft: '4px' }}>{unit}</span>
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
      <label className="block text-sm font-medium text-[#b0aca8]" style={{ marginBottom: '8px' }}>{label}</label>
      <div className="flex items-center" style={{ gap: '8px' }}>
        <input
          type="number"
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          min={min}
          max={max}
          className="w-full rounded-lg border border-[#2a2a2a] bg-[#1e1e1e] text-[#f0ece8] text-sm focus:outline-none focus:border-[#5a5550] focus:ring-1 focus:ring-[#5a5550]"
          style={{ padding: '10px 12px' }}
        />
        <span className="text-sm text-[#5a5550] whitespace-nowrap">{unit}</span>
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
    <div className="rounded-2xl border border-[#232323] bg-[#191919] overflow-hidden">
      <div style={{ padding: '28px' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: '32px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <InputField label="Encoder Delay" value={encoder} onChange={setEncoder} unit="ms" min={0} max={5000} />
            <InputField label="Player Buffer" value={buffer} onChange={setBuffer} unit="sec" min={0} max={30} />
            <InputField label="Network Latency" value={network} onChange={setNetwork} unit="ms" min={0} max={2000} />
            <InputField label="Segment Duration" value={segment} onChange={setSegment} unit="sec" min={0} max={30} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <ResultCard label="Total Delay" value={totalSec} unit="seconds" highlight color={color} />
            <div className="grid grid-cols-2" style={{ gap: '12px' }}>
              <ResultCard label="Encoding" value={`${encoder}`} unit="ms" color={color} />
              <ResultCard label="Network" value={`${network}`} unit="ms" color={color} />
              <ResultCard label="Buffering" value={`${buffer * 1000}`} unit="ms" color={color} />
              <ResultCard label="Segmenting" value={`${segment * 1000}`} unit="ms" color={color} />
            </div>

            {/* Pipeline bar */}
            <div className="rounded-lg bg-[#1e1e1e]" style={{ padding: '16px', marginTop: '4px' }}>
              <p className="text-xs font-medium text-[#6a6560]" style={{ marginBottom: '12px' }}>Pipeline Breakdown</p>
              <div className="flex rounded-full overflow-hidden h-3">
                <div className="bg-blue-500 transition-all" style={{ width: `${(encoder / totalMs) * 100}%` }} title={`Encoding: ${encoder}ms`} />
                <div className="bg-amber-500 transition-all" style={{ width: `${(network / totalMs) * 100}%` }} title={`Network: ${network}ms`} />
                <div className="bg-violet-500 transition-all" style={{ width: `${((buffer * 1000) / totalMs) * 100}%` }} title={`Buffer: ${buffer}s`} />
                <div className="bg-emerald-500 transition-all" style={{ width: `${((segment * 1000) / totalMs) * 100}%` }} title={`Segment: ${segment}s`} />
              </div>
              <div className="flex justify-between text-[10px] text-[#5a5550]" style={{ marginTop: '8px' }}>
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
    <div className="rounded-2xl border border-[#232323] bg-[#191919] overflow-hidden">
      <div style={{ padding: '28px' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: '32px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label className="block text-sm font-medium text-[#b0aca8]" style={{ marginBottom: '8px' }}>Resolution</label>
              <ButtonGroup options={[{ label: '720p', value: '720p' }, { label: '1080p', value: '1080p' }, { label: '1440p', value: '1440p' }, { label: '4K', value: '4K' }]} value={resolution} onChange={setResolution} color={color} />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#b0aca8]" style={{ marginBottom: '8px' }}>Frame Rate</label>
              <ButtonGroup options={[{ label: '24fps', value: '24' }, { label: '25fps', value: '25' }, { label: '30fps', value: '30' }, { label: '50fps', value: '50' }, { label: '60fps', value: '60' }]} value={fps} onChange={setFps} color={color} />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#b0aca8]" style={{ marginBottom: '8px' }}>Codec</label>
              <ButtonGroup options={[{ label: 'H.264', value: 'H.264' }, { label: 'H.265/HEVC', value: 'H.265/HEVC' }, { label: 'AV1', value: 'AV1' }, { label: 'VP9', value: 'VP9' }]} value={codec} onChange={setCodec} color={color} />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#b0aca8]" style={{ marginBottom: '8px' }}>Quality</label>
              <ButtonGroup options={[{ label: 'Low', value: 'Low' }, { label: 'Medium', value: 'Medium' }, { label: 'High', value: 'High' }, { label: 'Ultra', value: 'Ultra' }]} value={quality} onChange={setQuality} color={color} />
            </div>
          </div>

          <div className="grid grid-cols-2" style={{ gap: '12px' }}>
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
    <div className="rounded-2xl border border-[#232323] bg-[#191919] overflow-hidden">
      <div style={{ padding: '28px' }}>
        <div style={{ marginBottom: '20px' }}>
          <label className="block text-sm font-medium text-[#b0aca8]" style={{ marginBottom: '8px' }}>Resolution</label>
          <ButtonGroup options={Object.keys(resolutions).map(r => ({ label: r, value: r }))} value={resolution} onChange={setResolution} color={color} />
        </div>

        <div className="relative aspect-video bg-[#1e1e1e] rounded-xl overflow-hidden">
          {/* Action safe (90%) */}
          <div className="absolute border-2 border-dashed border-amber-500/60" style={{ top: '5%', left: '5%', right: '5%', bottom: '5%' }}>
            <span className="absolute text-[10px] font-mono text-amber-500" style={{ top: '4px', left: '8px' }}>Action Safe (90%)</span>
          </div>
          {/* Title safe (80%) */}
          <div className="absolute border-2 border-blue-500/80" style={{ top: '10%', left: '10%', right: '10%', bottom: '10%' }}>
            <span className="absolute text-[10px] font-mono text-blue-400" style={{ top: '4px', left: '8px' }}>Title Safe (80%)</span>
          </div>
          {/* Center cross */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ width: '32px', height: '32px' }}>
            <div className="absolute top-1/2 left-0 right-0 h-px bg-[#5a5550]/40" />
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#5a5550]/40" />
          </div>
          {/* Resolution label */}
          <div className="absolute text-[11px] font-mono text-[#6a6560] bg-black/40 rounded" style={{ bottom: '12px', right: '12px', padding: '4px 8px' }}>
            {res.w}x{res.h}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4" style={{ gap: '12px', marginTop: '20px' }}>
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
    <div className="rounded-2xl border border-[#232323] bg-[#191919] overflow-hidden">
      <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label className="block text-sm font-medium text-[#b0aca8]" style={{ marginBottom: '8px' }}>Platform</label>
          <ButtonGroup options={Object.entries(platforms).map(([k, v]) => ({ label: v.name, value: k }))} value={platform} onChange={setPlatform} color={color} />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#b0aca8]" style={{ marginBottom: '8px' }}>Protocol</label>
          <ButtonGroup options={[{ label: 'RTMPS (Secure)', value: 'rtmps' }, { label: 'RTMP', value: 'rtmp' }]} value={protocol} onChange={setProtocol} color={color} />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#b0aca8]" style={{ marginBottom: '8px' }}>Stream Key</label>
          <input
            type="text"
            value={streamKey}
            onChange={e => setStreamKey(e.target.value)}
            placeholder="Paste your stream key here"
            className="w-full rounded-lg border border-[#2a2a2a] bg-[#1e1e1e] text-[#f0ece8] text-sm focus:outline-none focus:border-[#5a5550] focus:ring-1 focus:ring-[#5a5550] font-mono"
            style={{ padding: '10px 12px' }}
          />
        </div>

        <div className="rounded-xl bg-[#1a1a1a] border border-[#2a2a2a]" style={{ padding: '16px' }}>
          <p className="text-xs font-medium text-[#6a6560]" style={{ marginBottom: '8px' }}>Server URL</p>
          <p className="font-mono text-sm text-[#f0ece8] break-all">{url || 'Enter custom URL'}</p>
        </div>

        {streamKey && (
          <div className="rounded-xl border-2" style={{ padding: '16px', borderColor: color, backgroundColor: `${color}08` }}>
            <p className="text-xs font-medium text-[#6a6560]" style={{ marginBottom: '8px' }}>Full Stream URL</p>
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
    <div className="rounded-2xl border border-[#232323] bg-[#191919] overflow-hidden">
      <div style={{ padding: '28px' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: '32px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <InputField label="Hours" value={hours} onChange={setHours} unit="h" min={0} max={24} />
            <InputField label="Minutes" value={minutes} onChange={setMinutes} unit="m" min={0} max={59} />
            <InputField label="Seconds" value={seconds} onChange={setSeconds} unit="s" min={0} max={59} />
          </div>

          <div className="flex items-center justify-center">
            <div className="text-center">
              <p className="text-xs font-medium text-[#5a5550] uppercase tracking-wider" style={{ marginBottom: '16px' }}>Preview</p>
              <div className="rounded-2xl bg-[#0e0e0e]" style={{ padding: '32px 40px', minWidth: '280px' }}>
                <p className="text-xs text-[#5a5550] uppercase tracking-widest" style={{ marginBottom: '12px' }}>Starting Soon</p>
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
    <div className="rounded-2xl border border-[#232323] bg-[#191919] overflow-hidden">
      <div style={{ padding: '28px' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: '32px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label className="block text-sm font-medium text-[#b0aca8]" style={{ marginBottom: '8px' }}>Name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full rounded-lg border border-[#2a2a2a] bg-[#1e1e1e] text-[#f0ece8] text-sm focus:outline-none focus:border-[#5a5550] focus:ring-1 focus:ring-[#5a5550]" style={{ padding: '10px 12px' }} />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#b0aca8]" style={{ marginBottom: '8px' }}>Title / Role</label>
              <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full rounded-lg border border-[#2a2a2a] bg-[#1e1e1e] text-[#f0ece8] text-sm focus:outline-none focus:border-[#5a5550] focus:ring-1 focus:ring-[#5a5550]" style={{ padding: '10px 12px' }} />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#b0aca8]" style={{ marginBottom: '8px' }}>Accent Color</label>
              <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="rounded-lg border border-[#2a2a2a] cursor-pointer" style={{ width: '48px', height: '40px' }} />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#b0aca8]" style={{ marginBottom: '8px' }}>Style</label>
              <ButtonGroup options={[{ label: 'Modern', value: 'modern' }, { label: 'Classic', value: 'classic' }, { label: 'Minimal', value: 'minimal' }]} value={style} onChange={setStyle} color={color} />
            </div>
          </div>

          {/* Preview */}
          <div className="flex items-end justify-center">
            <div className="relative w-full aspect-video bg-[#0e0e0e] rounded-xl overflow-hidden">
              <div className="absolute bottom-0 left-0 right-0" style={{ padding: '24px' }}>
                {style === 'modern' && (
                  <div className="flex items-stretch max-w-xs" style={{ gap: '0' }}>
                    <div className="rounded-l-lg" style={{ width: '4px', backgroundColor: bgColor }} />
                    <div className="bg-black/80 backdrop-blur-sm rounded-r-lg" style={{ padding: '12px 16px' }}>
                      <p className="text-white font-bold text-sm">{name}</p>
                      <p className="text-[#6a6560] text-xs">{title}</p>
                    </div>
                  </div>
                )}
                {style === 'classic' && (
                  <div className="max-w-xs">
                    <div className="text-white font-bold text-sm" style={{ padding: '10px 16px', backgroundColor: bgColor }}>{name}</div>
                    <div className="bg-[#1e1e1e] text-[#8a8580] text-xs" style={{ padding: '8px 16px' }}>{title}</div>
                  </div>
                )}
                {style === 'minimal' && (
                  <div className="max-w-xs bg-white/10 backdrop-blur-sm rounded-lg border-l-2" style={{ borderColor: bgColor, padding: '12px 16px' }}>
                    <p className="text-white font-medium text-sm">{name}</p>
                    <p className="text-[#6a6560] text-xs">{title}</p>
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
    <div className="rounded-2xl border border-[#232323] bg-[#191919] overflow-hidden">
      <div style={{ padding: '28px' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: '32px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <InputField label="Distance" value={distance} onChange={setDistance} unit={unit} min={0} max={10000} />
            <div>
              <label className="block text-sm font-medium text-[#b0aca8]" style={{ marginBottom: '8px' }}>Unit</label>
              <ButtonGroup options={[{ label: 'Feet', value: 'feet' }, { label: 'Meters', value: 'meters' }]} value={unit} onChange={setUnit} color={color} />
            </div>
            <InputField label="Temperature" value={temp} onChange={setTemp} unit={unit === 'feet' ? '°F' : '°C'} min={-40} max={130} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
    <div className="rounded-2xl border border-[#232323] bg-[#191919] overflow-hidden">
      <div style={{ padding: '28px' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: '32px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <InputField label="Width" value={width} onChange={setWidth} unit="px" min={1} max={15360} />
            <InputField label="Height" value={height} onChange={setHeight} unit="px" min={1} max={8640} />

            <div>
              <label className="block text-sm font-medium text-[#b0aca8]" style={{ marginBottom: '8px' }}>Quick Presets</label>
              <div className="flex flex-wrap" style={{ gap: '8px' }}>
                {[
                  { label: '720p', w: 1280, h: 720 },
                  { label: '1080p', w: 1920, h: 1080 },
                  { label: '1440p', w: 2560, h: 1440 },
                  { label: '4K', w: 3840, h: 2160 },
                  { label: '4:3', w: 1440, h: 1080 },
                  { label: '21:9', w: 2560, h: 1080 },
                ].map(p => (
                  <button
                    key={p.label}
                    onClick={() => { setWidth(p.w); setHeight(p.h); }}
                    className="text-xs font-medium rounded-lg border border-[#2a2a2a] text-[#8a8580] hover:border-[#3a3a3a] bg-[#1e1e1e] transition-colors"
                    style={{ padding: '6px 12px' }}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <ResultCard label="Aspect Ratio" value={`${ratioW}:${ratioH}`} unit="" highlight color={color} />
            <div className="grid grid-cols-2" style={{ gap: '12px' }}>
              <ResultCard label="Total Pixels" value={totalPixels.toLocaleString()} unit="px" color={color} />
              <ResultCard label="Megapixels" value={megapixels} unit="MP" color={color} />
            </div>

            {/* Visual ratio */}
            <div className="rounded-xl bg-[#1a1a1a]" style={{ padding: '16px' }}>
              <p className="text-xs font-medium text-[#6a6560]" style={{ marginBottom: '12px' }}>Visual Ratio</p>
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
    <div className="rounded-2xl border border-[#232323] bg-[#191919] overflow-hidden">
      <div style={{ padding: '28px' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: '32px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label className="block text-sm font-medium text-[#b0aca8]" style={{ marginBottom: '8px' }}>Cable Type</label>
              <ButtonGroup options={[
                { label: 'HDMI', value: 'hdmi' },
                { label: 'SDI', value: 'sdi' },
                { label: 'USB', value: 'usb' },
                { label: 'Cat6/HDBaseT', value: 'cat6' },
                { label: 'Fiber', value: 'fiber' },
              ]} value={cableType} onChange={setCableType} color={color} />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#b0aca8]" style={{ marginBottom: '8px' }}>Signal Resolution</label>
              <ButtonGroup options={[
                { label: '1080p30', value: '1080p30' },
                { label: '1080p60', value: '1080p60' },
                { label: '4K30', value: '4K30' },
                { label: '4K60', value: '4K60' },
              ]} value={resolution} onChange={setResolution} color={color} />
            </div>
            <InputField label="Planned Distance" value={distance} onChange={setDistance} unit="ft" min={1} max={5000} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className={`rounded-xl border-2 ${isWithinLimit ? 'border-emerald-500 bg-emerald-500/5' : 'border-red-500 bg-red-500/5'}`} style={{ padding: '16px' }}>
              <p className="text-xs font-medium text-[#6a6560]" style={{ marginBottom: '4px' }}>Status</p>
              <p className={`text-lg font-bold ${isWithinLimit ? 'text-emerald-400' : 'text-red-400'}`}>
                {isWithinLimit ? 'Within safe limit' : 'Exceeds maximum distance'}
              </p>
            </div>
            <ResultCard label="Maximum Distance" value={`${maxDist}`} unit="ft" highlight color={color} />
            <ResultCard label="Your Distance" value={`${distance}`} unit="ft" color={color} />

            {/* Progress bar */}
            <div className="rounded-xl bg-[#1a1a1a]" style={{ padding: '16px' }}>
              <div className="flex justify-between text-xs text-[#5a5550]" style={{ marginBottom: '8px' }}>
                <span>0 ft</span>
                <span>{maxDist} ft max</span>
              </div>
              <div className="w-full h-3 bg-[#2a2a2a] rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${isWithinLimit ? 'bg-emerald-500' : 'bg-red-500'}`}
                  style={{ width: `${percentUsed}%` }}
                />
              </div>
            </div>

            {!isWithinLimit && (
              <div className="rounded-xl bg-amber-950/20 border border-amber-800" style={{ padding: '16px' }}>
                <p className="text-xs font-medium text-amber-400" style={{ marginBottom: '4px' }}>Recommendation</p>
                <p className="text-sm text-amber-400/80">
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
    <div className="rounded-2xl border border-[#232323] bg-[#191919] overflow-hidden">
      <div style={{ padding: '28px' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: '32px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <InputField label="Horizontal Dispersion" value={hAngle} onChange={setHAngle} unit="deg" min={10} max={180} />
            <InputField label="Vertical Dispersion" value={vAngle} onChange={setVAngle} unit="deg" min={10} max={180} />
            <InputField label="Throw Distance" value={throwDist} onChange={setThrowDist} unit="ft" min={1} max={500} />
            <InputField label="Sensitivity (1W/1m)" value={sensitivity} onChange={setSensitivity} unit="dB SPL" min={80} max={120} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <ResultCard label="Coverage Width" value={coverageWidth.toFixed(1)} unit="ft" highlight color={color} />
            <div className="grid grid-cols-2" style={{ gap: '12px' }}>
              <ResultCard label="Coverage Height" value={coverageHeight.toFixed(1)} unit="ft" color={color} />
              <ResultCard label="Coverage Area" value={coverageArea.toFixed(0)} unit="sq ft" color={color} />
            </div>
            <ResultCard label="SPL at Distance" value={splAtDist.toFixed(1)} unit="dB" color={color} />

            {/* Visual coverage */}
            <div className="rounded-xl bg-[#1a1a1a]" style={{ padding: '16px' }}>
              <p className="text-xs font-medium text-[#6a6560]" style={{ marginBottom: '12px' }}>Coverage Pattern</p>
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
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full" style={{ width: '12px', height: '12px', backgroundColor: color }} />
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
    default: return <div className="text-center text-[#5a5550]" style={{ padding: '32px' }}>Calculator coming soon</div>;
  }
}
