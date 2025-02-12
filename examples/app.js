import { NyoJS, Logger, Json, ErrorHandler, Validate, Cookies, Session, ServeStatic } from '../lib/index.js';
import Joi from 'joi';

const app = new NyoJS();

app.use(ErrorHandler);
app.use(Logger);
app.use(Json);
app.use(Cookies);
app.use(Session);
app.use(ServeStatic('public'));

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

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});