'use client';

import React, { useState } from 'react';
import styles from './page.module.scss';
import { saveUserData } from '@/lib/actions';
import { useRouter } from 'next/navigation';

const JoinRoom: React.FC = () => {

	const router = useRouter();

	const [roomName, setRoomName] = useState('');
	const [username, setUsername] = useState('');

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		saveUserData(roomName.replace(/\s/g, '-'), username);
		router.replace(`/room?roomId=${roomName.replace(/\s/g, '-')}&username=${username}`);
	};

	return (
		<div className={styles['room-page']}>
			<div className={styles['form-container']}>
				<h2>Join a Room</h2>
				<form onSubmit={handleSubmit} className={styles['form']}>
					<div>
						<input
							className={styles['input-field']}
							type="text"
							placeholder="Room Name"
							value={roomName}
							onChange={(e) => setRoomName(e.target.value)}
						/>
						<input
							className={styles['input-field']}
							type="text"
							placeholder="Your Username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
					</div>
					<button className={styles['submit-btn']} type="submit">
						Join
					</button>
				</form>
			</div>
		</div>
	);
};

export default JoinRoom;
