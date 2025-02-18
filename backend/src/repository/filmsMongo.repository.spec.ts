import { Test, TestingModule } from '@nestjs/testing';
import { FilmsRepositoryMongoDB } from './filmsMongo.repository';

describe('FilmsRepositoryMongoDB', () => {
  let provider: FilmsRepositoryMongoDB;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilmsRepositoryMongoDB],
    }).compile();

    provider = module.get<FilmsRepositoryMongoDB>(FilmsRepositoryMongoDB);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
