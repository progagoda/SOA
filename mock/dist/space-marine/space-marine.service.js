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
const lodash_1 = require("lodash");
let SpaceMarineService = class SpaceMarineService {
    getAll(name) {
        if (name) {
            return lodash_1._.take(spaceMarines_1.spaceMarines, 2);
        }
        return spaceMarines_1.spaceMarines;
    }
    deleteSpaceMarine(id) {
        const spaceMarine = spaceMarines_1.spaceMarines.find(item => item.id.toString() === id);
        spaceMarines_1.spaceMarines.splice(spaceMarine.id - 1, 1);
        return spaceMarines_1.spaceMarines;
    }
    createSpaceMarine(spaceMarine) {
        const newSpaceMarine = { ...spaceMarine };
        newSpaceMarine.creationDate = new Date;
        const lastMarines = spaceMarines_1.spaceMarines[spaceMarines_1.spaceMarines.length - 1];
        newSpaceMarine.id = (lastMarines ? lastMarines.id + 1 : 1);
        newSpaceMarine.loyal = spaceMarine.loyal;
        spaceMarines_1.spaceMarines.push(newSpaceMarine);
    }
    updateSpaceMarine(spaceMarine, id) {
        const updateSpaceMarine = { ...spaceMarine };
        const foundIndex = spaceMarines_1.spaceMarines.findIndex(x => x.id.toString() === id);
        updateSpaceMarine.creationDate = new Date;
        updateSpaceMarine.id = parseInt(id);
        spaceMarines_1.spaceMarines[foundIndex] = updateSpaceMarine;
        return updateSpaceMarine;
    }
    deleteSpaceMarineForMeleeWeapon(meleeWeapon) {
        return lodash_1._.remove(spaceMarines_1.spaceMarines, function (item) {
            return item.meleeWeapon === meleeWeapon;
        });
    }
    getForMinCoordinates() {
        return lodash_1._.minBy(spaceMarines_1.spaceMarines, (marine) => marine.coordinates.x);
    }
    getSpaceMarineForHealth(health) {
        return lodash_1._.filter(spaceMarines_1.spaceMarines, (marine) => '');
    }
};
exports.SpaceMarineService = SpaceMarineService;
exports.SpaceMarineService = SpaceMarineService = __decorate([
    (0, common_1.Injectable)()
], SpaceMarineService);
//# sourceMappingURL=space-marine.service.js.map