import { Injectable } from '@nestjs/common';
import { PrismaService } from '../helper/prisma.service';
import { MessageDto, MessagesDto } from '../types/data.dto';
import { ErrorDto } from '../types/error.dto';

@Injectable()
export class MessageRepository {
	constructor(private readonly prisma: PrismaService) {}

	async createMessage(group: string, sender: string, text: string): Promise<[MessageDto, ErrorDto]> {
		try {
			const message = await this.prisma.message.create({
				data: {
					group,
					sender,
					text,
				},
			});

			return [message, null];
		} catch (error) {
			return [null, { message: 'Internal Server Error', status: 500 }];
		}
	}

	async getMessages(group: string): Promise<[MessagesDto, ErrorDto]> {
		try {
			const messages = await this.prisma.message.findMany({
				where: {
					group,
				},
			});

			return [messages, null];
		} catch (error) {
			return [null, { message: 'Internal Server Error', status: 500 }];
		}
	}
}