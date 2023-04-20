import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export const typeORMconfig : TypeOrmModuleOptions = {
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
}
