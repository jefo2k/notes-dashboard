import { v4 as uuid } from 'uuid';

export class Note {

  private id: string;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(
    private text: string, 
    private top: number = 0,
    private left: number = 0) {
    // validate text field
    if (!text || text.trim().length < 1 ) throw new Error('text must not be empty');

    this.id = uuid();
    this.text = text;
    this.top = top;
    this.left = left;

    const today = new Date();
    this.createdAt = today;
    this.updatedAt = today;
  }

  public getId() {
    return this.id;
  }

  public getText() {
    return this.text;
  }

  public setText(newText: string) {
    this.text = newText;
    this.setUpdatedAt();
  }

  public getTop() {
    return this.top;
  }

  public setTop(newTop: number) {
    this.top = newTop;
    this.setUpdatedAt();
  }
  
  public getLeft() {
    return this.left;
  }

  public setLeft(newLeft: number) {
    this.left = newLeft;
    this.setUpdatedAt();
  }
  
  public getCreatedAt() {
    return this.createdAt;
  }
  
  public getUpdatedAt() {
    return this.updatedAt;
  }
  
  private setUpdatedAt() {
    this.updatedAt = new Date();
  }

  // handler methods for serialize and deserialize
  // source: http://choly.ca/post/typescript-json/

  // toJSON is automatically used by JSON.stringify
  toJSON(): NoteJSON {
    // copy all fields from `this` to an empty object and return in
    return Object.assign({}, this, {
      // convert fields that need converting
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString()
    });
  }

  // fromJSON is used to convert an serialized version
  // of the Note to an instance of the class
  static fromJSON(json: NoteJSON|string): Note {
    if (typeof json === 'string') {
      // if it's a string, parse it first
      return JSON.parse(json, Note.reviver);
    } else {
      // create an instance of the Note class
      let note = Object.create(Note.prototype);
      // copy all the fields from the json object
      return Object.assign(note, json, {
        // convert fields that need converting
        createdAt: new Date(json.createdAt),
        updatedAt: new Date(json.updatedAt)
      });
    }
  }

  // reviver can be passed as the second parameter to JSON.parse
  // to automatically call User.fromJSON on the resulting value.
  static reviver(key: string, value: any): any {
    return key === "" ? Note.fromJSON(value) : value;
  }

}

interface NoteJSON {
  id: string;
  text: string;
  top: number;
  left: number;
  createdAt: string;
  updatedAt: string;
}
