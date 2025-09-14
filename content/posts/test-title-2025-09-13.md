---
title: Installing Perforce P4 (formerly Helix Core) for Development in Unreal
  Engine 5.6 on a Dell R220 Running Ubuntu Server 24.04
date: 2025-09-13T15:00:00.000-04:00
---
# Perforce as Version Control for Unreal

A couple friends and I decided to collaborate on a game in Unreal, using a combination of [Multi-User Editing](https://dev.epicgames.com/documentation/en-us/unreal-engine/getting-started-with-multi-user-editing-in-unreal-engine) and a version control system. Having only worked on Unreal projects from Udemy lessons, I was unsure how to approach multi-person development. I initially considered using Git, but quickly realized it would be a problem. Unreal projects involve much more than just code; we'd need to share 3D assets, C++ files, [C++ Blueprints](https://dev.epicgames.com/documentation/en-us/unreal-engine/cpp-and-blueprints-example), images, audio, and other file types.

Initial research showed that some people have had success with Git LFS, but it's generally considered a less-than-ideal approach due to a few quirks. All signs pointed to [Perforce P4](https://www.perforce.com/products/helix-core) (formerly Helix Core), which is the industry standard for game development. There's plenty of information out there that covers the differences between these two version control systems for game development, so I'll avoid going too deep into that for the sake of keeping this post focused.

- - -

## On-Prem vs. Cloud

<div style="text-align: center;">
  <img src="https://res.cloudinary.com/tfeuerbach-blog/image/upload/v1757824949/homelab-r220.png" alt="homelab-r220" />
</div>

I've got a homelab in my office with an R220 I was looking to repurpose after using it to host an AzerothCore server for me and a buddy. While hosting in the cloud is a great option, I didn't want to rack up a bill for something that may or may not end up being a fully realized game. Storage space can also get pricey if we start to accrue a lot of assets. To ensure we could all connect to the server in my house without me having to expose it to the internet, I planned on putting us all on the same Tailscale Network ([Tailnet](https://tailscale.com/kb/1136/tailnet)).

- - -

## Getting the Server Ready

The R220 had a single 120GB SSD and 16GB of DDR3 RAM when I first unracked it, so I decided to throw in an additional 1TB as I knew we'd need more space than that. My plan was to use a Logical Volume Manager (LVM) to allow me to add more down the road for the Perforce database and depot(s). Best practice with Perforce is to keep the database on a separate drive than the depot(s). In my case, the database partition (P4ROOT) would exist on the 120GB SSD logical volume, and the depot(s) would sit on the 1TB SSD logical volume.

For the server install, I wasn't able to set up an LVM in the installer while keeping /boot/efi/ and /boot/ in their own partitions. Because of this, I installed Ubuntu Server 24.04 normally with the goal of setting up the LVM and migrating my SWAP and root partitions later. I left my 1TB SSD untouched as there wasn't a need to install anything on it in the beginning. After Ubuntu was installed, I proceeded to set up the LVMs.

- - -

## Creating the Logical Volumes

To do this you need to boot using some form of bootable media. For 99% of people, this will be a USB with your preferred OS. For this guide, I'm assuming that anyone who's reading it knows how to get that set up. If not, check out [Rufus](https://rufus.ie/en/).

Here's a snippet of my `lsblk` output:

```
sda      8:0    0 119.2G  0 disk
├─sda1   8:1    0     1G  0 part   <--/boot/efi
├─sda2   8:2    0     8G  0 part   <--SWAP
├─sda3   8:3    0    20G  0 part   <--/
└─sda4   8:4    0     1G  0 part   <--/boot
sdb      8:16   0 953.9G  0 disk
```

For the LV, I'm taking the unallocated space and creating another partition **/dev/sda5/** using `fdisk`:

**\[fdisk1 image]**

Once the partition was created, I just had to change the partition type to a 'Linux LVM'. This can be done by inputting `t` when you're in the fdisk utility, selecting the partition number (in my case it was 5), and then typing 'Linux LVM' and pressing ENTER.

```
Created a new partition 5 of type 'Linux filesystem' and of size 89.2 GiB.

Command (m for help): t
Partition number (1-5, default 5): 5
Partition type or alias (type L to list all): Linux LVM

Changed type of partition 'Linux filesystem' to 'Linux LVM'.
```

The changes made above are then written out by inputting `w`.

From there, I then made the Physical Volume (lowest layer of LVM abstraction and designates the partition for use by the LVM) followed by the Logical Volumes for my partitions I had made during install:

```
sudo pvcreate /dev/sda5
sudo vgcreate vg_os /dev/sda5

sudo lvcreate --name root_lv --size 20G vg_os
sudo lvcreate --name swap_lv --size 8G vg_os
sudo lvcreate --name p4root_lv --extents 100%FREE vg_os
```

Now I can take my other SSD (1TB) and go through the same process, but we only need a single LV here since it's all for the depot(s). One thing to note is that I formatted the volume as XFS, which is a great filesystem for larger files and parallel I/O.

```
sudo pvcreate /dev/sdb
sudo vgcreate vg_depot /dev/sdb

sudo lvcreate --name depot_lv --extents 100%FREE vg_depot

sudo mkfs.xfs /dev/vg_depot/depot_lv
```

- - -

## Copying Partition Data to the Logical Volumes

At this point we're ready to move the system data and partitions into their respective LV's. For my root partition **/dev/sda3/,** the filesystem needs to be ext4 and we need to make a temporary mount point for the old and the new. Once we've done that, it's a quick `rsync`.

```
sudo mkfs.ext4 /dev/vg_os/root_lv

mkdir /mnt/old_root /mnt/new_root
sudo mount /dev/sda3 /mnt/old_root
sudo mount /dev/vg_os/root_lv /mnt/new_root

sudo rsync -axHAX --exclude=/boot/* /mnt/old_root/ /mnt/new_root/
```

- - -

## Updating the System for LVM Booting

To get the system to boot and use the LVMs that I've set up, I need to `chroot` into the new filesystem and update the bootloader. The steps for doing that consist of mounting the virtual filesystems from the live environment to /mnt/new_root/, mounting the boot partitions, *chroot* into the new root filesystem, and then update the **/etc/fstab.**

```
sudo mount --bind /dev /mnt/new_root/dev
sudo mount --bind /sys /mnt/new_root/sys
sudo mount --bind /proc /mnt/new_root/proc
sudo mount --bind /run /mnt/new_root/run

sudo mount /dev/sda4 /mnt/new_root/boot
sudo mount /dev/sda1 /mnt/new_root/boot/efi

sudo chroot /mnt/new_root
```

At this point, I'm now in my `chroot` environment and see `root@ubuntu-server:/#` rather than `ubuntu-server@ubuntu-server:~$` and I now can make changes to **/etc/fstab.**

### Old /etc/fstab:

```
# /etc/fstab: static file system information.
#
# Use 'blkid' to print the universally unique identifier for a
# device; this may be used with UUID= as a more robust way to name devices
# that works even if disks are added and removed. See fstab(5).
#
# <file system> <mount point>   <type>  <options>       <dump>  <pass>
/dev/disk/by-uuid/df397092-bb7b-4b08-b351-1b33f520dae9 none swap sw 0 0
# / was on /dev/sda3 during curtin installation
/dev/disk/by-uuid/6f613d07-1d3c-48f8-860c-0d133821f636 / ext4 defaults 0 1
# /boot was on /dev/sda4 during curtin installation
/dev/disk/by-uuid/1c71978f-5874-4661-8e18-31386a98e7df /boot ext4 defaults 0 1
# /boot/efi was on /dev/sda1 during curtin installation
/dev/disk/by-uuid/2186-E48E /boot/efi vfat defaults 0 1
```

### Updated /etc/fstab:

```
# EFI and Boot partitions
UUID=2186-E48E /boot/efi vfat defaults 0 1
UUID=1c71978f-5874-4661-8e18-31386a98e7df /boot ext4 defaults 0 1

# New LVM Logical Volumes for OS and Perforce metadata
/dev/mapper/vg_os-root_lv / ext4 noatime,defaults 0 1
/dev/mapper/vg_os-swap_lv none swap sw 0 0
/dev/mapper/vg_os-p4root_lv /p4/root ext4 noatime,defaults 0 2

# New LVM Logical Volume for Perforce depots
/dev/mapper/vg_depot-depot_lv /p4/depot xfs noatime,defaults 0 2
```

- - -

## Final Steps: Update `initramfs` and GRUB, Reboot

**Update the *initramfs:***

```
update-initramfs -u -k all
```

**Note:** You can ignore the message that systemd still uses the old version of your fstab. `systemctl daemon-reload` isn't necessary here as the change to the fstab will be picked up when we reboot anyway.\
\
**Update GRUB config:**

```
update-grub
```

**Reinstall GRUB to the master boot record:**

```
grub-install /dev/sda
```

**Exit `chroot`, unmount the filesystems, reboot:**

```
exit
sudo umount -R /mnt/new_root
reboot
```

**Note:**  After you run `grub-install` and reboot, your server might freak out a little and drop you into an emergency shell. Don't worry, this is normal and can happen when performing a migration to LVMs. It's a harmless race condition that can happen when the system attempts to mount the LVs before the LVM daemon has fully initialized. If this happens, just reboot a second time. Your machine will have the LVM info cached and boot up correctly.

- - -

## Housekeeping Before Installing P4 Server

After I verified the system could boot properly and that the partition migrations to the LVM were done properly, I booted back into the live USB and used `fdisk` to delete my unused root and SWAP partitions which freed up about 30GB. I then added that to `p4root_lv` using the same steps as above (create partition, change filesystem, create physical volume, logical volume, then add to existing LV).

### Configuring Kernel Networking Params

Another thing that will benefit performance is adjusting the network params to handle high-volume data transfers. Increasing the buffer size allows the server to handle large `p4 sync` or `submit` operations. To do this, edit `/etc/sysctl.conf` (in my case I'm going to make a file called `99-perforce.conf` and place that in `/etc/sysctl.d/` for organization purposes):

```
# Perforce-related TCP/IP tunings
#
# The maximum size of the receive and send buffers for all network connections.
# This sets the hard limit for how much memory the kernel can use for network buffers.
net.core.rmem_max = 16777216
net.core.wmem_max = 16777216

# This line sets the minimum, default, and maximum memory allocated for TCP sockets system-wide.
# The three values are: [min_value, default_value, max_value].
net.ipv4.tcp_mem = 1528512 2038016 8388608

# These lines set the minimum, default, and maximum TCP receive buffer sizes (in bytes).
# This is a range for the kernel to use for each individual TCP connection.
net.ipv4.tcp_rmem = 4096 87380 16777216

# These lines set the minimum, default, and maximum TCP send buffer sizes (in bytes).
# This provides a range for the kernel to use for each individual TCP connection.
net.ipv4.tcp_wmem = 4096 65536 16777216
```
I then apply the changes, `sudo sysctl -p /etc/sysctl.d/99-perforce.conf`.
