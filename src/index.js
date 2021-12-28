import Koa from "koa";
const appServer = new Koa();

console.log("From index.js");
appServer.use(async (ctx) => {
  // await Promise;
  console.log(ctx.header);
  ctx.requ
  ctx.body = "Hello World";
});

appServer.listen(3000);
