import "./index.scss";
import { io } from "socket.io-client";
import Experience from "./Experience/Experience.js";
import elements from "./Experience/Utils/functions/elements.js";

// Dom Elements ----------------------------------

const domElements = elements({
    canvas: ".experience-canvas",
    chatContainer: ".chat-container",
    messageSubmitButton: "#chat-message-button",
    messageInput: "#chat-message-input",
    inputWrapper: ".message-input-wrapper",
    nameInputButton: "#name-input-button",
    nameInput: "#name-input",
    avatarLeftImg: ".avatar-left",
    avatarRightImg: ".avatar-right",
});

// Frontend Server ----------------------------------

const socketUrl = new URL("/", window.location.href);
const baseUrl = socketUrl.origin; // Get just the origin (protocol + hostname + port)

// Socket.io connection options for ngrok compatibility
const socketOptions = {
    transports: ["polling", "websocket"], // Try polling first for ngrok compatibility
    upgrade: true,
    rememberUpgrade: false, // Don't remember upgrade for ngrok
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: Infinity,
    timeout: 20000,
    forceNew: false,
    autoConnect: true,
    path: "/socket.io/", // Explicit path for Socket.io
};

// Connect to namespaces - Socket.io handles namespace paths automatically
const chatSocket = io(baseUrl + "/chat", socketOptions);
const updateSocket = io(baseUrl + "/update", socketOptions);
let userName = "";

console.log("Connecting to Socket.io servers:");
console.log("  Chat:", baseUrl + "/chat");
console.log("  Update:", baseUrl + "/update");

// Experience ----------------------------------

const experience = new Experience(domElements.canvas, updateSocket);

// Sockets ----------------------------------

chatSocket.on("connect", () => {
    console.log("Chat: Connected to server with ID " + chatSocket.id);
});

chatSocket.on("connect_error", (error) => {
    console.error("Chat: Connection error:", error);
});

chatSocket.on("disconnect", (reason) => {
    console.log("Chat: Disconnected:", reason);
});

updateSocket.on("connect", () => {
    console.log("Update: Connected to server with ID " + updateSocket.id);
});

updateSocket.on("connect_error", (error) => {
    console.error("Update: Connection error:", error);
});

updateSocket.on("disconnect", (reason) => {
    console.log("Update: Disconnected:", reason);
});

domElements.messageSubmitButton.addEventListener("click", handleMessageSubmit);
domElements.nameInputButton.addEventListener("click", handleNameSubmit);
domElements.chatContainer.addEventListener("click", handleChatClick);
domElements.avatarLeftImg.addEventListener(
    "click",
    handleCharacterSelectionLeft
);
domElements.avatarRightImg.addEventListener(
    "click",
    handleCharacterSelectionRight
);
document.addEventListener("keydown", handleMessageSubmit);

function handleChatClick() {
    if (domElements.inputWrapper.classList.contains("hidden"))
        domElements.inputWrapper.classList.remove("hidden");
}

function handleNameSubmit() {
    const name = domElements.nameInput.value.trim();
    if (!name || name === "") {
        alert("Please enter a valid name!");
        return;
    }
    userName = name;
    chatSocket.emit("setName", userName);
    updateSocket.emit("setName", userName);
    console.log(`Name set to: ${userName}`);
}

function handleCharacterSelectionLeft() {
    updateSocket.emit("setAvatar", "male");

    domElements.avatarLeftImg.removeEventListener(
        "click",
        handleCharacterSelectionLeft
    );
}
function handleCharacterSelectionRight() {
    updateSocket.emit("setAvatar", "female");

    domElements.avatarRightImg.removeEventListener(
        "click",
        handleCharacterSelectionRight
    );
}

function handleMessageSubmit(event) {
    if (event.type === "click" || event.key === "Enter") {
        domElements.inputWrapper.classList.toggle("hidden");
        domElements.messageInput.focus();

        if (domElements.messageInput.value === "") return;
        
        // Ensure user has set a name before sending messages
        if (!userName || userName.trim() === "") {
            alert("Please enter your name first before sending messages!");
            domElements.messageInput.value = "";
            return;
        }

        const message = domElements.messageInput.value.substring(0, 500);
        const time = getTime();
        
        // Display message locally
        displayMessage(userName, message, time);
        
        // Send to other players
        chatSocket.emit("send-message", message, time);
        
        domElements.messageInput.value = "";
    }
}

function getTime() {
    const currentDate = new Date();
    const hours = currentDate.getHours().toString().padStart(2, "0");
    const minutes = currentDate.getMinutes().toString().padStart(2, "0");
    const time = `${hours}:${minutes}`;
    return time;
}

function displayMessage(name, message, time) {
    const messageDiv = document.createElement("div");
    messageDiv.innerHTML = `<span class="different-color">[${time}] ${name}:</span> ${message}`;
    domElements.chatContainer.append(messageDiv);
    domElements.chatContainer.scrollTop =
        domElements.chatContainer.scrollHeight;
}

// Get data from server ----------------------------------

chatSocket.on("recieved-message", (name, message, time) => {
    displayMessage(name, message, time);
});

// Update Socket ----------------------------------------------------
// Connection already handled above with error logging

const audio = document.getElementById("myAudio");

window.addEventListener("keydown", function (e) {
    if (e.code === "Equal") {
        if (!audio.paused) {
            audio.pause();
            audio.currentTime = 0;
        } else {
            audio.play();
        }
    }
});
