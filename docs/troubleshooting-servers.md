# Troubleshooting - Servers (Linux Backend)

This document provides diagnostics and resolution steps for issues affecting the Redstone Forge backend running on a Linux server.

It applies to:
- Linux NAS / server host
- Backend API service
- Minecraft server subprocess

The goal is to diagnose and resolve issues affecting:
- Server availability
- API functionality
- Minecraft runtime
- Data safety

---

# 1. Quick Diagnostics

If the system is not working as expected, check the following first.
 
---

## 1.1 Verify Backend Service
```
sudo systemctl status redstone-forge
```

Expected:
```
active (running)
```

If not running:
- proceed to Section 2.1 (Service Does Not Start)

## 1.2 Verify API Availability

From the server:
```
curl http://localhost:8000/status
```

From another LAN device:
```
http://<server-ip>:8000/status
```

Expected:
```
{
  "ok": true,
  "state": "STOPPED",
  "activeServerId": null,
  "activeWorldId": null
}
```

---

## 1.3 Verify API Documentation

```
http://<server-ip>:8000/docs
```

If this page loads, the API is running correctly.

---

## 1.4 Verify Disk Space
```
df -h
```

Ensure sufficient free space for:
- backups
- logs
- world data

---

# 2. Backend Service Issues

## 2.0 Common Service Commands

Restart backend service:
```
sudo systemctl restart redstone-forge
```

Check status:
```
sudo systemctl status redstone-forge
```

View logs:
```
journalctl -u redstone-forge -f
```

## 2.1 Service Does Not Start

### Symptoms
```
systemctl status redstone-forge
```

Shows:
- failed
- inactive
- restarting repeatedly

### Fix

Check logs:
```
journalctl -u redstone-forge -f
```


Common causes:
- Missing Python dependencies
- Incorrect working directory
- Invalid `.env` configuration
- Permission issues

---

## 2.2 Port Already in Use

### Problem
```
Address already in use
```


### Fix

Identify process:
```
sudo lsof -i:8000
```
Stop the process or change port.

---

## 2.3 Backend Bound to Wrong Interface

### Symptoms

- API works locally but not from other machines

### Fix

Ensure backend is started with:
```
--host 0.0.0.0
```

Or bound to correct LAN IP.

---

## 2.4 Firewall Blocking Access

### Symptoms

- API not reachable from other devices

### Fix

Check firewall:
```
sudo ufw status
```


Allow LAN access:
```
sudo ufw allow from 192.168.0.0/16 to any port 8000
```

---

## 2.5 Environment Configuration Issues

### Symptoms

- Server fails to start
- Unexpected runtime behavior

### Fix

Verify `.env` file:
```
APP_HOST=0.0.0.0
APP_PORT=8000
DATA_ROOT=/srv/redstone-forge/data
```

Ensure:
- Paths exist
- Permissions are correct

---

# 3. Python / Environment Issues

## 3.1 Python Not Installed

### Problem
```
python: command not found
```

### Fix

Install Python:
```
sudo apt install python3 python3-venv python3-pip
```

Verify:
```
python3 --version
```

Expected:
```
Python 3.12.x
```

---

## 3.2 Dependencies Not Installed

### Symptoms

Import errors when starting backend

### Fix
```
./.venv/bin/python -m pip install -r backend/requirements.txt
```

---

## 3.3 Virtual Environment Issues

### Problem

Wrong Python or pip used

### Fix

Always use:
```
./.venv/bin/python -m pip ...
```

---

# 4. API Issues

## 4.1 Server Does Not Start (Manual Run)

### Symptoms
```
python -m uvicorn backend.main:app
```

Fails

### Causes

- Dependencies missing
- Wrong working directory
- Incorrect environment

### Fix

- Run from project root
- Use correct Python interpreter
- Install dependencies

---

## 4.2 API Returns Errors

### Symptoms

- Requests fail
- Unexpected responses

### Fix

- Check backend logs
- Validate request payloads
- Verify server state

---

# 5. Minecraft Runtime Issues

## 5.1 Server Does Not Start

### Symptoms

- Start request fails
- No logs or immediate crash

### Fix

- Check backend logs
```
journalctl -u redstone-forge -f
```
- Check Minecraft logs
```
/srv/redstone-forge/data/logs/
```
- Verify server configuration


---

## 5.2 Java Version Mismatch

### Symptoms

- Minecraft fails during startup

### Fix

Verify Java version:
```
java -version
```

Expected:
```
OpenJDK 17
```

---

# 6. Storage & Disk Issues

## 6.1 Disk Full

### Symptoms

- Server fails to start
- Backups fail
- Writes fail

### Fix

Check disk usage:
```
df -h
```

Check largest directories:
```
du -sh /srv/redstone-forge/*
```

Clean:
- old backups
- logs
- unused worlds

---

## 6.2 Backup Growth

### Problem

Backups accumulate indefinitely

### Fix

- Implement retention policy
- Manually clean old backups

---

# 7. Logging

View backend logs:
```
journalctl -u redstone-forge -f
```

Future structured logs:
```
/srv/redstone-forge/data/logs/controller.log
/srv/redstone-forge/data/logs/minecraft.log
```

Logs are the primary source of truth for diagnosing issues.

---

# 8. Network Issues

## 8.1 Cannot Reach Server from LAN

### Fix

- Verify server is running
- Verify correct IP address
- Check firewall rules
- Ensure same network

---

## 8.2 Incorrect IP Address

### Fix

Find server IP:
```
ip a
```

Use correct LAN IP in browser.

---

# 9. Reporting Issues

When reporting a problem include:

1. Operating system
2. Python version
3. Java version
4. Error messages
5. Steps to reproduce

This significantly improves debugging efficiency.

---

# Summary

Troubleshooting the Redstone Forge server follows a layered approach:

1. Verify backend service
2. Verify API availability
3. Verify network connectivity
4. Check logs for root cause
5. Validate Minecraft runtime

The system is designed to expose enough state and logging to diagnose issues quickly while maintaining a secure LAN-only deployment model.