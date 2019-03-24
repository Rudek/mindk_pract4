class HeaderAcceptRequest {
  async handle(ctx, next) {
    const headers = ctx.request.headers();
    headers.accept = 'application/json';
    await next();
  }
}

module.exports = HeaderAcceptRequest;
