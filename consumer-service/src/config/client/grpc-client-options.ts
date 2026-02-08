import { ClientProviderOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { GRPC_CLIENT_TOKEN } from '~src/modules/grpc/users/constants/users.constant';
import _CONFIG from '~src/config';

const PROTO_DIR = join(process.cwd(), '/@lib/proto');

export const grpcClientOptions: ClientProviderOptions = {
  name: GRPC_CLIENT_TOKEN,
  transport: Transport.GRPC,
  options: {
    url: `${_CONFIG.services.producer.host}:${_CONFIG.services.producer.port}`,
    package: ['users'],
    protoPath: [join(PROTO_DIR, 'users.proto')],
  },
} as const;
