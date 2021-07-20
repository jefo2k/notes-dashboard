import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateNoteDto {
  @IsNotEmpty()
  text: string;

  @IsNotEmpty()
  @IsNumber()
  top: number;

  @IsNumber()
  @IsNotEmpty()
  left: number;
}
