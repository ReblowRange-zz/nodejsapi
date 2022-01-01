import {
  Controller,
  Get,
  Json,
  KoaController,
  Post,
  Put
} from "koa-joi-controllers";

import { Report } from "./models";
import * as RestService from "./service";

@Controller("/v1")
export class RestController extends KoaController {
  @Get("/test")
  async test(ctx) {
    ctx.body = "Test rest";
  }

  @Put("/report")
  @Json()
  async createExportReport(ctx) {
    const body = ctx.request.body; 
    // const report = Report.fromJson(body);
    ctx.body = await RestService.createReport(body);
  }

  @Post("/report")
  @Json()
  async updateExportReport(ctx) {
    const body = ctx.request.body; // incoming JSON data is in ctx.request.body
    // const report = Report.fromJson(body);
    ctx.body = await RestService.updateReport(body);
  }

  @Get("/getReport/:id")
  async getReport(ctx) {
    try {
      const reportId = ctx.params.id;
      console.log(reportId);
      ctx.body = await RestService.getReport(reportId);
    } catch (err) {
      ctx.throw(500, err.message);
    }
  }
}
