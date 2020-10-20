const path = require('path');
const Koa = require('koa');
const Router = require('@koa/router');
const multer = require('@koa/multer');
const cors = require('@koa/cors');
const serve = require('koa-static');
const app = new Koa();


// deploy to heroku will user environment variable
const PORT = process.env.PORT || 3000;
const router = new Router();
const upload = multer({ dest: 'uploads' })
app.use(serve('uploads'))
app.use(cors());
app.use(router.routes());
app.use(router.allowedMethods());

router.post('/upload', upload.array('file'), async (ctx) => {
  const domain = ctx.protocol + '://' + ctx.host
  const fileList = ctx.files.map(file => {
    const { path, originalname } = file
    return {
      path: domain + '/' + path,
      filename: originalname
    }
  })
  ctx.body = {
    code: 200,
    data: fileList,
    message: '成功'
  }
})
app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
