"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpaceMarineController = void 0;
const common_1 = require("@nestjs/common");
const space_marine_service_1 = require("./space-marine.service");
let SpaceMarineController = class SpaceMarineController {
    constructor(spaceMarineService) {
        this.spaceMarineService = spaceMarineService;
    }
    async getAll() {
        return this.spaceMarineService.getAll();
    }
    async deleteSpaceMarine(id) {
        return this.spaceMarineService.deleteSpaceMarine(id);
    }
    async createSpaceMarine(xmlBody) {
        return this.spaceMarineService.createSpaceMarine(xmlBody.SpaceMarine);
    }
    async updateSpaceMarine(xmlBody, id) {
        return this.spaceMarineService.updateSpaceMarine(xmlBody.SpaceMarine, id);
    }
    async deleteSpaceMarineForMeleeWeapon(meleeWeapon) {
        return this.spaceMarineService.deleteSpaceMarineForMeleeWeapon(meleeWeapon);
    }
};
exports.SpaceMarineController = SpaceMarineController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SpaceMarineController.prototype, "getAll", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SpaceMarineController.prototype, "deleteSpaceMarine", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SpaceMarineController.prototype, "createSpaceMarine", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe())),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], SpaceMarineController.prototype, "updateSpaceMarine", null);
__decorate([
    (0, common_1.Delete)('melee-weapon/:meleeWeapon'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Param)('meleeWeapon')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SpaceMarineController.prototype, "deleteSpaceMarineForMeleeWeapon", null);
exports.SpaceMarineController = SpaceMarineController = __decorate([
    (0, common_1.Controller)('api/v1/space-marines'),
    __metadata("design:paramtypes", [space_marine_service_1.SpaceMarineService])
], SpaceMarineController);
//# sourceMappingURL=space-marine.controller.js.map