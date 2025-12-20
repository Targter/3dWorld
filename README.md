# 🌍 3D World - Immersive Multiplayer Virtual Campus

<div align="center">

![3D World](https://img.shields.io/badge/3D-World-blue?style=for-the-badge)
![Multiplayer](https://img.shields.io/badge/Multiplayer-Enabled-green?style=for-the-badge)
![WebGL](https://img.shields.io/badge/WebGL-Three.js-orange?style=for-the-badge)

**An immersive 3D multiplayer virtual reality experience where students can interact, learn, and explore together in a shared virtual campus environment.**

[Features](#-features) • [Getting Started](#-getting-started) • [Usage](#-usage) • [Technology Stack](#-technology-stack) • [Contributing](#-contributing)

</div>

---

## ✨ Features

### 🎮 Core Features
- **🌐 Multiplayer Support** - Real-time synchronization with multiple players
- **💬 Real-time Chat** - Communicate with other players in the virtual world
- **👤 Customizable Avatars** - Choose between male and female character models
- **🏃 Smooth Movement** - WASD controls with running, jumping, and dancing animations
- **📱 Mobile Support** - Touch controls and joystick for mobile devices
- **🎨 Beautiful 3D Graphics** - High-quality rendered 3D campus environment

### 🎯 Interactive Elements
- **Real-time Player Visibility** - See other players' avatars and movements
- **Nametags** - Display player names above avatars
- **Synchronized Animations** - Walking, running, jumping, and dancing animations
- **Camera Controls** - Pan, zoom, and rotate camera views
- **Optimized Performance** - Efficient rendering with frustum culling and performance optimizations

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/theyashdhiman04/3dWorld.git
   cd 3dWorld
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Navigate to `http://localhost:3005`
   - Enter your name
   - Select an avatar
   - Start exploring!

---

## 🎮 Usage

### Controls

#### Desktop
- **WASD** - Move character
- **SHIFT** - Run
- **SPACE** - Jump
- **ENTER** - Open chat
- **Click & Drag** - Pan camera
- **Middle Mouse** - Zoom
- **O** - Dance

#### Mobile
- **Joystick** - Move character
- **Touch Controls** - Camera and interactions

### Multiplayer Setup

To enable multiplayer collaboration:

1. **Start the server**
   ```bash
   npm run dev
   ```

2. **Set up ngrok** (for public access)
   ```bash
   npm run ngrok
   ```

3. **Share the ngrok URL** with other players

For detailed ngrok setup instructions, see [NGROK_SETUP.md](./NGROK_SETUP.md)

---

## 🛠️ Technology Stack

### Frontend
- **Three.js** - 3D graphics rendering
- **Socket.io Client** - Real-time communication
- **Vite** - Build tool and dev server
- **GSAP** - Animation library
- **SCSS** - Styling

### Backend
- **Node.js** - Runtime environment
- **Express** - Web server
- **Socket.io** - WebSocket server for real-time updates
- **Nodemon** - Development auto-reload

### 3D Assets
- **GLTF/GLB Models** - 3D models and animations
- **Draco Compression** - Optimized model loading
- **Texture Mapping** - High-quality textures

---

## 📁 Project Structure

```
3dWorld/
├── frontend/
│   ├── Experience/          # Core 3D experience
│   │   ├── Camera.js        # Camera controls
│   │   ├── Renderer.js      # WebGL renderer
│   │   ├── World/           # 3D world components
│   │   │   ├── Player/      # Player logic and avatars
│   │   │   └── Westgate.js  # Campus environment
│   │   └── Utils/           # Utilities and loaders
│   ├── styles/              # SCSS stylesheets
│   ├── index.html           # Main HTML
│   └── index.js             # Entry point
├── public/
│   ├── models/              # 3D model files
│   ├── textures/            # Texture images
│   └── fonts/               # Custom fonts
├── server.js                # Express server
└── package.json             # Dependencies
```

---

## 🎨 Features in Detail

### Real-time Multiplayer
- **Synchronized Positions** - Player positions update every 20ms
- **Smooth Interpolation** - Smooth movement between updates
- **Player Management** - Automatic player join/leave handling

### Chat System
- **Real-time Messaging** - Instant message delivery
- **Name-based Chat** - Messages tagged with player names
- **Timestamp Display** - Messages show time sent

### Performance Optimizations
- **Frustum Culling** - Only render visible objects
- **Pixel Ratio Limiting** - Optimized for performance
- **Efficient Rendering** - Optimized WebGL settings

---

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev              # Start dev server with hot reload

# Frontend
npm run frontend-dev     # Start Vite dev server
npm run frontend-build   # Build frontend with watch

# Backend
npm run backend-dev      # Start backend with nodemon
npm run backend-build    # Start backend server

# Deployment
npm run ngrok            # Start ngrok tunnel for public access
```

---

## 🌐 Deployment

### Local Development
```bash
npm run dev
```

### Production Build
```bash
npm run frontend-build
npm run backend-build
```

### Public Access (ngrok)
```bash
npm run ngrok
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE.md](./LICENSE.md) file for details.

---

## 👤 Author

**Yash Dhiman**

- GitHub: [@theyashdhiman04](https://github.com/theyashdhiman04)
- Repository: [3dWorld](https://github.com/theyashdhiman04/3dWorld)

---

## 🙏 Acknowledgments

- Built with [Three.js](https://threejs.org/)
- Real-time communication powered by [Socket.io](https://socket.io/)
- 3D models and assets created for immersive experience

---

<div align="center">

**Made with ❤️ by Yash Dhiman**

⭐ Star this repo if you find it helpful!

</div>
