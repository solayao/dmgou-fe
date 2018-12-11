import io from 'socket.io-client';

let socket = null;
const createSocket = () => {
    if (!socket) {
        socket = io(process.env.REACT_APP_SOCKETIO_PATH);
    }
    return socket;
}

export default createSocket;