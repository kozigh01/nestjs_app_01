import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { CatsController } from './cats/cats.controller';

function logger(req: Request, res: Response, next: Function) {
  console.log('Functional Middleware Logger: request...');
  next();
}

@Module({
  imports: [CatsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      // .apply(cors(), helmet(), logger)
      // .forRoutes(CatsController);

    consumer
      .apply(logger)
      .forRoutes(CatsController);

    // consumer
    //   .apply(LoggerMiddleware)
    //   .exclude({ path: 'cats', method: RequestMethod.POST })
    //   .forRoutes(CatsController);
    //   // .forRoutes({
    //   //   path: 'cats',
    //   //   method: RequestMethod.GET
    //   // });

    // consumer
    //   .apply(LoggerMiddleware)
    //   .forRoutes('cats');
  }
}
