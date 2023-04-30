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
exports.ApiService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
let ApiService = class ApiService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    async findMe() {
        let token = 'b7fd1fedb10ce877317552adf64948932d251574da672cf73c64011617f34e48';
        const url = `https://api.intra.42.fr/v2/me`;
        const headersRequest = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        };
        const axios = require('axios');
        try {
            const response = await axios.get(url, { headers: headersRequest });
            console.log(response.data);
            return response.data;
        }
        catch (error) {
            console.error(error);
        }
    }
};
ApiService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], ApiService);
exports.ApiService = ApiService;
//# sourceMappingURL=api.service.js.map