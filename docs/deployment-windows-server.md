# Deployment – Windows Server

This guide describes running Redstone Forge and Minecraft directly on a Windows machine.

This configuration is intended for:

- development
- testing
- temporary hosting

---

# Prerequisites

Required software:

- Python 3.12
- Temurin JDK 17
- Git

Recommended:

- Windows Defender enabled
- LAN network set to **Private**

---

# Installation Steps

## Clone Repository

```
git clone <repo-url>
cd redstone-forge
```

---

## Create Python Environment

```
python -m venv .venv
```

---

## Install Dependencies

```
.\.venv\Scripts\python.exe -m pip install -r backend\requirements.txt
```

---

## Start Redstone Forge API

```
.\.venv\Scripts\python.exe -m uvicorn backend.main:app --reload --host 127.0.0.1 --port 8000
```

Server will start at:

```
http://127.0.0.1:8000
```

---

## Verify Server Status

Open in browser
```
http://127.0.0.1:8000/status
```

Expected output:
```
{
  "ok": true,
  "state": "STOPPED",
  "activeServerId": null,
  "activeWorldId": null
}
```

---

## Testing API Endpoints
### Start Server (Mock)
PowerShell:
```
Invoke-RestMethod -Method Post http://127.0.0.1:8000/start
```

---

### Stop Server (Mock)
PowerShell:
```
Invoke-RestMethod -Method Post http://127.0.0.1:8000/stop
```

---

## Access API Documentation
Swagger UI:
```
http://127.0.0.1:8000/docs
```

---

## Stopping the API
Press:
```
CTRL + C
```

---

# Troubleshooting
## PowerShell Execution Policy
If scripts are blocked:
```
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

---

## PowerShell curl Alias
PowerShell aliases `curl` to `Invoke-WebRequest`.

Uses:
```
Invoke-RestMethod
```
instead of curl syntax

## Python Not FOund
Verify Python installation:

```
python --version
```

If not found, reinstall Python and ensure Add Python to PATH is enabled.