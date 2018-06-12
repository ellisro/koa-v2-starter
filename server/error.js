async function error(ctx, next) {
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
}

module.exports = error