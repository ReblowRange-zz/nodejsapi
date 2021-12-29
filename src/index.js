import Koa from "koa";
import { configureRoutes } from "koa-joi-controllers";
import { RestController } from "./controller";
import {stdout} from 'single-line-log2';

/* ************** Import End *********************/
const appServer = new Koa();

stdout(`=============== Starting server ===============`);
const PORT = process.env.PORT || 3000;
configureRoutes(appServer, [new RestController()]);

/* appServer.use(async (ctx) => {
  // await Promise;
  console.log(ctx.req.method);
  // ctx.throw(401, 'name required');
  ctx.requ;
  ctx.body = "Hello World";
}); */

/* For every error */
appServer.on("error", (err) => {
  console.error("server error", err);
});
/* If an error is in the req/res cycle and it is not possible to respond to the client,
 * the Context instance is also passed
 */
appServer.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

appServer.listen(PORT, () => {
  stdout(`===== Server Started On PORT: ${PORT} ======`);
});
