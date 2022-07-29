const { Exception, Response } = require('@ibrahimanshor/express-http');

module.exports =
  (processVerification, config = {}) =>
  async (req, res, next) => {
    try {
      const result = await processVerification(
        req.params.user,
        req.params.token
      );

      return new Response.SuccessResponse(
        config?.message || 'verification success',
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