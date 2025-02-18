import {
  Inject,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { FilmsRepositoryMongoDB } from '../repository/filmsMongo.repository';
import { GetTicketDTO, CreateOrderDTO } from './dto/order.dto';
import { FilmsRepositoryPostgres } from 'src/repository/filmsPostgres.repository';
import { AppConfig } from 'src/app.config.provider';

@Injectable()
export class OrderService {
  constructor(
    @Inject('CONFIG') private readonly config: AppConfig,
    private readonly filmsRepositoryMongo: FilmsRepositoryMongoDB,
    private readonly filmsRepositoryPostgres: FilmsRepositoryPostgres,
  ) {}

  async createOrder(
    orderData: CreateOrderDTO,
  ): Promise<{ items: GetTicketDTO[]; total: number }> {
    try {
      const tickets = orderData.tickets;
      const db =
        this.config.options.driver == 'mongodb'
          ? this.filmsRepositoryMongo
          : this.filmsRepositoryPostgres;

      for (const ticket of tickets) {
        const film = await db.findFilmById(ticket.film);
        const scheduleIndex = await db.findScheduleIndexInFilm(
          ticket.film,
          ticket.session,
        );

        const place = `${ticket.row}:${ticket.seat}`;

        if (film.schedule[scheduleIndex].taken.includes(place)) {
          throw new BadRequestException(
            `К сожалению данное место ${place} уже забронировано другим посетителем`,
          );
        }

        db.updateFilmSessions(ticket.film, scheduleIndex, place);
      }

      return { items: tickets, total: tickets.length };
    } catch {
      throw new ServiceUnavailableException('Ошибка сервера');
    }
  }
}
