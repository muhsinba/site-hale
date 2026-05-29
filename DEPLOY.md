# Deploying to a single Google Compute Engine VM (Frankfurt)

Same shape as the my-hello-world deploy: one `e2-small` VM in `europe-west3-a`
(GCP's Frankfurt region), Debian 12, Node 20, Caddy fronting Next.js on port
3000. Served over **HTTP only** at first — turning on HTTPS later is one config
swap (see "Switching to HTTPS later"). The SQLite database lives on the VM's
persistent boot disk at `/var/lib/sitehale/prod.db`.

You will need:

- A GCP project with billing enabled.
- The `gcloud` CLI installed and authenticated locally (`gcloud auth login`).
- **The repo on GitHub.** Unlike my-hello-world, site-hale has no git remote
  yet. Create one and push `main` before §2c, e.g.:
  ```bash
  gh repo create muhsinba/site-hale --private --source=. --push
  ```
  (Or push to an existing remote.) The clone URL in §2c assumes
  `github.com/muhsinba/site-hale` — adjust if yours differs. The repo is
  cloned over **HTTPS**; for a private repo the VM needs read access (a
  deploy key or a `gh auth`-provisioned token — out of scope here, or just
  make it public for the demo).
- A domain — **not required** for the initial HTTP deploy, only for HTTPS later.

## 1. Create the VM

Run these locally. Replace `YOUR_PROJECT_ID`.

```bash
gcloud config set project YOUR_PROJECT_ID

# Enable the Compute Engine API (idempotent, ~30s on first run)
gcloud services enable compute.googleapis.com

gcloud compute instances create sitehale \
  --zone=europe-west3-a \
  --machine-type=e2-small \
  --image-family=debian-12 \
  --image-project=debian-cloud \
  --tags=http-server,https-server
```

The `http-server` / `https-server` tags only do something if matching firewall
rules target them. Older GCP projects had `default-allow-http` /
`default-allow-https` pre-created; newer ones often don't. Create them
explicitly:

```bash
gcloud compute firewall-rules create default-allow-http \
  --network=default --direction=INGRESS --action=ALLOW \
  --rules=tcp:80 --source-ranges=0.0.0.0/0 --target-tags=http-server

gcloud compute firewall-rules create default-allow-https \
  --network=default --direction=INGRESS --action=ALLOW \
  --rules=tcp:443 --source-ranges=0.0.0.0/0 --target-tags=https-server
```

`already exists` means the rule was pre-created — safe to ignore.

Get the VM's external IP:

```bash
gcloud compute instances describe sitehale --zone=europe-west3-a \
  --format='value(networkInterfaces[0].accessConfigs[0].natIP)'
```

Note that IP — you'll visit `http://THAT_IP/` once the app is up.

## 2. SSH in and provision

```bash
gcloud compute ssh sitehale --zone=europe-west3-a
```

Everything below runs **on the VM**.

### 2a. Install Node 20 and Caddy

```bash
sudo apt-get update
sudo apt-get install -y curl git ca-certificates debian-keyring debian-archive-keyring apt-transport-https

# Node 20 from NodeSource
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Caddy from the official repo
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt-get update
sudo apt-get install -y caddy
```

> No `build-essential`/`python3` this time — Prisma ships a precompiled query
> engine, so there's no native module to compile (my-hello-world needed them
> for `better-sqlite3`).

### 2b. Create the app user and directories

```bash
sudo useradd --system --shell /usr/sbin/nologin --home /opt/sitehale sitehale
sudo mkdir -p /opt/sitehale /var/lib/sitehale
sudo chown -R sitehale:sitehale /opt/sitehale /var/lib/sitehale
```

### 2c. Clone, install, and build

```bash
sudo -u sitehale git clone https://github.com/muhsinba/site-hale.git /opt/sitehale
cd /opt/sitehale
sudo -u sitehale npm ci          # runs `prisma generate` via postinstall
sudo -u sitehale npm run build
```

`npm ci` installs devDependencies too (we don't set `NODE_ENV=production` in
the shell), which `next build`, `tsx`, and the Prisma CLI all need.

### 2d. Create the env file

```bash
sudo cp /opt/sitehale/deploy/app.env.example /etc/sitehale.env
sudo chown sitehale:sitehale /etc/sitehale.env
sudo chmod 600 /etc/sitehale.env
```

No secrets to fill in — this site has no login. The defaults
(`DATABASE_URL=file:/var/lib/sitehale/prod.db`, `PORT=3000`) are ready to use.

### 2e. Create and seed the database

Run the migrations and seed **as the `sitehale` user** so the database file and
its WAL/SHM siblings are owned by the runtime user (the booking form writes to
them). Point `DATABASE_URL` at the persistent-disk path:

```bash
cd /opt/sitehale
sudo -u sitehale DATABASE_URL="file:/var/lib/sitehale/prod.db" npx prisma migrate deploy
sudo -u sitehale DATABASE_URL="file:/var/lib/sitehale/prod.db" npm run db:seed
```

`migrate deploy` applies the committed migrations without prompting (the
production-safe counterpart to `migrate dev`). The seed loads the services and
testimonials from `prisma/seed.ts`.

### 2f. Install and start the systemd unit

```bash
sudo cp /opt/sitehale/deploy/sitehale.service /etc/systemd/system/sitehale.service
sudo systemctl daemon-reload
sudo systemctl enable --now sitehale
sudo systemctl status sitehale
```

If it failed to start, check logs with `sudo journalctl -u sitehale -e`.

### 2g. Configure Caddy (HTTP for now)

```bash
sudo cp /opt/sitehale/deploy/Caddyfile /etc/caddy/Caddyfile
sudo systemctl reload caddy
```

The shipped Caddyfile listens on `:80` and reverse-proxies to Next.js on
`:3000` — no domain or TLS cert needed.

Visit `http://VM_EXTERNAL_IP/` (the IP from the end of §1). The home page should
load with the seeded services and testimonials, and submitting the booking form
should save a row (verify with §"Viewing bookings" below).

## Switching to HTTPS later

When you have a domain, two changes turn on TLS (no secure-cookie flag to flip
this time — there's no session):

1. **DNS** — create an A record for the domain pointing at the VM's external IP.
   Confirm with `nslookup your-domain.com`.

2. **Caddyfile** — on the VM, replace `/etc/caddy/Caddyfile` with a domain block:

   ```caddyfile
   your-domain.com {
       encode gzip
       reverse_proxy localhost:3000
   }
   ```

   Then `sudo systemctl reload caddy`. The first request takes ~10 seconds while
   Caddy fetches a Let's Encrypt cert.

## Updating the app later

```bash
gcloud compute ssh sitehale --zone=europe-west3-a
cd /opt/sitehale
sudo -u sitehale git pull
sudo -u sitehale npm ci
sudo -u sitehale npm run build
# If the pull brought new migrations:
sudo -u sitehale DATABASE_URL="file:/var/lib/sitehale/prod.db" npx prisma migrate deploy
sudo systemctl restart sitehale
```

## Viewing bookings

Booking requests are rows in the `Booking` table. Quickest peek from the VM:

```bash
cd /opt/sitehale
sudo -u sitehale DATABASE_URL="file:/var/lib/sitehale/prod.db" npx prisma studio
```

Prisma Studio binds to localhost only; SSH-tunnel port 5555 to reach it
(`gcloud compute ssh sitehale --zone=europe-west3-a -- -L 5555:localhost:5555`),
or just query with `sqlite3 /var/lib/sitehale/prod.db 'select * from Booking;'`.

## Backing up the database

The DB is the file plus its WAL/SHM siblings. Snapshot them while the app is
briefly stopped (WAL files can be inconsistent if copied mid-write):

```bash
sudo systemctl stop sitehale
sudo tar czf ~/sitehale-backup-$(date +%F).tar.gz -C /var/lib/sitehale .
sudo systemctl start sitehale
```

## Tearing down

```bash
gcloud compute instances delete sitehale --zone=europe-west3-a
```

That deletes the VM and its boot disk (including `prod.db`). Done.

## Caveats for a demo deployment

- **Single instance, single point of failure.** If the VM dies, the site is
  down until you re-provision.
- **SQLite, single server.** State lives on this one disk. Running a second
  server (or another region) means moving to Postgres — see
  `PERSONALIZE.md` → "Database: SQLite now, PostgreSQL later".
- **No automated backups.** You own this.
- **No CI/CD.** Updates are SSH-and-run.
- **OS updates are manual.** `sudo apt-get update && sudo apt-get upgrade`
  periodically, or enable unattended-upgrades.
