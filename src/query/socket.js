import io from 'socket.io-client';

let socket = null;
const createSocket = () => {
    if (!socket) {
        socket = io();
    }
    return socket;
}

export default createSocket;