const BaseExceptionHandler = use('BaseExceptionHandler');

class ExceptionHandler extends BaseExceptionHandler {
  async handle({ code, name, message, messages, status }, { response }) {
    if (name === 'ModelNotFoundException') {
      return response.status(status).json({ error: code, message: 'URL not found.' });
    }
    if (name === 'ValidationException') {
      return response.status(422).json({ error: code, message: messages.errors[0].detail });
    }
    if (name === 'SyntaxError') {
      return response.status(status).json({ error: name, message });
    }

    return super.handle(...arguments);
  }
}

module.exports = ExceptionHandler;
