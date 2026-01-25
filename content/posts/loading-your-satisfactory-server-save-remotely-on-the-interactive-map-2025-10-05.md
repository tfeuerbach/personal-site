---
title: Loading Your Satisfactory Server Save Remotely on the Interactive Map - Linux
description: Auto-load Satisfactory dedicated server saves to the Interactive
  Map. A step-by-step guide to serving files via HTTPS with Nginx.
excerpt: Want to view your live Satisfactory 1.1 dedicated server map without
  manually uploading save files every time? This guide details how to directly
  connect your server to the Satisfactory Calculator Interactive Map. I walk
  through the complete home lab setup using Nginx, Let's Encrypt, and DuckDNS to
  securely serve your saves over HTTPS, covering the essential CORS headers and
  specific file permission fixes for Pterodactyl and Docker environments.
date: 2025-10-05T20:31:00.000-04:00
---
I spun up a Satisfactory 1.1 server on my Home Lab with some buddies and we wanted a better way to see our factory and the map. The [Satisfactory Calculator Interactive Map](https://satisfactory-calculator.com/en/interactive-map) is perfect for this and it supports remote save loading—you give it a URL to your save file and it loads directly.

The caveat is that you need to serve those files over HTTPS with CORS headers. While the [SC-InteractiveMap GitHub repo](https://github.com/AnthorNet/SC-InteractiveMap) has a basic nginx example, I wanted to document the full process since I couldn't really find a solid resource or guide on how to get this done.

**Is this safe?** Yes. You're only exposing read-only access to your save files via HTTPS with CORS headers that restrict the interactive map site. Your save files don't contain account credentials or server passwords—just your factory layout and game progress. We're not opening up any attack vectors on the server itself.

**TL;DR** - This guide walks through setting up nginx with Let's Encrypt SSL to serve your Satisfactory save files remotely. We'll use a free DuckDNS domain since SSL certificates require a domain name (not just an IP). By the end, you'll be able to load your live server saves from anywhere via a URL.

- - -

## My Setup

I'm running my Satisfactory server via Pterodactyl Panel on a box (a part of a cluster of Lenovo M710q's) at `192.168.1.151` in my local network. Pterodactyl uses Docker containers spun up from .egg (in my case, the [Satisfactory 1.1 egg](https://github.com/GreenChiip/satisfatory-egg)). Your setup might be different—maybe you're running the official dedicated server as the `steam` user, or you've got a standalone Docker container. I'll cover the common scenarios, but the core concepts are the same regardless.

- - -

## Why Not Just Use an IP Address?

The interactive map requires HTTPS (for security), and Let's Encrypt (free SSL certificate authority) **doesn't issue certificates for IP addresses** so you need a domain name.

You don't need to buy one though as free dynamic DNS services like DuckDNS exist specifically for situations like this.

- - -

## Step 1: Getting a Free Domain with DuckDNS

I went with [DuckDNS](https://www.duckdns.org/) because it's simple and free forever. Here's what you do:

1. Go to https://www.duckdns.org/
2. Sign in with GitHub, Google, Reddit, or whatever account you prefer
3. Create a subdomain (I went with `satisfactory-boys.duckdns.org` because, well, that's what we call ourselves I guess)
4. Set the IP to your **public IP address** (not your server's local IP like `192.168.1.151`)

   * Find your public IP at https://whatismyipaddress.com/
5. Click "update ip"

**Note:** If your ISP gives you a dynamic IP that changes frequently (most residential connections do), you'll want to [set up automatic updates](#dynamic-ip-changes) so DuckDNS always points to your current IP. I highly recommend doing this right after Step 5.

There are other free options like [No-IP](https://www.noip.com/) or [FreeDNS](https://freedns.afraid.org/), but I've had good luck with DuckDNS so that's what I'm sticking with.

- - -

## Step 2: Port Forwarding

For the interactive map to actually reach your server, you need to forward ports **80** (HTTP) and **443** (HTTPS) from your router to your Satisfactory server's local IP.

This is where I hit a roadblock. My Verizon router had port 443 already forwarded to `127.0.0.1` (the router itself) for remote management. If you run into this, you'll need to either:

* Change your router's remote management port to something else (like `8443`)
* Disable remote management entirely if you don't use it (you probably do unless you're plugged into your router's LAN port)

Here's what my port forwarding rules look like now:

| Application | Port | Protocol | Forward to IP | Forward to Port |
| ----------- | ---- | -------- | ------------- | --------------- |
| HTTP        | 80   | TCP      | 192.168.1.151 | 80              |
| HTTPS       | 443  | TCP      | 192.168.1.151 | 443             |

Access your router (usually at `192.168.1.1`, `192.168.0.1`, or `10.0.0.1`) and set these up. The exact process varies by router manufacturer, but it's typically under "Port Forwarding," "Virtual Server," or "NAT" settings.

- - -

## Step 3: Finding Your Save Files

Before we can serve the files, we need to know where they are. This depends on how you installed Satisfactory.

### For Pterodactyl Panel (like mine):

```bash
sudo find /var/lib/pterodactyl/volumes -name "*.sav"
```

In my case, they're at:

```
/var/lib/pterodactyl/volumes/16917711-dd16-45c7-ac23-5cc75136a566/.config/Epic/FactoryGame/Saved/SaveGames/server/
```

### For the Official Dedicated Server:

The official server stores saves in the `.config` directory of whatever user is running it. If you're not sure who that is, run:

```bash
ps aux | grep -i satisfactory
```

Then check that user's home directory:

```bash
# If running as your current user
find ~/.config/Epic/FactoryGame/Saved/SaveGames -name "*.sav"

# If running as a specific user (common ones: steam, satisfactory, gameserver)
sudo find /home/steam/.config/Epic/FactoryGame/Saved/SaveGames -name "*.sav"

# Or just search everything (might take a minute)
sudo find /home -path "*/.config/Epic/FactoryGame/Saved/SaveGames/server/*.sav" 2>/dev/null
```

Typical path for a dedicated server running as the `steam` user:

```
/home/steam/.config/Epic/FactoryGame/Saved/SaveGames/server/
```

### For SteamCMD Installations:

```bash
find ~/.steam/steam/steamapps/common/SatisfactoryDedicatedServer -name "*.sav"
```

### For Docker:

```bash
docker exec <container-name> find / -name "*.sav" 2>/dev/null
```

**Important:** Make note of the full path to the `server/` directory—you'll need it in a minute.

- - -

## Step 4: Installing Nginx and Certbot

We need nginx to serve the files and certbot to get our SSL certificate. If you don't have them yet:

```bash
sudo apt update
sudo apt install nginx certbot python3-certbot-nginx -y
```

Verify nginx is running:

```bash
sudo systemctl status nginx
```

You should see `Active: active (running)` in green. If not, start it with `sudo systemctl start nginx`.

- - -

## Step 5: Getting an SSL Certificate

This is where the magic happens. Let's Encrypt provides free SSL certificates via certbot which makes this super easy.

```bash
sudo certbot certonly --nginx -d your-domain.duckdns.org
```

Replace `your-domain.duckdns.org` with your actual domain (mine was `satisfactory-boys.duckdns.org`).

You'll be asked for:

* **Your email address** (for renewal notifications—important, don't skip this)
* **Agreement to terms** (type `Y`)
* **Whether to share your email with EFF** (your choice, I said no)

If everything goes well, you'll see:

```
Successfully received certificate.
Certificate is saved at: /etc/letsencrypt/live/your-domain.duckdns.org/fullchain.pem
Key is saved at:         /etc/letsencrypt/live/your-domain.duckdns.org/privkey.pem
This certificate expires on [DATE].
Certbot has set up a scheduled task to automatically renew this certificate.
```

The certificate is valid for 90 days and will auto-renew, so you don't need to worry about it expiring.

- - -

## Step 6: Configuring Nginx

Now we need to tell nginx how to serve our save files. Create a new site configuration:

```bash
sudo vi /etc/nginx/sites-available/satisfactory-saves
```

Paste this configuration, **replacing the placeholders** with your actual values:

```nginx
server {
    server_name             your-domain.duckdns.org;
    root                    /path/to/your/SaveGames/server;

    listen                  443 ssl;
    ssl_certificate         /etc/letsencrypt/live/your-domain.duckdns.org/fullchain.pem;
    ssl_certificate_key     /etc/letsencrypt/live/your-domain.duckdns.org/privkey.pem;
    include                 /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam             /etc/letsencrypt/ssl-dhparams.pem;

    # Make the save loadable by the map
    add_header              Access-Control-Allow-Headers "Access-Control-Allow-Origin";
    add_header              Access-Control-Allow-Origin "https://satisfactory-calculator.com";
    if_modified_since       before;

    # Enable directory listing (optional, for browsing saves)
    autoindex               on;

    if ($request_method = OPTIONS) { return 200; }
}

# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name your-domain.duckdns.org;
    return 301 https://$server_name$request_uri;
}
```

**What to replace:**

* `your-domain.duckdns.org` appears **3 times**—replace all of them
* `/path/to/your/SaveGames/server` with the actual path from Step 3

**My configuration** (for reference):

* Domain: `satisfactory-boys.duckdns.org`
* Path: `/var/lib/pterodactyl/volumes/16917711-dd16-45c7-ac23-5cc75136a566/.config/Epic/FactoryGame/Saved/SaveGames/server`

**Other common paths:**

* Pterodactyl: `/var/lib/pterodactyl/volumes/<uuid>/.config/Epic/FactoryGame/Saved/SaveGames/server`
* Dedicated Server (steam): `/home/steam/.config/Epic/FactoryGame/Saved/SaveGames/server`
* Dedicated Server (your user): `/home/yourusername/.config/Epic/FactoryGame/Saved/SaveGames/server`

Save and exit (`:wq`).

- - -

## Step 7: Enabling the Site

Link the configuration to enabled sites:

```bash
sudo ln -s /etc/nginx/sites-available/satisfactory-saves /etc/nginx/sites-enabled/
```

Test the configuration (this catches any typos):

```bash
sudo nginx -t
```

You should see:

```
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
```

If you get errors, double-check your paths and domain names in the config file.

Restart nginx to apply the changes:

```bash
sudo systemctl restart nginx
```

- - -

## Step 8: Fixing File Permissions (The Part That Got Me)

This is where I spent way too long troubleshooting. Nginx runs as the `www-data` user and needs permission to read your save files. The problem? Pterodactyl (and most dedicated server setups) lock down their directories pretty tight.

First, check who owns your save files:

```bash
ls -l /path/to/your/SaveGames/server/
```

You'll see something like `pterodactyl pterodactyl` or `steam steam`. That's fine—we just need to give nginx permission to *read* the files without changing ownership.

### For Pterodactyl (like my setup):

The issue was that `/var/lib/pterodactyl` had `drwx------` permissions (owner-only). I needed to add execute permissions for "others" on the entire path so nginx could traverse it:

```bash
# Allow nginx to traverse pterodactyl directories
sudo chmod o+x /var/lib/pterodactyl
sudo chmod o+x /var/lib/pterodactyl/volumes

# Replace with your actual server UUID
sudo chmod o+x -R /var/lib/pterodactyl/volumes/16917711-dd16-45c7-ac23-5cc75136a566

# Make the save files readable
sudo chmod o+r /var/lib/pterodactyl/volumes/16917711-dd16-45c7-ac23-5cc75136a566/.config/Epic/FactoryGame/Saved/SaveGames/server/*.sav
```

**What these permissions mean:**

* `o+x` = "others" (like nginx) can execute/traverse the directory
* `o+r` = "others" can read the files
* We're NOT changing ownership, just adding read permissions

### For Dedicated Server (running as your user):

If the server runs as your current user and files are in your home:

```bash
chmod 755 ~/.config
chmod 755 ~/.config/Epic
chmod 755 ~/.config/Epic/FactoryGame
chmod 755 ~/.config/Epic/FactoryGame/Saved
chmod 755 ~/.config/Epic/FactoryGame/Saved/SaveGames
chmod 755 ~/.config/Epic/FactoryGame/Saved/SaveGames/server
chmod 644 ~/.config/Epic/FactoryGame/Saved/SaveGames/server/*.sav
```

### For Dedicated Server (running as different user, like 'steam'):

```bash
# Replace 'steam' with your actual server user
SERVER_USER="steam"

# Make user's home directory traversable
sudo chmod o+x /home/$SERVER_USER

# Make all directories in the path accessible
sudo chmod o+x /home/$SERVER_USER/.config
sudo chmod o+x /home/$SERVER_USER/.config/Epic
sudo chmod o+x /home/$SERVER_USER/.config/Epic/FactoryGame
sudo chmod o+x /home/$SERVER_USER/.config/Epic/FactoryGame/Saved
sudo chmod o+x /home/$SERVER_USER/.config/Epic/FactoryGame/Saved/SaveGames
sudo chmod o+x /home/$SERVER_USER/.config/Epic/FactoryGame/Saved/SaveGames/server

# Make save files readable
sudo chmod o+r /home/$SERVER_USER/.config/Epic/FactoryGame/Saved/SaveGames/server/*.sav
```

- - -

## Step 9: Testing the Setup

Time to see if it works. Run:

```bash
curl -I https://your-domain.duckdns.org/YourSaveName.sav
```

Replace `YourSaveName.sav` with an actual save file name (like `Boy_autosave_0.sav` in my case).

**Success looks like:**

```
HTTP/1.1 200 OK
Server: nginx/1.22.1
Content-Type: application/octet-stream
Content-Length: 1135963
Access-Control-Allow-Origin: https://satisfactory-calculator.com
```

The important part is `HTTP/1.1 200 OK` and the `Access-Control-Allow-Origin` header.

**If you get `403 Forbidden`:**
Go back and check your file permissions. You can use this to see exactly where permissions are blocking:

```bash
sudo namei -l /path/to/your/save.sav
```

Look for any directory that doesn't have `x` in the "others" column.

- - -

## Step 10: Loading Your Save on the Interactive Map

Open your browser and navigate to:

```
https://satisfactory-calculator.com/en/interactive-map?switchGameBranch=Stable&url=https://your-domain.duckdns.org/YourSaveName.sav
```

In my case:

```
https://satisfactory-calculator.com/en/interactive-map?switchGameBranch=Stable&url=https://satisfactory-boys.duckdns.org/Boy_autosave_0.sav
```

If everything worked, the map should load your factory! 🏭

### Which Save File to Use?

Your server rotates through 3 autosaves every 5 minutes. To find the most recent, browse to `https://your-domain.duckdns.org/` and check timestamps. Common names: `SessionName_autosave_0.sav`, `SessionName_autosave_1.sav`, etc.

Pick one, bookmark it, and refresh every 5-10 minutes to see updates.

- - -

## Usage Tips

**Bookmark the URL:** Create a bookmark with your autosave file:

```
https://satisfactory-calculator.com/en/interactive-map?switchGameBranch=Stable&url=https://your-domain.duckdns.org/YourSave_autosave_0.sav
```

Just refresh to see the latest changes after each autosave.

**Adjust autosave frequency:** Servers autosave every 5 minutes by default.

* Pterodactyl: Server settings → `AUTOSAVE_INTERVAL` (in seconds)
* Config file: `GameUserSettings.ini` → `mFloatValues=((\"FG.AutosaveInterval\", 300))`

**Share with friends:** Just send them the URL. Anyone with the link can view your factory on the map or download the save file.

- - -

## Troubleshooting

### "Connection refused" or "Cannot connect"

**Check port forwarding:** Make sure ports 80 and 443 are forwarded to the correct local IP.

**Check your firewall:**

```bash
sudo ufw status
```

If UFW is active, allow the ports:

```bash
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
```

**Verify nginx is running:**

```bash
sudo systemctl status nginx
```

### "403 Forbidden"

This was my main issue. It means nginx can't read the files due to permissions.

**Quick check:** Try to read the file as the nginx user:

```bash
sudo -u www-data cat /path/to/your/save.sav
```

If that fails, recheck Step 8's permissions.

**Debug the full path:**

```bash
sudo namei -l /path/to/your/save.sav
```

Look for any directory without `x` permission for "others."

### "Certificate error" or "Not secure"

**Verify your domain points to the correct IP:**

```bash
nslookup your-domain.duckdns.org
```

It should return your public IP. If not, update it on DuckDNS.

**Check your certificate:**

```bash
sudo certbot certificates
```

**Manually renew if needed:**

```bash
sudo certbot renew
```

### Map Shows Old Data

**Verify autosave is working:** Check your save file timestamps:

```bash
ls -lh /path/to/your/SaveGames/server/
```

**Make sure you're loading the latest save:** The autosave files rotate, so `autosave_0.sav` might not always be the newest.

**Hard refresh the map:** `Ctrl+Shift+R` to clear the browser cache.

### Dynamic IP Changes

If your ISP changes your public IP frequently, set up automatic DuckDNS updates. This ensures your domain always points to your current IP even if it changes.

**Get your DuckDNS token:** Go to https://www.duckdns.org/ (while logged in) and copy the token shown at the top of the page.

**Create the update script:**

```bash
mkdir -p ~/duckdns
vi ~/duckdns/duck.sh
```

Add this line (replace `your-domain` with your subdomain and `YOUR-TOKEN` with your actual token):

```bash
echo url="https://www.duckdns.org/update?domains=your-domain&token=YOUR-TOKEN&ip=" | curl -k -o ~/duckdns/duck.log -K -
```

**Make it executable and test it:**

```bash
chmod 700 ~/duckdns/duck.sh
~/duckdns/duck.sh
cat ~/duckdns/duck.log
```

You should see `OK` if it worked.

**Set up the cron job** (runs every 5 minutes):

```bash
(crontab -l 2>/dev/null; echo "*/5 * * * * ~/duckdns/duck.sh >/dev/null 2>&1") | crontab -
```

Verify it was added:

```bash
crontab -l
```

Now your DuckDNS domain will automatically update every 5 minutes. You can check `~/duckdns/duck.log` anytime to verify updates are working.

- - -

## Security Considerations

Your save files are now accessible via HTTPS to anyone with the URL. Here's what that means:

**What's in a save file:**

* Factory layout and building placements
* Resource nodes discovered
* Game progress and milestones

**What's NOT in a save file:**

* Steam/Epic account credentials
* Server passwords or admin access
* Any system or network access

The CORS headers restrict which websites can load your saves via JavaScript. The files are read-only, and nginx serves them with no ability to modify your server or execute code. This is significantly safer than port forwarding your game server or exposing SSH.

If privacy is a concern, use obscure save names or set up HTTP basic auth in nginx (not covered here).

- - -

## Maintenance

### Certificate Renewal

Certbot sets up automatic renewal via a systemd timer. You can check it with:

```bash
sudo systemctl status certbot.timer
```

To manually renew (usually not necessary):

```bash
sudo certbot renew
```

### Check Nginx Status

```bash
sudo systemctl status nginx
```

### View Nginx Logs

If something's not working:

```bash
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### Update DuckDNS IP Manually

If you need to update your IP right now:

```bash
curl "https://www.duckdns.org/update?domains=your-domain&token=YOUR-TOKEN"
```

Replace `your-domain` and `YOUR-TOKEN` with your actual values from DuckDNS.

## Additional Resources

* [Satisfactory Calculator](https://satisfactory-calculator.com/)
* [SC-InteractiveMap GitHub](https://github.com/AnthorNet/SC-InteractiveMap)
* [DuckDNS](https://www.duckdns.org/)
* [Let's Encrypt](https://letsencrypt.org/)
* [Nginx Documentation](https://nginx.org/en/docs/)
* [Pterodactyl Panel](https://pterodactyl.io/)

- - -

**Credits:**

* Guide inspired by the [SC-InteractiveMap GitHub docs](https://github.com/AnthorNet/SC-InteractiveMap)
* Interactive map by [Satisfactory Calculator](https://satisfactory-calculator.com/)
* Satisfactory game by [Coffee Stain Studios](https://www.coffeestainstudios.com/)

If you found this guide helpful and it saved you some time, feel free to [buy me a coffee](https://buymeacoffee.com/tfeuerbach) ☕ or consider supporting the Satisfactory Calculator team on [Patreon](https://www.patreon.com/EDSM).
