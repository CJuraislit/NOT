export default class ApiError extends Error {
  status: number;
  meta?: Record<string, any>;

  constructor(status: number, message: string, meta?: Record<string, any>) {
    super(message);
    this.status = status;
    this.meta = meta;
    Object.setPrototypeOf(this, ApiError.prototype);
  }

  static badRequest(message: string, meta?: Record<string, any>) {
    return new ApiError(400, message, meta);
  }

  static internal(message: string, meta?: Record<string, any>) {
    return new ApiError(500, message);
  }

  static forbidden(message: string, meta?: Record<string, any>) {
    return new ApiError(403, message);
  }

  static unauthorized(message: string, meta?: Record<string, any>) {
    return new ApiError(401, message, meta);
  }

  static notFound(message: string, meta?: Record<string, any>) {
    return new ApiError(404, message, meta);
  }
}
