import { CreateNoteDto, UpdateNoteDto } from '../../dto';
import { Note } from '../../entities';

export interface NotesRepository {
  create: (createNoteDto: CreateNoteDto) => Promise<Note>;
  findAll: () => Promise<Note[]>
  findOne: (id: string) => Promise<Note>;
  update: (id: string, updateNoteDto: UpdateNoteDto) => Promise<void>;
  remove: (id: string) => Promise<void>;
}
