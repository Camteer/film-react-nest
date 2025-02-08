import {
  Inject,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { Model } from 'mongoose';

import { GetFilmDTO, GetFilmsDTO } from '../films/dto/films.dto';

interface Response<Type> {
  data: Type | null;
}

@Injectable()
export class FilmsRepositoryMongoDB {
  constructor(@Inject('FILM') private filmsRepository: Model<GetFilmDTO>) {}

  private getFilmFromDataBaseFn(): (filmDataBase: GetFilmDTO) => GetFilmDTO {
    return (root) => {
      return {
        id: root.id,
        rating: root.rating,
        director: root.director,
        tags: root.tags,
        image: root.image,
        cover: root.cover,
        title: root.title,
        about: root.about,
        description: root.description,
        schedule: root.schedule,
      };
    };
  }

  async findAllFilms(): Promise<Response<GetFilmsDTO>> {
    try {
      const items = await this.filmsRepository.find({});
      if (items.length === 0) {
        throw new NotFoundException(`Фильмы не найдены`);
      }
      return {
        data: {
          total: items.length,
          items: items.map(this.getFilmFromDataBaseFn()),
        },
      };
    } catch {
      throw new ServiceUnavailableException('Ошибка сервера');
    }
  }

  async findFilmById(id: string): Promise<GetFilmDTO> {
    try {
      const film = await this.filmsRepository.findOne({ id });
      if (!film) {
        throw new NotFoundException(`Фильм с таким Id ${id} не найден`);
      }
      return film;
    } catch {
      throw new ServiceUnavailableException('Ошибка сервера');
    }
  }

  async findScheduleIndexInFilm(filmId: string, session: string) {
    try {
      const film = (await this.findFilmById(filmId)).schedule;
      const scheduleIndex = film.findIndex((s) => s.id === session);
      if (scheduleIndex === -1) {
        throw new NotFoundException(`Такого расписания нет для фильма`);
      }
      return scheduleIndex;
    } catch (error) {
      throw new ServiceUnavailableException('Ошибка сервера');
    }
  }

  async updateFilmSessions(
    filmId: string,
    scheduleIndex: number,
    place: string,
  ) {
    try {
      const film = await this.filmsRepository.findOne({ id: filmId });
      const schedule = film.schedule[scheduleIndex];
      schedule.taken.push(place);
      await film.save();
    } catch (error) {
      throw new ServiceUnavailableException('Ошибка сервера');
    }
  }
}
