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
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
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

export class ElectionDetailsORM extends Model {}
ElectionDetailsORM.init(
  {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    electionOf: Sequelize.STRING,
    electionDate: Sequelize.DATE(6), // DATETIME(6) for mysql 5.6.4+. Fractional seconds support with up to 6 digits of preciin
  },
  {
    sequelize: dbConnection,
    modelName: "election_details",
    freezeTableName: true,
  }
);

export class CandidateDetailsORM extends Model {}
CandidateDetailsORM.init(
  {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    name: Sequelize.STRING,
    surName: Sequelize.STRING,
    partyName: Sequelize.STRING,
    cadidateMobile: Sequelize.STRING,
  },
  {
    sequelize: dbConnection,
    modelName: "candidate_details",
    freezeTableName: true,
  }
);

export class VotingDetailsORM extends Model {}
VotingDetailsORM.init(
  {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    electionId: Sequelize.UUID,
    electionName: Sequelize.STRING,
    voterId: Sequelize.STRING,
    voterName: Sequelize.STRING,
    votedToId: Sequelize.UUID,
    candidatename: Sequelize.STRING,
  },
  {
    sequelize: dbConnection,
    modelName: "voting_details",
    freezeTableName: true,
  }
);

ElectionDetailsORM.CandidateDetailsORM = ElectionDetailsORM.hasMany(
  CandidateDetailsORM,
  { as: "candidates" }
);
CandidateDetailsORM.ElectionDetailsORM = CandidateDetailsORM.belongsTo(
  ElectionDetailsORM,
  { as: "election" }
);
