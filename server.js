const path = require('path');
const Koa = require('koa');
const Router = require('@koa/router');
const multer = require('@koa/multer');
const cors = require('@koa/cors');
const serve = require('koa-static');
const app = new Koa();


// deploy to heroku will use environment variable
const PORT = process.env.PORT || 3000;
const router = new Router();
const upload = multer({ dest: 'uploads' });
app.use(serve('.'));
app.use(cors());
app.use(router.routes());
app.use(router.allowedMethods());

router.post('/upload', upload.single('file'), async (ctx) => {
  const domain = ctx.protocol + '://' + ctx.host + '/';
  const { path, originalname } = ctx.file;
  const data = { path: domain + path, filename: originalname };
  ctx.body = {
    code: 200,
    data,
    message: '成功'
  };
})
app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
