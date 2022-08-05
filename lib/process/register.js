const { createToken } = require('@ibrahimanshor/auth-jwt');

module.exports = (AuthService) => async (credentials) => {
  const password = await AuthService.hashPassword(credentials.password);
  const user = await AuthService.createUser({
    ...credentials,
    password,
  });

  const token = await createToken({ id: user.id }, AuthService.config?.auth);

  await AuthService.createRefreshToken(token.refreshToken, user);

  if (AuthService.config?.withRegisterVerification) {
    const verification = await AuthService.createVerification(user);

    await AuthService.sendVerificationEmail(verification);
  }

  return token;
};
