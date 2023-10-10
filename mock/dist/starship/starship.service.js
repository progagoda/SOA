"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StarshipService = void 0;
const common_1 = require("@nestjs/common");
const starships_1 = require("../db/starships");
let StarshipService = class StarshipService {
    getAll() {
        return starships_1.starships;
    }
    createStarship(name) {
        const newStarship = {
            id: starships_1.starships[starships_1.starships.length - 1] ? starships_1.starships[starships_1.starships.length - 1].id + 1 : 1,
            name: name
        };
        starships_1.starships.push(newStarship);
    }
};
exports.StarshipService = StarshipService;
exports.StarshipService = StarshipService = __decorate([
    (0, common_1.Injectable)()
], StarshipService);
//# sourceMappingURL=starship.service.js.map