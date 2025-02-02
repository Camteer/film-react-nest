import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { FilmsRepository } from '../repository/films.repository';
import { GetTicketDTO, CreateOrderDTO } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async createOrder(
    orderData: CreateOrderDTO,
  ): Promise<{ items: GetTicketDTO[]; total: number }> {
    try {
      const tickets = orderData.tickets;

      for (const ticket of tickets) {
        const film = await this.filmsRepository.findFilmById(ticket.film);
        const scheduleIndex =
          await this.filmsRepository.findScheduleIndexInFilm(
            ticket.film,
            ticket.session,
          );

        const place = `${ticket.row}:${ticket.seat}`;

        if (film.schedule[scheduleIndex].taken.includes(place)) {
          throw new BadRequestException(
            `К сожалению данное место ${place} уже забронировано другим посетителем`,
          );
        }

        this.filmsRepository.updateFilmSessions(
          ticket.film,
          scheduleIndex,
          place,
        );
      }

      return { items: tickets, total: tickets.length };
    } catch {
      throw new ServiceUnavailableException('Ошибка сервера');
    }
  }
}
