---
title: "My Honeypot Dashboard Was Lying to Me for Two Weeks (and I Wrote It)"
description: "273,469 events. 2,654 IPs. 54 countries. And a dashboard that confidently told me '7 countries' and '200 sessions' and a graph that quietly hid 95% of the data. The story of shipping v1.9 of ShardLure: not new attacks, but every way a tool misrepresents scale — and how I caught it."
date: 2026-06-04
category: "operations"
tags: ["ssh", "honeypot", "cowrie", "shardlure", "golang", "sqlite", "telemetry", "code-review", "data-integrity", "oracle-cloud"]
readTime: "16 min read"
---

A month ago I ran a [48-hour Cowrie experiment](/blog/ssh-honeypot-48-hours) and met the zoo. Two weeks ago I [deployed ShardLure for five days](/blog/shardlure-five-days) and watched the zoo settle into routines. The arc of those two posts was the same: the internet shows up, tries `root:123456` a few thousand times, drops a cryptominer, and leaves. Entertaining. Predictable.

This post is different. The honeypot kept running — it's at **273,469 events and 18 days** as I write this — but the new attacks weren't the story. The story is that I spent a week doing a deep review of my own tool and discovered, repeatedly, that **the dashboard was lying to me.** Not maliciously. Not with bugs that crashed anything. With the quiet, confident, plausible kind of wrong that you only catch if you go and ask the database the same question directly.

So this is the v1.9 post. Less malware zoo, more "every way a piece of software can misrepresent scale while looking completely fine." If you've ever trusted a number on a dashboard, this one's for you.

* * *

## The numbers (the real ones, this time)

**18 days. 273,469 Cowrie + journal events. 2,654 unique IPs. 77,693 sessions. 2,257 unique malware/script payloads. 54 countries.**

| Metric | Value |
|---|---|
| Window | May 17 – Jun 4, 2026 |
| Total events | 273,469 |
| Unique source IPs | 2,654 |
| Distinct sessions | 77,693 |
| Unique payloads (by sha256) | 2,257 |
| Samples shared to MalwareBazaar | 345 |
| Countries represented | 54 |

Event breakdown:

| Kind | Count |
|---|---|
| connect | 153,096 |
| failed_password | 78,619 |
| command | 27,044 |
| invalid_user | 9,861 |
| accepted (to the fake shell) | 2,654 |
| file_download | 2,022 |
| tunnel attempt | 88 |
| file_upload (SFTP) | 85 |

Hold onto a couple of those numbers — **2,654 IPs**, **54 countries**, **77,693 sessions** — because the entire point of this post is that for most of those two weeks, my dashboard would have told you they were something much smaller and much wronger.

* * *

## The recurring characters

First, the part you came for. The cast is mostly the same as five days ago, just louder.

```
200.187.161.164   64,577 hits   Brazil      (this one is new, and it is not subtle)
188.84.0.25        8,343 hits   Spain       (exactly where it was 12 days ago — it stopped)
103.61.122.229     7,405 hits   Vietnam
45.153.34.112      4,802 hits   Netherlands
103.150.30.30      4,605 hits   India
176.65.132.129     4,459 hits   Netherlands
139.59.74.51       4,359 hits   India (DigitalOcean)
```

The standout is `200.187.161.164` out of Brazil, which showed up after the five-day post and proceeded to hammer the box **64,577 times** — about a quarter of all events on the server come from this single IP. It single-handedly makes Brazil the #1 country by volume (66,320 hits), ahead of a Netherlands cluster (48,808) that is clearly several rented boxes spraying in formation.

Meanwhile the Madrid IP `188.84.0.25`, which was at 8,343 attempts when I wrote the five-day post, is *still* at exactly 8,343. It gave up. Somewhere around May 26 a bot in Spain looked at my fake `prod-app-server-01`, decided 8,343 failed logins was enough of a personal journey, and moved on. I find this oddly moving.

The most *aggressive* actor by rate is `45.156.87.254` at **3,113 attempts per hour** — and that number is the first place the dashboard betrayed me, which is a nice segue.

* * *

## The dashboard was lying. Here is exactly how.

ShardLure's whole pitch is "turn the firehose into something you can reason about." But a dashboard you can reason about is worse than useless if the numbers are quietly wrong, because you'll reason *confidently* and *incorrectly*. Over the review I found six distinct flavours of lie. They share a single root cause, which I'll get to.

### Lie #1: "7 countries"

The Overview tab proudly displayed **7 countries**. The globe's "By country" chart showed seven flags. Meanwhile the actor list in the very same API response contained IPs from twenty-two distinct countries, and the database had **54**.

Why 7? Because the country counter was computed from the *top-25 source IPs* — the only IPs the chart bothered to geolocate per render. Twenty-five IPs happen to span seven countries. The number wasn't "countries that attacked me." It was "countries among my 25 loudest attackers," wearing a label that said "countries." Off by a factor of 7.

### Lie #2: Brazil wasn't on the map

This is the one that actually tipped me off, because a friend looked at the globe and asked why the "Attack Geography" panel said India was #1 (~9,500) when the top-IPs table clearly showed a Brazilian IP with 64,577 hits.

Turns out "Attack Geography" was computed *client-side*, in JavaScript, by summing per-actor event counts over the **most-recently-seen 80 actors**. The Brazilian monster wasn't recently active in that exact window, so it fell off the list — and with it, all 64,577 of its hits. The chart was showing "geography of whoever logged in most recently," not "geography of the attack." A single IP responsible for a quarter of all traffic was simply *absent* from the geography view.

### Lie #3: "200 sessions"

The Cowrie sessions panel said **200 sessions**. It always said 200. Whether I selected a 1-hour window or a 30-day window: 200. The actual distinct-session count for 30 days is **77,693**.

The panel showed `data.sessions.length`, and the list was capped at 200 rows. So the "count" was just... the page size. And because 200 of the newest sessions all land within about an hour on a busy box, *changing the time window changed nothing* — same 200 rows, a different label on top. The window selector was decorative.

### Lie #4: the pivot graph hiding 95% of itself

"Infrastructure pivoting" renders a force-directed graph of actors ↔ IPs ↔ usernames ↔ HASSH fingerprints. The stats line said **"240 nodes."** It capped each node type at 80 and silently dropped the rest. The true distinct count was **4,603 nodes**. So the graph showed about 5% of the graph and labeled it as the graph.

### Lie #5: "X events" that wasn't X events

The MITRE ATT&CK coverage panel reported it had analyzed `20,000` events. Always exactly 20,000. The deobfuscation panel said it scanned `624` commands. The IOC export — *the thing you feed into other security tools* — showed 123 IP indicators.

All of these were reading a hard-capped sample of the most recent ~5,000–20,000 events, no matter what window you picked. On a box doing ~660 events/hour, that's about the last 7 hours. A "30-day" MITRE coverage map was really a 7-hour coverage map. Worse, techniques that *were* observed earlier in the window showed `count: 0` — read as "never seen," when the truth was "outside the sample." For the IOC export this was genuinely bad: a STIX/CSV feed you'd push to a TIP, silently missing 95% of the indicators.

### Lie #6: "1,000 unique payloads"

The payload library said "1,000 unique payloads." It said 1,000 because the query had a `LIMIT 1000` and the code reported the number of rows it got back as the total. The real distinct-payload count is **2,257**. A count that equals the limit isn't a count.

* * *

## The one bug underneath all six

Every one of those is the same mistake wearing different clothes:

> **A widget presenting a capped, recent, or partial sample as if it were the whole population.**

`len(sliceThatWasLimited)` reported as a total. A top-25 aggregation labeled as "all." A recent-N slice labeled as "the attack." A 5,000-row sample labeled with a 30-day window. None of these crash. None of these throw. They all return a number that is the right *type*, the right *order of magnitude-ish*, and completely wrong. They're the hardest class of bug to catch because the only way to notice is to independently compute the same number a different way and compare.

Which is exactly what the fix process became: for every widget, fetch what the API returns, then run the equivalent SQL straight against the database, and diff them. The dashboard says 7 countries; `SELECT COUNT(DISTINCT cc)` says 54. The dashboard says 200 sessions; `SELECT COUNT(DISTINCT session_id)` says 77,693. Once you do that for every panel, the lies fall out in an afternoon.

The fixes themselves were mostly "stop sampling, and when you must cap, *say so*":

- Geography and country counts now come from one authoritative SQL aggregation over **all** events, joined to the geo cache — so Brazil is #1 on both the globe and the intel page, and the count is 54.
- MITRE / TTP / IOC / graph / deobfuscation now stream the **full window** instead of the last 5,000 events. A 30-day view is 30 days.
- Capped widgets now disclose the cap honestly: **"newest 200 of 77,693 sessions,"** **"240 of 4,603 nodes (top 80/kind),"** **"2,257 unique."** The number is still bounded — you can't render 4,603 nodes usefully — but it no longer *pretends* to be the whole thing.

There's a deeper lesson here that has nothing to do with honeypots: **the number on the dashboard and the number in the database are two different programs, and they drift.** The only defense is to occasionally make them argue.

* * *

## The performance trap I walked straight into

"Just read the whole window instead of a 5,000-row sample" sounds free. It is not, on a 1-vCPU ARM VM.

The first version of the full-window fix made one analytics query take **110 seconds** — I'd written the per-session "most recent username" as a correlated subquery that ran once per session group, and on 77,693 sessions that's 77,693 nested queries. I caught it because I *measured the endpoint latency on the live box* instead of trusting that "it compiled and the test passed." It got reverted to an indexed aggregate in the same session. The lesson I keep re-learning: a correctness fix that's O(n²) is just a different bug.

The other trap was subtler. To stop dropped writes, an earlier change had pinned the SQLite connection pool to a single connection. That works — until you combine it with full-window reads. Now one analyst opening the 30-day graph holds the only connection for the entire multi-hundred-thousand-row scan, and **live ingest stalls behind it.** The honeypot stops recording attacks because someone looked at a chart. The fix was to serialize *writes* with an application-level mutex (SQLite is single-writer anyway) while letting *reads* run concurrently under WAL — and then prove it with a test that holds a slow read open and asserts a write still completes. It does, in about a second. The honeypot keeps recording while you stare at the globe.

* * *

## While I was in there: the hardening

A code review of a thing that ingests 100% attacker-controlled input finds other things. The ones worth mentioning:

- **The SSRF guard had gaps.** ShardLure can fetch attacker-referenced payload URLs into quarantine, with a guard against pointing it at internal addresses. The guard relied on Go's `net.IP.IsPrivate()`, which doesn't cover `0.0.0.0` (connects to localhost on Linux), CGNAT (`100.64.0.0/10`, very reachable on cloud hosts), or a few other reserved ranges. Plugged.
- **CSV injection in the IOC export.** A captured username like `=cmd|' /c calc'!A1` written straight into a CSV becomes a live formula when someone opens the export in Excel. Attacker usernames and commands are exactly the fields most likely to be weaponised this way. Now neutralised with the boring apostrophe-prefix trick.
- **Seven enrichment providers instead of three.** Pop any attacker IP into the intel console and it now fans out to AbuseIPDB, VirusTotal, GreyNoise, Shodan, AlienVault OTX, IPQualityScore, and IPinfo in parallel. Two of them need no API key.
- **The dashboard was leaking.** Setting an auth token revealed that the frontend never actually sent the token on its API calls — the page loaded and then every data fetch 401'd. The token is now forwarded on every request and across navigation, with a loud warning if you run with no token at all.

And the part I'm most quietly pleased with: **the live ingest now uses about 40 MB of RAM.** An earlier version rebuilt the entire actor set from scratch on every 5-second tick, which on this dataset peaked at 2.7 GB. Now a tick only re-aggregates the actors it actually touched. The whole honeypot — Cowrie plus ShardLure — comfortably fits in well under 512 MB, which means it'll happily run on the cheapest VPS you can rent.

* * *

## The installer learned some manners

The original installer, if you ran it on a fresh box with no SSH key, would check for `authorized_keys`, not find one, and abort with "add your key first." Which is correct and safe and also exactly the moment a beginner gets stuck.

It now walks you through it: it greets you with what it's about to change, and if there's no key on the server it **pauses and lets you paste your public key in**, installs it with the right permissions, and only then moves SSH off port 22. After the move it stops at a verify gate — *go confirm `ssh -p 2222` works in another terminal, then type yes* — before it touches anything else. No key, no paste, no proceeding: you cannot lock yourself out by accident. There's a proper `uninstall --purge` now too, which reverses the whole thing in lockout-safe order (SSH restored first).

* * *

## What I learned (two weeks vs. five days)

The 48-hour post taught me what's out there. The five-day post taught me it has rhythms. This stretch taught me something about the tooling instead of the threat:

**Building the dashboard was the easy 80%. The hard 20% was making it stop lying.** Anyone can sum a slice and slap a label on it. The work is in the discipline of asking "is this number actually what the label says it is?" — and the only honest way to answer is to compute it twice, two different ways, and refuse to ship until they agree.

The threat landscape, for the record, has not changed. It's still `root:123456`. It's still `mdrfckr` planting SSH keys. It's still RedTail mining Monero across six CPU architectures. The internet remains a loud, unimaginative neighbourhood. But my peephole is now telling me the truth about how loud, and that turns out to have been a 16-section pull request's worth of work.

* * *

## Run your own

ShardLure v1.9 is on [GitHub](https://github.com/hett-patell/ShardLure), with prebuilt `linux-amd64 / arm64 / armv7` binaries on the release.

```bash
git clone https://github.com/hett-patell/ShardLure.git
cd ShardLure
sudo python3 scripts/shardlure.py run
```

The installer will hold your hand from "I have a fresh VPS" to "the globe is spinning" — including pasting in your SSH key and verifying you can still get in before it commits. Keep the dashboard on Tailscale or a VPN. The dashboard, as always, is not bait. Do not get those confused.

* * *

## Teardown

The honeypot is, once again, still running as you read this. `200.187.161.164` in Brazil is presumably still adding to its 64,577. Somewhere a bot in Madrid is *not* trying anymore, having retired at 8,343, and I think about it more than I should.

The difference this time is that when I check the dashboard with coffee, I can finally believe the numbers. 273,469 events. 2,654 machines. 54 countries. All of them true, all of them computed twice, all of them refusing to round 54 down to 7 to make a chart look tidier.

The internet is still farming me. But now my instruments are honest about the harvest. And the globe still spins.
