const { Sequelize, Model, DataTypes } = require("sequelize");
import { DB_NAME, DB_USER, DB_PASS } from "../config/config";

export const dbConnection = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: "localhost",
  dialect: "mysql",
  logging: false,
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});

/*  Produc tDetails ORM Definition */
export class ProductDetailsORM extends Model {}
ProductDetailsORM.init(
  {
    productName: {
      type: Sequelize.STRING,
      field: "productName", // Will result in an attribute that is firstName when user facing but first_name in the database
    },
    quantity: Sequelize.INTEGER,
    cost: Sequelize.INTEGER,
    price: Sequelize.INTEGER,
  },
  {
    sequelize: dbConnection,
    modelName: "product_details",
    freezeTableName: true, // Model tableName will be the same as the model name
  }
);
