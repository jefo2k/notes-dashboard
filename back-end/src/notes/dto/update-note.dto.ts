import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateNoteDto {
  @IsNotEmpty()
  text: string;

  @IsNotEmpty()
  @IsNumber()
  top: number;

  @IsNumber()
  @IsNotEmpty()
  left: number;
}

// Did not work with validation
// import { PartialType } from '@nestjs/mapped-types';
// import { CreateNoteDto } from './create-note.dto';

// export class UpdateNoteDto extends PartialType(CreateNoteDto) {}
