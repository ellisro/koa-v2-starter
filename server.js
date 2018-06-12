
process.env.PORT = 5555
const Koa = require('koa');
const Router = require('koa-router');
// const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');

const app = new Koa();
const router = new Router();

const multer = require('koa-multer');
const upload = multer({ dest: './files/' });

var views = require('koa-views');

// Must be used before any router is used

const error = require('./server/error');
const hbs = require('koa-hbs');

const User = require('./server/User')
const Picture = require('./server/Picture')


// app.use(views(__dirname + '/views', {
//   map: { html: 'mustache' }
// }));

// koa-hbs is middleware. `use` it before you want to render a view
app.use(hbs.middleware({
  viewPath: __dirname + '/views/',
  partialsPath: __dirname + '/views/partials/',
  layoutsPath: __dirname + '/views/layouts/',
  extname: '.html'
}));


// app.use(bodyParser());

app.use(error);


app.use(serve(__dirname + '/public'));

router.get('/', async (ctx, next) => {
  await ctx.render('index', { name: 'Robert' });
});

router.get('/picture_upload/:pictureId?', async (ctx, next) => {
  let picture = ctx.params.id && await Picture.find(picture => {
    return picture.id === ctx.params.id
  })
  await ctx.render('picture_upload', { picture });
});


router.post('/picture_upload_result', upload.single('picture'), async (ctx, next) => {

  await ctx.render('picture_upload_result', {
   file: ctx.req.file
  });
});

router.post('/users/:id?', upload.single('picture'), async (ctx, next) => {

  let user = ctx.params.id && await User.find(user => {
    return user.id === ctx.params.id
  })
  await ctx.render('picture_upload_result', {
   file: ctx.req.file
  });
});


app.use(router.routes());

app.listen(process.env.PORT);
console.log(`Server up and running! On port ${process.env.PORT}!`);
