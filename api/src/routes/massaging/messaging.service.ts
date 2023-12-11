import { HttpException, Injectable } from '@nestjs/common';
import { MessageRepository } from '../../db/message.repository';

@Injectable()
export class MessagingService {
	constructor(private readonly message: MessageRepository) {}

	async getMessages(groupId: string) {
		const [messages, error] = await this.message.getMessages(groupId);

		if (error) {
			throw new HttpException(error.message, error.status);
		}

		return messages;
	}

	async saveMessage(groupId: string, message: string, senderId: string) {
		const [savedMessage, error] = await this.message.createMessage(groupId, message, senderId);

		if (error) {
			throw new HttpException(error.message, error.status);
		}

		return savedMessage;
	}
}
