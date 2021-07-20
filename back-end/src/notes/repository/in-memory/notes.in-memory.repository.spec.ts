import { NotesInMemoryRepository } from './notes.in-memory.repository';
import { Note } from '../../entities';
import * as faker from 'faker';
import { NotesRepository } from '../ports/notes.repository';
import { CreateNoteDto } from '../../dto/create-note.dto';
import { UpdateNoteDto } from '../../dto/update-note.dto';

describe('In Memory Notes Repository tests', () => {

  let sut: NotesRepository = null;

  const note1: CreateNoteDto = { 
    text: faker.random.words(), 
    top: faker.datatype.number(150), 
    left: faker.datatype.number(150)
  }
  const note2: CreateNoteDto = { 
    text: faker.random.words(), 
    top: faker.datatype.number(150), 
    left: faker.datatype.number(150)
  }
  const note3: CreateNoteDto = { 
    text: faker.random.words(), 
    top: faker.datatype.number(150),
    left: faker.datatype.number(150)
  }

  beforeEach(() => {
    sut = new NotesInMemoryRepository();
  })

  it('should save a new note and return the new state', async () => {
    const persistedNote = await sut.create(note1);

    expect(persistedNote).toBeInstanceOf(Note);
    expect(persistedNote).toHaveProperty('id');
    expect(persistedNote).toHaveProperty('createdAt');
    expect(persistedNote).toHaveProperty('updatedAt');
  })

  it('should get all notes', async () => {
    await sut.create(note1);
    await sut.create(note2);
    await sut.create(note3);

    const persistedNotes = await sut.findAll();

    expect(persistedNotes).toHaveLength(3);
  })

  it('should get a specific note details', async () => {
    await sut.create(note1);
    await sut.create(note2);
    await sut.create(note3);

    const persistedNotes = await sut.findAll();
    const firstNoteId = persistedNotes[0].getId();

    const persistedNote = await sut.findOne(firstNoteId);

    expect(persistedNote).toBeInstanceOf(Note);
  })

  it('should update a note', async () => {
    const persistedNote = await sut.create(note1);
    const noteId = persistedNote.getId();

    // force a wait for 10 milisecondss
    await new Promise((r) => setTimeout(r, 10))

    const updatedNoteDto: UpdateNoteDto = {
      text: 'new note text!',
      left: 123,
      top: 234
    }

    await sut.update(noteId, updatedNoteDto);

    const updatedNote = await sut.findOne(noteId);

    expect(updatedNote.getText()).toBe(updatedNoteDto.text);
    expect(updatedNote.getLeft()).toBe(updatedNoteDto.left);
    expect(updatedNote.getTop()).toBe(updatedNoteDto.top);
    expect(updatedNote.getCreatedAt()).not.toBe(updatedNote.getUpdatedAt());
  })

  it('should delete a note', async () => {
    await sut.create(note1);
    await sut.create(note2);
    await sut.create(note3);

    const persistedNotes = await sut.findAll();
    const firstNoteId = persistedNotes[0].getId();

    await sut.remove(firstNoteId);

    const persistedNotesUpdated = await sut.findAll();

    expect(persistedNotesUpdated).toHaveLength(2);
  })

})
