class Router {
    constructor() {
        this.routes = {
            GET: [],
            POST: [],
            PUT: [],
            DELETE: []
        };
    }

    get(path, handler) {
        this.routes.GET.push({ path, handler });
    }

    post(path, handler) {
        this.routes.POST.push({ path, handler });
    }

    put(path, handler) {
        this.routes.PUT.push({ path, handler });
    }

    delete(path, handler) {
        this.routes.DELETE.push({ path, handler });
    }

    matchRoute(method, url) {
        const routes = this.routes[method];
        for (const route of routes) {
            if (route.path === url) {
                return route.handler;
            }
        }
        return null;
    }

    routes() {
        return async (ctx, next) => {
            const handler = this.matchRoute(ctx.method, ctx.url);
            if (handler) {
                await handler(ctx, next);
            } else {
                await next();
            }
        };
    }
}

export default Router;