#!/usr/bin/env bash
# Provision site-hale ALONGSIDE another app (my-hello-world) on the same GCE VM.
# site-hale runs on port 3001; my-hello-world keeps :80 via Caddy, untouched.
# Idempotent — safe to re-run.
set -euo pipefail

REPO="https://github.com/muhsinba/site-hale.git"
APP_DIR="/opt/sitehale"
DB_DIR="/var/lib/sitehale"
DB_URL="file:${DB_DIR}/prod.db"

echo "== 1/7 swap (avoid OOM on the 2GB box during build; keeps my-hello-world up) =="
if ! sudo swapon --show=NAME --noheadings | grep -q . ; then
  sudo fallocate -l 2G /swapfile || sudo dd if=/dev/zero of=/swapfile bs=1M count=2048
  sudo chmod 600 /swapfile
  sudo mkswap /swapfile
  sudo swapon /swapfile
  grep -q '/swapfile' /etc/fstab || echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
fi
free -h

echo "== 2/7 app user + directories =="
id -u sitehale >/dev/null 2>&1 || sudo useradd --system --shell /usr/sbin/nologin --home "$APP_DIR" sitehale
sudo mkdir -p "$APP_DIR" "$DB_DIR"
sudo chown -R sitehale:sitehale "$APP_DIR" "$DB_DIR"

echo "== 3/7 clone or update =="
if [ -d "$APP_DIR/.git" ]; then
  sudo -u sitehale git -C "$APP_DIR" pull --ff-only
else
  sudo -u sitehale git clone "$REPO" "$APP_DIR"
fi

echo "== 4/7 install + build (postinstall runs prisma generate) =="
cd "$APP_DIR"
sudo -u sitehale env HOME="$APP_DIR" npm ci
sudo -u sitehale env HOME="$APP_DIR" DATABASE_URL="$DB_URL" npm run build

echo "== 5/7 env file (PORT=3001) =="
sudo cp "$APP_DIR/deploy/app.env.example" /etc/sitehale.env
sudo sed -i 's/^PORT=.*/PORT=3001/' /etc/sitehale.env
sudo chown sitehale:sitehale /etc/sitehale.env
sudo chmod 600 /etc/sitehale.env

echo "== 6/7 database migrate + seed =="
sudo -u sitehale env HOME="$APP_DIR" DATABASE_URL="$DB_URL" npx prisma migrate deploy
sudo -u sitehale env HOME="$APP_DIR" DATABASE_URL="$DB_URL" npm run db:seed

echo "== 7/7 systemd service =="
sudo cp "$APP_DIR/deploy/sitehale.service" /etc/systemd/system/sitehale.service
sudo systemctl daemon-reload
sudo systemctl enable --now sitehale
sleep 3
sudo systemctl --no-pager --full status sitehale || true
echo "-- local health check --"
curl -fsS -o /dev/null -w "localhost:3001 -> HTTP %{http_code}\n" http://localhost:3001/ || echo "local curl failed (check journalctl -u sitehale)"
echo "DONE"
