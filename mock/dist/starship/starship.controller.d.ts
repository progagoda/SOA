import { StarshipService } from "./starship.service";
export declare class StarshipController {
    private readonly starshipService;
    constructor(starshipService: StarshipService);
    getAll(): Promise<{
        id: number;
        name: string;
    }[]>;
    createStarship(name: string): Promise<void>;
}
