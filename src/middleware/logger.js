async function logger(ctx, next) {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
    console.log('Headers:', JSON.stringify(ctx.req.headers, null, 2));
    if (ctx.request.body) {
        console.log('Body:', JSON.stringify(ctx.request.body, null, 2));
    }
}

export default logger;