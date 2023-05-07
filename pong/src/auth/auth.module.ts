import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { FTStrategy } from './42/ft.strategy';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from 'src/database/database.module';
import { PassportModule } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
	imports: [
		UserModule,
		HttpModule,
		DatabaseModule,
		PassportModule.register({defaultStrategy: "jwt"}),
		JwtModule.register({
			global: true,
			secret: process.env.JWT_SECRET,
			signOptions: { expiresIn: '300s' },
		}),
		MailerModule.forRootAsync({
            useFactory: () => ({
				transport: {
					service: 'Naver',
					host: 'smtp.naver.com',
					port: 587,
					auth: {
					  user: 'rlark1224@naver.com', // generated ethereal user
					  pass: 'dgr650845*', // generated ethereal password
					},
				  },

                // defaults: {
                //     from: '"no-reply" <email address>',
                // },
                // preview: true,
				// template: {
                //   dir: __dirname + '/templates',
                //   adapter: new PugAdapter(),
                //   options: {
                //     strict: true,
                //   },
                // },
            })
        }),
	],
	controllers: [AuthController],
	providers: [
		AuthService,
		UserService,
		FTStrategy,
	],
	exports: [AuthService]
})
export class AuthModule {}
