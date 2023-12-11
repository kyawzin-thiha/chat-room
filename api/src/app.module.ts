import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MessagingModule } from './routes/massaging/messaging.module';
import { HelperModule } from './helper/helper.module';
import { DbModule } from './db/db.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		MessagingModule,
		HelperModule,
		DbModule,
	],
})
export class AppModule {}
