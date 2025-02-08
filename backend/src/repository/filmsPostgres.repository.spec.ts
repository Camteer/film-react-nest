import { Test, TestingModule } from '@nestjs/testing';
import { FilmsRepositoryPostgres } from './filmsPostgres.repository';

describe('FilmsRepositoryPostgres', () => {
  let provider: FilmsRepositoryPostgres;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilmsRepositoryPostgres],
    }).compile();

    provider = module.get<FilmsRepositoryPostgres>(FilmsRepositoryPostgres);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
