import { TypeOrmModuleOptions } from '@nestjs/typeorm'


export const typeORMconfig : TypeOrmModuleOptions = {
	type: 'postgres',
	// host: os.hostname(),
	host: '172.18.0.2',
	port: 5432,
	username: 'dongyoki',
	password: 'asdf',
	database: 'nestjs_app',
	entities: [
		__dirname + '/../**/*.entity{.ts,.js}',
	],
	synchronize: true,
}
