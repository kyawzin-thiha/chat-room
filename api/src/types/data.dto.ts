import { Message } from '@prisma/client';

export type MessageDto = Message | null;
export type MessagesDto = Message[] | null;