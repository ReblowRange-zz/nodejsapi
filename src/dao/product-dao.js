import { dbConnection, ProductDetailsORM } from "./db-connnection";

export const createProduct = async (product) => {
  await dbConnection.sync({ alter: true });
  const output = await ProductDetailsORM.create(product);
  return output;
};
