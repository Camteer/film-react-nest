import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@nestjs/config';
import * as path from 'node:path';

import { configProvider } from './app.config.provider';
import { FilmsController } from './films/films.controller';
import { FilmsService } from './films/films.service';
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';
import { FilmsRepositoryMongoDB } from './repository/filmsMongo.repository';
import { FilmsRepositoryPostgres } from './repository/filmsPostgres.repository';
import { DatabaseModule } from './database/database.module';
import { FilmsProvider } from './repository/films.repository.provider';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    // @todo: Добавьте раздачу статических файлов из public
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'public'),
      renderPath: '/content/afisha/',
    }),
    DatabaseModule,
  ],
  controllers: [FilmsController, OrderController],
  providers: [
    configProvider,
    FilmsRepositoryMongoDB,
    FilmsRepositoryPostgres,
    FilmsService,
    OrderService,
    FilmsProvider,
  ],
})
export class AppModule {}
