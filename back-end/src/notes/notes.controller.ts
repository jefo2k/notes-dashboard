import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, ValidationPipe, UsePipes, ParseUUIDPipe, Logger } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('notes')
@Controller('notes')
export class NotesController {
  private readonly logger = new Logger(NotesController.name);

  constructor(
    private readonly notesService: NotesService
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create new Note' })
  @UsePipes(ValidationPipe)
  async create(@Body() createNoteDto: CreateNoteDto) {
    return await this.notesService.create(createNoteDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Notes' })
  async findAll() {
    return await this.notesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Note detail' })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const found = await this.notesService.findOne(id);

    if (!found) {
      this.logger.error(`Note with ID ${id} not found`);
      throw new NotFoundException(`Note with ID ${id} not found`);
    }

    return found;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update Note' })
  @UsePipes(ValidationPipe)
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return await this.notesService.update(id, updateNoteDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete Note' })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.notesService.remove(id);
  }
}
