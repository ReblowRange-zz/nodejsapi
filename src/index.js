"use strict";
import cors from "@koa/cors";
import Koa from "koa";
import { configureRoutes } from "koa-joi-controllers";
import { stdout } from "single-line-log2";

import { ENABLE_EUREKA_SERVICE_REGISTRY, SERVER_PORT } from "./config/config";
import { registerWithEureka } from "./config/eureka-client-config";
import { AuthController } from "./controllers/auth-controller";
import { RestController } from "./controllers/controller";
import { ProductController } from "./controllers/product-controller";
import { dbConnection } from "./dao/db-connnection";
import { serverErrorHandler } from "./utils/utils";
import { errorHandler } from "koa-better-error-handler";

const debug = false;
const port = 4000;

/* ************** Import End *********************/

const enableEurekaRegistry = ENABLE_EUREKA_SERVICE_REGISTRY === "true";
const appServer = new Koa();

stdout(`=============== Starting server ===============`);
const PORT = SERVER_PORT;

const controllers = [
  new AuthController(),
  new RestController(),
  new ProductController(),
];

// appServer.context.onerror = errorHandler();

appServer.use(
  cors({
    origin: "*",
  })
);

configureRoutes(appServer, controllers, "rest/v1");

dbConnection
  .authenticate()
  .then(() => {
    console.log(`\n Database Connection Works`);
    // createProduct();
  })
  .catch((error) => console.error(`Unable to connect to the database:`, error));

/* If an error is in the req/res cycle and it is not possible to respond to the client,
 * the Context instance is also passed
 */
/* appServer.on("error", (err, ctx) => {
  console.log("server error <========= ");
  // ctx.status = err.statusCode || err.status || 500;
  // ctx.app.emit('error', err, ctx);
  // ctx.body = { msg: err.message };
  // ctx.throw(500, 'error');
  ctx.body = err;
  console.log("=========> server error ", err, ctx);
}); */

/* appServer.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    err.status = err.statusCode || err.status || 500;
    ctx.body = err.message;
    ctx.app.emit('error', err, ctx);
  }
}); */

// appServer.use(serverErrorHandler);

appServer.listen(PORT, () => {
  stdout(`===== Server Started On PORT: ${PORT} ======\n`);
  // bar1.stop();
});

if (enableEurekaRegistry) {
  console.log(`enableEurekaRegistry is Enabled`);
  registerWithEureka(PORT);
}
