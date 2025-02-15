const rateLimit = (options) => {
    const { windowMs, max } = options;
    const hits = new Map();

    return async (ctx, next) => {
        const ip = ctx.req.ip || ctx.req.connection.remoteAddress;
        const now = Date.now();

        if (!hits.has(ip)) {
            hits.set(ip, []);
        }

        const timestamps = hits.get(ip);
        timestamps.push(now);
        
        while (timestamps.length && timestamps[0] <= now - windowMs) {
            timestamps.shift();
        }

        if (timestamps.length > max) {
            ctx.status = 429;
            ctx.body = 'Too Many Requests';
        } else {
            await next();
        }
    };
};

export default rateLimit;