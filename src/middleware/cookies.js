import cookie from 'cookie';

function cookies(ctx, next) {
    ctx.cookies = {
        get: (name) => {
            const cookies = cookie.parse(ctx.req.headers.cookie || '');
            return cookies[name];
        },
        set: (name, value, options) => {
            const setCookie = cookie.serialize(name, value, options);
            ctx.res.setHeader('Set-Cookie', setCookie);
        }
    };
    return next();
}

export default cookies;