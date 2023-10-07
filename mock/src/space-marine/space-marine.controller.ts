import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common'
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
  @UsePipes(new ValidationPipe())
  async deleteSpaceMarine(@Param('id') id: string) {
    return this.spaceMarineService.deleteSpaceMarine(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async createSpaceMarine(@Body() xmlBody: any) {
    return this.spaceMarineService.createSpaceMarine(xmlBody.SpaceMarine)
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async updateSpaceMarine(@Body(new ValidationPipe()) xmlBody: any,@Param('id') id: string) {
    return this.spaceMarineService.updateSpaceMarine(xmlBody.SpaceMarine, id)
  }
}
