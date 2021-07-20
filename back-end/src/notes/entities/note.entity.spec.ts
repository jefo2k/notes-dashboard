import { Note } from './note.entity';
import * as faker from 'faker';

describe('Note entity tests', () => {

  const noteText = faker.random.words();
  const noteTop = faker.datatype.number(150);
  const noteLeft = faker.datatype.number(170);

  let note = null;

  beforeEach(() => {
    note = new Note(noteText, noteTop, noteLeft);
  });

  it('should return correct values in getters methods', () => {
    expect(note.getText()).toBe(noteText);
    expect(note.getTop()).toBe(noteTop);
    expect(note.getLeft()).toBe(noteLeft);
  })

  it('should be the same createdAt and updatedAt after creation', () => {
    expect(note.getCreatedAt()).toBe(note.getUpdatedAt());
  })

  it('should update text and updatedAt as well', async () => {
    // force a wait for 10 milisecondss
    await new Promise((r) => setTimeout(r, 10))

    const newText = 'brand new text';
    note.setText(newText);

    expect(note.getText()).toBe(newText);

    expect(note.getCreatedAt()).not.toBe(note.getUpdatedAt());
  })

  it('should update coordinates and updatedAt as well', async () => {
    // force a wait for 10 milisecondss
    await new Promise((r) => setTimeout(r, 10))

    const newLeft = 200;
    note.setLeft(newLeft);
    
    const newTop = 200;
    note.setTop(newTop);

    expect(note.getLeft()).toBe(newLeft);
    expect(note.getTop()).toBe(newTop);

    expect(note.getCreatedAt()).not.toBe(note.getUpdatedAt());
  })

  it('should not instantiate Note with a null, undefined or empty text parameter', () => {
    
    expect(() => {
      new Note(null, noteTop, noteLeft)
    }).toThrowError('text must not be empty');
    
    expect(() => {
      new Note(undefined, noteTop, noteLeft)
    }).toThrowError('text must not be empty');
    
    expect(() => {
      new Note('', noteTop, noteLeft)
    }).toThrowError('text must not be empty');

  })

})
