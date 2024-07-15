import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const baseUrl = import.meta.env.VITE_BACKEND

export const socket = io(baseUrl);