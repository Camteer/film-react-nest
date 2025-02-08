import { Module } from '@nestjs/common';
import { configProvider } from '../app.config.provider';
import { databaseProvider } from './database.provider';

@Module({
  providers: [configProvider, databaseProvider],
  exports: [databaseProvider],
})
export class DatabaseModule {}
