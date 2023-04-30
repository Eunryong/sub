"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeORMconfig = void 0;
exports.typeORMconfig = {
    type: 'postgres',
    host: 'postgres',
    port: 5432,
    username: 'dongyoki',
    password: 'asdf',
    database: 'nestjs_app',
    entities: [
        __dirname + '/../**/*.entity{.ts,.js}',
    ],
    synchronize: true,
};
//# sourceMappingURL=typeorm.config.js.map