import { NyoJS, Logger, Json, ErrorHandler, Validate, Cookies, Session, ServeStatic, RateLimit, WebSocket, TaskScheduler } from '../src/index.cjs';
import Joi from 'joi';
import http from 'http';

const app = new NyoJS();

app.use(ErrorHandler);
app.use(Logger);
app.use(Json);
app.use(Cookies);
app.use(Session);
app.use(ServeStatic('public'));
app.use(RateLimit({ windowMs: 60000, max: 100 })); // Limit to 100 requests per minute
app.use(TaskScheduler()); // Enable task scheduling

const schema = Joi.object({
    name: Joi.string().required(),
    age: Joi.number().required()
});

app.post('/data', Validate(schema), async ctx => {
    ctx.body = { message: 'Data received!', data: ctx.request.body };
});

app.get('/', async ctx => {
    ctx.body = 'Hello, NyoJS!';
});

// Example of scheduling a task
app.use(async ctx => {
    ctx.schedule.scheduleJob('*/1 * * * *', () => {
        console.log('Task executed every minute');
    });
});

const server = http.createServer(app.handleRequest.bind(app));
app.use(WebSocket(server));

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});