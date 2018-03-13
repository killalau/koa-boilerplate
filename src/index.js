require('dotenv').config();

const bunyan = require('bunyan');
const Koa = require('koa');
const Qs = require('koa-qs');
const bodyParser = require('koa-bodyparser');
const Router = require('koa-router');
const koaLogger = require('koa-bunyan');

// server
const app = new Koa();
Qs(app);
app.use(bodyParser());

// logger
const logger = bunyan.createLogger({
  name: 'koa-boilerplate',
  streams: [
    { stream: process.stdout, level: 'debug' },
  ],
});
app.use(koaLogger(logger, { level: 'debug' }));

// router
const router = new Router();
router.get('/hello', async (ctx) => {
  ctx.body = 'world';
});

app.use(router.routes())
  .use(router.allowedMethods());

// start server
const port = process.env.PORT || 3000;
logger.info(`Server start listening on port ${port}`);
app.listen(port);
