async function json(ctx, next) {
    if (ctx.req.headers['content-type'] === 'application/json') {
        try {
            ctx.request.body = await new Promise((resolve, reject) => {
                let data = '';
                ctx.req.on('data', chunk => {
                    data += chunk;
                });
                ctx.req.on('end', () => {
                    try {
                        resolve(JSON.parse(data));
                    } catch (err) {
                        reject(err);
                    }
                });
            });
        } catch (err) {
            ctx.throw(400, 'Invalid JSON');
        }
    }
    await next();
}

export default json;