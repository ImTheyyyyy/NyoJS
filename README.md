# NanoUI

NanoUI is a lightweight framework for building web applications with support for middleware, advanced routing, error handling, and more.

## Installation

You can install NanoUI from npm:

```sh
npm install nyo-js
```

## Basic Usage

Here is a basic example of how to use NanoUI:

```javascript
import { NyoJS, Logger, Json, ErrorHandler, Validate, Cookies, Session, ServeStatic } from 'nyo-js';
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
```

## Middleware

### Logger
The enhanced logger middleware logs request details, including headers and request body.

```javascript
import { Logger } from 'nanoui';

app.use(Logger);
```

## JSON
The JSON middleware automatically parses requests with JSON content.

```javascript
import { Json } from 'nanoui';

app.use(Json);
```

## Error Handling
The error handling middleware captures and responds to errors uniformly.

```javascript
import { ErrorHandler } from 'nanoui';

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
NanoUI supports advanced routing with HTTP methods like GET, POST, PUT, and DELETE.

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