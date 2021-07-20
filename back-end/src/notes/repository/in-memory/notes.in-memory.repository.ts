import { Injectable } from '@nestjs/common';
import { CreateNoteDto, UpdateNoteDto } from 'src/notes/dto';
import { Note } from '../../entities';
import { NotesRepository } from '../ports';

@Injectable()
export class NotesInMemoryRepository implements NotesRepository {

  private notes: Array<Note> = [];

  async create(createNoteDto: CreateNoteDto): Promise<Note> {
    const { text, top, left } = createNoteDto;

    const note = new Note(text, top, left);
    this.notes.push(note);

    return note;
  }

  async findAll(): Promise<Note[]> {
    return this.notes;
  }

  async findOne(id: string): Promise<Note> {
    const note = this.notes.find(n => n.getId() === id);
    return note;
  }

  async update(id: string, updateNoteDto: UpdateNoteDto): Promise<void> {
    const { text, left, top } = updateNoteDto;
    const note = await this.findOne(id);

    if (note) {
      note.setText(text);
      note.setLeft(left);
      note.setTop(top);
    }
  }
  
  async remove(id: string): Promise<void> {
    this.notes = this.notes.filter(n => n.getId() !== id);
  }

}
