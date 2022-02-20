import {
  ElectionDetailsORM,
  dbConnection,
  CandidateDetailsORM,
} from "./db-connnection";

export const createElection = async (electionDetails) => {
  await dbConnection.sync({ alter: true });
  const output = await ElectionDetailsORM.create(electionDetails, {
    include: [
      {
        association: ElectionDetailsORM.CandidateDetailsORM,
      },
    ],
  });
  return output;
};

export const getElections = async () => {
  await dbConnection.sync({ alter: true });
  const output = await ElectionDetailsORM.findAll({ include: "candidates" });
  return output;
};

export const getCandidates = async () => {
    await dbConnection.sync({ alter: true });
    const output = await CandidateDetailsORM.findAll();
    return output;
}

