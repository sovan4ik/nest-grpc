import { BadRequestException, Injectable } from '@nestjs/common';
import fs from 'node:fs';
import { ValidationResult } from 'joi';
import { UsersSchema } from './users.schema';
import { User } from './users.types';

@Injectable()
export class UsersService {
  public async getFilteredUsers(filePath: string): Promise<{ users: User[] }> {
    const raw = await fs.promises.readFile(filePath, 'utf-8');
    const parsed = JSON.parse(raw);

    const validation: ValidationResult = UsersSchema.validate(parsed, {
      abortEarly: false,
      stripUnknown: true,
      convert: true,
    });

    if (validation.error)
      throw new BadRequestException(validation.error.message);

    const users: User[] = validation.value;
    return {
      users: users.filter((user) => user.age > 18),
    };
  }
}
