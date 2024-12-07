export class ApiError extends Error {
  constructor(status, message, errors = {}) {
    super(message);

    this.status = status;
    this.errors = errors;
  }

  static BadRequest(message, errors) {
    return new ApiError(400, message, errors);
  }

  static UnprocessableEntity(errors) {
    return new ApiError(422, 'Unprocessable Entity', errors);
  }

  static Unauthorized() {
    return new ApiError(401, 'User is not authorized');
  }

  static NotFound(message = 'Not found') {
    return new ApiError(404, message);
  }
}
