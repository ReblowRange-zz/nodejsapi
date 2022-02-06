import { dbConnection, UserDetailsORM } from "./db-connnection";

export const mobileLoginNGetUserDetails = async (loginCredentials) => {
  await dbConnection.sync({ alter: true });
  const mobileNo = loginCredentials.mobileNo;
  const password = loginCredentials.password;
  const output = await UserDetailsORM.findOne({
    where: { mobileNo: mobileNo, password: password },
  });
  if (!output) {
    throw new Error("Bad Credentials....");
  }
  delete output["password"];
  return output;
};

export const register = async (product) => {
  await dbConnection.sync({ alter: true });
  const output = await UserDetailsORM.create(product);
  return output;
};
