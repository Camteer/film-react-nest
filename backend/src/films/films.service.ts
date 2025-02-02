import { Injectable } from '@nestjs/common';
import { FilmsRepository } from '../repository/films.repository';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async findAll() {
    const data = await this.filmsRepository.findAllFilms();
    return data.data;
  }

  async findById(id: string) {
    const data = await this.filmsRepository.findFilmById(id);
    return {
      total: data.schedule.length,
      items: data.schedule,
    };
  }
}
