'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { io } from 'socket.io-client';
import styles from './room.module.scss';

const getMessages = async (roomId: string) => {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/messaging/messages/${roomId}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
		mode: 'cors',
		cache: 'no-cache',
	});

	if (response.ok) {
		return { data: await response.json(), error: null };
	}
	else {
		return { data: null, error: 'Error getting messages' };
	}
};

const ConversationPage: React.FC = () => {

	const router = useRouter();
	const searchParams = useSearchParams();

	const socket = io(process.env.NEXT_PUBLIC_API_URL!);

	const roomId = searchParams.get('roomId');
	const username = searchParams.get('username');

	if (!roomId || !username) {
		router.replace('/');
	}

	const [messages, setMessages] = useState<any[]>([]);
	const [newMessage, setNewMessage] = useState('');
	const messagesEndRef = useRef<HTMLDivElement>(null);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		socket.emit('message', {
			groupId: roomId,
			sender: username,
			message: newMessage,
		});
		setNewMessage('');
	};

	socket.on('message', (data) => {
		setMessages((prev) => [...prev, data]);
	});

	useEffect(() => {
		scrollToBottom();
	}, [messages]);


	useEffect(() => {
		socket.on('connect', () => {});
		socket.emit('join', roomId);

		getMessages(roomId!).then((response) => {
			if (response.data) {
				setMessages(response.data);
			}
			else {
				console.log(response.error);
				router.replace('/');
			}
		});

		return () => {
			socket.emit('leave', roomId);
			socket.on('disconnect', () => {});
		};
	}, []);

	return (
		<div className={styles['conversation-page']}>
			<div className={styles['chat-container']}>
				<div className={styles['chat-title']}>
					<h3>
						{roomId}
					</h3>
				</div>
				<div className={styles['messages-row']}>
					{messages.map((message) => (
						<div className={`${styles.row}  ${message.sender === username ? styles.mine : ''}`} key={message.id}>
							{
								message.sender !== username && (
									<div className={styles.avatar}>
										{message.sender.charAt(0).toUpperCase()}
									</div>
								)
							}
							<div
								className={`${styles.message}`}
							>
								{message.text}
							</div>
						</div>
					))}
					<div ref={messagesEndRef} />
				</div>
				<div className={styles['input-row']}>
					<form onSubmit={handleSend}>
						<input
							type="text"
							value={newMessage}
							onChange={(e) => setNewMessage(e.target.value)}
						/>
						<button type={'submit'}>Send</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default ConversationPage;
