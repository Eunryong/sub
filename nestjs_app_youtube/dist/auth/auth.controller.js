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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_credential_dto_1 = require("./dto/auth-credential.dto");
const passport_1 = require("@nestjs/passport");
const clientId = 'u-s4t2ud-e9d4fc73c7e2f975fae9586944ab9e680484c97efb501e102073d5d899543355';
const clientSecret = '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';
const redirectUri = 'http://localhost:3000/auth/test';
const state = 'seeecret';
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    signUp(authCredentialDto) {
        return this.authService.signUp(authCredentialDto);
    }
    signIn(authCredentialDto) {
        return this.authService.signIn(authCredentialDto);
    }
    getAllUser() {
        return this.authService.getAllUser();
    }
    authTest(req) {
        console.log(req.user);
    }
    async test(req, res) {
        const code = req.query['code'];
        if (typeof code !== 'string') {
            res.send(`code is wrong.\ncode: ${code}`);
        }
        const params = new URLSearchParams();
        params.append('grant_type', 'authorization_code');
        params.append('client_id', clientId);
        params.append('client_secret', clientSecret);
        params.append('code', code);
        params.append('redirect_uri', redirectUri);
        params.append('state', state);
        const response = await fetch(`https://api.intra.42.fr/oauth/token?${params.toString()}`, {
            method: 'post',
        });
        const token = await response.json();
        console.log(token);
        res.send('done');
    }
};
__decorate([
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_credential_dto_1.AuthCredentialDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUp", null);
__decorate([
    (0, common_1.Post)('signin'),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_credential_dto_1.AuthCredentialDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signIn", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getAllUser", null);
__decorate([
    (0, common_1.Post)('authTest'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "authTest", null);
__decorate([
    (0, common_1.Get)('test'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "test", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map