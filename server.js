const Koa = require('koa');
const Router = require('@koa/router');
const app = new Koa();
// deploy to heroku will user environment variable
const PORT = process.env.PORT || 3000;
const router = new Router();
app.use(router.routes());
app.use(router.allowedMethods());
router.get('/test', (ctx) => {
  ctx.body = 'hello word!!!';
});
app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
