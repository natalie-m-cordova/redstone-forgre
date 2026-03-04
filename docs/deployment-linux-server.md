# Deployment – Linux Server

This guide describes running Redstone Forge on a Linux server.

This is the **recommended long-term hosting configuration**.

---

# Expected Environment

- Linux distribution with systemd
- Python 3.12
- Temurin JDK 17
- LAN network access

---

# Directory Layout

Recommended location:
```
/srv/minecraft/
```

Example layout:

```
/srv/minecraft/
├─ controller/
├─ profiles/
├─ worlds/
├─ backups/
└─ logs/
```


---

# Installation Steps

## Install Dependencies

Example for Debian/Ubuntu:

```
sudo apt update
sudo apt install python3 python3-venv git openjdk-17-jdk
```

---

## Clone Repository

```
git clone <repo-url>
cd redstone-forge
```

---

## Create Virtual Environment

```
python3 -m venv .venv
```

---

## Install Dependencies

```
./.venv/bin/python -m pip install -r backend/requirements.txt
```

---

## Start API Server
```
./.venv/bin/python -m uvicorn backend.main:app --host 0.0.0.0 --port 8000
```

---

## Verify Server
```
curl http://localhost:8000/status
```

---

## Planned Systemd Integration

Future versions will include systemd services:

- redstone-controller.service
- minecraft-server.service

These will allow:
- automatic startup
- restart policies
- log management