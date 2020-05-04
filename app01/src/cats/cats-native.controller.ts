import { Controller, Post, HttpStatus, Get, Res } from "@nestjs/common";
import { Response } from 'express';


@Controller('cats-native')
export class CatsNativeController {
  @Post()
  create(@Res() res: Response) {
    res.status(HttpStatus.CREATED).send();
  }

  @Get()
  findAll(@Res() res: Response) {
    res.status(HttpStatus.OK).json(['bob', 'boots']);
  }
}