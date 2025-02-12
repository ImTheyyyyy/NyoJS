import { createReadStream } from 'fs';
import { resolve } from 'path';
import { stat } from 'fs/promises';

function serveStatic(root) {
    return async (ctx, next) => {
        const filePath = resolve(root, '.' + ctx.url);
        try {
            const fileStat = await stat(filePath);
            if (fileStat.isFile()) {
                ctx.res.setHeader('Content-Length', fileStat.size);
                ctx.res.setHeader('Content-Type', 'application/octet-stream');
                createReadStream(filePath).pipe(ctx.res);
            } else {
                await next();
            }
        } catch (err) {
            await next();
        }
    };
}

export default serveStatic;