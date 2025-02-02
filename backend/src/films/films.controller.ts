import { Controller, Get, Param, BadRequestException } from '@nestjs/common';
import { FilmsService } from './films.service';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  async getFilms() {
    try {
      const data = await this.filmsService.findAll();

      return data.data;
    } catch {
      throw new BadRequestException('Ошибка сервера');
    }
  }

  @Get(':id/schedule')
  async getScheduleFilm(@Param('id') id: string) {
    try {
      const data = await this.filmsService.findById(id);
      return {
        total: data.schedule.length,
        items: data.schedule,
      };
    } catch {
      throw new BadRequestException('Фильма с таким айди нет');
    }
  }
}
