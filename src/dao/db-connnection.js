const { Sequelize, Model, DataTypes } = require("sequelize");

export const dbConnection = new Sequelize("poc_test", "root", "root", {
  host: "localhost",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});

/*  ProductDetailsORM Definition*/
export class ProductDetailsORM extends Model {}
ProductDetailsORM.init(
  {
    productName: {
      type: Sequelize.STRING,
      field: "product_name", // Will result in an attribute that is firstName when user facing but first_name in the database
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

