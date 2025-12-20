# Ngrok Setup Guide for 3D University Campus

This guide will help you set up ngrok to make your 3D University Campus accessible to others for multiplayer collaboration.

## Quick Start

### Option 1: Using the Script (Easiest)

1. Make sure your server is running:
   ```bash
   npm run dev
   ```

2. In a new terminal, run:
   ```bash
   npm run ngrok
   ```
   OR
   ```bash
   powershell -ExecutionPolicy Bypass -File ./start-ngrok.ps1
   ```

### Option 2: Manual Setup

1. **Install ngrok** (if not already installed):
   ```bash
   npm install -g ngrok
   ```

2. **Sign up for a free ngrok account**:
   - Go to https://dashboard.ngrok.com/signup
   - Create a free account

3. **Get your authtoken**:
   - After signing up, go to https://dashboard.ngrok.com/get-started/your-authtoken
   - Copy your authtoken

4. **Configure ngrok**:
   ```bash
   ngrok config add-authtoken YOUR_TOKEN_HERE
   ```

5. **Start ngrok tunnel**:
   ```bash
   ngrok http 3005
   ```

6. **Share the public URL**:
   - Copy the `https://xxxxx.ngrok-free.app` URL
   - Share it with others who want to join

## Features Enabled

Once ngrok is running, players can:

✅ **See each other's avatars** in real-time  
✅ **Chat with each other** using the chat box  
✅ **Move around together** in the 3D campus  
✅ **See nametags** above other players  

## How to Use

1. **First Player (Host)**:
   - Start the server: `npm run dev`
   - Start ngrok: `npm run ngrok`
   - Share the ngrok URL with others

2. **Other Players**:
   - Open the ngrok URL in their browser
   - Click "Visit Site" if they see ngrok's warning page
   - Enter their name
   - Select an avatar (male or female)
   - Start playing!

## Troubleshooting

### Ngrok authentication error?
- Make sure you've signed up at https://dashboard.ngrok.com/signup
- Run: `ngrok config add-authtoken YOUR_TOKEN`

### Players not visible?
- Make sure both players have:
  - Entered their name
  - Selected an avatar (male or female)
- Check browser console for errors

### Chat not working?
- Make sure you've entered your name before sending messages
- Check that both players are connected to the same ngrok URL

### Port already in use?
- Change the port in `server.js` (line 6) or set `PORT` environment variable
- Update ngrok command: `ngrok http NEW_PORT`

## Notes

- The ngrok free tier provides a random URL each time you start it
- For a permanent URL, consider upgrading to ngrok's paid plan
- Keep the ngrok terminal/window open to maintain the tunnel
- First-time visitors will see ngrok's warning page - they need to click "Visit Site"

