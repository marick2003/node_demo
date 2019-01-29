socket = io.connect('ws://localhost:3000');

socket.on('message', (obj) => {
    console.log(obj);
});