import { Controller, Delete, Get, Logger, Param } from '@nestjs/common';
import { SpaceMarineService } from './space-marine.service';
import { AppController } from '../app.controller';

@Controller('api/v1/space-marines')
export class SpaceMarineController {
  constructor(private readonly spaceMarineService: SpaceMarineService) {
  }

  @Get()
  async getAll() {
    return this.spaceMarineService.getAll();
  }

  @Delete(':id')
  async deleteSpaceMarine(@Param('id') id: string) {
    return this.spaceMarineService.deleteSpaceMarine(id);
  }
}
