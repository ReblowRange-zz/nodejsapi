import { Get, Controller, KoaController, Post, Json, Koala } from "koa-joi-controllers";

@Controller("/v1")
export class RestController extends KoaController {
  @Get("/test")
  async test(ctx) {
    ctx.body = "Test rest";
  }

  @Post("/createExportReport")
  @Json()
  async createExportReport(ctx) {
    const body = ctx.request.body; // incoming JSON data is in ctx.request.body
    ctx.body = ctx.request.body;
    process.stdout.write(`${JSON.stringify(body)}`);
  }
}
