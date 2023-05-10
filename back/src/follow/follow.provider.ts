import { DataSource } from "typeorm";
import { Follow } from "./follow.entity";

export const followProviders = [
	{
		provide: 'FOLLOW_REPOSITORY',
		useFactory: (dataSource: DataSource) => dataSource.getRepository(Follow),
		inject: ['DATA_SOURCE']
	},
];
