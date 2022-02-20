"use strict";
import cors from '@koa/cors';
import Koa from 'koa';
import { configureRoutes } from 'koa-joi-controllers';
import { stdout } from 'single-line-log2';

import { ENABLE_EUREKA_SERVICE_REGISTRY, SERVER_PORT } from './config/config';
import { registerWithEureka } from './config/eureka-client-config';
import { AuthController } from './controllers/auth-controller';
import { RestController } from './controllers/controller';
import { ElectionController } from './controllers/election-controller';
import { ProductController } from './controllers/product-controller';
import { dbConnection } from './dao/db-connnection';

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
];
configureRoutes(appServer, controllers, "export/v1");
// appServer.context.onerror = errorHandler();

appServer.use(
  cors({
    origin: "*",
  })
);



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
 appServer.on("error", (err, ctx) => {
  ctx.body = err;
  console.log("=========> server error ", err, ctx);
});


appServer.listen(PORT, () => {
  stdout(`===== Server Started On PORT: ${PORT} ======\n`);
  // bar1.stop();
});

if (enableEurekaRegistry) {
  console.log(`enableEurekaRegistry is Enabled`);
  registerWithEureka(PORT);
}
