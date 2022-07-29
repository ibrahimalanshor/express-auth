module.exports = (AuthService) => async (refreshToken) => {
  await AuthService.deleteRefreshTokenByToken(refreshToken);
};
