# NyoJS

NyoJS is a lightweight framework for building web applications with support for middleware, advanced routing, error handling, and more.

## Installation

You can install NyoJS from npm:

```sh
npm install nyo-js
```

## Basic Usage

Here is a basic example of how to use NyoJS:

```javascript
import { NyoJS, Logger, Json, ErrorHandler, Validate, Cookies, Session, ServeStatic, RateLimit, WebSocket } from 'nyo-js';
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
```

## Middleware

### Logger
The enhanced logger middleware logs request details, including headers and request body.

```javascript
import { Logger } from 'NyoJS';

app.use(Logger);
```

## JSON
The JSON middleware automatically parses requests with JSON content.

```javascript
import { Json } from 'NyoJS';

app.use(Json);
```

## Error Handling
The error handling middleware captures and responds to errors uniformly.

```javascript
import { ErrorHandler } from 'NyoJS';

app.use(ErrorHandler);
```

## Data Validation
The validation middleware validates incoming request data against a schema.

```javascript
import { Validate } from 'nyo-js';
import Joi from 'joi';

const schema = Joi.object({
    name: Joi.string().required(),
    age: Joi.number().required()
});

app.post('/data', Validate(schema), async ctx => {
    ctx.body = { message: 'Data received!', data: ctx.request.body };
});
```

## Cookies
The cookies middleware provides methods to get and set cookies.

```javascript
import { Cookies } from 'nyo-js';

app.use(Cookies);
```

## Session
The session middleware provides session management using cookies.

```javascript
import { Session } from 'nyo-js';

app.use(Session);
```

## Static Files
The static middleware serves static files from a specified directory.

```javascript
import { ServeStatic } from 'nyo-js';

app.use(ServeStatic('public'));
```

## Routing
NyoJS supports advanced routing with HTTP methods like GET, POST, PUT, and DELETE.

```javascript
app.get('/path', async ctx => {
    ctx.body = 'GET request';
});

app.post('/path', async ctx => {
    ctx.body = 'POST request';
});
```

## Contributions
Contributions are welcome. Please open an issue or a pull request on GitHub.

## License
This project is licensed under the MIT License.
