import { v4 as uuid } from 'uuid';

export class Note {

  private id: string;
  private text: string;
  private top: number;
  private left: number;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(text: string, top: number, left: number) {
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

}
