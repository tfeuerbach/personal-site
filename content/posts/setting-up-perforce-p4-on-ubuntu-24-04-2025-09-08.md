---
title: Setting up Perforce P4 on Ubuntu 24.04 for Collaborative Development in
  Unreal Engine 5.6
date: 2025-09-08T00:44:00.000-04:00
---
# Perforce as Version Control for Unreal

***NEED TO FIGURE OUT WHICH VOICE I'M USING, I KEEP SWITCHING BETWEEN "I" and "YOU" RAHHHHH!***\
\
A few friends and I decided to collaborate on a game in Unreal, using a combination of [Multi-User Editing](https://dev.epicgames.com/documentation/en-us/unreal-engine/getting-started-with-multi-user-editing-in-unreal-engine) and a version control system. Having only worked on Unreal projects from Udemy lessons, I was unsure how to approach multi-person development. I initially considered using Git, but I quickly realized it would be a problem. Unreal projects involve much more than just code; we'd need to share 3D assets, C++ files, [C++ Blueprints](https://dev.epicgames.com/documentation/en-us/unreal-engine/cpp-and-blueprints-example), images, audio, and other file types.

Initial research showed that some people have had success with Git LFS, but it's generally considered a less-than-ideal approach due to a few quirks. All signs pointed to [Perforce P4](https://www.perforce.com/products/helix-core) (formerly Helix Core), which is the industry standard for game development. There's plenty of information out there that covers the differences between these two version control systems for game development, so I'll avoid going too deep into that for the sake of keeping this post focused.

- - -

## On-Prem vs. Cloud

**\[homelab image goes here]**

\
I've got a homelab in my office with an R220 that I was looking to repurpose, which was a perfect fit for this job. I just had to buy another SSD and may need more in the future. Hosting in the cloud is also a great option, but I didn't want to rack up a bill for something that may or may not end up being a fully realized game, and storage space can get pricey if we start to accrue a lot of assets. To ensure we could all connect to the server in my house, I planned on putting us all on the same Tailscale Network ([Tailnet](https://tailscale.com/kb/1136/tailnet)).

- - -

## Getting the Server Ready

The R220 had a single 120GB SSD and 16GB of DDR3 RAM when I first unracked it, so I decided to throw in an additional 1TB to start, as I knew we'd need more space than that. The plan was to use a Logical Volume Manager (LVM) to allow me to add more space down the road for the Perforce database and depot(s). Best practice is to keep the database on a separate drive than the depot(s). In my case, the database partition (P4ROOT) would exist 120GB SSD logical volume and the depot(s) would sit on the 1TB SSD logical volume. For the server install, I left the 1TB drive untouched and just created a boot, swap, and / partition using about 30GB of the 120GB that were present. After Ubuntu was installed, I proceeded to set up the LVMs.

- - -

## Creating the Logical Volumes

To do this you need to boot the machine using some form of bootable media, for 99% of people this'll be a USB with your preferred OS. For this guide, I'm assuming that anyone who's reading it knows how to get that set up. If not, check out [Rufus](https://rufus.ie/en/).

Here's a snippet of my *lsblk* output:

```
sda      8:0    0 119.2G  0 disk
├─sda1   8:1    0     1G  0 part   <--/boot/efi
├─sda2   8:2    0     8G  0 part   <--SWAP
├─sda3   8:3    0    20G  0 part   <--/
└─sda4   8:4    0     1G  0 part   <--/boot
sdb      8:16   0 953.9G  0 disk
```

For the LV, I'm taking the unallocated space and creating another partition **/dev/sda5/** using *fdisk:*\
\
**\[fdisk1 image]**\
\
Once the partition was created, I just had to change the partition type to a 'Linux LVM'. This can be done by inputting **t** when you're in the fdisk utility, selecting the partition number (in my case it was 5), and then typing 'Linux LVM' and pressing ENTER.

```
Created a new partition 5 of type 'Linux filesystem' and of size 89.2 GiB.

Command (m for help): t
Partition number (1-5, default 5): 5
Partition type or alias (type L to list all): Linux LVM

Changed type of partition 'Linux filesystem' to 'Linux LVM'.
```

The changes made above are then written out by inputting **w.** \
\
From there I then made the Physical Volume (lowest layer of LVM abstraction and designates the partition for use by the LVM) followed by the Logical Volumes for my partitions I had made during install:

```
sudo pvcreate /dev/sda5
sudo vgcreate vg_os /dev/sda5
sudo lvcreate --name root_lv --size 20G vg_os
sudo lvcreate --name swap_lv --size 8G vg_os
sudo lvcreate --name p4root_lv --extents 100%FREE vg_os
```

Now I can take my other SSD (1TB) and do the same thing.
