import * as ElectionDao from "../dao/election-dao";

export const createElection = async (electionDetails) => {
  const output = await ElectionDao.createElection(electionDetails);
  return output;
};

export const getElections = async () => {
  const output = await ElectionDao.getElections();
  return output;
};

export const getCandidates = async () => {
  const output = await ElectionDao.getCandidates();
  return output;
};
