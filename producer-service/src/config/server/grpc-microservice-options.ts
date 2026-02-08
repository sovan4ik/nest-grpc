import { GrpcOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import _CONFIG from '..';

const PROTO_DIR = join(process.cwd(), '@lib/proto');

export const grpcMicroserviceOptions: GrpcOptions = {
  transport: Transport.GRPC,
  options: {
    url: `${_CONFIG.server.grpc.host}:${_CONFIG.server.grpc.port}`,

    package: ['users'],
    protoPath: [join(PROTO_DIR, 'users.proto')],

    loader: {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true,
    },
  },
} as const;
