'use server';

import { cookies } from 'next/headers';

export const saveUserData = (username: string, room: string) => {
	cookies().set('username', username);
	cookies().set('room', room);
};