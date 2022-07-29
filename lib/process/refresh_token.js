const { createAccessToken } = require('@ibrahimanshor/auth-jwt');

module.exports = (AuthService) => async (token) => {
  const refreshToken = await AuthService.getRefreshTokenByToken(token);
  const user = await AuthService.getUserById(refreshToken.userId);

  const accessToken = await createAccessToken(user, AuthService.config?.auth);

  return accessToken;
};
