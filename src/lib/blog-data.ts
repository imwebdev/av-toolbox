export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  toolSlug: string;
  category: string;
  publishedAt: string;
  readTime: string;
  author: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'ultimate-guide-streaming-bitrate',
    title: 'The Ultimate Guide to Streaming Bitrate in 2026',
    excerpt: 'Everything you need to know about choosing the right bitrate for your live stream, from codec selection to platform requirements.',
    content: `Choosing the right bitrate is one of the most impactful decisions you'll make when setting up a live stream. Too low, and your video looks pixelated. Too high, and your stream drops frames or buffers for viewers on slower connections.

## Understanding Bitrate Fundamentals

Bitrate measures how much data is transmitted per second, typically expressed in kilobits per second (kbps) or megabits per second (Mbps). For video streaming, this directly correlates with visual quality — more data means more detail in each frame.

### The Bitrate-Quality Relationship

The relationship between bitrate and quality isn't linear. Doubling your bitrate doesn't double your perceived quality. There's a point of diminishing returns where additional bitrate provides minimal visual improvement. This point varies by resolution, codec, and content type.

**Static content** (talking head, presentation slides) needs far less bitrate than **dynamic content** (sports, gaming, fast-paced action). A 1080p talking-head stream might look great at 3,500 kbps, while a fast-paced game at the same resolution might need 6,000+ kbps.

## Codec Comparison: H.264 vs H.265 vs AV1

### H.264 (AVC)
The most widely supported codec. Every device, browser, and platform supports H.264 playback. However, it's the least efficient — you need more bitrate to achieve the same quality as newer codecs.

**Recommended bitrates for H.264:**
- 720p30: 2,500-4,000 kbps
- 1080p30: 4,500-6,000 kbps
- 1080p60: 6,000-9,000 kbps
- 4K30: 13,000-20,000 kbps

### H.265 (HEVC)
Roughly 40% more efficient than H.264, meaning you get the same quality at lower bitrates. Support is growing but not universal — check your platform and audience devices.

### AV1
The newest and most efficient codec, achieving similar quality to H.264 at roughly half the bitrate. YouTube and Twitch have added AV1 support, but encoding requires significantly more CPU power.

## Platform-Specific Requirements

Each streaming platform has its own bitrate limits and recommendations:

- **YouTube Live**: Max 51 Mbps for 4K, recommends 4.5-9 Mbps for 1080p
- **Twitch**: Max 6 Mbps (8.5 for Partners), recommends 4.5-6 Mbps for 1080p
- **Facebook Live**: Max 4 Mbps, recommends 3-4 Mbps for 1080p
- **LinkedIn Live**: Recommends 3-6 Mbps for 1080p

## Practical Tips

1. **Always test before going live** — run a test stream and check the output quality
2. **Monitor your upload bandwidth** — your stream bitrate should be no more than 70% of your available upload speed
3. **Use our Bitrate Calculator** to get specific recommendations for your setup
4. **Consider your audience** — if viewers are primarily on mobile, lower bitrates with good encoding can look better than high bitrates that cause buffering`,
    toolSlug: 'bitrate-calculator',
    category: 'Streaming',
    publishedAt: '2026-02-20',
    readTime: '8 min',
    author: 'AV Toolbox',
    tags: ['bitrate', 'streaming', 'encoding', 'OBS', 'H.264', 'H.265', 'AV1'],
  },
  {
    slug: 'reduce-stream-latency',
    title: 'How to Reduce Stream Latency: A Complete Guide',
    excerpt: 'Learn practical techniques to minimize latency in your live streaming pipeline, from encoder settings to CDN optimization.',
    content: `Latency — the delay between real life and what viewers see — is the enemy of interactive streaming. Whether you're running a live auction, hosting Q&A, or streaming competitive gaming, lower latency means better audience engagement.

## What Causes Stream Latency?

Every stage of the streaming pipeline adds delay:

### 1. Capture and Encoding (50-500ms)
Your camera captures a frame, the capture card digitizes it, and the encoder compresses it. Hardware encoders (NVENC, QuickSync) are faster (30-100ms). Software encoders (x264) on slower presets can add 200-500ms.

### 2. Upload and Ingest (50-200ms)
The encoded data travels from your machine to the streaming platform's ingest server. Geographic distance matters — streaming to a server on the other side of the world adds hundreds of milliseconds.

### 3. Transcoding (100-500ms)
The platform transcodes your stream into multiple quality levels for adaptive bitrate. This step is invisible to you but adds significant delay.

### 4. CDN Distribution (50-200ms)
The transcoded stream is distributed across the platform's CDN to edge servers near your viewers.

### 5. Player Buffering (1,000-10,000ms)
The viewer's player downloads and buffers several seconds of video before starting playback. This is usually the largest single contributor to latency.

## Practical Latency Reduction Techniques

### Encoder Settings
- Use hardware encoding (NVENC/QuickSync) over software encoding
- Use the fastest encoder preset that still looks acceptable
- Reduce keyframe interval to 1-2 seconds (standard is often 2-4)

### Protocol Selection
- **WebRTC**: Sub-second latency, but complex setup and limited viewer scale
- **SRT**: 0.5-2 second latency, great for contribution links
- **Low-Latency HLS**: 2-5 seconds, supported by YouTube and Twitch
- **Standard HLS**: 10-30 seconds, most reliable and compatible

### Platform-Specific Options
- **YouTube**: Enable "Ultra low-latency" in Live Control Room (adds ~3-5s delay)
- **Twitch**: Low-latency mode is on by default (~2-5s for most viewers)
- **Custom**: Use WHIP/WHEP or WebRTC for sub-second delivery

Use our **Stream Delay Calculator** to estimate your total pipeline latency and identify the biggest bottlenecks.`,
    toolSlug: 'stream-delay-calculator',
    category: 'Streaming',
    publishedAt: '2026-02-18',
    readTime: '6 min',
    author: 'AV Toolbox',
    tags: ['latency', 'delay', 'streaming', 'WebRTC', 'HLS', 'SRT', 'low latency'],
  },
  {
    slug: 'broadcast-safe-areas-explained',
    title: 'Broadcast Safe Areas Explained: Title-Safe vs Action-Safe',
    excerpt: 'Why safe areas matter in 2026, how they work, and how to ensure your graphics look perfect on every screen.',
    content: `If you've ever had a viewer complain that your lower third text was cut off on their TV, you've encountered the safe area problem. Despite modern displays reducing overscan, safe areas remain critical for professional broadcast and streaming.

## What Are Safe Areas?

Safe areas are invisible boundaries within the video frame that define where content should be placed to ensure visibility on all displays.

### Action-Safe (90% of frame)
The outer boundary. Essential action, talent, and important visual elements should stay within this zone. Content outside action-safe may be cropped on some displays.

### Title-Safe (80% of frame)
The inner boundary. All text, logos, bug graphics, and critical information must stay within this zone. This ensures readability on even the worst overscan displays.

## Why Safe Areas Still Matter in 2026

"Modern TVs don't overscan anymore!" — this is partially true. Most new 4K TVs display the full frame. But:

1. **Millions of older TVs are still in use** — CRT and early LCD TVs crop 5-10%
2. **Some smart TVs still overscan** — certain display modes or zoom settings crop the edges
3. **Mobile viewing crops differently** — apps may letterbox or crop on unusual aspect ratios
4. **Broadcast standards require it** — FCC and international standards mandate safe area compliance
5. **Professional habit** — respecting safe areas makes your content look intentional and professional

## Practical Safe Area Guidelines

### Lower Thirds
Always position lower thirds within the title-safe zone. Ensure text has at least 10px padding from the title-safe boundary for comfortable readability.

### Score Bugs and Tickers
Position persistent on-screen elements like score bugs within action-safe, with text content in title-safe.

### Full-Screen Graphics
For full-screen graphics (scoreboards, stats), keep all text within title-safe and allow background graphics to extend to action-safe or full frame.

Use our **Safe Area Overlay** tool to visualize these zones at your working resolution.`,
    toolSlug: 'safe-area-overlay',
    category: 'Production',
    publishedAt: '2026-02-15',
    readTime: '5 min',
    author: 'AV Toolbox',
    tags: ['safe area', 'broadcast', 'title safe', 'action safe', 'graphics', 'lower thirds'],
  },
  {
    slug: 'rtmp-rtmps-streaming-guide',
    title: 'RTMP vs RTMPS: Which Protocol Should You Use?',
    excerpt: 'A breakdown of RTMP and RTMPS streaming protocols, when to use each, and how to configure them correctly.',
    content: `RTMP (Real-Time Messaging Protocol) has been the backbone of live streaming for over two decades. Originally developed by Adobe for Flash, it has survived Flash's demise to become the standard protocol for stream contribution.

## RTMP: The Basics

RTMP operates over TCP port 1935 and provides low-latency delivery from encoder to server. It supports:
- Video: H.264 (most common), H.265 (limited support)
- Audio: AAC, MP3
- Data: Metadata, cue points

### Why RTMP Persists

Despite being "old" technology, RTMP remains the standard because:
1. **Universal encoder support** — Every streaming app supports RTMP output
2. **Universal platform support** — YouTube, Twitch, Facebook all accept RTMP ingest
3. **Low and predictable latency** — RTMP contribution adds minimal delay
4. **Simple configuration** — Just a URL and a stream key

## RTMPS: Encrypted RTMP

RTMPS wraps RTMP in TLS encryption, similar to how HTTPS wraps HTTP. It uses port 443 instead of 1935.

### When to Use RTMPS
- **Always**, if your encoder and platform support it
- Required by Facebook, YouTube (default), and most platforms since 2023
- Essential when streaming from public WiFi or unsecured networks
- Required for HIPAA, FERPA, or other compliance scenarios

## Configuration Tips

### URL Format
- RTMP: \`rtmp://live.example.com/app/stream-key\`
- RTMPS: \`rtmps://live.example.com:443/app/stream-key\`

### Common Mistakes
1. Using \`rtmp://\` when the platform requires \`rtmps://\`
2. Including the stream key in both the URL and key field (double-key)
3. Wrong server region — use the closest ingest server
4. Firewall blocking port 1935 (RTMP) or 443 (RTMPS)

Use our **RTMP URL Builder** to construct correctly formatted URLs for all major platforms.`,
    toolSlug: 'rtmp-url-builder',
    category: 'Streaming',
    publishedAt: '2026-02-12',
    readTime: '5 min',
    author: 'AV Toolbox',
    tags: ['RTMP', 'RTMPS', 'streaming protocol', 'ingest', 'encoding'],
  },
  {
    slug: 'speaker-delay-alignment-guide',
    title: 'Speaker Delay Alignment: The Complete Setup Guide',
    excerpt: 'How to properly time-align speakers in any venue using delay calculations and measurement techniques.',
    content: `Proper speaker delay alignment is the difference between a great-sounding venue and one where the audience hears an echo, flanging, or hollow sound. The physics is simple: sound travels at about 1 foot per millisecond. The practice requires precision.

## Why Speaker Alignment Matters

When two speakers reproduce the same sound at different times, the result is comb filtering — some frequencies cancel out and others reinforce, creating a hollow, phasey sound. This happens whenever:

- Delay speakers are closer to the audience than the main speakers
- Multiple speakers on a stage aren't time-aligned
- A subwoofer isn't aligned with the tops

## The Haas Effect

The human brain localizes sound based on the first arrival. If a delay speaker's sound arrives before the main speaker's sound, the audience perceives the sound as coming from the delay speaker — not the stage. This destroys the "source illusion" and makes the sound feel disconnected from the visual performance.

The Haas Effect window is approximately 1-40ms. Within this window, the brain fuses two arrivals into one perception, but the direction is set by whichever arrives first.

## Calculating Delay

### Basic Formula
Delay (ms) = Distance (feet) / 1.13

Or more precisely, accounting for temperature:
Speed of sound (ft/s) = 1052 + (1.106 × Temperature°F)

### Example
Main speakers to delay speakers: 80 feet
Temperature: 72°F
Speed of sound: 1052 + (1.106 × 72) = 1131.6 ft/s
Delay: 80 / 1.1316 = 70.7ms

Add 5-15ms additional delay to ensure the main speaker sound arrives first (preserving the Haas Effect).

## Measurement vs Calculation

Calculation gives you a starting point. Measurement gives you precision:

1. **Calculate** the expected delay using our Audio Delay Calculator
2. **Measure** using measurement software (SMAART, REW, SysTune)
3. **Listen** — walk the venue and verify the alignment sounds right

Use our **Audio Delay Calculator** to get your starting delay values, then fine-tune with measurement tools.`,
    toolSlug: 'audio-delay-calculator',
    category: 'AV Engineering',
    publishedAt: '2026-02-10',
    readTime: '7 min',
    author: 'AV Toolbox',
    tags: ['audio', 'delay', 'speaker alignment', 'Haas effect', 'PA system', 'venue'],
  },
  {
    slug: 'hdmi-sdi-cable-guide',
    title: 'HDMI vs SDI vs Fiber: Choosing the Right AV Cable',
    excerpt: 'A practical comparison of AV cable types for different distances, resolutions, and professional applications.',
    content: `Choosing the right cable type for your AV installation is a decision that affects reliability, cost, and future-proofing. Here's what you need to know about each option.

## HDMI: The Consumer Standard

HDMI dominates the consumer market and is increasingly common in professional settings.

### Pros
- Universal device support (cameras, computers, displays)
- Supports audio and video in one cable
- HDMI 2.1 supports up to 8K60 or 4K120

### Cons
- Limited passive cable length (15m for 1080p, 5m for 4K)
- Connector not designed for repeated insertion
- No locking mechanism (cables can pull out)
- Inconsistent cable quality across manufacturers

### Maximum Distances
- 1080p passive: 15m (50ft)
- 4K60 passive: 5m (16ft)
- Active optical: 100m+ (330ft+)

## SDI: The Broadcast Standard

SDI (Serial Digital Interface) is the professional broadcast standard.

### Pros
- Locking BNC connectors (no accidental disconnection)
- Long cable runs with standard coax (100m+ for HD)
- Extremely reliable — no handshaking or HDCP issues
- Signal re-clocking at each device

### Cons
- Requires conversion for consumer devices
- Single direction per cable
- Separate audio embedding required (or use SDI embedded audio)

### Maximum Distances (Belden 1694A)
- SD-SDI: 300m (1000ft)
- HD-SDI (1080i): 100m (330ft)
- 3G-SDI (1080p60): 80m (260ft)
- 12G-SDI (4K60): 50m (165ft)

## Fiber Optic: The Future-Proof Choice

### Pros
- Extreme distance capability (kilometers)
- Immune to electromagnetic interference
- Very thin and lightweight cables
- Massive bandwidth headroom

### Cons
- Higher cost per endpoint (converters/SFPs)
- More fragile than copper cables
- Requires careful termination

Use our **Cable Length Estimator** to determine if your planned cable runs are within safe limits.`,
    toolSlug: 'cable-length-estimator',
    category: 'AV Engineering',
    publishedAt: '2026-02-08',
    readTime: '6 min',
    author: 'AV Toolbox',
    tags: ['HDMI', 'SDI', 'fiber', 'cable', 'AV installation', 'broadcast'],
  },
  {
    slug: 'lower-thirds-design-principles',
    title: 'Designing Professional Lower Thirds: Principles and Best Practices',
    excerpt: 'Design principles for creating lower thirds that are readable, branded, and broadcast-ready.',
    content: `A well-designed lower third does three things instantly: identifies the speaker, reinforces the brand, and stays out of the way of the content. Here's how to achieve all three.

## Anatomy of a Great Lower Third

### Primary Line
The most important text — usually a name. This should be:
- Large enough to read on a phone screen
- High contrast against its background
- In a clean, readable typeface (avoid decorative fonts)

### Secondary Line
Supporting information — title, company, location. This should be:
- Noticeably smaller than the primary line (70-80% size)
- Slightly lower contrast or different weight
- Complementary information, not redundant

### Background Element
The graphic element that contains the text:
- Semi-transparent or solid with brand colors
- Clean edges (rounded corners or sharp — pick one style and commit)
- Enough padding that text doesn't feel cramped

## Animation Principles

### Entry Animation
- Slide from left is the most natural (matches reading direction)
- Keep duration between 300-500ms — fast enough to not distract, slow enough to be smooth
- Text should appear slightly after the background element (50-100ms delay)

### Hold Duration
- Minimum 3 seconds on screen
- 5-7 seconds is ideal for most contexts
- Longer for complex titles or unfamiliar names

### Exit Animation
- Mirror the entry direction (slide out the way it came in)
- Slightly faster than entry (200-400ms)
- Don't over-animate the exit — the audience should focus on the content, not the departing graphic

## Common Mistakes

1. **Too much text** — If it takes more than 2 seconds to read, it's too long
2. **Poor contrast** — White text on light backgrounds, thin fonts on busy video
3. **Inconsistent styling** — Different lower thirds for different segments looks unprofessional
4. **Blocking important content** — Check that the lower third doesn't obscure other on-screen elements
5. **Wrong safe area** — Always place lower thirds within the title-safe zone

Try designing your own lower thirds with our **Lower Third Builder** tool.`,
    toolSlug: 'lower-third-builder',
    category: 'Production',
    publishedAt: '2026-02-05',
    readTime: '5 min',
    author: 'AV Toolbox',
    tags: ['lower thirds', 'design', 'broadcast graphics', 'animation', 'branding'],
  },
  {
    slug: 'video-aspect-ratios-complete-guide',
    title: 'Video Aspect Ratios: A Complete Guide for Creators',
    excerpt: 'From 4:3 to 21:9 and everything in between — understanding when and why to use each aspect ratio.',
    content: `Aspect ratio determines the shape of your frame, and choosing the right one affects how your content looks, feels, and performs across different platforms.

## Common Aspect Ratios

### 16:9 (1.78:1) — The Standard
The universal standard for HD and 4K video, web content, and modern television.
- **Resolutions**: 1280x720, 1920x1080, 2560x1440, 3840x2160
- **Use when**: Streaming, YouTube, broadcast TV, most video content
- **Feel**: Balanced, natural, familiar

### 9:16 (0.56:1) — Vertical Video
The standard for mobile-first content.
- **Resolutions**: 1080x1920, 720x1280
- **Use when**: TikTok, Instagram Reels, YouTube Shorts, Stories
- **Feel**: Intimate, personal, mobile-native

### 4:3 (1.33:1) — Classic Television
The original TV standard, now seeing a creative revival.
- **Resolutions**: 1440x1080, 640x480
- **Use when**: Retro aesthetic, some documentary styles, legacy systems
- **Feel**: Nostalgic, intimate, academic

### 2.39:1 (Anamorphic Widescreen)
The cinematic widescreen format used in major motion pictures.
- **Resolutions**: 2560x1070, 3840x1607
- **Use when**: Cinematic content, trailers, film-style production
- **Feel**: Epic, cinematic, immersive

### 1:1 (Square)
Equal width and height.
- **Resolutions**: 1080x1080, 720x720
- **Use when**: Instagram posts, social media thumbnails
- **Feel**: Symmetric, focused, social-media-native

## Platform-Specific Requirements

| Platform | Preferred Ratio | Notes |
|----------|----------------|-------|
| YouTube | 16:9 | Will letterbox other ratios |
| TikTok | 9:16 | Optimized for vertical |
| Instagram Feed | 1:1 or 4:5 | 4:5 gets more screen space |
| Instagram Reels | 9:16 | Full-screen vertical |
| Twitter/X | 16:9 | Auto-crops in timeline |
| LinkedIn | 16:9 or 1:1 | Both work well |

Use our **Aspect Ratio Calculator** to convert dimensions between any aspect ratio.`,
    toolSlug: 'aspect-ratio-calculator',
    category: 'Production',
    publishedAt: '2026-02-03',
    readTime: '6 min',
    author: 'AV Toolbox',
    tags: ['aspect ratio', 'video', 'resolution', '16:9', 'vertical video', 'cinema'],
  },
  {
    slug: 'countdown-timers-for-live-events',
    title: 'Using Countdown Timers in Live Events: A Production Guide',
    excerpt: 'How to effectively use countdown timers in your live production workflow, from pre-show to breaks.',
    content: `Countdown timers are simple but powerful production tools. They set viewer expectations, build anticipation, and keep your show running on schedule.

## When to Use Countdown Timers

### Pre-Show Countdown
The most common use. A "Starting Soon" screen with a countdown tells viewers:
- The show is real and happening
- Exactly when it starts
- They should stay on the page

Best practice: Start the countdown 5-15 minutes before showtime. Less than 5 minutes doesn't build enough audience. More than 15 minutes loses people.

### Break Timers
During extended streams, use a countdown during breaks:
- "Back in 5:00" reassures viewers you're returning
- Keeps viewers engaged during bio breaks, scene changes, or technical issues
- Professional sports broadcasts use break timers consistently

### Segment Timers
For structured shows with timed segments:
- Panel discussions with equal speaking time
- Speed rounds in game shows
- Timed challenges in creative streams

### Event Countdowns
For major events, a landing page with a countdown builds anticipation:
- Product launches
- Conference keynotes
- Premieres and special broadcasts

## Technical Implementation

### In OBS/Streaming Software
1. Create the countdown using our **Countdown Generator**
2. Add a Browser Source in OBS pointed at the countdown URL
3. Set dimensions to match your canvas (1920x1080 or your resolution)
4. Layer it with your pre-show scene

### Best Practices
- **Test the timer before going live** — nothing worse than a countdown that doesn't work
- **Account for early arrivals** — have something on screen before the countdown starts
- **Have a transition plan** — what happens at 0:00? Auto-switch to your live scene
- **Consider accessibility** — large, high-contrast numbers that are readable at any size

Build your own timer with our **Countdown Generator** — customizable colors, fonts, and behavior.`,
    toolSlug: 'countdown-generator',
    category: 'Production',
    publishedAt: '2026-01-28',
    readTime: '5 min',
    author: 'AV Toolbox',
    tags: ['countdown', 'timer', 'live events', 'production', 'OBS', 'pre-show'],
  },
  {
    slug: 'pa-speaker-coverage-design',
    title: 'PA Speaker Coverage Design: Planning Sound for Any Venue',
    excerpt: 'Fundamentals of speaker coverage design for venues of all sizes, from conference rooms to arenas.',
    content: `Good sound coverage means every seat in the venue gets clear, intelligible audio at an appropriate level. Achieving this requires understanding speaker physics, venue acoustics, and systematic planning.

## Coverage Fundamentals

### Dispersion Pattern
Every speaker has a coverage pattern defined by its dispersion angles:
- **Horizontal dispersion**: How wide the sound spreads left-to-right (typically 60-120°)
- **Vertical dispersion**: How the sound spreads up-and-down (typically 40-60°)

The coverage angle is measured at the -6dB point — where the sound level drops by half compared to directly in front of the speaker.

### The Inverse Square Law
In an open field, sound level drops by 6dB for every doubling of distance:
- 1m: 100 dB
- 2m: 94 dB
- 4m: 88 dB
- 8m: 82 dB

Indoors, room reflections slow this decay to roughly 3-4dB per doubling, but the principle still governs coverage calculations.

## Design Process

### Step 1: Measure the Venue
You need three numbers: length, width, and ceiling height (or speaker mounting height).

### Step 2: Define Requirements
- What SPL level do you need at the listener position? (Speech: 85dB, Music: 95-105dB)
- What's the most distant listener from the nearest speaker?
- Are there any obstacle or structural constraints?

### Step 3: Calculate Coverage
Using speaker dispersion angles and mounting height:
- Coverage width at listener distance = 2 × (distance × tan(horizontal angle/2))
- Coverage depth similarly calculated from vertical angle
- Number of speakers needed = venue width / coverage width per speaker

### Step 4: Handle Overlaps and Gaps
Where two speakers overlap, the combined level increases by up to 6dB. Plan overlap zones to be narrow and avoid creating hot spots. Use our **Speaker Coverage Calculator** to visualize coverage patterns.

### Step 5: Time Align
Any speaker more than 10 feet from the nearest speaker needs delay alignment. Use our **Audio Delay Calculator** to calculate the correct delay values.

## Common Venue Types

### Conference Room (up to 50 people)
- 2-4 ceiling speakers
- 70dB SPL at listener (speech only)
- Simple zone coverage, no delay needed

### Church/Auditorium (200-1000 seats)
- Main L/R speakers + delay fills
- 90-95dB SPL target
- Delay alignment for fill speakers

### Arena (1000+ seats)
- Main arrays + extensive delay and fill systems
- 100-105dB SPL target
- Complex delay structure, multiple zones

Start your design with our **Speaker Coverage Calculator** for quick coverage estimates.`,
    toolSlug: 'speaker-coverage-calculator',
    category: 'AV Engineering',
    publishedAt: '2026-01-25',
    readTime: '8 min',
    author: 'AV Toolbox',
    tags: ['speaker coverage', 'PA design', 'venue acoustics', 'sound system', 'audio engineering'],
  },
];

export function getBlogPostsByTool(toolSlug: string): BlogPost[] {
  return blogPosts.filter(p => p.toolSlug === toolSlug);
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(p => p.slug === slug);
}

export function getAllBlogPosts(): BlogPost[] {
  return [...blogPosts].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}
