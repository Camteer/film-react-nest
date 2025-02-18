import { ConfigModule } from '@nestjs/config';

export const applicationConfig = process.env;

export const configProvider = {
  imports: [ConfigModule.forRoot()],
  provide: 'CONFIG',
  useValue: <AppConfig>{
    //TODO прочесть переменнные среды
    options: {
      driver: applicationConfig.DATABASE_DRIVER || 'mongodb',
      url: applicationConfig.DATABASE_URL || 'mongodb://localhost:27017/prac',
      host: applicationConfig.DATABASE_HOST,
      port: Number(applicationConfig.DATABASE_PORT),
      username: applicationConfig.DATABASE_USERNAME,
      password: applicationConfig.DATABASE_PASSWORD,
      database: applicationConfig.DATABASE_NAME,
    },
  },
};

export interface AppConfig {
  options: AppConfigDatabase;
}

export interface AppConfigDatabase {
  driver: string;
  url: string;
  host?: string;
  port?: number;
  username?: string;
  password?: string;
  database?: string;
}
