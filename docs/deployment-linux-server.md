# Deployment – Linux Server

This guide describes deploying Redstone Forge on a Linux server.

This is the **primary and recommended deployment model (Stage 1)**.

---

# Expected Environment

- Linux distribution with systemd
- Python 3.12+
- Temurin JDK 17
- LAN network access only
- Static IP or DHCP reservation recommended

---

# Directory Layout

Recommended root:

```
/srv/redstone-forge/
```

Example layout:

```
/srv/redstone-forge/
├─ controller/ # application code
├─ data/
│ ├─ servers/
│ ├─ worlds/
│ ├─ mods/
│ ├─ uploads/
│ │ └─ quarantine/
│ ├─ backups/
│ ├─ logs/
│ └─ database/
```
Notes:
- `/uploads/quarantine` is treated as **untrusted input**
- `/data` must persist across restarts
- No runtime data should exist inside the application directory

---

# Installation Steps

## 1. Install Dependencies

Debian/Ubuntu example:
```
sudo apt update
sudo apt install python3 python3-venv python3-pip git openjdk-17-jdk
```

---

## 2. Create Application Directory

```
sudo mkdir -p /srv/redstone-forge
sudo chown -R $USER:$USER /srv/redstone-forge
cd /srv/redstone-forge
```

---

## 3. Clone Repository

```
git clone <repo-url> controller
cd controller
```

---

## 4. Create Virtual Environment

```
python3 -m venv .venv
```

---

## 5. Install Python Dependencies

```
./.venv/bin/python -m pip install -r backend/requirements.txt
```

---

## 6. Configure Environment

Create `.env` file:

```
APP_HOST=0.0.0.0
APP_PORT=8000

DATA_ROOT=/srv/redstone-forge/data
```

👉 No hardcoded paths in code — configuration must live here

---

## 7. Test Manual Startup

```
./.venv/bin/python -m uvicorn backend.main:app
--host 0.0.0.0
--port 8000
```

---

## 8. Verify Server

```
curl http://localhost:8000/status
```

---

# Systemd Service (Required)

Create service:

```
sudo nano /etc/systemd/system/redstone-forge.service
```

```
[Unit]
Description=Redstone Forge Backend
After=network.target

[Service]
User=<your-user>
WorkingDirectory=/srv/redstone-forge/controller
EnvironmentFile=/srv/redstone-forge/controller/.env

ExecStart=/srv/redstone-forge/controller/.venv/bin/uvicorn backend.main:app --host 0.0.0.0 --port 8000

Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
```

---

## Enable and Start

```
sudo systemctl daemon-reexec
sudo systemctl daemon-reload
sudo systemctl enable redstone-forge
sudo systemctl start redstone-forge
```

---

## Check Status

```
sudo systemctl status redstone-forge
```

---

## View Logs

```
journalctl -u redstone-forge -f
```

---

# Firewall Configuration (LAN Only)

Example using UFW:

```
sudo ufw allow from 192.168.0.0/16 to any port 8000
sudo ufw enable
```

👉 Ensure:
- No public access
- Only LAN subnet allowed

---

# Minecraft Server Execution

- Minecraft server is launched by backend subprocess
- Must not be run manually
- Controlled entirely by backend API

---

# Security Notes

- Backend must NOT be exposed to the public internet
- No port forwarding on router
- Bind only to LAN interface
- Treat all uploads as untrusted
- Use backup safeguards before destructive operations

---

# Summary

This deployment provides:

- A dedicated Linux-hosted backend
- Persistent storage separation
- Controlled process lifecycle via systemd
- LAN-only secure access model

This aligns with:
- Architecture invariants
- Threat model protections
- Stage 1 deployment requirements