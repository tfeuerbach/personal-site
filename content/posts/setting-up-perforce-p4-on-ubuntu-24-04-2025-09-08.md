---
title: Setting up Perforce P4 on Ubuntu 24.04 for Collaborative Development in
  Unreal Engine 5.6
date: 2025-09-08T00:44:00.000-04:00
---
# Perforce as Version Control for Unreal

A few friends and I decided to collaborate on a game in Unreal, using a combination of [Multi-User Editing](https://dev.epicgames.com/documentation/en-us/unreal-engine/getting-started-with-multi-user-editing-in-unreal-engine) and a version control system. Having only worked on Unreal projects from Udemy lessons, I was unsure how to approach multi-person development. I initially considered using Git, but I quickly realized it would be a problem. Unreal projects involve much more than just code; we'd need to share 3D assets, C++ files, [C++ Blueprints](https://dev.epicgames.com/documentation/en-us/unreal-engine/cpp-and-blueprints-example), images, audio, and other file types.

Initial research showed that some people have had success with Git LFS, but it's generally considered a less-than-ideal approach due to a few quirks. All signs pointed to [Perforce P4](https://www.perforce.com/products/helix-core) (formerly Helix Core), which is the industry standard for game development. There's plenty of information out there that covers the differences between these two version control systems for game development, so I'll avoid going too deep into that for the sake of keeping this post focused.

---

## On-Prem vs. Cloud

[homelab image placeholder]

I've got a homelab in my office with an R220 that I was looking to repurpose, which was a perfect fit for this job. I just had to buy another SSD and may need more in the future. Hosting in the cloud is also a great option, but I didn't want to rack up a bill for something that may or may not end up being a fully realized game, and storage space can get pricey if we start to accrue a lot of assets. To ensure we could all connect to the server in my house, I planned on putting us all on the same Tailscale Network ([Tailnet](https://tailscale.com/kb/1136/tailnet)).

---

## Getting the Server Ready



