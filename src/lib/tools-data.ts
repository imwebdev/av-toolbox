export interface Tool {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: 'core-streaming' | 'production-broadcast' | 'av-engineering';
  categoryLabel: string;
  icon: string;
  color: string;
  features: string[];
  useCases: string[];
  keywords: string[];
  faq: { q: string; a: string }[];
  howTo: { step: number; title: string; description: string }[];
  relatedSlugs: string[];
}

export const categories = {
  'core-streaming': {
    label: 'Core Streaming',
    description: 'Essential calculators for live streaming and content delivery',
  },
  'production-broadcast': {
    label: 'Production & Broadcast',
    description: 'Professional tools for live production and broadcast workflows',
  },
  'av-engineering': {
    label: 'AV Engineering',
    description: 'Technical calculators for audio-visual system design',
  },
} as const;

export const tools: Tool[] = [
  {
    slug: 'stream-delay-calculator',
    name: 'Stream Delay Calculator',
    tagline: 'Calculate total end-to-end latency from your source to the viewer',
    description: 'The Stream Delay Calculator helps you estimate the total glass-to-glass latency in your live streaming pipeline. It accounts for encoding delay, network transit time, player buffering, and segment duration to give you a complete picture of your viewer experience.',
    category: 'core-streaming',
    categoryLabel: 'Core Streaming',
    icon: 'Timer',
    color: '#3B82F6',
    features: [
      'Calculate total glass-to-glass latency',
      'Break down encoding, network, buffer, and segment delays',
      'Visual pipeline breakdown showing each stage',
      'Optimize for interactive or quality-first workflows',
    ],
    useCases: [
      'Setting up a new live stream and coordinating on-screen elements',
      'Planning interactive segments like live Q&A or auction countdowns',
      'Troubleshooting viewer delay complaints',
      'Comparing latency between different streaming protocols',
    ],
    keywords: ['stream delay', 'latency calculator', 'encoding delay', 'player buffer', 'glass-to-glass latency', 'live streaming latency', 'RTMP delay', 'HLS latency'],
    faq: [
      { q: 'What is glass-to-glass latency?', a: 'Glass-to-glass latency is the total time from when an event happens in front of the camera to when the viewer sees it on their screen. It includes capture, encoding, network transit, buffering, and decoding delays.' },
      { q: 'What is a good stream delay for live events?', a: 'For interactive streams (Q&A, gaming), aim for 2-5 seconds. For non-interactive broadcasts, 10-30 seconds is acceptable and allows for better quality through longer buffer times.' },
      { q: 'How does segment duration affect latency?', a: 'In HLS/DASH streaming, the player must download complete segments before playing them. Shorter segments (1-2s) reduce latency but may cause more buffering on slow connections. Longer segments (6-10s) are more reliable but add significant delay.' },
      { q: 'Can I achieve sub-second latency?', a: 'Yes, with WebRTC or SRT protocols and minimal buffering, sub-second latency is achievable. However, this requires more bandwidth and may sacrifice quality stability.' },
    ],
    howTo: [
      { step: 1, title: 'Enter encoder delay', description: 'Set your encoding latency in milliseconds. Software encoders like x264 on fast preset typically add 100-300ms. Hardware encoders (NVENC, QuickSync) add 30-100ms.' },
      { step: 2, title: 'Set player buffer', description: 'Enter the player buffer size in seconds. Most HLS players use 3-6 seconds. Low-latency configurations may use 1-2 seconds.' },
      { step: 3, title: 'Add network latency', description: 'Enter the round-trip network delay in milliseconds. This varies by distance — local CDN: 20-50ms, cross-country: 50-150ms, international: 100-300ms.' },
      { step: 4, title: 'Configure segment duration', description: 'Set the HLS/DASH segment length. Standard is 2-6 seconds. The calculator will show you the total pipeline delay.' },
    ],
    relatedSlugs: ['bitrate-calculator', 'rtmp-url-builder'],
  },
  {
    slug: 'bitrate-calculator',
    name: 'Bitrate Calculator',
    tagline: 'Determine optimal bitrate settings for any resolution, codec, and quality level',
    description: 'The Bitrate Calculator recommends optimal video bitrate settings based on your resolution, frame rate, codec, and desired quality level. It takes into account the efficiency differences between H.264, H.265/HEVC, AV1, and VP9 to provide accurate recommendations.',
    category: 'core-streaming',
    categoryLabel: 'Core Streaming',
    icon: 'Activity',
    color: '#8B5CF6',
    features: [
      'Recommendations for H.264, H.265, AV1, and VP9 codecs',
      'Resolution presets from 720p to 4K',
      'Frame rate adjustments from 24fps to 60fps',
      'Quality tiers: Low, Medium, High, Ultra',
    ],
    useCases: [
      'Configuring OBS or vMix encoder settings for a new stream',
      'Building an adaptive bitrate ladder for multi-quality streaming',
      'Estimating storage requirements for recorded content',
      'Fitting within a specific bandwidth budget',
    ],
    keywords: ['bitrate calculator', 'video bitrate', 'streaming bitrate', 'OBS bitrate', 'encoding settings', 'H.264 bitrate', 'HEVC bitrate', 'AV1 bitrate'],
    faq: [
      { q: 'What bitrate should I use for 1080p streaming?', a: 'For H.264 at 30fps, use 4,500-6,000 kbps for good quality. For 60fps, increase to 6,000-9,000 kbps. H.265 can achieve similar quality at roughly 40% lower bitrates.' },
      { q: 'How does codec choice affect bitrate?', a: 'Newer codecs are more efficient. AV1 achieves the same quality as H.264 at roughly 50% lower bitrate. H.265 is about 40% more efficient than H.264. VP9 sits between H.264 and H.265.' },
      { q: 'What is the minimum upload speed I need?', a: 'Your upload speed should be at least 1.5x your total bitrate (video + audio) to maintain a stable stream. The calculator includes this recommendation automatically.' },
      { q: 'Should I use CBR or VBR for streaming?', a: 'Use CBR (Constant Bitrate) for live streaming to prevent bandwidth spikes. Use VBR (Variable Bitrate) for recordings and VOD to optimize file size while maintaining quality.' },
    ],
    howTo: [
      { step: 1, title: 'Select your resolution', description: 'Choose from 720p, 1080p, 1440p, or 4K. Higher resolutions need proportionally more bitrate.' },
      { step: 2, title: 'Pick your frame rate', description: 'Select 24, 25, 30, 50, or 60 fps. Higher frame rates require approximately 50% more bitrate than their 30fps counterparts.' },
      { step: 3, title: 'Choose your codec', description: 'Select H.264 (most compatible), H.265 (better compression), AV1 (best compression), or VP9 (YouTube-optimized).' },
      { step: 4, title: 'Set quality level', description: 'Choose Low (bandwidth-saving), Medium (balanced), High (quality-focused), or Ultra (maximum quality). The calculator will recommend specific bitrate values.' },
    ],
    relatedSlugs: ['stream-delay-calculator', 'aspect-ratio-calculator'],
  },
  {
    slug: 'safe-area-overlay',
    name: 'Safe Area Overlay',
    tagline: 'Visualize title-safe and action-safe zones for broadcast content',
    description: 'The Safe Area Overlay tool helps you visualize the title-safe and action-safe zones defined by broadcast standards. Upload or input your content dimensions and see exactly where critical text and graphics should be placed to ensure visibility on all displays.',
    category: 'production-broadcast',
    categoryLabel: 'Production & Broadcast',
    icon: 'Frame',
    color: '#F59E0B',
    features: ['Title-safe (80%) and action-safe (90%) zone visualization', 'Support for standard broadcast resolutions', 'Custom aspect ratio support', 'Grid overlay for precise alignment'],
    useCases: ['Designing lower thirds and on-screen graphics', 'Checking that critical text stays visible on all TVs', 'Planning multi-camera switching compositions', 'Verifying broadcast compliance before air'],
    keywords: ['safe area overlay', 'title safe', 'action safe', 'broadcast safe area', 'TV safe zone', 'graphics safe area'],
    faq: [
      { q: 'What is title-safe area?', a: 'Title-safe is the inner 80% of the screen where text and important graphics should be placed. Content outside this zone may be cropped on older or overscan-enabled displays.' },
      { q: 'What is action-safe area?', a: 'Action-safe is the inner 90% of the screen. Essential action should stay within this zone, though minor cropping outside it is generally acceptable.' },
      { q: 'Are safe areas still relevant with modern displays?', a: 'Yes. While overscan is less common on modern TVs, many viewers still watch on older displays. Broadcast standards still require safe area compliance, and platforms like YouTube can crop content differently on mobile vs desktop.' },
      { q: 'What resolution should I use for broadcast?', a: 'Standard HD broadcast is 1920x1080. For 4K broadcast, use 3840x2160. The safe area percentages apply regardless of resolution.' },
    ],
    howTo: [
      { step: 1, title: 'Select your resolution', description: 'Choose your output resolution (1080p, 4K, etc.) or enter custom dimensions.' },
      { step: 2, title: 'View the safe zones', description: 'The overlay displays both title-safe (inner box) and action-safe (outer box) zones with clear markings.' },
      { step: 3, title: 'Check your content', description: 'Ensure all critical text falls within the title-safe zone and all essential action within the action-safe zone.' },
      { step: 4, title: 'Export or screenshot', description: 'Use the overlay as a reference while designing your graphics in your preferred editing software.' },
    ],
    relatedSlugs: ['lower-third-builder', 'aspect-ratio-calculator'],
  },
  {
    slug: 'rtmp-url-builder',
    name: 'RTMP URL Builder',
    tagline: 'Construct and validate RTMP/RTMPS ingest URLs for major platforms',
    description: 'The RTMP URL Builder helps you construct valid RTMP and RTMPS ingest URLs for all major streaming platforms. Select your platform, enter your stream key, and get a correctly formatted URL ready to paste into your encoder.',
    category: 'production-broadcast',
    categoryLabel: 'Production & Broadcast',
    icon: 'Link',
    color: '#EF4444',
    features: ['Pre-configured URLs for YouTube, Twitch, Facebook, and more', 'Automatic RTMPS (encrypted) URL formatting', 'Stream key validation and formatting', 'Custom server URL support'],
    useCases: ['Setting up a new stream destination in OBS, vMix, or Wirecast', 'Switching between platforms without looking up URLs', 'Multi-streaming to multiple platforms simultaneously', 'Troubleshooting connection issues with correct URL formatting'],
    keywords: ['RTMP URL', 'stream URL builder', 'RTMPS URL', 'YouTube RTMP', 'Twitch ingest', 'OBS stream URL', 'stream key', 'ingest URL'],
    faq: [
      { q: 'What is the difference between RTMP and RTMPS?', a: 'RTMP sends data unencrypted while RTMPS adds TLS encryption. Most platforms now require RTMPS for security. If your encoder supports it, always use RTMPS.' },
      { q: 'Where do I find my stream key?', a: 'Each platform has a different location: YouTube Studio > Go Live > Stream Key, Twitch > Dashboard > Settings > Stream, Facebook > Live Producer > Stream Key.' },
      { q: 'Can I stream to multiple platforms at once?', a: 'Yes, using multi-streaming services like Restream.io or by setting up multiple outputs in vMix. Each destination needs its own RTMP URL and stream key.' },
      { q: 'Why is my stream failing to connect?', a: 'Common issues include: incorrect URL format (missing rtmps://), expired stream key, firewall blocking port 1935/443, or wrong server region selection.' },
    ],
    howTo: [
      { step: 1, title: 'Select your platform', description: 'Choose from YouTube, Twitch, Facebook, LinkedIn, or enter a custom server URL.' },
      { step: 2, title: 'Enter your stream key', description: 'Paste your stream key from the platform dashboard. The builder will validate the format.' },
      { step: 3, title: 'Choose protocol', description: 'Select RTMP or RTMPS. RTMPS is recommended and required by most platforms.' },
      { step: 4, title: 'Copy the URL', description: 'Copy the formatted URL and paste it into your encoder\'s stream settings.' },
    ],
    relatedSlugs: ['stream-delay-calculator', 'bitrate-calculator'],
  },
  {
    slug: 'countdown-generator',
    name: 'Countdown Generator',
    tagline: 'Create customizable countdown timers for pre-show and live events',
    description: 'The Countdown Generator creates professional countdown timers perfect for pre-show screens, event countdowns, and live production use. Customize colors, fonts, and behavior to match your brand and production style.',
    category: 'production-broadcast',
    categoryLabel: 'Production & Broadcast',
    icon: 'Clock',
    color: '#10B981',
    features: ['Customizable countdown display with hours, minutes, seconds', 'Pre-show "Starting Soon" screen with countdown', 'Custom colors and branding options', 'Full-screen mode for direct capture'],
    useCases: ['Pre-show countdown before a live stream begins', 'Event countdown timer displayed on screens', 'Break timers during long streaming sessions', 'Meeting countdown for webinars and virtual events'],
    keywords: ['countdown timer', 'stream countdown', 'pre-show timer', 'event countdown', 'live countdown', 'starting soon timer', 'OBS countdown'],
    faq: [
      { q: 'How do I add the countdown to OBS?', a: 'Use a Browser Source in OBS pointed at the countdown URL. Set the width and height to match your canvas, and the countdown will render directly in your scene.' },
      { q: 'Can I customize the appearance?', a: 'Yes. You can change colors, font size, background, and display format. The generator supports both minimal and branded styles.' },
      { q: 'Does the countdown sync across devices?', a: 'The countdown is based on the target end time, so multiple browser instances pointed at the same configuration will stay in sync.' },
      { q: 'What happens when the countdown reaches zero?', a: 'You can configure the behavior: show a "LIVE" message, redirect to another URL, or simply stop at 00:00:00.' },
    ],
    howTo: [
      { step: 1, title: 'Set your target time', description: 'Enter the date and time your event starts, or set a duration for a relative countdown.' },
      { step: 2, title: 'Customize the appearance', description: 'Choose colors, font size, and whether to show hours, minutes, and/or seconds.' },
      { step: 3, title: 'Preview the countdown', description: 'See a live preview of your countdown timer with your customizations applied.' },
      { step: 4, title: 'Use in your production', description: 'Open the countdown in a new window for full-screen display, or capture it as a browser source in your streaming software.' },
    ],
    relatedSlugs: ['lower-third-builder', 'stream-delay-calculator'],
  },
  {
    slug: 'lower-third-builder',
    name: 'Lower Third Builder',
    tagline: 'Design and preview animated lower-third graphics for live production',
    description: 'The Lower Third Builder lets you design professional lower-third graphics with animations, custom styling, and real-time preview. Create name plates, title cards, and info bars that match your production style.',
    category: 'production-broadcast',
    categoryLabel: 'Production & Broadcast',
    icon: 'Subtitles',
    color: '#EC4899',
    features: ['Real-time preview of lower third designs', 'Animated entry and exit transitions', 'Custom colors, fonts, and layout options', 'Multiple preset styles and templates'],
    useCases: ['Creating name plates for interview guests', 'Designing branded title cards for shows', 'Building info bars for news-style productions', 'Prototyping lower third designs before building in vMix or CasparCG'],
    keywords: ['lower third', 'lower third builder', 'name plate', 'title card', 'broadcast graphics', 'OBS overlay', 'vMix lower third'],
    faq: [
      { q: 'What is a lower third?', a: 'A lower third is a graphic overlay that appears in the bottom third of the screen, typically showing a person\'s name, title, or other contextual information during a broadcast.' },
      { q: 'What resolution should lower thirds be?', a: 'Design lower thirds at your output resolution (1920x1080 for HD, 3840x2160 for 4K). The graphic should occupy roughly the bottom 20-30% of the frame width and 10-15% of the height.' },
      { q: 'How do I animate lower thirds?', a: 'The builder includes slide-in, fade, and wipe animations. For production use, export your design and recreate the animation in your production software for better performance.' },
      { q: 'Can I export the lower third as an image?', a: 'You can screenshot or screen-capture the preview. For production use, the design serves as a reference to build the actual graphic in your production tool.' },
    ],
    howTo: [
      { step: 1, title: 'Enter text content', description: 'Type the primary name/title and secondary line (role, company, etc.).' },
      { step: 2, title: 'Choose a style', description: 'Select from preset styles or customize colors, fonts, and layout to match your brand.' },
      { step: 3, title: 'Configure animation', description: 'Choose entry and exit animations (slide, fade, wipe) and set timing.' },
      { step: 4, title: 'Preview and refine', description: 'Watch the live preview, adjust settings, and use the design as a reference for your production software.' },
    ],
    relatedSlugs: ['safe-area-overlay', 'countdown-generator'],
  },
  {
    slug: 'audio-delay-calculator',
    name: 'Audio Delay Calculator',
    tagline: 'Calculate audio propagation delay based on distance and conditions',
    description: 'The Audio Delay Calculator computes the time it takes for sound to travel a given distance, accounting for temperature, humidity, and altitude. Essential for setting up delay speakers, time-aligning PA systems, and solving lip-sync issues.',
    category: 'av-engineering',
    categoryLabel: 'AV Engineering',
    icon: 'AudioLines',
    color: '#F97316',
    features: ['Distance-based propagation delay calculation', 'Temperature and humidity compensation', 'Support for feet, meters, and other units', 'Delay alignment recommendations'],
    useCases: ['Time-aligning delay speakers in a venue', 'Calculating lip-sync correction for distant screens', 'Setting up distributed PA systems for large events', 'Troubleshooting echo and phase issues'],
    keywords: ['audio delay', 'sound delay calculator', 'speaker delay', 'sound propagation', 'PA delay', 'lip sync delay', 'audio latency'],
    faq: [
      { q: 'How fast does sound travel?', a: 'At sea level and 20\u00B0C (68\u00B0F), sound travels at approximately 343 m/s (1,125 ft/s). This speed increases with temperature \u2014 roughly 0.6 m/s per degree Celsius.' },
      { q: 'Why do I need to delay speakers?', a: 'In large venues, distant speakers receive the signal electronically (near-instant) but the sound from the main speakers takes time to travel. Adding delay to the remote speakers aligns their output with the arriving sound from the main speakers, preventing echo.' },
      { q: 'Does humidity affect sound speed?', a: 'Yes, slightly. Humid air is less dense than dry air, so sound travels slightly faster in humid conditions. The effect is small (about 0.1-0.6%) but can matter for precise alignment.' },
      { q: 'What about altitude?', a: 'Higher altitude means lower air pressure and density, which slightly increases the speed of sound. The calculator accounts for this when altitude is specified.' },
    ],
    howTo: [
      { step: 1, title: 'Enter the distance', description: 'Input the distance between the sound source and the listener (or secondary speaker) in feet or meters.' },
      { step: 2, title: 'Set environmental conditions', description: 'Enter the ambient temperature. Optionally adjust humidity and altitude for more precise results.' },
      { step: 3, title: 'Read the delay', description: 'The calculator shows the propagation delay in milliseconds and the effective speed of sound.' },
      { step: 4, title: 'Apply the correction', description: 'Use the calculated delay value to set the delay on your speaker processor or mixing console.' },
    ],
    relatedSlugs: ['speaker-coverage-calculator', 'cable-length-estimator'],
  },
  {
    slug: 'aspect-ratio-calculator',
    name: 'Aspect Ratio Calculator',
    tagline: 'Convert and calculate aspect ratios, pixel dimensions, and scaling',
    description: 'The Aspect Ratio Calculator converts between different aspect ratios, calculates pixel dimensions, and helps you scale content while maintaining the correct proportions. Essential for video production, web design, and display configuration.',
    category: 'av-engineering',
    categoryLabel: 'AV Engineering',
    icon: 'Maximize2',
    color: '#06B6D4',
    features: ['Convert between common aspect ratios (16:9, 4:3, 21:9, etc.)', 'Calculate width or height from one dimension and ratio', 'Pixel-perfect scaling calculations', 'Common resolution presets'],
    useCases: ['Calculating custom resolution dimensions for a specific aspect ratio', 'Scaling video content while maintaining proportions', 'Converting between cinema (2.39:1) and broadcast (16:9) formats', 'Determining display sizes and viewing distances'],
    keywords: ['aspect ratio calculator', 'resolution calculator', '16:9 calculator', 'pixel dimensions', 'video scaling', 'aspect ratio converter'],
    faq: [
      { q: 'What is the most common aspect ratio for video?', a: '16:9 is the standard for HD and 4K video, YouTube, and most modern displays. 4:3 was standard for older TV. Cinema uses 2.39:1 (widescreen) or 1.85:1.' },
      { q: 'How do I calculate the missing dimension?', a: 'If you know the width and aspect ratio, divide width by the ratio\'s first number, then multiply by the second number. For example, 1920 wide at 16:9: (1920/16)*9 = 1080 pixels tall.' },
      { q: 'What aspect ratio is 1920x1080?', a: '1920x1080 is 16:9. You can verify by dividing both by their greatest common divisor (120): 1920/120=16, 1080/120=9.' },
      { q: 'How do I scale a video without stretching?', a: 'Always scale proportionally \u2014 change one dimension and calculate the other using the aspect ratio. The calculator handles this automatically.' },
    ],
    howTo: [
      { step: 1, title: 'Enter known dimensions', description: 'Input your current width and height, or select a common preset resolution.' },
      { step: 2, title: 'Choose target ratio or dimension', description: 'Select the aspect ratio you want to convert to, or enter a target width or height.' },
      { step: 3, title: 'View calculated results', description: 'See the calculated dimensions, aspect ratio, and total pixel count.' },
      { step: 4, title: 'Apply to your project', description: 'Use the calculated dimensions in your video editor, display settings, or web design.' },
    ],
    relatedSlugs: ['safe-area-overlay', 'bitrate-calculator'],
  },
  {
    slug: 'cable-length-estimator',
    name: 'Cable Length Estimator',
    tagline: 'Estimate maximum cable runs for HDMI, SDI, USB, and other AV signals',
    description: 'The Cable Length Estimator helps you determine maximum cable run distances for common AV signal types. It accounts for cable type, resolution, and signal format to tell you whether your planned cable run will work reliably.',
    category: 'av-engineering',
    categoryLabel: 'AV Engineering',
    icon: 'Cable',
    color: '#84CC16',
    features: ['Maximum distances for HDMI, SDI, USB, Cat6, fiber, and more', 'Resolution-dependent distance calculations', 'Signal extender and converter recommendations', 'Cable quality grade comparisons'],
    useCases: ['Planning cable infrastructure for a new venue or studio', 'Determining if you need signal extenders for a specific run', 'Comparing cable types for a given distance requirement', 'Budgeting for cable and extender hardware'],
    keywords: ['cable length', 'HDMI cable length', 'SDI cable distance', 'cable run calculator', 'signal distance', 'AV cable estimator', 'maximum cable run'],
    faq: [
      { q: 'How far can HDMI run?', a: 'Standard HDMI cables work reliably up to 15m (50ft) for 1080p. For 4K60, maximum distance drops to about 5m (16ft) with passive cables. Active cables and fiber HDMI can extend to 100m+.' },
      { q: 'What is the maximum SDI cable length?', a: 'HD-SDI can run up to 100m (330ft) with quality coax (Belden 1694A). 3G-SDI for 1080p60 reaches about 80m. 12G-SDI for 4K reaches about 50m with quality cable.' },
      { q: 'When should I use fiber instead of copper?', a: 'Use fiber for runs over 50m, in environments with electromagnetic interference, or when you need to future-proof for higher bandwidth. Fiber supports much longer distances (hundreds of meters to kilometers).' },
      { q: 'Do cable quality grades matter?', a: 'Significantly. A premium cable (e.g., Belden 1694A for SDI) can run 30-50% farther than budget cable at the same resolution. The calculator factors in cable grade.' },
    ],
    howTo: [
      { step: 1, title: 'Select signal type', description: 'Choose your signal type: HDMI, SDI, USB, Cat6/HDBaseT, DisplayPort, or fiber.' },
      { step: 2, title: 'Set resolution and format', description: 'Select the resolution and frame rate you need to transmit (1080p30, 1080p60, 4K60, etc.).' },
      { step: 3, title: 'Enter your distance', description: 'Input the cable run distance you need in feet or meters.' },
      { step: 4, title: 'Review recommendations', description: 'See if your planned run is within safe limits and get recommendations for extenders if needed.' },
    ],
    relatedSlugs: ['speaker-coverage-calculator', 'audio-delay-calculator'],
  },
  {
    slug: 'speaker-coverage-calculator',
    name: 'Speaker Coverage Calculator',
    tagline: 'Calculate speaker coverage angles and distances for venue planning',
    description: 'The Speaker Coverage Calculator helps you plan speaker placement and coverage for any venue. Input your speaker specifications and venue dimensions to visualize coverage patterns, identify dead zones, and optimize placement for even sound distribution.',
    category: 'av-engineering',
    categoryLabel: 'AV Engineering',
    icon: 'Volume2',
    color: '#A855F7',
    features: ['Coverage angle and throw distance calculations', 'Venue dimension-based placement recommendations', 'SPL (Sound Pressure Level) estimation at distance', 'Multiple speaker overlap zone identification'],
    useCases: ['Planning PA speaker placement for a new venue', 'Calculating how many speakers are needed for a space', 'Verifying coverage for delay speaker placement', 'Estimating SPL levels at various audience positions'],
    keywords: ['speaker coverage', 'speaker placement', 'PA system design', 'coverage angle', 'throw distance', 'SPL calculator', 'venue acoustics'],
    faq: [
      { q: 'What is speaker coverage angle?', a: 'Coverage angle is the dispersion pattern of a speaker, measured where the SPL drops by 6dB from the on-axis level. Typical point-source speakers have 60-120\u00B0 horizontal and 40-60\u00B0 vertical coverage.' },
      { q: 'How do I calculate throw distance?', a: 'Throw distance is how far a speaker can project sound at a usable level. It depends on the speaker\'s sensitivity (dB SPL), power handling, and the acceptable SPL at the listening position.' },
      { q: 'How many speakers do I need?', a: 'Divide your venue\'s width by the coverage width at the listening distance. For example, if each speaker covers 10m wide at 15m distance and your venue is 30m wide, you need 3 speakers minimum.' },
      { q: 'What is the inverse square law?', a: 'Sound level drops by 6dB each time the distance doubles in free field. So if a speaker measures 100dB at 1m, it will be approximately 94dB at 2m, 88dB at 4m, and so on.' },
    ],
    howTo: [
      { step: 1, title: 'Enter speaker specs', description: 'Input your speaker\'s coverage angle (horizontal and vertical) and sensitivity rating.' },
      { step: 2, title: 'Set venue dimensions', description: 'Enter the venue length, width, and speaker mounting height.' },
      { step: 3, title: 'View coverage map', description: 'See the calculated coverage area, throw distance, and any gaps in coverage.' },
      { step: 4, title: 'Optimize placement', description: 'Adjust speaker positions and quantities until you achieve even coverage across the venue.' },
    ],
    relatedSlugs: ['audio-delay-calculator', 'cable-length-estimator'],
  },
];

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find(t => t.slug === slug);
}

export function getToolsByCategory(category: Tool['category']): Tool[] {
  return tools.filter(t => t.category === category);
}

export function getRelatedTools(tool: Tool): Tool[] {
  return tool.relatedSlugs
    .map(slug => tools.find(t => t.slug === slug))
    .filter((t): t is Tool => t !== undefined);
}
