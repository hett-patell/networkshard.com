---
title: "How a Pirate \"Free Netflix\" App Smuggles Video Inside .jpg Files"
description: "Tearing apart a streaming APK my sister installed. Not malware — but a React Native WebView shell, 24 rotating decoy domains, a signed-token ad wall as DRM, and MPEG-TS transport streams wearing JPEG and JS costumes."
date: 2026-08-17
category: "threat-intel"
tags: ["apk-analysis", "webview", "piracy", "cdn", "react-native", "mobile", "infrastructure", "token-auth"]
readTime: "9 min read"
---

This is the story of how I tore apart a streaming APK my sister installed, convinced it was malware. It wasn't — but the way it hides video is genuinely clever. Let's get to it. 🫰

## the shell: one webview and a codename

I decompiled the APK (`app.netmirror.nmv2`) with `jadx` and `hermes-dec`. The native layer is 100% stock React Native — no custom module, no `addJavascriptInterface`, nothing spicy.

The whole app is one `<WebView>`:

```text
MainActivity → React root "netmirror_beta" → one WebView
```

And every request it makes tags itself with:

```
Mozilla/5.0 (Linux; Android …) … /OS.Gatu v3.1
```

`OS.Gatu` is the operators' internal codename. The "app" is a thin shell around a website. Classic stuff.

## the pipeline

I reproduced the entire chain with plain curl. It looks like this:

```bash
# 1. bootstrap — 24 base64-encoded "mobile detect" decoy domains
curl https://mobiledetect.app/check.php
# → { "token_hash": "aHR0cHM6Ly9uZXQ1Mi5jYy9tb2JpbGUvaG9tZT9hcHA9MQ==" }
#     → https://net52.cc/mobile/home?app=1        ← the WebView URL

# 2. catalog — public, no auth
curl "https://net77.cc/search.php?s=dark&t=$(date +%s)"
# → {"searchResult":[{"id":"80100172","t":"Dark"}, …]}

# 3. play token — session-bound
curl -X POST --data "id=81183523" https://net77.cc/play.php
# → {"h":"in=<md5>::<md5>::<epoch>::ni::p::<user_token>"}

# 4. hls master — live mirror only, and only with a Referer
curl -H "Referer: https://net52.cc/" \
     "https://net52.cc/hls/81183523.m3u8?q=720p&in=unknown::ni"
# → audio: s26.freecdn14.top/files/81183523/a/1/1.m3u8
#   video: s21.freecdn4.top/files/220884/720p/720p.m3u8

# 5. segment — 6.5 MB, magic bytes 0x47 0x40 = MPEG-TS
curl -H "Referer: https://net52.cc/" \
     "https://s21.freecdn4.top/files/220884/720p/2560_000.jpg"
# → 00000000: 4740 1110 0042 f025 0001 c100 00ff 01ff   G@...B.%........
```

The PMT inside that "`.jpg`" spills the beans — stream type `0x1B` = H.264 video, `0x0F` = AAC audio, encoded by FFmpeg. It's a transport stream wearing a JPEG costume.

## twenty-four throwaway domains

The bundle hardcodes 24 `mobiledetect.*` / `mobidetect(s).*` domains, all base64-encoded. Each one gets tried with a 5-second timeout until one answers.

The names literally spell out *"mobile detect"* — which is the whole point. Takedown one domain and the app silently moves on to the next. No single point of failure.

## the dead mirror and the live mirror

Here's where I got played for a bit. 🫠

The desktop site (`net77.cc`) still serves playlists pointing at a **dead** CDN — `nm-cdn4.top` / `nm-cdn5.top`, no DNS records at all. I genuinely thought the video was gone.

But the app's actual mirror (`net52.cc`) serves the **live** CDN — `freecdn*`:

| mirror | `/hls/` returns | status |
|---|---|---|
| `net77.cc` (desktop) | `nm-cdn4.top` / `nm-cdn5.top` | 💀 dead |
| `net52.cc` (app's target) | `freecdn4.top` / `freecdn14.top` | ✅ live |

Same service, two different CDN generations. I was just reading the wrong mirror. Fair enough.

## anti-hotlinking: no referer, no video

The CDN files don't need cookies. They need one header:

```bash
# no Referer → 404
curl "https://s21.freecdn4.top/files/220884/720p/720p.m3u8?in=unknown::ni"
# → 404 Not Found

# with Referer → 200
curl -H "Referer: https://net52.cc/" "https://s21.freecdn4.top/files/220884/720p/720p.m3u8?in=unknown::ni"
# → 200, application/vnd.apple.mpegurl
```

That's it. One header, and every default wget/curl script dies instantly. Simple and effective¹.

## the .jpg that isn't a .jpg

The variant playlist names its segments:

```
#EXTINF:16.666667,
2560_000.jpg        ← video
#EXTINF:10.005333,
6004_000.js         ← audio
```

`.jpg` and `.js`. But `file` says neither — they're MPEG-TS transport streams. Video is smuggled as images, audio as scripts. The fake extensions slip past extension-based takedown filters and lazy WAF rules.

This was the moment the whole thing clicked for me. 🤓

## the final door: a signed token

Catalog, posters, subtitles, and even **audio** are all essentially public. The **video** is the paywalled part:

```bash
curl -H "Referer: https://net52.cc/" \
     "https://s21.freecdn4.top/files/70213514/720p/720p.m3u8?in=unknown::ni"
# → <h1>Only Valid Users Allowed. error: in</h1>
```

The `in=` token is signed (session hash + user token + expiry) and only issued after the app's *"watch one ad for 20 seconds"* flow. Without it you get a shared ~10-minute placeholder (`files/220884/…`) instead of the movie.

That ad wall *is* the DRM. Watch an ad → get a signed token → the CDN unlocks the real video. Audio flows free, so an unverified user literally hears the film while staring at a promo clip. 🫰

## so is it malware?

No. Not a keylogger, not a RAT. It's a pirate streaming client with genuinely clever infra.

The real risks are boring but real: the remote WebView runs arbitrary backend-controlled JS, it's debug-signed (anyone can ship a malicious "update"), and the whole thing is an ad-fraud funnel.

**Uninstall it.**

```text
Package    app.netmirror.nmv2            UA tag    /OS.Gatu v3.1
Decoys     mobiledetect.* / mobidetect(s).*  (×24)
Mirrors    net50.cc · net52.cc · net77.cc
CDN        video: s21.freecdn4.top · audio: s26.freecdn14.top / freecdn5.top
Posters    imgcdn.kim                     Subtitles subs.nfmirrorcdn.top
Downloads  streamtape.com/.net/.to · stape.fun
Cookies    addhash · t_hash_p · user_token   ({md5}::{md5}::{epoch}::ni[::p])
```

---

I guess the takeaway is that sometimes the interesting part isn't the payload, but the plumbing.

Don't try harder, try the live mirror. 🧠

¹ yep, plain curl, because you don't always need burp :)