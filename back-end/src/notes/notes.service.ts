import { Injectable, Logger } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { NotesInMemoryRepository } from './repository/in-memory/notes.in-memory.repository';

@Injectable()
export class NotesService {
  private readonly logger = new Logger(NotesService.name);

  constructor(private notesRepository: NotesInMemoryRepository) {}

  async create(createNoteDto: CreateNoteDto) {
    this.logger.log('create a new note ', JSON.stringify(createNoteDto));
    return await this.notesRepository.create(createNoteDto);
  }

  async findAll() {
    this.logger.log('load all notes ');
    return await this.notesRepository.findAll();
  }

  async findOne(id: string) {
    this.logger.log(`load note with id ${id}`);
    return await this.notesRepository.findOne(id);
  }

  async update(id: string, updateNoteDto: UpdateNoteDto) {
    this.logger.log(`update note with id ${id}`, JSON.stringify(updateNoteDto));
    return await this.notesRepository.update(id, updateNoteDto);
  }

  async remove(id: string) {
    this.logger.log(`remove note with id ${id}`);
    return await this.notesRepository.remove(id);
  }
}
