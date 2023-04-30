import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export const typeORMconfig : TypeOrmModuleOptions = { // typeORM 의 설정을 담아서 moduel 에서 import
	type: 'postgres', // db 종류
	host: 'postgres', // host ip, container 이름으로 설정
	port: 5432, // container port
	username: 'dongyoki', // db 를 build 할 때 설정한 username
	password: 'asdf', // 위와 동일
	database: 'nestjs_app', // 위와 동일
	entities: [
		__dirname + '/../**/*.entity{.ts,.js}',
	], // 엔티티 파일의 위치?
	synchronize: true, // 애플리케이션을 재실행 할 때 마다 엔티티 안의 수정된 컬럼의 길이 타입 변경값등을 해당 테이블을 drop 한 후 재생성
}
