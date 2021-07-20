import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, ValidationPipe, UsePipes, ParseUUIDPipe } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Controller('notes')
export class NotesController {
  constructor(
    private readonly notesService: NotesService
  ) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() createNoteDto: CreateNoteDto) {
    return await this.notesService.create(createNoteDto);
  }

  @Get()
  async findAll() {
    return await this.notesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const found = await this.notesService.findOne(id);

    if (!found) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }

    return found;
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return await this.notesService.update(id, updateNoteDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.notesService.remove(id);
  }
}
