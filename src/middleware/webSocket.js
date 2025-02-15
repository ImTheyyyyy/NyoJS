import { WebSocketServer } from 'ws';

function webSocket(server) {
    const wss = new WebSocketServer({ server });

    wss.on('connection', (ws, req) => {
        ws.on('message', (message) => {
            console.log('received: %s', message);
        });

        ws.send('something');
    });

    return async (ctx, next) => {
        ctx.wss = wss;
        await next();
    };
}

export default webSocket;