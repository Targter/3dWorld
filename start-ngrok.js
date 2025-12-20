import { spawn } from "child_process";
import http from "http";

const port = process.env.PORT || 3005;

// Check if ngrok is available
const checkNgrok = () => {
    return new Promise((resolve) => {
        const ngrok = spawn("ngrok", ["version"], { shell: true });
        ngrok.on("close", (code) => {
            resolve(code === 0);
        });
        ngrok.on("error", () => {
            resolve(false);
        });
    });
};

// Start ngrok tunnel
const startNgrok = async () => {
    const ngrokAvailable = await checkNgrok();
    
    if (!ngrokAvailable) {
        console.log("⚠️  Ngrok not found. Installing via npm...");
        const install = spawn("npm", ["install", "-g", "ngrok"], { shell: true, stdio: "inherit" });
        install.on("close", async (code) => {
            if (code === 0) {
                console.log("✅ Ngrok installed. Please configure your authtoken:");
                console.log("   1. Sign up at https://dashboard.ngrok.com/signup");
                console.log("   2. Get your authtoken from https://dashboard.ngrok.com/get-started/your-authtoken");
                console.log("   3. Run: ngrok config add-authtoken YOUR_TOKEN");
                console.log("   4. Then run this script again");
            }
        });
        return;
    }

    console.log("🚀 Starting ngrok tunnel on port", port);
    console.log("📡 Waiting for ngrok to establish connection...\n");

    const ngrok = spawn("ngrok", ["http", port.toString()], {
        shell: true,
        stdio: "pipe",
    });

    let output = "";
    ngrok.stdout.on("data", (data) => {
        output += data.toString();
        // Try to extract URL from ngrok output
        const urlMatch = output.match(/https:\/\/[a-z0-9-]+\.ngrok-free\.app/);
        if (urlMatch) {
            const publicUrl = urlMatch[0];
            console.log("\n✅ Ngrok tunnel is active!");
            console.log("🌐 Public URL:", publicUrl);
            console.log("\n📋 Share this URL with others to collaborate:");
            console.log("   " + publicUrl);
            console.log("\n💡 Players can:");
            console.log("   - See each other's avatars in real-time");
            console.log("   - Chat with each other");
            console.log("   - Move around the 3D campus together");
            console.log("\n⚠️  Note: First-time visitors may need to click 'Visit Site' on ngrok's warning page");
        }
    });

    ngrok.stderr.on("data", (data) => {
        const error = data.toString();
        if (error.includes("authtoken") || error.includes("authentication")) {
            console.log("\n❌ Ngrok authentication required!");
            console.log("\n📝 To set up ngrok:");
            console.log("   1. Sign up at https://dashboard.ngrok.com/signup (free account)");
            console.log("   2. Get your authtoken from https://dashboard.ngrok.com/get-started/your-authtoken");
            console.log("   3. Run: ngrok config add-authtoken YOUR_TOKEN");
            console.log("   4. Then run this script again\n");
        } else {
            process.stderr.write(data);
        }
    });

    ngrok.on("close", (code) => {
        if (code !== 0) {
            console.log("\n⚠️  Ngrok process exited. Make sure ngrok is properly configured.");
        }
    });

    // Also try to get URL from ngrok API after a delay
    setTimeout(async () => {
        try {
            const response = await fetch("http://127.0.0.1:4040/api/tunnels");
            const data = await response.json();
            if (data.tunnels && data.tunnels.length > 0) {
                const tunnel = data.tunnels[0];
                console.log("\n✅ Ngrok tunnel is active!");
                console.log("🌐 Public URL:", tunnel.public_url);
                console.log("\n📋 Share this URL with others:");
                console.log("   " + tunnel.public_url);
            }
        } catch (error) {
            // API not available yet, that's okay
        }
    }, 3000);
};

startNgrok();

