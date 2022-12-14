const Exception = require('@ibrahimanshor/express-app/lib/exceptions');
const Response = require('@ibrahimanshor/express-app/lib/response');

module.exports =
  (processRefreshToken, config = {}) =>
  async (req, res, next) => {
    try {
      const result = await processRefreshToken(req.body.token);

      return new Response.SuccessResponse(
        config?.message || 'refresh token success',
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
