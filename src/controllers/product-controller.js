import { Controller, Delete, Get, Json, KoaController, Post, Put } from 'koa-joi-controllers';

import * as ProductService from '../services/product-service';

  
  
  @Controller()
  export class ProductController extends KoaController {
    @Get("/product_all")
    async test(ctx) {
      ctx.body = "Test rest";
    }
  
    @Put("/product")
    @Json()
    async createProduct(ctx) {
      const body = ctx.request.body; 
      // ctx.response.headers("Access-Control-Allow-Origin", "*");
      ctx.set('Access-Control-Allow-Origin', '*');
      // const product = Product.fromJson(body);
      ctx.body = await ProductService.createProduct(body);
    }
  
    @Post("/product")
    @Json()
    async updateProduct(ctx) {
      const body = ctx.request.body;
      // const product = Product.fromJson(body);
      ctx.body = await ProductService.updateProduct(body);
    }
  
    @Get("/product/:id")
    async getProduct(ctx) {
      try {
        const productId = ctx.params.id;
        console.log(productId);
        ctx.body = await ProductService.getProduct(productId);
      } catch (err) {
        ctx.throw(500, err.message);
      }
    }
  
    @Delete("/product/:id")
    async deleteProduct(ctx) {
      try {
        const productId = ctx.params.id;
        console.log(productId);
        ctx.body = await ProductService.deleteProduct(productId);
      } catch (err) {
        ctx.throw(500, err.message);
      }
    }
  }
  