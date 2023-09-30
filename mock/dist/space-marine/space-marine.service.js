"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpaceMarineService = void 0;
const common_1 = require("@nestjs/common");
const spaceMarines_1 = require("../db/spaceMarines");
let SpaceMarineService = class SpaceMarineService {
    getAll() {
        return spaceMarines_1.spaceMarines;
    }
    deleteSpaceMarine(id) {
        console.log(id);
        const spaceMarine = spaceMarines_1.spaceMarines.find(item => item.id.toString() === id);
        spaceMarines_1.spaceMarines.splice(spaceMarine.id);
        return spaceMarines_1.spaceMarines;
    }
};
exports.SpaceMarineService = SpaceMarineService;
exports.SpaceMarineService = SpaceMarineService = __decorate([
    (0, common_1.Injectable)()
], SpaceMarineService);
//# sourceMappingURL=space-marine.service.js.map