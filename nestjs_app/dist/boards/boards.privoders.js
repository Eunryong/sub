"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.boardProviders = void 0;
const boards_entity_1 = require("./boards.entity");
exports.boardProviders = [
    {
        provide: 'BOARD_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(boards_entity_1.Board),
        inject: ['DATA_SOURCE'],
    },
];
//# sourceMappingURL=boards.privoders.js.map