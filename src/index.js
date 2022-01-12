import Koa from "koa";
import { configureRoutes } from "koa-joi-controllers";
import { RestController } from "./controller";
import { stdout } from "single-line-log2";
import { registerWithEureka } from "./eureka-client";
import { dbConnection } from "./dao/db-connnection";
import { createProduct } from "./dao/product-dao";

/* ************** Import End *********************/
var enableEurekaRegistry = false;
const appServer = new Koa();

stdout(`=============== Starting server ===============`);
const PORT = process.env.PORT || 3000;
configureRoutes(appServer, [new RestController()], "export");

dbConnection
  .authenticate()
  .then(() => {
    console.log(`\nConnection has been established successfully.`);
    createProduct();
  })
  .catch((error) => console.error(`Unable to connect to the database:`, error));

/* If an error is in the req/res cycle and it is not possible to respond to the client,
 * the Context instance is also passed
 */
appServer.on("error", (err, ctx) => {
  console.log("---------------------server error", err, ctx);
  ctx.throw(401, err.message);
});

appServer.listen(PORT, () => {
  stdout(`===== Server Started On PORT: ${PORT} ======\n`);
});

if (enableEurekaRegistry) {
  console.log(`enableEurekaRegistry is Enabled`);
  registerWithEureka(PORT);
}
