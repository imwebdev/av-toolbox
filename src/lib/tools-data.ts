import {
  Timer,
  Activity,
  Scan,
  Radio,
  Clock,
  Subtitles,
  AudioLines,
  RectangleHorizontal,
  Cable,
  Volume2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface ToolData {
  slug: string;
  name: string;
  shortName: string;
  icon: LucideIcon;
  description: string;
  longDescription: string;
  category: "Core Streaming" | "Production & Broadcast" | "AV Engineering";
  accentColor: string;
  accentBg: string;
  keywords: string[];
}

export const TOOLS: ToolData[] = [
  {
    slug: "stream-delay-calculator",
    name: "Stream Delay Calculator",
    shortName: "Stream Delay",
    icon: Timer,
    description:
      "Calculate total end-to-end latency from your source to the viewer.",
    longDescription:
      "The Stream Delay Calculator helps you estimate the total glass-to-glass latency in your live streaming pipeline. It accounts for encoding delay, network transit time, player buffering, and segment duration to give you a complete picture of your viewer experience. Use this tool when setting up a new stream and you need to coordinate on-screen elements with real-time interaction, such as live Q&A, auction countdowns, or sports commentary. Understanding your total delay is critical for planning interactive segments and managing viewer expectations. The calculator breaks down each stage of the pipeline so you can identify bottlenecks and optimize individual components. Lower encoder presets reduce encoding delay at the cost of quality, while shorter segment durations reduce latency but may increase buffering on unstable connections.",
    category: "Core Streaming",
    accentColor: "text-cyan-600",
    accentBg: "bg-cyan-50",
    keywords: [
      "stream delay",
      "latency calculator",
      "encoding delay",
      "player buffer",
      "glass-to-glass latency",
      "live streaming latency",
    ],
  },
  {
    slug: "bitrate-calculator",
    name: "Bitrate Calculator",
    shortName: "Bitrate",
    icon: Activity,
    description:
      "Determine optimal bitrate settings for any resolution, codec, and quality level.",
    longDescription:
      "The Bitrate Calculator recommends optimal video bitrate settings based on your resolution, frame rate, codec, and desired quality level. It takes into account the efficiency differences between H.264, H.265/HEVC, AV1, and VP9 to provide accurate recommendations that prevent both under-encoding (pixelated video) and over-encoding (wasted bandwidth). Use this tool when configuring your encoder for a new stream or recording, when switching codecs, or when you need to fit within a specific bandwidth budget. The calculator is especially useful for multi-bitrate adaptive streaming setups where you need to define quality ladder rungs. The recommendations are based on industry-standard bits-per-pixel ratios adjusted for each codec's compression efficiency, giving you a reliable starting point that you can fine-tune based on your specific content type.",
    category: "Core Streaming",
    accentColor: "text-violet-600",
    accentBg: "bg-violet-50",
    keywords: [
      "bitrate calculator",
      "video bitrate",
      "streaming bitrate",
      "OBS bitrate",
      "encoding settings",
      "H.264 bitrate",
      "HEVC bitrate",
    ],
  },
  {
    slug: "safe-area-overlay",
    name: "Safe Area Overlay",
    shortName: "Safe Area",
    icon: Scan,
    description:
      "Visualize title-safe and action-safe zones for broadcast content.",
    longDescription:
      "The Safe Area Overlay tool helps you visualize the title-safe and action-safe regions defined by broadcast standards. These zones ensure that critical on-screen elements like lower thirds, scores, and logos remain visible across all display types, including CRTs, overscan-prone TVs, and modern flat panels with edge cropping. Use this tool when designing broadcast graphics, positioning on-screen elements, or creating templates for live production. The tool displays the standard 80% title-safe area (where text and important graphics should remain) and the 90% action-safe area (where significant visual action should stay). Even in modern production, maintaining these safe areas is essential for content that may be displayed on a variety of screens, projected in venues, or repurposed across different platforms with different aspect ratios.",
    category: "Production & Broadcast",
    accentColor: "text-amber-600",
    accentBg: "bg-amber-50",
    keywords: [
      "safe area",
      "title safe",
      "action safe",
      "broadcast safe zone",
      "graphics safe area",
      "TV safe area",
    ],
  },
  {
    slug: "rtmp-url-builder",
    name: "RTMP URL Builder",
    shortName: "RTMP Builder",
    icon: Radio,
    description:
      "Construct and validate RTMP/RTMPS ingest URLs for major platforms.",
    longDescription:
      "The RTMP URL Builder helps you construct properly formatted RTMP and RTMPS ingest URLs for popular streaming platforms. It eliminates common mistakes like incorrect server paths, missing stream keys, or protocol mismatches that can prevent your stream from connecting. Use this tool when setting up a new streaming destination in OBS, vMix, Wirecast, or any RTMP-compatible encoder. The builder supports major platforms including YouTube Live, Twitch, Facebook Live, and custom RTMP servers, providing the correct server URLs and formatting for each. It also validates your stream key format and provides a complete copy-paste-ready URL. For multi-platform streaming setups, use the builder to generate URLs for each destination to ensure consistency across your restreaming configuration.",
    category: "Production & Broadcast",
    accentColor: "text-emerald-600",
    accentBg: "bg-emerald-50",
    keywords: [
      "RTMP URL",
      "RTMP builder",
      "stream URL",
      "ingest URL",
      "OBS stream settings",
      "Twitch RTMP",
      "YouTube RTMP",
    ],
  },
  {
    slug: "countdown-generator",
    name: "Countdown Generator",
    shortName: "Countdown",
    icon: Clock,
    description:
      "Create customizable countdown timers for pre-show and live events.",
    longDescription:
      "The Countdown Generator creates professional countdown timers for pre-show holding screens, event transitions, and scheduled go-live moments. Customize the appearance, duration, and end-of-countdown behavior to match your production's visual identity. Use this tool when you need a reliable on-screen timer for your audience before a live show begins, during intermissions, or for timed segments within your broadcast. The generator produces a countdown display that can be captured as a browser source in OBS or similar software. Countdowns help set audience expectations, reduce early drop-off, and create a sense of anticipation before your content begins. The tool supports custom styling to match your brand, making it suitable for both casual streams and corporate webcasts.",
    category: "Production & Broadcast",
    accentColor: "text-rose-600",
    accentBg: "bg-rose-50",
    keywords: [
      "countdown timer",
      "stream countdown",
      "pre-show timer",
      "event countdown",
      "OBS countdown",
      "live event timer",
    ],
  },
  {
    slug: "lower-third-builder",
    name: "Lower Third Builder",
    shortName: "Lower Third",
    icon: Subtitles,
    description:
      "Design and preview animated lower-third graphics for live production.",
    longDescription:
      "The Lower Third Builder lets you design professional lower-third graphics with customizable text, colors, and animation styles. Lower thirds are the name/title bars that appear in the bottom portion of the screen to identify speakers, display topics, or show supplementary information during broadcasts. Use this tool when preparing graphics for interviews, panel discussions, news-style programs, or any production that needs to identify on-screen talent and topics. The builder provides a real-time preview of how your lower third will appear, including entrance and exit animations. You can customize the primary and secondary text, background colors, accent bars, and typography to match your production's design language. Export the design parameters for use in your preferred graphics system.",
    category: "Production & Broadcast",
    accentColor: "text-pink-600",
    accentBg: "bg-pink-50",
    keywords: [
      "lower third",
      "name bar",
      "broadcast graphics",
      "CG graphics",
      "title generator",
      "OBS lower third",
    ],
  },
  {
    slug: "audio-delay-calculator",
    name: "Audio Delay Calculator",
    shortName: "Audio Delay",
    icon: AudioLines,
    description:
      "Calculate audio propagation delay based on distance and conditions.",
    longDescription:
      "The Audio Delay Calculator determines the propagation delay of sound over a given distance, accounting for temperature-dependent variations in the speed of sound. This is essential for achieving proper lip sync in multi-camera productions and ensuring phase-coherent audio in distributed speaker systems. Use this tool when you need to time-align audio from speakers at different distances, compensate for the delay between a stage performer and their amplified sound in the audience, or calculate the offset needed for delay towers in large venue setups. The calculator uses the temperature-corrected speed of sound formula to provide accurate results across a range of environmental conditions. Understanding audio propagation delay is fundamental for any AV professional working in live sound reinforcement, broadcast audio, or installed audio systems.",
    category: "AV Engineering",
    accentColor: "text-orange-600",
    accentBg: "bg-orange-50",
    keywords: [
      "audio delay",
      "sound propagation",
      "speed of sound",
      "speaker delay",
      "lip sync",
      "audio time alignment",
    ],
  },
  {
    slug: "aspect-ratio-calculator",
    name: "Aspect Ratio Calculator",
    shortName: "Aspect Ratio",
    icon: RectangleHorizontal,
    description:
      "Convert and calculate aspect ratios, pixel dimensions, and scaling.",
    longDescription:
      "The Aspect Ratio Calculator converts between common aspect ratios and pixel dimensions, helping you plan content for different display formats. It calculates the correct width or height when scaling video while maintaining the original aspect ratio, preventing stretching or letterboxing issues. Use this tool when repurposing content across platforms with different aspect ratio requirements (16:9 for YouTube, 9:16 for TikTok/Reels, 1:1 for Instagram), when calculating custom resolution ladders for adaptive bitrate streaming, or when designing multi-screen installations that mix display sizes. The calculator supports standard broadcast ratios (16:9, 4:3), cinema ratios (2.39:1, 1.85:1), social media formats, and custom ratios. It provides both the mathematical ratio and the nearest standard resolution for practical encoder configuration.",
    category: "AV Engineering",
    accentColor: "text-sky-600",
    accentBg: "bg-sky-50",
    keywords: [
      "aspect ratio",
      "resolution calculator",
      "16:9 calculator",
      "pixel dimensions",
      "video scaling",
      "display ratio",
    ],
  },
  {
    slug: "cable-length-estimator",
    name: "Cable Length Estimator",
    shortName: "Cable Length",
    icon: Cable,
    description:
      "Estimate maximum cable runs for HDMI, SDI, USB, and other AV signals.",
    longDescription:
      "The Cable Length Estimator calculates maximum reliable cable runs for common AV signal types, factoring in cable quality, signal format, and environmental considerations. It covers HDMI, SDI (HD/3G/12G), USB, Ethernet, DisplayPort, and analog audio/video cables with their respective distance limitations. Use this tool when planning cable infrastructure for a new venue, designing a mobile production kit, or troubleshooting signal quality issues that may be distance-related. The estimator accounts for the signal degradation characteristics of each cable type and provides recommendations for when you should consider active cables, signal extenders, or fiber conversion. Understanding cable distance limitations is crucial for reliable AV installations and prevents costly on-site discoveries during setup.",
    category: "AV Engineering",
    accentColor: "text-lime-600",
    accentBg: "bg-lime-50",
    keywords: [
      "cable length",
      "HDMI distance",
      "SDI cable run",
      "maximum cable length",
      "signal distance",
      "AV cable estimator",
    ],
  },
  {
    slug: "speaker-coverage-calculator",
    name: "Speaker Coverage Calculator",
    shortName: "Speaker Coverage",
    icon: Volume2,
    description:
      "Calculate speaker coverage angles and distances for venue planning.",
    longDescription:
      "The Speaker Coverage Calculator helps you plan loudspeaker placement by computing coverage angles, throw distances, and the area covered by individual speakers or speaker arrays. It accounts for dispersion patterns and inverse-square-law level drop-off to help you achieve even coverage across your audience area. Use this tool when designing PA systems for events, calculating delay speaker positions in large venues, or planning permanent installations in houses of worship, theaters, and conference rooms. The calculator takes into account the horizontal and vertical dispersion angles of your speakers and maps the resulting coverage area at the audience plane. Proper speaker placement ensures consistent volume levels and intelligibility throughout the venue, reducing hot spots and dead zones that compromise the audience experience.",
    category: "AV Engineering",
    accentColor: "text-indigo-600",
    accentBg: "bg-indigo-50",
    keywords: [
      "speaker coverage",
      "PA system design",
      "speaker placement",
      "dispersion angle",
      "venue sound design",
      "speaker throw distance",
    ],
  },
];

export function getToolBySlug(slug: string): ToolData | undefined {
  return TOOLS.find((tool) => tool.slug === slug);
}

export function getToolsByCategory(category: ToolData["category"]): ToolData[] {
  return TOOLS.filter((tool) => tool.category === category);
}

export const CATEGORIES: ToolData["category"][] = [
  "Core Streaming",
  "Production & Broadcast",
  "AV Engineering",
];
