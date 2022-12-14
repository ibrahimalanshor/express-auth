const Exception = require('@ibrahimanshor/express-app/lib/exceptions');
const Response = require('@ibrahimanshor/express-app/lib/response');

module.exports =
  (processRegister, config = {}) =>
  async (req, res, next) => {
    try {
      const result = await processRegister(req.body);

      return new Response.SuccessResponse(
        config?.message || 'register success',
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
