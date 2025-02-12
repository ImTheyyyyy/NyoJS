import http from 'http';
import context from './core/context.js';
import request from './core/request.js';
import response from './core/response.js';
import compose from './utils/compose.js';
import Router from './core/router.js';

class Application {
    constructor() {
        this.middleware = [];
        this.context = Object.create(context);
        this.request = Object.create(request);
        this.response = Object.create(response);
        this.router = new Router();
    }

    use(fn) {
        this.middleware.push(fn);
        return this;
    }

    createContext(req, res) {
        const context = Object.create(this.context);
        const request = context.request = Object.create(this.request);
        const response = context.response = Object.create(this.response);
        context.app = this;
        context.req = request.req = req;
        context.res = response.res = res;
        request.ctx = response.ctx = context;
        request.response = response;
        response.request = request;
        return context;
    }

    handleRequest(req, res) {
        const ctx = this.createContext(req, res);
        const fnMiddleware = compose(this.middleware);
        fnMiddleware(ctx).then(() => {
            const routeHandler = this.router.matchRoute(ctx.method, ctx.url);
            if (routeHandler) {
                return routeHandler(ctx);
            } else {
                res.statusCode = 404;
                res.end('Not Found');
            }
        }).then(() => {
            if (typeof ctx.body === 'object') {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(ctx.body));
            } else {
                res.end(ctx.body);
            }
        }).catch(err => {
            res.statusCode = 500;
            res.end('Internal Server Error');
            console.error(err);
        });
    }

    listen(...args) {
        const server = http.createServer(this.handleRequest.bind(this));
        return server.listen(...args);
    }

    get(path, handler) {
        this.router.get(path, handler);
    }

    post(path, handler) {
        this.router.post(path, handler);
    }

    put(path, handler) {
        this.router.put(path, handler);
    }

    delete(path, handler) {
        this.router.delete(path, handler);
    }
}

export default Application;