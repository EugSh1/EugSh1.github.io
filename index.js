let conn;
let customPeerId;

customPeerId = prompt("Enter your username:");

const peer = new Peer(customPeerId, {});

peer.on("open", (id) => {
    const displayYourPeerId = document.getElementById("your-peer-id");
    yourUsername = id;
    displayYourPeerId.innerText = `Your username is: ${id}`;
});

peer.on("connection", (incomingConn) => {
    conn = incomingConn;

    conn.on("data", (data) => {
        const messageOutput = document.createElement("p");
        messageOutput.textContent = `${data.senderUsername}: ${data.message}`;
        document.body.appendChild(messageOutput);
    });
});

function handleInputFriendPeerId() {
    const inputValue = document.getElementById("input-friend-peer-id").value;
    connectToPeer(inputValue);
}

function sendMessage() {
    const messageInputValue = document.getElementById("message-input").value;
    const dataToSend = { senderUsername: customPeerId, message: messageInputValue };

    conn.send(dataToSend);

    const messageOutput = document.createElement("p");
    messageOutput.textContent = `${dataToSend.senderUsername}: ${dataToSend.message}`;
    document.body.appendChild(messageOutput);
}

function connectToPeer(peerId) {
    conn = peer.connect(peerId);

    conn.on("data", (data) => {
        const messageOutput = document.createElement("p");
        messageOutput.textContent = `${data.senderUsername}: ${data.message}`;
        document.body.appendChild(messageOutput);
    });
}