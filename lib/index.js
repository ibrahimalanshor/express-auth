module.exports = {
  // Processes
  createLogin: require('./process/login.js'),
  createRegister: require('./process/register.js'),
  createRefreshToken: require('./process/refresh_token.js'),
  createLogout: require('./process/logout.js'),
  createVerification: require('./process/verification.js'),
  createForgotPassword: require('./process/forgot_password.js'),
  createResetPassword: require('./process/reset_password.js'),

  // Handlers
  handleLogin: require('./handlers/login.js'),
  handleRegister: require('./handlers/register.js'),
  handleRefreshToken: require('./handlers/refresh_token.js'),
  handleLogout: require('./handlers/logout.js'),
  handleVerification: require('./handlers/verification.js'),
  handleForgotPassword: require('./handlers/forgot_password.js'),
  handleResetPassword: require('./handlers/reset_password.js'),

  // Middlewares
  requireAuth: require('./middlewares/auth.js'),

  // Services
  PasswordService: require('./services/password.js'),

  login: (AuthService) =>
    require('./handlers/login.js')(require('./process/login.js')(AuthService)),
  register: (AuthService) =>
    require('./handlers/register.js')(
      require('./process/register.js')(AuthService)
    ),
  refreshToken: (AuthService) =>
    require('./handlers/refresh_token.js')(
      require('./process/refresh_token.js')(AuthService)
    ),
  logout: (AuthService) =>
    require('./handlers/logout.js')(
      require('./process/logout.js')(AuthService)
    ),
  verification: (AuthService) =>
    require('./handlers/verification.js')(
      require('./process/verification.js')(AuthService)
    ),
  forgotPassword: (AuthService) =>
    require('./handlers/forgot_password.js')(
      require('./process/forgot_password.js')(AuthService)
    ),
  resetPassword: (AuthService) =>
    require('./handlers/reset_password.js')(
      require('./process/reset_password.js')(AuthService)
    ),
};
