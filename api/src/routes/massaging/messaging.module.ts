import { Module } from '@nestjs/common';
import { MessagingService } from './messaging.service';
import { MessagingController } from './messaging.controller';
import { MessagingGateway } from './messaging.gateway';
import { HelperModule } from '../../helper/helper.module';
import { DbModule } from '../../db/db.module';

@Module({
	imports: [HelperModule, DbModule],
	providers: [MessagingService, MessagingGateway],
	controllers: [MessagingController],
})
export class MessagingModule {}
