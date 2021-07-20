import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { NotesInMemoryRepository } from './repository/in-memory';

@Module({
  controllers: [NotesController],
  providers: [
    NotesService,
    NotesInMemoryRepository
  ]
})
export class NotesModule {}
