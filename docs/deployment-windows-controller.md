# Deployment – Windows Controller (Client Machines)

This guide describes how to use Redstone Forge from a Windows PC.

These machines act as **controllers (clients)** only.
This guide is designed for everyday use — no technical setup required.

They do NOT run the backend server.

---

# What This Is

Your PC is used to:
- Open the control panel (in a browser)
- Start and stop the Minecraft server
- Select worlds and mods
- Upload mods (optional)
- Connect to the Minecraft server

The backend runs on a separate **Linux server (NAS)**.

---

# Requirements

- Windows 10 or Windows 11
- Connected to the same home network (LAN) as the server
- A modern web browser:
  - Chrome (recommended)
  - Edge
  - Firefox

---

# 1. Connect to the Control Panel
👉 If you don’t know the server IP, ask the person who set up the server.

Open your browser and go to:
```
http://<server-ip>:8000
```

Example:
```
http://192.168.1.50:8000
```

👉 Bookmark this page for easy access.

---

# 2. Using the Control Panel

## Start the Server

- Click **Start**
- Wait for status to change to **Running**
- This may take a few seconds
- Do not click Start multiple times

## Stop the Server

- Click **Stop**
- Wait for shutdown to complete

---

## Select a World

- Choose a world from the list
- Confirm the change if prompted

⚠️ Changing worlds may overwrite current state  
→ The system will create a backup automatically

---

## Select Mods

- Choose mods from the available list
- Apply changes when prompted

---

# 3. Playing Minecraft

1. Open Minecraft
2. Go to **Multiplayer**
3. Add Server:
```
<server-ip>
```

Example:
```
192.168.1.50
```
4. Click **Join Server**

---

# 4. Uploading Mods (Optional)

If enabled:

- Go to upload section
- Select `.jar` file
- Upload through the browser

Rules:

- Only `.jar` files are allowed
- Large files may be rejected
- Mods that fail validation will be rejected

---

# 5. Optional: Python (Advanced Users Only)

Python is NOT required for normal use.

It may be installed for:

- debugging
- development
- API testing

## Verify Python
```
python --version
```

Expected:
```
Python 3.12+
```

## Example API Test (Optional)

PowerShell:
```
Invoke-RestMethod http://<server-ip>:8000/status
```

---

# 6. Troubleshooting (Basic)

## Cannot Open Control Panel

- Verify correct server IP
- Ensure you are on the same network
- Ask to confirm server is running

---

## Server Won’t Start
- Wait a few seconds and try again
- Ensure a world is selected
- Check with admin (server may be offline)

---

## Minecraft Cannot Connect
- Verify server is running
- Verify correct IP address
- Ensure no typos

---

## Upload Fails
- Ensure file is .jar
- Try a smaller file
- Retry upload

---

## Notes
- Do NOT install the backend on this machine
- Do NOT run the server locally on this machine
- All server operations happen on the Linux backend

---

## Summary

The Windows controller is a simple client interface.

- Browser = control panel
- Backend = server authority
- Minecraft connects directly to the server

This keeps the system:

- simple
- safe
- easy to use