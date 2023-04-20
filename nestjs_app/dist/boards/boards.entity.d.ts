import { BaseEntity } from 'typeorm';
export declare enum BoardStatus {
    PUBLIC = "PUBLIC",
    PRIVATE = "PRIVATE"
}
export declare class Board extends BaseEntity {
    id: number;
    title: string;
    description: string;
    status: BoardStatus;
}
