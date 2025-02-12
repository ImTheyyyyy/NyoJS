import { nanoid } from 'nanoid';

const sessions = {};

function session(ctx, next) {
    const sessionId = ctx.cookies.get('session_id') || nanoid();
    ctx.cookies.set('session_id', sessionId, { httpOnly: true });
    ctx.session = sessions[sessionId] = sessions[sessionId] || {};
    return next();
}

export default session;