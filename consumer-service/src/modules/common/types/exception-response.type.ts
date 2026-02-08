export type HttpExceptionResponse = {
  statusCode: number;
  timestamp: string;
  path: string;
  message: string[] | string;
  error: string | null;
};

export type GrpcExceptionResponse = {
  code: number;
  message: string;
};
