import { Module } from '@nestjs/common';
import { HelperModule } from '../helper/helper.module';
import { MessageRepository } from './message.repository';

@Module({
	imports: [HelperModule],
	providers: [MessageRepository],
	exports: [MessageRepository],
})
export class DbModule {}
