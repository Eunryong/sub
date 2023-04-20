import { DataSource } from 'typeorm';
import { Board } from './boards.entity';
export declare const boardProviders: {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<Board>;
    inject: string[];
}[];
