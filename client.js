const socket = io();
let currentRoom = "";
let username = "";

function joinRoom() {
  username = document.getElementById("username").value || "Anonim";
  currentRoom = document.getElementById("room").value;
  socket.emit("joinRoom", currentRoom);
  document.getElementById("chat-box").innerHTML += `<div><em>Bergabung ke room ${currentRoom}</em></div>`;
}

function sendMessage() {
  const messageInput = document.getElementById("message");
  const message = messageInput.value;
  if (message && currentRoom) {
    socket.emit("chatMessage", {
      room: currentRoom,
      message: message,
      username: username,
    });
    messageInput.value = "";
  }
}

socket.on("message", ({ username, message }) => {
  const chatBox = document.getElementById("chat-box");
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message");
  msgDiv.innerHTML = `<strong>${username}:</strong> ${message}`;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
});