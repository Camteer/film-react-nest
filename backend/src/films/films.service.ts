import { Inject, Injectable } from '@nestjs/common';
import { FilmsRepositoryMongoDB } from '../repository/filmsMongo.repository';
import { AppConfig } from '../app.config.provider';
import { FilmsRepositoryPostgres } from '../repository/filmsPostgres.repository';

@Injectable()
export class FilmsService {
  constructor(
    @Inject('CONFIG') private readonly config: AppConfig,
    private readonly filmsRepositoryMongo: FilmsRepositoryMongoDB,
    private readonly filmsRepositoryPostgres: FilmsRepositoryPostgres,
  ) {}

  async findAll() {
    if (this.config.options.driver == 'mongodb') {
      const data = await this.filmsRepositoryMongo.findAllFilms();
      return data.data;
    } else if (this.config.options.driver == 'postgres') {
      const data = await this.filmsRepositoryPostgres.findAllFilms();
      return data;
    }
  }

  async findById(id: string) {
    if (this.config.options.driver == 'mongodb') {
      const data = await this.filmsRepositoryMongo.findFilmById(id);
      return {
        total: data.schedule.length,
        items: data.schedule,
      };
    } else if (this.config.options.driver == 'postgres') {
      const data = await this.filmsRepositoryPostgres.findFilmById(id);
      return {
        total: data.schedule.length,
        items: data.schedule,
      };
    }
  }
}
