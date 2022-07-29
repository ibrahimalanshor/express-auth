module.exports = (AuthService) => async (user, token) => {
  const verification = await AuthService.getVerification(user, token);

  await AuthService.verificateUserById(verification.userId);
  await AuthService.deleteVerificationById(verification.id);
};
