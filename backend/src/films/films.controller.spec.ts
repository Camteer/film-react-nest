import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { GetFilmDTO, GetScheduleDTO } from './dto/films.dto';

describe('FilmsController', () => {
  let controller: FilmsController;
  let service: FilmsService;

  const mockSchedule: GetScheduleDTO = {
    id: '1',
    daytime: new Date('2023-10-10T10:00:00Z'),
    hall: 1,
    rows: 5,
    seats: 100,
    price: 10,
    taken: [],
  };
  const mockFilm: GetFilmDTO = {
    id: 'film-id',
    rating: 8.5,
    director: 'Харрисон Рид',
    tags: ['Рекомендуемые'],
    image: 'http://example.com/image.jpg',
    cover: 'http://example.com/cover.jpg',
    title: 'Film Title',
    about: 'About the film',
    description: 'Description of the film',
    schedule: [mockSchedule],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [FilmsService],
    })
      .overrideProvider(FilmsService)
      .useValue({
        findAll: jest.fn().mockResolvedValue([mockFilm]),
        findById: jest.fn().mockResolvedValue(mockSchedule),
      })
      .compile();
    controller = module.get<FilmsController>(FilmsController);
    service = module.get<FilmsService>(FilmsService);
  });

   it('should be return all films', async () => {
     const result = await controller.getFilms();
     expect(result).toEqual([mockFilm]);
     expect(service.findAll).toHaveBeenCalled();
   });

   it('should be return schedule for a film', async () => {
     const result = await controller.getScheduleFilm('1');
     expect(result).toEqual(mockSchedule);
     expect(service.findById).toHaveBeenCalledWith('1');
   });
});
