const { createToken } = require('@ibrahimanshor/auth-jwt');

module.exports = (AuthService) => async (credentials) => {
  const user = await AuthService.getUserByEmail(credentials.email);
  const password = await AuthService.comparePassword(
    user.password,
    credentials.password
  );

  const token = await createToken({ id: user.id }, AuthService.config?.auth);

  await AuthService.createRefreshToken(token.refreshToken, user);

  return token;
};
