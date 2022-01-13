import {
  Controller,
  Delete,
  Get,
  Json,
  KoaController,
  Post,
  Put
} from "koa-joi-controllers";

import { Report } from "../models/models";
import * as RestService from "../services/service";

@Controller()
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
    const body = ctx.request.body;
    // const report = Report.fromJson(body);
    ctx.body = await RestService.updateReport(body);
  }

  @Get("/report/:id")
  async getReport(ctx) {
    try {
      const reportId = ctx.params.id;
      console.log(reportId);
      ctx.body = await RestService.getReport(reportId);
    } catch (err) {
      ctx.throw(500, err.message);
    }
  }

  @Delete("/report/:id")
  async deleteReport(ctx) {
    try {
      const reportId = ctx.params.id;
      console.log(reportId);
      ctx.body = await RestService.deleteReport(reportId);
    } catch (err) {
      ctx.throw(500, err.message);
    }
  }
}
