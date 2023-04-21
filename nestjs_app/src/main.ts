import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();


// 사람 -request-> controller : 들어오는 url 에 맞춰 라우팅
//  -> service : controller 에서 호출받아 실제 구현이 되는 부분
//  -> repository : db 와 연결되어 service 와 정보를 주고 받는 부분
//  -response-> 사람