const { Exception } = require('@ibrahimanshor/express-http');
const { verifyToken } = require('@ibrahimanshor/auth-jwt');

module.exports = (AuthService) => async (req, res, next) => {
  try {
    if (!req.headers.authorization)
      throw new Error('authorization header required');

    const auth = await verifyToken(
      req.headers.authorization,
      AuthService.config?.auth.secret
    );
    const user = await AuthService.getUserById(auth.user.id);

    req.auth = auth;
    req.user = user;

    next();
  } catch (err) {
    if (err instanceof Error || err instanceof Exception.HttpException) {
      next(new Exception.UnauthorizedException('', err.message));
    } else {
      next(new Exception.UnauthorizedException('', err));
    }
  }
};
