import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
		type: 'postgres', // db 종류
		host: 'postgres', // host ip, container 이름으로 설정
		port: 5432, // container port
		username: 'dongyoki', // db 를 build 할 때 설정한 username
		password: 'asdf', // 위와 동일
		database: 'nestjs_app', // 위와 동일
		entities: [
			__dirname + '/../**/*.entity{.ts,.js}',
		], // 엔티티 파일의 위치?
		synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
