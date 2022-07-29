module.exports = (AuthService) => async (email) => {
  const user = await AuthService.getUserByEmail(email);
  const resetPassword = await AuthService.createResetPassword(user);

  await AuthService.sendForgotPasswordEmail(resetPassword);
};
