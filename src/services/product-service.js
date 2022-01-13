import fs from "fs";
import { promisify } from "util";

const localStoreFile = "./local-store-file.json";
import * as ProductDAO from "../dao/product-dao";
export const createProduct = async (product) => {
  const output = await ProductDAO.createProduct(product);
  return output;
};

export const updateProduct = async (product) => {
  return;
};

export const getProduct = async (productId) => {
  return;
};

export const deleteProduct = async (productId) => {
  return;
};
