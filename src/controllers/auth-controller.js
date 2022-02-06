import {
  Controller,
  Json,
  KoaController,
  Post,
  Put,
} from "koa-joi-controllers";
import * as AuthService from "../services/auth-service";

@Controller()
export class AuthController extends KoaController {
  @Post("/login")
  @Json()
  async login(ctx) {
    try {
      const body = ctx.request.body;
      ctx.body = await AuthService.login(body);
    } catch (err) {
      ctx.throw(500, err.message);
    }
  }

  @Put("/register")
  @Json()
  async register(ctx) {
    try {
      const body = ctx.request.body;
      ctx.body = await AuthService.register(body);
    } catch (err) {
      ctx.throw(500, err.message);
    }
  }
}
