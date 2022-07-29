const { Exception, Response } = require('@ibrahimanshor/express-http');

module.exports =
  (processLogin, config = {}) =>
  async (req, res, next) => {
    try {
      const result = await processLogin(req.body);

      return new Response.SuccessResponse(
        config?.message || 'login success',
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
