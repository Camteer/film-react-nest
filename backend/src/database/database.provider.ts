import mongoose from 'mongoose';
import { AppConfig } from '../app.config.provider';
import { DataSource } from 'typeorm';
import { Film } from '../repository/entities/film.entity';
import { Schedule } from '../repository/entities/schedule.entity';

export const databaseProvider = {
  provide: 'DATABASE',
  useFactory: (config: AppConfig) => {
    if (config.options.driver == 'mongodb') {
      return mongoose.connect(config.options.url);
    } else if (config.options.driver == 'postgres') {
      const dataSource = new DataSource({
        type: config.options.driver,
        host: config.options.host,
        port: config.options.port,
        username: config.options.username,
        password: config.options.password,
        database: config.options.database,
        entities: [Film, Schedule],
        synchronize: false,
      });
      return dataSource.initialize();
    }
  },
  inject: [{ token: 'CONFIG', optional: true }],
};
