import {
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import mongoose, { Schema } from 'mongoose';

import { GetFilmDTO, GetFilmsDTO } from '../films/dto/films.dto';

const ScheduleSchema = new Schema({
  id: { type: String, required: true },
  daytime: { type: Date, required: true },
  hall: { type: Number, required: true },
  rows: { type: Number, required: true },
  seats: { type: Number, required: true },
  price: { type: Number, required: true },
  taken: { type: [String], required: true },
});

const FilmSchema = new Schema({
  id: { type: String, required: true },
  rating: { type: Number, required: true },
  director: { type: String, required: true },
  tags: { type: [String], required: true },
  image: { type: String, required: true },
  cover: { type: String, required: true },
  title: { type: String, required: true },
  about: { type: String, required: true },
  description: { type: String, required: true },
  schedule: { type: [ScheduleSchema], required: true },
});

interface Response<Type> {
  data: Type | null;
}

const Film = mongoose.model('Film', FilmSchema);

@Injectable()
export class FilmsRepository {
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
      const items = await Film.find({});
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
      const film = await Film.findOne({ id });
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
      const film = await Film.findOne({ id: filmId });
      const schedule = film.schedule[scheduleIndex];
      schedule.taken.push(place);
      await film.save();
    } catch (error) {
      throw new ServiceUnavailableException('Ошибка сервера');
    }
  }
}
