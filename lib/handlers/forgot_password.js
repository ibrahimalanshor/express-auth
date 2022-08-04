const Exception = require('@ibrahimanshor/express-app/lib/exception');
const Response = require('@ibrahimanshor/express-app/lib/response');

module.exports =
  (processForgotPassword, config = {}) =>
  async (req, res, next) => {
    try {
      const result = await processForgotPassword(req.body.email);

      return new Response.SuccessResponse(
        config?.message || 'forgot password success',
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
