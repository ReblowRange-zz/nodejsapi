const { Sequelize, Model } = require("sequelize");
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

export class UserDetailsORM extends Model {}
UserDetailsORM.init(
  {
    aadharNo: Sequelize.STRING,
    firstName: Sequelize.STRING,
    middleName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    dateOfBirth: Sequelize.DATE(6), // DATETIME(6) for mysql 5.6.4+. Fractional seconds support with up to 6 digits of preciin
    gender: Sequelize.STRING,
    address: Sequelize.STRING,
    postalCode: Sequelize.STRING,
    mobileNo: Sequelize.STRING,
    password: Sequelize.STRING,
  },
  {
    sequelize: dbConnection,
    modelName: "user_details",
    freezeTableName: true,
  }
);
