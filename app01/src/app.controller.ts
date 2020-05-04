import { Controller, Get, Request, Headers } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Request() request: Request, @Headers() headers: Headers): string {
    return this.appService.getHello();
  }
}
