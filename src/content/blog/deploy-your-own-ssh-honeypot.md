---
title: "Deploy Your Own SSH Honeypot in 10 Minutes with ShardLure"
description: "A step-by-step guide to standing up a Cowrie SSH honeypot with the ShardLure intel dashboard on a fresh VPS — from copying your SSH key to a spinning globe of attacker traffic. One command, no lockout stories."
date: 2026-06-05
tags: ["ssh", "honeypot", "cowrie", "shardlure", "self-hosting", "vps", "tutorial", "threat-intel", "tailscale"]
readTime: "11 min read"
---

I've written about [what walks into a honeypot](/blog/ssh-honeypot-48-hours), [how it settles into routines](/blog/shardlure-five-days), and [how I made the dashboard stop lying about it](/blog/shardlure-the-dashboard-was-lying). The most common reply has been some flavour of: *"okay, how do I run one myself?"*

This is that guide. By the end you'll have a real SSH honeypot collecting live attacker telemetry, with a dashboard that spins a globe of red arcs at you, on a VPS you control. It takes about ten minutes, most of which is the installer building Cowrie while you drink coffee.

The tool is [ShardLure](https://github.com/hett-patell/ShardLure) — a Go-based intel layer that sits on top of [Cowrie](https://github.com/cowrie/cowrie), the SSH honeypot. ShardLure handles the entire setup, moves your real SSH out of harm's way, and turns the firehose of failed logins into something you can actually read.

> **One rule before anything else:** this moves your real SSH off port 22. Keep your current SSH session open and verify the new port works *before* you close it. The installer forces you to do this — but I'm telling you anyway, because "I locked myself out at 2am" is a genre of story I'd like to retire.

* * *

## What you'll need

- **A fresh VPS** running Ubuntu/Debian (also works on dnf/yum and pacman hosts). Port 22 should be free — Cowrie is going to live there.
- **An SSH key.** Don't have one? The installer will literally help you make and paste one. No prep required.
- **~512 MB RAM.** The whole stack — Cowrie plus ShardLure — runs comfortably on a small box; the live intel process sits around 40 MB. Add a little swap and a $4/month droplet is plenty. (My reference box is an **Oracle Cloud ARM free-tier** VM, which costs nothing.)
- **Tailscale (recommended)** so you can reach the dashboard privately. Not mandatory, but the dashboard is *not* meant for the public internet.

Supported architectures: `linux-amd64`, `linux-arm64`, `linux-armv7`. There are prebuilt binaries on the GitHub release, but the installer builds from source by default (it installs Go for you).

* * *

## Step 1 — Get a VPS and confirm you can SSH in

Spin up your VPS, then from your laptop confirm normal access on port 22:

```
ssh youruser@your-vps-ip
```

If you don't already have an SSH keypair on your laptop, make one now — it takes a second:

```
ssh-keygen -t ed25519
```

Keep that terminal open. You'll need to paste your **public** key during install, and you'll want a working session as your safety net.

* * *

## Step 2 — Clone ShardLure on the VPS

On the server:

```
git clone https://github.com/hett-patell/ShardLure.git
cd ShardLure
```

> If you're copying source files manually instead of cloning, **use the project's tar-pipe deploy, not `scp`.** Some `scp`/editor pipelines silently re-encode Go and Python source into UTF-16, and the build dies with `SyntaxError: null bytes`. A plain `git clone` on the box sidesteps this entirely, so just clone.

* * *

## Step 3 — Run the installer

One command does everything:

```
sudo python3 scripts/shardlure.py run
```

It will hold your hand the whole way. Here's exactly what happens, in order, so there are no surprises:

**1. It explains itself and asks permission.** A banner tells you it's about to install dependencies, move your real SSH to a private key-only port, run Cowrie on the bait port, and start the dashboard. Type `y` to proceed.

**2. It installs dependencies** for your distro — git, a Python venv toolchain, `authbind`, Go, and the build essentials. On Ubuntu that's an `apt-get` away; it detects dnf/yum/pacman too.

**3. It asks for three ports** (each validated, just press Enter for the defaults):

| Port | Default | What it's for |
|---|---|---|
| Honeypot SSH | `22` | Cowrie — the bait attackers hit |
| Admin SSH | `2222` | your *real*, key-only SSH |
| Dashboard | `8080` | the web UI |

**4. It detects your admin IPs.** It auto-grabs your Tailscale IP and your current SSH client IP and adds them to an allow-list, so you never get classified as one of the attackers in your own data. You can add more.

**5. It sorts out your SSH key.** This is the part that used to trip people up. If the server already has an `authorized_keys`, great. **If it doesn't, the installer pauses and asks you to paste your public key** — print it on your laptop with:

```
cat ~/.ssh/id_ed25519.pub
```

Paste that line in. It validates it's a real key (`ssh-ed25519`, `ssh-rsa`, ecdsa, …), installs it into the right account with correct `0700`/`0600` permissions, and only *then* touches SSH. No key and nothing pasted? It aborts **without modifying sshd at all** — so you can't lock yourself out by accident.

**6. It moves your real SSH** to the admin port via a clean drop-in at `/etc/ssh/sshd_config.d/99-shardlure-admin.conf` (key-only, password auth off, root password login off). Your original config is backed up to `/etc/ssh/sshd_config.shardlure-bak`, and if the new config fails `sshd -t`, it rolls back automatically.

**7. ⚠️ It stops at a verify gate.** This is the important pause:

```
Real SSH now listens on port 2222 (key-only).
>>> In a SEPARATE terminal, RIGHT NOW, confirm you can log in:
      ssh -p 2222 youruser@your-vps-ip
```

**Open a new terminal and actually run that.** Once it works, come back and type `yes`. If it *doesn't* work, type `abort` — your original sshd config is still recoverable from the backup. Do not skip this.

**8. It builds the honeypot.** Creates a `cowrie` system user, clones and builds Cowrie, applies a stealth persona (fake `prod-app-server-01` hostname, fake `.env`/AWS/deploy-key bait files), and — crucially — **regenerates Cowrie's SSH host keys** so you don't share a fingerprint with every other lazy honeypot on Shodan.

**9. It finishes up.** Builds the `shardlure` binary to `/usr/local/bin/shardlure`, writes `/var/lib/shardlure/shardlure.yaml`, opens firewall ports (only if `ufw` is already active), and installs two systemd services: `cowrie.service` and `shardlure-live.service`.

That's it. The honeypot is live and recording.

* * *

## Step 4 — Verify it's running

```
sudo python3 scripts/shardlure.py status
systemctl status cowrie shardlure-live
journalctl -u shardlure-live -f          # watch attacks land in real time
```

Within minutes you'll see connection attempts in that journal tail. The internet finds an open port 22 *fast*.

* * *

## Step 5 — Open the dashboard

The dashboard listens on `8080`. **Keep it off the public internet** — it's your control panel, not bait. Two good ways to reach it:

```
# Over Tailscale (recommended):
http://<your-tailscale-ip>:8080

# Or an SSH tunnel from your laptop:
ssh -p 2222 -L 8080:127.0.0.1:8080 youruser@your-vps-ip
# then open http://127.0.0.1:8080
```

You'll get the globe, a live attack timeline, top credentials, attack geography, a brute-force radar, captured payloads, and the Red/Blue Team intel consoles.

### Lock the dashboard down with a token

By default the dashboard is unauthenticated — anyone who can reach the port sees everything (including credential exports). Set a token. Generate one and add it to the `shardlure-live` service:

```
# pick a long random string, e.g.:
head -c 32 /dev/urandom | base64 | tr -d '/+=' | head -c 40
```

Add it to `/etc/systemd/system/shardlure-live.service` under `[Service]`:

```
Environment=SHARDLURE_DASH_TOKEN=your-long-random-token
```

Then reload and restart:

```
sudo systemctl daemon-reload
sudo systemctl restart shardlure-live
```

Now reach the dashboard with `http://<host>:8080/?token=your-long-random-token` (the token is remembered for the tab) or send it as an `Authorization: Bearer …` header.

* * *

## Step 6 (optional) — Turn on IP enrichment

Pop any attacker IP into the intel console and ShardLure can look it up across **seven reputation providers** in parallel — verdict, score, and tags, all cached. Two of them need no key at all:

| Provider | Env var | Key needed? |
|---|---|---|
| Shodan InternetDB | — | **No** |
| GreyNoise (community) | `SHARDLURE_GREYNOISE_KEY` | No (optional paid tier) |
| AbuseIPDB | `SHARDLURE_ABUSEIPDB_KEY` | Yes (free) |
| VirusTotal | `SHARDLURE_VT_KEY` | Yes (free) |
| AlienVault OTX | `SHARDLURE_OTX_KEY` | Yes (free) |
| IPQualityScore | `SHARDLURE_IPQS_KEY` | Yes (free tier) |
| IPinfo | `SHARDLURE_IPINFO_KEY` | Yes (free tier) |

Add whichever keys you have as more `Environment=` lines in the `shardlure-live` unit, then `daemon-reload` + `restart`. Missing providers just show "not configured" — nothing breaks. Even with zero keys, Shodan and GreyNoise give you useful signal out of the box.

* * *

## Step 7 (optional) — Share captured malware to MalwareBazaar

Honeypots catch real malware. You can contribute it to [abuse.ch MalwareBazaar](https://bazaar.abuse.ch/) — and ShardLure auto-classifies samples (ELF arch, static vs dynamic, family fingerprints like Mirai/RedTail/XMRig) before uploading.

Grab an Auth-Key from [auth.abuse.ch](https://auth.abuse.ch/), then add it to `shardlure.yaml`:

```yaml
intel:
  bazaar:
    api_key: "your-auth-key"
    tags: ["shardlure", "honeypot"]
```

Always dry-run first to see what *would* ship:

```
shardlure share bazaar --dry-run --limit 10
```

When it looks right, drop `--dry-run`. Re-running is safe — every sha256 you've submitted is recorded and skipped next time. (`--limit` defaults to 10, `--since` to the last 10 days to match abuse.ch's freshness policy, and `--status` lists past uploads.) You can also share any payload with one click from the dashboard's payload inspector if you set `SHARDLURE_BAZAAR_KEY` in the service environment.

* * *

## Everyday commands

ShardLure ships a small CLI for poking at the data directly:

```
shardlure actors                       # list attacker actors by last seen
shardlure actor show 188.84.0.25       # one actor's full profile
shardlure status                       # event + actor counts
shardlure ioc                          # export an IOC slice
shardlure dashboard                    # the forensic TUI (alias: dash / tui)
shardlure version
```

The installer wraps service management too:

```
sudo python3 scripts/shardlure.py stop      # stop both services
sudo python3 scripts/shardlure.py start
sudo python3 scripts/shardlure.py status
sudo python3 scripts/shardlure.py plant-bait # re-plant bait files into Cowrie
```

Your config lives at `/var/lib/shardlure/shardlure.yaml` and the SQLite database at `/var/lib/shardlure/shardlure.db`. Treat that DB carefully — it stores attacker-supplied passwords (which sometimes overlap with credentials they *actually* reuse elsewhere). It's `chmod 0600` automatically; `shred` it when you're done.

* * *

## When you're done — clean teardown

One command reverses the whole thing, in lockout-safe order (it restores SSH *first*):

```
# Remove services + binary, restore SSH, but KEEP your captured data:
sudo python3 scripts/shardlure.py uninstall

# Or also delete the data dir + cowrie user (irreversible):
sudo python3 scripts/shardlure.py uninstall --purge
```

It restores your original sshd config from the backup, stops and removes both systemd services, deletes the binary, and reverts the firewall rules it added — while deliberately leaving your admin SSH rule in place so you don't strand yourself. Verify SSH on the restored port before you log out, same as install.

> If you installed on **non-default ports**, pass them so the firewall cleanup targets the right rules: `sudo SHARDLURE_HONEYPOT_PORT=22 SHARDLURE_ADMIN_PORT=2222 SHARDLURE_DASH_PORT=8080 python3 scripts/shardlure.py uninstall`.

* * *

## A few honest warnings

- **The dashboard is not bait.** Exposing port 8080 to the public internet is self-doxxing. Tailscale or a tunnel, always.
- **Keep bait credentials fake.** Don't get clever and put "almost real" keys in the decoy files. A human auditing them for 30 seconds will clock the fake Stripe keys — that's fine, bots are the customer.
- **This makes your server marginally safer and mostly more interesting.** It moves your real SSH to a private port (good) and runs a convincing fake one (fun). The real payoff is intel: you learn exactly what botnets do to a box that looks like yours.

That's the whole thing. Clone, run one command, paste your key, verify, done. Then check the globe with your morning coffee and watch a few hundred machines in a dozen countries fail to break into a server that's lying to all of them.

The internet is a loud neighbourhood. Might as well have a good peephole.

→ [ShardLure on GitHub](https://github.com/hett-patell/ShardLure)
