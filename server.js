
process.env.PORT = 5555
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new Router();

var views = require('koa-views');

// Must be used before any router is used
app.use(views(__dirname + '/views', {
  map: {
    html: 'mustache'
  }
}));


app.use(bodyParser());

app.use(async (ctx, next) => {
  try {
    await next();
  } catch(err) {
    if(err.status === 401) {
      ctx.body = { message: 'Unauthorized access.' };
      ctx.status = 401;
    } else {
      ctx.body = { message: err.message };
      ctx.status = err.status || 500;
    }
  }
});

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    name: 'Robert'
  });
});

router.get('/picture_upload', async (ctx, next) => {
  await ctx.render('picture_upload', {
   
  });
});


router.post('/picture_upload_result', async (ctx, next) => {
  await ctx.render('picture_upload_result', {
   
  });
});


app.use(router.routes());

app.listen(process.env.PORT);
console.log(`Server up and running! On port ${process.env.PORT}!`);
