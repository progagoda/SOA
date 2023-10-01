import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {SpaceMarineService} from './space-marine.service';

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

  @Post()
  createSpaceMarine(@Body() xmlBody: any) {
    return this.spaceMarineService.createSpaceMarine(xmlBody.SpaceMarine)
  }
}
