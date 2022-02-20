import {
  Controller,
  Json,
  KoaController,
  Post,
  Put,
  Get
} from "koa-joi-controllers";
import * as ElectionService from "../services/election-service";

@Controller()
export class ElectionController extends KoaController {
  @Get("/elections")
  async getElections(ctx) {
    try {
      ctx.body = await ElectionService.getElections();
    } catch (err) {
      ctx.throw(500, err.message);
    }
  }

  @Put("/election")
  @Json()
  async register(ctx) {
    try {
      const body = ctx.request.body;
      ctx.body = await ElectionService.createElection(body);
    } catch (err) {
      ctx.throw(500, err.message);
    }
  }

  @Get("/candidates")
  async getCandidates(ctx) {
    try {
      ctx.body = await ElectionService.getCandidates();
    } catch (err) {
      ctx.throw(500, err.message);
    }
  }
}
