import {
  Controller,
  Get,
  Json,
  KoaController,
  Post,
} from "koa-joi-controllers";

import { Report } from "./models";

@Controller("/v1")
export class RestController extends KoaController {
  @Get("/test")
  async test(ctx) {
    ctx.body = "Test rest";
  }

  @Post("/createReport")
  @Json()
  async createExportReport(ctx) {
    const body = ctx.request.body; // incoming JSON data is in ctx.request.body
    const report = Report.fromJson(body);
    console.log(report.name);
    ctx.body = report;
    // process.stdout.write(`${JSON.stringify(body)}`);
  }
}
