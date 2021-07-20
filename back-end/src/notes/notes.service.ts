import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { NotesInMemoryRepository } from './repository/in-memory/notes.in-memory.repository';

@Injectable()
export class NotesService {

  constructor(private notesRepository: NotesInMemoryRepository) {}

  async create(createNoteDto: CreateNoteDto) {
    return await this.notesRepository.create(createNoteDto);
  }

  async findAll() {
    return await this.notesRepository.findAll();
  }

  async findOne(id: string) {
    return await this.notesRepository.findOne(id);
  }

  async update(id: string, updateNoteDto: UpdateNoteDto) {
    return await this.notesRepository.update(id, updateNoteDto);
  }

  async remove(id: string) {
    return await this.notesRepository.remove(id);
  }
}
