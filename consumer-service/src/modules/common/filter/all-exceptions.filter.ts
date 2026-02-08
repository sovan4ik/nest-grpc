import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import {
  HttpExceptionResponse,
  GrpcExceptionResponse,
} from '../types/exception-response.type';
import { status as GrpcStatus } from '@grpc/grpc-js';
import { throwError, Observable } from 'rxjs';
import { RpcException } from '@nestjs/microservices';

@Catch()
@Injectable()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}

  catch(exception: unknown, host: ArgumentsHost): void | Observable<never> {
    console.log(host.getType());
    
    if (host.getType() === 'rpc') {
      return this.handleGrpc(exception);
    }
    if (host.getType() === 'http') {
      return this.handleHttp(exception, host);
    }
  }

  private getHttpExceptionResponse(
    exception: HttpException,
    response: HttpExceptionResponse,
  ): HttpExceptionResponse {
    const responseBody = exception.getResponse();
    return {
      ...response,
      statusCode: exception.getStatus(),
      message: responseBody['message'] || responseBody,
      error: responseBody['error'] || null,
    };
  }

  private getGenericErrorResponse(
    exception: Error,
    response: HttpExceptionResponse,
  ): HttpExceptionResponse {
    return {
      ...response,
      error: exception.message,
    };
  }

  private handleGrpc(exception: unknown): Observable<never> {
    let response: GrpcExceptionResponse = {
      code: GrpcStatus.INTERNAL,
      message: 'Internal error',
    };

    if (exception instanceof RpcException) {
      const error = exception.getError();
      if (typeof error === 'string') {
        response = { ...response, message: error };
      } else if (error && typeof error === 'object') {
        response = {
          code: error['code'] ?? GrpcStatus.INTERNAL,
          message: error['message'] ?? 'Internal error',
        };
      }
    } else if (exception instanceof HttpException) {
      response = {
        code: this.getGrpcCode(exception.getStatus()),
        message: this.normalizeHttpMessage(exception),
      };
    } else if (exception instanceof Error) {
      response = {
        ...response,
        message: exception.message,
      };
    }

    if (exception instanceof Error) {
      this.logger.error(exception.stack);
    } else {
      this.logger.error(exception);
    }

    return throwError(() => response);
  }

  private handleHttp(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const fastifyReply = ctx.getResponse<FastifyReply>();
    const fastifyRequest = ctx.getRequest<FastifyRequest>();

    let response: HttpExceptionResponse = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      timestamp: new Date().toISOString(),
      path: fastifyRequest.url,
      message: 'Internal server error',
      error: null,
    };

    if (exception instanceof HttpException) {
      response = this.getHttpExceptionResponse(exception, response);
    } else if (exception instanceof Error) {
      response = this.getGenericErrorResponse(exception, response);
    }

    if (exception instanceof Error) this.logger.error(exception.stack);
    else this.logger.error(exception);

    fastifyReply.code(response.statusCode).send(response);
  }

  private normalizeHttpMessage(exception: HttpException): string {
    const body = exception.getResponse() as any;

    let message = 'Request failed';

    if (typeof body === 'string') {
      message = body;
    } else if (Array.isArray(body?.message)) {
      message = body.message.join(', ');
    } else if (typeof body?.message === 'string') {
      message = body.message;
    } else if (typeof exception.message === 'string') {
      message = exception.message;
    }

    return message;
  }

  private getGrpcCode(httpStatus: number) {
    switch (httpStatus) {
      case 400:
      case 422:
        return GrpcStatus.INVALID_ARGUMENT;
      case 401:
        return GrpcStatus.UNAUTHENTICATED;
      case 403:
        return GrpcStatus.PERMISSION_DENIED;
      case 404:
        return GrpcStatus.NOT_FOUND;
      case 409:
        return GrpcStatus.ALREADY_EXISTS;
      case 429:
        return GrpcStatus.RESOURCE_EXHAUSTED;
      case 501:
        return GrpcStatus.UNIMPLEMENTED;
      case 503:
      case 504:
        return GrpcStatus.UNAVAILABLE;
      default:
        return GrpcStatus.INTERNAL;
    }
  }
}
