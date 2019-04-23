const { LogicalException } = require('@adonisjs/generic-exceptions');

class AccessDeniedException extends LogicalException {
  handle(error, { response }) {
    response.status(403).json({ error: 'E_ACCESS_DENIED', message: 'Resource access denied.' });
  }
}

module.exports = AccessDeniedException;
