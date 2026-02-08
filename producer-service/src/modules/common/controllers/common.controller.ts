import { Controller, Get } from '@nestjs/common';

@Controller()
export class CommonController {
  constructor() {}

  @Get('health')
  health() {
    return { status: 'ok' };
  }
}
