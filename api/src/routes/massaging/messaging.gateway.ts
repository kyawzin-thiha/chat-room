import {
	OnGatewayConnection,
	OnGatewayDisconnect,
	OnGatewayInit,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessagingService } from './messaging.service';
import { ConfigService } from '@nestjs/config';

@WebSocketGateway({
	cors: {
		// Dynamically set the CORS options
		origin: process.env.CLIENT_URL || 'http://localhost:3000',
		credentials: true,
	},
})
export class MessagingGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
	@WebSocketServer()
	server: Server;

	constructor(private readonly message: MessagingService, private readonly configService: ConfigService) {}

	afterInit() {
	}

	handleConnection(client: Socket) {
		client.data.userId = client.id;
	}

	handleDisconnect() {
	}

	@SubscribeMessage('join')
	async handleJoin(client: Socket, groupId: string) {
		client.join(groupId);
	}

	@SubscribeMessage('leave')
	async handleLeave(client: Socket, groupId: string) {
		client.leave(groupId);
	}

	@SubscribeMessage('message')
	async handleMessage(client: Socket, data: { groupId: string; sender: string, message: string }) {
		const { groupId, sender, message } = data;
		const savedMessage = await this.message.saveMessage(groupId, message, sender);
		client.broadcast.to(groupId).emit('message', savedMessage);
	}
}
