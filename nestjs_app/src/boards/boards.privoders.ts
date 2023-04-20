import { DataSource } from 'typeorm';
import { Board } from './boards.entity';

export const boardProviders = [
  {
    provide: 'BOARD_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Board),
    inject: ['DATA_SOURCE'],
  },
];
