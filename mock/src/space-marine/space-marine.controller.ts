import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {SpaceMarineService} from './space-marine.service';
import {spaceMarines} from "../db/spaceMarines";

@Controller('api/v1/space-marines')
export class SpaceMarineController {
  constructor(private readonly spaceMarineService: SpaceMarineService) {
  }

  @Get()
  async getAll() {
    console.log(spaceMarines)
    return this.spaceMarineService.getAll();

  }

  @Delete(':id')
  async deleteSpaceMarine(@Param('id') id: string) {
    return this.spaceMarineService.deleteSpaceMarine(id);
  }

  @Post()
  handleXmlRequest(@Body() xmlBody: any) {
    return this.spaceMarineService.createSpaceMarine(xmlBody.SpaceMarine)
  }
}
