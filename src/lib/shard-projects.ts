export type ShardProject = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  tech: string[];
  github: string;
  demo?: string;
  status: "Live" | "In Development";
};

const GH = "https://github.com/hett-patell";

export const shardProjects: ShardProject[] = [
  {
    slug: "shardtune",
    name: "ShardTune",
    tagline: "Spotify controller & listening analytics for Chromium.",
    description:
      "A zero-dependency MV3 browser extension that controls Spotify and surfaces deep listening analytics — peak hours, music memory heatmap, taste profiles, friend activity, and Vibe Sync — all computed locally. BYO Client ID means no middleman servers; your data never leaves your device.",
    features: [
      "Now Playing with album art, waveform viz, transport controls",
      "Analytics dashboard: peak hours, memory heatmap, taste profile",
      "Friend activity feed and Vibe Sync taste comparison",
      "BYO-Client-ID: zero middleman servers, data stays local",
      "Sleep timer and smart notifications",
      "Offline-capable after first Spotify auth",
    ],
    tech: ["TypeScript", "React", "Tailwind", "Vite", "Chrome MV3", "Spotify Web API"],
    github: `${GH}/ShardTune`,
    demo: "https://shardtune.lovable.app/",
    status: "Live",
  },
  {
    slug: "shardlure",
    name: "ShardLure",
    tagline: "Attacker identity engine for SSH honeypot telemetry.",
    description:
      "SSH honeypot that clusters bots by HASSH and username playbook instead of IP. Cowrie + journal ingest, intent classification, live globe dashboard, stealth persona with bait files, and STIX 2.1 IOC export.",
    features: [
      "Actor clustering by HASSH fingerprint + username taste profiles",
      "7-provider IP enrichment (AbuseIPDB, VirusTotal, GreyNoise, Shodan)",
      "MalwareBazaar payload submission with auto-classification",
      "Live globe dashboard with real-time attack arcs",
      "Stealth persona with bait files and fake services",
      "STIX 2.1 IOC export for threat intelligence sharing",
    ],
    tech: ["Go", "Python", "SQLite", "Cowrie", "HASSH", "STIX"],
    github: `${GH}/ShardLure`,
    status: "Live",
  },
  {
    slug: "shardc2",
    name: "ShardC2",
    tagline: "Modular C2 framework for authorized red team operations.",
    description:
      "Policy-aware command-and-control framework for authorized red team operations. Go server/agent core with an operator dashboard, RBAC, audit logs, encrypted payloads, and built-in safety controls.",
    features: [
      "5 campaign types: Recon, Brute, Exfil, Persist, Custom",
      "7-section operator dashboard with multi-bot WebSocket terminal",
      "Safety policy engine: CIDR scope, safe mode, blocked ranges",
      "RBAC, audit logging, Markdown evidence report export",
      "Encrypted payloads with per-campaign AES keys",
      "Agent heartbeat with auto-reconnect and jitter",
    ],
    tech: ["Go", "PostgreSQL", "Redis", "WebSocket", "Docker", "Fiber"],
    github: `${GH}/ShardC2`,
    status: "Live",
  },
  {
    slug: "shardpet",
    name: "ShardPet",
    tagline: "Pixel Pokémon that wander the bottom of every webpage.",
    description:
      "Chromium MV3 extension that drops 1–3 animated Gen 5 Pokémon onto every page, with a per-hostname productivity nag that triggers a fullscreen \"get back to work\" overlay. Shadow-DOM isolated, GPU-only animation, offline after first sprite cache.",
    features: [
      "1–5 animated sprites from all 649 Gen 1–5 Pokémon",
      "Walk / idle / hop state machine, GPU-only translate3d rendering",
      "Productivity nag with fullscreen intervention overlay",
      "Shadow DOM isolation, per-hostname allow/blocklist",
      "Offline after first sprite cache — no network on page load",
      "Zero-permission MV3 extension, no data leaves your browser",
    ],
    tech: ["TypeScript", "Vite", "Vitest", "Chrome MV3", "Shadow DOM"],
    github: `${GH}/ShardPet`,
    status: "Live",
  },
  {
    slug: "shardpass",
    name: "ShardPass",
    tagline: "Local-first TOTP authenticator with inline autofill.",
    description:
      "Local-first Chrome MV3 TOTP authenticator with inline autofill, an encrypted local vault, QR / otpauth import, and per-domain account matching for 2FA-heavy workflows.",
    features: [
      "AES-256-GCM vault, PBKDF2-HMAC-SHA256 (250k iterations)",
      "TOTP (RFC 6238) + HOTP (RFC 4226) with inline floating chip",
      "Import via manual entry, QR image, otpauth:// URI or backup",
      "Optional E2EE sync with Ente Auth (SRP + libsodium)",
      "Per-domain account matching for auto-suggest",
      "Biometric unlock on supported devices",
    ],
    tech: ["TypeScript", "React", "Tailwind", "Vite", "Chrome MV3"],
    github: `${GH}/ShardPass`,
    status: "Live",
  },
  {
    slug: "shardflow",
    name: "ShardFlow",
    tagline: "Layer-2 LAN workbench: ARP, drop, throttle, pcap any device.",
    description:
      "Layer-2 LAN workbench for authorized lab use. Discovers every device on the wire (ARP, mDNS, SSDP, OUI) and applies per-target drop, throttle, or silent pcap policies via nftables, tc/IFB, and AF_PACKET ARP poisoning. TUI + JSON-RPC CLI.",
    features: [
      "Device discovery via ARP sweep, mDNS, SSDP, OUI vendor lookup",
      "Drop, throttle (tc HTB + IFB), and silent pcap to .pcapng",
      "Tunable ARP cadence down to 50ms for hardened mobile devices",
      "Lab sandbox: spin up 16 fake netns hosts for safe testing",
      "JSON-RPC CLI for scripting automated network policies",
      "TUI dashboard with live traffic metrics per target",
    ],
    tech: ["Go", "Linux", "nftables", "libpcap", "AF_PACKET", "JSON-RPC"],
    github: `${GH}/ShardFlow`,
    status: "Live",
  },
  {
    slug: "shardshell",
    name: "ShardShell",
    tagline: "PHP post-exploitation web shell for authorized red teams.",
    description:
      "Refined PHP post-exploitation shell for authorized red team engagements, with separate Linux and Windows variants tuned to OS-native recon, priv-esc, and log-clearing. Ships with a Python build-time obfuscator and self-decrypting loader for AV evasion.",
    features: [
      "Dual OS variants: Linux/macOS and Windows/IIS-tailored",
      "File Manager, Terminal, Recon, DB Access (MySQL/SQLite/MSSQL)",
      "Privilege escalation: SUID, capabilities, token privs, AlwaysInstallElevated",
      "Python build system: 3 obfuscation levels + self-decrypting XOR loader",
      "Anti-forensics: timestomping, log rotation, in-memory execution",
      "Web-based UI with file editor, hex viewer, and network pivot tools",
    ],
    tech: ["PHP", "Python", "Linux", "Windows"],
    github: `${GH}/ShardShell`,
    status: "Live",
  },
];

export function getShardProject(slug: string): ShardProject | undefined {
  return shardProjects.find((p) => p.slug === slug);
}
