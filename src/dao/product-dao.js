import { dbConnection, ProductDetailsORM } from "./db-connnection";

export const createProduct = async () => {
  await dbConnection.sync();
  const output = await ProductDetailsORM.create({
    productName: "Candles 32",
    quantity: 88,
    cost: 21,
    price: 30,
  });
  return output;
};
