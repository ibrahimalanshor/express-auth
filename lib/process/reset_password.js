module.exports = (AuthService) => async (user, token, password) => {
  const resetPassword = await AuthService.getResetPassword(user, token);

  await AuthService.resetPasswordByUserId(resetPassword.userId, password);
  await AuthService.deleteResetPasswordById(resetPassword.id);
};
