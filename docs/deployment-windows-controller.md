# Troubleshooting

This document contains known issues, diagnostics, and fixes encountered when deploying or running Redstone Forge.

The goal is to capture real-world problems encountered during development and deployment so future installations are faster and easier.

---

# Quick Diagnostics

If the system is not working as expected, check the following first:

1. Verify Python is installed
``` 
python --version
```

Expected:
```
Python 3.12.x
```

---

2. Verify the API server is running

Open:
```
http://127.0.0.1:8000/status
```

Expected response:

```
{
  "ok": true,
  "state": "STOPPED",
  "activeServerId": null,
  "activeWorldId": null
}
```

---

3. Verify API documentation
```
http://127.0.0.1:8000/docs
```

If this page loads, the API is running correctly.

---

# Windows Issues
## PowerShell Script Execution Disabled
### Problem
PowerShell blocks execution of scripts when activating a Python virtual environment.

Example error:

```
Activate.ps1 cannot be loaded because running scripts is disabled on this system
```
### Fix

Run PowerShell as your normal user and execute:
```
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```
This allows locally created scripts to run.

---

## PowerShell curl Command Fails
### Problem

PowerShell aliases `curl` to `Invoke-WebRequest`, which does not support standard curl flags.

Example error:
```
Invoke-WebRequest : A parameter cannot be found that matches parameter name 'X'
```
### Fix

Use Invoke-RestMethod instead.

Example:

```
# Start Server
Invoke-RestMethod -Method Post http://127.0.0.1:8000/start

# Stop server:
Invoke-RestMethod -Method Post http://127.0.0.1:8000/stop
```

---

## Python Command Not Found
### Problem

Running python returns:

```
python is not recognized as an internal or external command
```

### Cause

Python was installed without adding it to the system PATH.

### Fix

Reinstall Python and ensure the following option is checked:

```
Add Python to PATH
```

Alternatively verify Python installation using:

```
where python
```

---

# API Issues
## Server Does Not Start
### Symptoms

Running:

```
python -m uvicorn backend.main:app
```

Fails with an import error.

### Possible Causes
- Dependencies not installed
- Virtual environment not active
- Wrong working directory

### Fix

Ensure dependencies are installed:

```
python -m pip install -r backend/requirements.txt
```

Verify the working directory is the project root.

---

## Port Already in Use
### Problem

Server fails to start with:
```
Address already in use
```

### Cause

Another process is already using port **8000**.

### Fix

Option 1 — stop the existing process.

Option 2 — run on a different port.

Example:

```
python -m uvicorn backend.main:app --port 8001
```

---

# Browser Issues
## API Docs Not Loading
### Symptoms

Opening /docs results in an error.

### Checks

Verify server is running:

```
http://127.0.0.1:8000/status
```

If status works but /docs does not, restart the API server.

---

## Swagger Favicon Not Updating
### Status

This is a cosmetic issue and does not impact system functionality.

### Resolution

This issue is currently ignored for MVP.

Future versions may include a customized Swagger UI configuration.

---

# Minecraft Issues (Future)

These troubleshooting steps will be expanded when the Minecraft runner is implemented.

Planned troubleshooting areas:

- Java version mismatch
- Forge loader failures
- World corruption recovery
- Port conflicts
- Mod compatibility errors

---

# Logging

Future versions will include structured logging.

Planned locations:

```
logs/controller.log
logs/minecraft.log
```

These logs will assist with diagnosing runtime issues.

---

# Reporting Issues

When reporting a problem include:
1. Operating system
2. Python version
3. Java version
4. Error messages
5. Steps to reproduce

This information significantly improves debugging efficiency.