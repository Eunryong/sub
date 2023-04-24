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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("./user.repository");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    signUp(authCredentialDto) {
        return this.userRepository.signUp(authCredentialDto);
    }
    async signIn(authCredentialDto) {
        const username = await this.userRepository.signIn(authCredentialDto);
        if (!username) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const payload = { username };
        const accessToken = await this.jwtService.sign(payload);
        return { accessToken };
    }
    async accessIn(access_token) {
        const url = `https://api.intra.42.fr/v2/me`;
        const headersRequest = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${access_token}`,
        };
        const axios = require('axios');
        try {
            const response = await axios.get(url, { headers: headersRequest });
            return response.data.id;
        }
        catch (error) {
            console.error(error);
        }
        ;
    }
    async getAllUser() {
        return await this.userRepository.find();
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map