const Exception = require('@ibrahimanshor/express-app/lib/exceptions');
const Response = require('@ibrahimanshor/express-app/lib/response');

module.exports =
  (processLogout, config = {}) =>
  async (req, res, next) => {
    try {
      await processLogout(req.body.token);

      return new Response.SuccessResponse(
        config?.message || 'logout success'
      ).use(res);
    } catch (err) {
      if (err instanceof Error || err instanceof Exception.HttpException) {
        next(new Exception.UnauthorizedException('', err.message));
      } else {
        next(new Exception.UnauthorizedException('', err));
      }
    }
  };
