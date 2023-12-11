import { Controller, Get, Param } from '@nestjs/common';
import { MessagingService } from './messaging.service';

@Controller('messaging')
export class MessagingController {
	constructor(private readonly message: MessagingService) {}

	@Get('messages/:groupId')
	async getMessages(@Param('groupId') groupId: string) {
		return await this.message.getMessages(groupId);
	}

}
