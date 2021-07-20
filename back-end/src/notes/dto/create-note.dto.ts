import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNoteDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'Note text in markdown'
  })
  text: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Top note coordinate',
    default: 0,
  })
  top: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Left note coordinate',
    default: 0,
  })
  left: number;
}
