export class HttpException extends Error {
  public statusCode: number;
  public error: string;

  constructor(message: string, statusCode: number, error?: string) {
    super(message);
    this.statusCode = statusCode;
    this.error = error || 'Application Error';
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }

  toJSON() {
    return {
      statusCode: this.statusCode,
      error: this.error,
      message: this.message,
    };
  }
}