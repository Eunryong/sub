import { DataSource } from "typeorm";
import { DirectMessage } from "./direct-message.entity";

export const directMessageProviders = [
	{
		provide: 'DM_REPOSITORY',
		useFactory: (dataSource: DataSource) => dataSource.getRepository(DirectMessage),
		inject: ['DATA_SOURCE']
	},
];
