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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const users_schema_1 = require("../users/schema/users.schema");
const bcrypt_1 = require("bcrypt");
const exceptions_1 = require("@nestjs/common/exceptions");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(userModel, jwtAuthService) {
        this.userModel = userModel;
        this.jwtAuthService = jwtAuthService;
    }
    async register(userObject) {
        const { password } = userObject;
        const plainToHash = await (0, bcrypt_1.hash)(password, 10);
        userObject = Object.assign(Object.assign({}, userObject), { password: plainToHash });
        return this.userModel.create(userObject);
    }
    async login(userObject) {
        const { email, password } = userObject;
        const findUser = await this.userModel.findOne({ email });
        if (!findUser)
            throw new exceptions_1.HttpException('USER_NOT_FOUND', 404);
        const checkPassword = await (0, bcrypt_1.compare)(password, findUser.password);
        if (!checkPassword)
            throw new exceptions_1.HttpException('PASSWORD_INCORRECT', 403);
        const payload = { id: findUser._id, name: findUser.name };
        const token = await this.jwtAuthService.sign(payload);
        const data = {
            user: findUser,
            token,
        };
        return data;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(users_schema_1.Users.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map