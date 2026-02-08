import { ConfigModule as NestConfigModule } from "@nestjs/config";
import { EnvValidationSchema } from "./validation/env.schema";

export const ConfigModule = NestConfigModule.forRoot(EnvValidationSchema);
