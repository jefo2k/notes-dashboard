import { Test, TestingModule } from '@nestjs/testing';
import { NotesService } from './notes.service';
import { NotesInMemoryRepository } from './repository/in-memory/notes.in-memory.repository';

describe('NotesService', () => {
  let service: NotesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotesService,
        NotesInMemoryRepository
      ],
    }).compile();

    service = module.get<NotesService>(NotesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
