import { Film } from './entities/film.entity';
import { AppConfig } from '../app.config.provider';
import { GetFilmDTO } from 'src/films/dto/films.dto';


export const FilmsProvider = {
  provide: 'FILM',
  inject: ['DATABASE', 'CONFIG'],
  useFactory: (connection, config: AppConfig) => {
    if (config.options.driver === 'postgres') {
      return connection.getRepository(Film);
    } else if (config.options.driver === 'mongodb') {
      return connection.model('Film', GetFilmDTO);
    }
  },
};
