async function loadUsers() {
    const response = await fetch("/user/list");
    const users = await response.json();
    const userSelect = document.getElementById("userSelect");
    userSelect.innerHTML = users.map(user => `<option value="${user.id}">${user.nickname}</option>`).join("");
}

async function loadMessages() {
    const response = await fetch("/chat/messages");
    const messages = await response.json();
    const chatBox = document.getElementById("chatBox");
    chatBox.innerHTML = messages.map(msg => `
        <p><strong>${msg.userNickname}</strong>: ${msg.content} <em>(${msg.timestamp})</em></p>
    `).join("");
}

document.getElementById("messageForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const userId = document.getElementById("userSelect").value;
    const message = document.getElementById("message").value;

    const response = await fetch("/chat/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, message }),
    });

    if (response.ok) {
        loadMessages();
    } else {
        alert("Erro ao enviar mensagem.");
    }
});

loadUsers();
loadMessages();
