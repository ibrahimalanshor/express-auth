const Exception = require('@ibrahimanshor/express-app/lib/exceptions');
const Response = require('@ibrahimanshor/express-app/lib/response');

module.exports =
  (processResetPassword, config = {}) =>
  async (req, res, next) => {
    try {
      const result = await processResetPassword(
        req.params.user,
        req.params.token,
        req.body.password
      );

      return new Response.SuccessResponse(
        config?.message || 'reset password success',
        result
      ).use(res);
    } catch (err) {
      if (err instanceof Error || err instanceof Exception.HttpException) {
        next(new Exception.UnauthorizedException('', err.message));
      } else {
        next(new Exception.UnauthorizedException('', err));
      }
    }
  };
