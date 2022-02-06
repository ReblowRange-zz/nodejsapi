import * as AuthDao from '../dao/auth-dao';

export const login = async (loginCredentials) => {
  const output = await AuthDao.mobileLoginNGetUserDetails(loginCredentials);
  return output;
};

export const register = async (userDetails) => {
  const output = await AuthDao.register(userDetails);
  return output;
};
