import {
  Inject,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Film } from './entities/film.entity';

@Injectable()
export class FilmsRepositoryPostgres {
  constructor(
    @Inject('FILM')
    private filmsRepository: Repository<Film>,
  ) {}

  async findAllFilms(): Promise<{ total: number; items: Film[] }> {
    const [total, items] = await Promise.all([
      this.filmsRepository.count(),
      this.filmsRepository.find({ relations: { schedule: true } }),
    ]);
    return { total, items };
  }

  async findFilmById(id: string): Promise<Film> {
    try {
      return this.filmsRepository.findOne({
        where: { id },
        relations: { schedule: true },
      });
    } catch (error) {
      throw new NotFoundException(`Фильм с таким Id ${id} не найден`);
    }
  }

  async findScheduleIndexInFilm(filmId: string, session: string) {
    const film = await this.findFilmById(filmId);
    const scheduleIndex = film.schedule.findIndex((s) => s.id === session);
    if (scheduleIndex === -1) {
      throw new NotFoundException(
        `Такого расписания нет для фильма '${film.title}'`,
      );
    }
    return scheduleIndex;
  }

  async updateFilmSessions(
    filmId: string,
    scheduleIndex: number,
    place: string,
  ) {
    try {
      const film = await this.filmsRepository.findOne({
        where: { id: filmId },
        relations: { schedule: true },
      });
      
      const schedule = film.schedule[scheduleIndex];
      if (schedule.taken == '') {
        schedule.taken += place;
      }
      schedule.taken += ','+ place;
      await this.filmsRepository.save(film);
    } catch (error) {
      throw new ServiceUnavailableException('Ошибка сервера');
    }
  }
}
