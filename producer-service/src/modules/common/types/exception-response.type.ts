export type HttpExceptionResponse = {
  statusCode: number;
  timestamp: string;
  path: string;
  message: string[] | string;
  error: string;
};

export type GrpcExceptionResponse = {
  code: number;
  message: string;
};
