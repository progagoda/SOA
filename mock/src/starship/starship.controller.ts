import {
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { StarshipService } from "./starship.service";

@Controller("api/v1/starships")
export class StarshipController {
  constructor(private readonly starshipService: StarshipService) {}

  @Get()
  async getAll() {
    return this.starshipService.getAll();
  }

  @Post(":name")
  @UsePipes(new ValidationPipe())
  async createStarship(@Param("name") name: string) {
    return this.starshipService.createStarship(name);
  }
}
