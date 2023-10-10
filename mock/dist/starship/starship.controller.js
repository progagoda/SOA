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
exports.StarshipController = void 0;
const common_1 = require("@nestjs/common");
const starship_service_1 = require("./starship.service");
let StarshipController = class StarshipController {
    constructor(starshipService) {
        this.starshipService = starshipService;
    }
    async getAll() {
        return this.starshipService.getAll();
    }
    async createStarship(name) {
        return this.starshipService.createStarship(name);
    }
};
exports.StarshipController = StarshipController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StarshipController.prototype, "getAll", null);
__decorate([
    (0, common_1.Post)(":name"),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Param)("name")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], StarshipController.prototype, "createStarship", null);
exports.StarshipController = StarshipController = __decorate([
    (0, common_1.Controller)("api/v1/starships"),
    __metadata("design:paramtypes", [starship_service_1.StarshipService])
], StarshipController);
//# sourceMappingURL=starship.controller.js.map