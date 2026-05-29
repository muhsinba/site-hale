#!/usr/bin/env bash
# Pull latest, rebuild, re-seed the DB, and restart site-hale. Idempotent.
set -euo pipefail

APP_DIR="/opt/sitehale"
DB_URL="file:/var/lib/sitehale/prod.db"

cd "$APP_DIR"
sudo -u sitehale git pull --ff-only
# npm ci only when dependencies changed
sudo -u sitehale env HOME="$APP_DIR" npm ci
sudo -u sitehale env HOME="$APP_DIR" DATABASE_URL="$DB_URL" npm run build
sudo -u sitehale env HOME="$APP_DIR" DATABASE_URL="$DB_URL" npm run db:seed
sudo systemctl restart sitehale
sleep 3
curl -fsS -o /dev/null -w "localhost:3001 -> HTTP %{http_code}\n" http://localhost:3001/ || echo "local curl failed"
echo "REDEPLOY DONE"
