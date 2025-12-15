import { io, Socket } from 'socket.io-client';

const SOCKET_URL = 'https://hiring-dev.internal.kloudspot.com';

export interface AlertEvent {
    action: 'entry' | 'exit';
    zone: string;
    site: string;
    severity: 'low' | 'medium' | 'high';
    timestamp: string;
    personName?: string;
}

export interface LiveOccupancyEvent {
    siteOccupancy: number;
    zone?: string;
    floor?: string;
    timestamp: string;
}

class SocketService {
    private socket: Socket | null = null;
    private listeners: Map<string, Function[]> = new Map();

    connect(token: string): void {
        if (this.socket?.connected) {
            console.log('Socket already connected');
            return;
        }

        this.socket = io(SOCKET_URL, {
            auth: {
                token,
            },
            transports: ['websocket', 'polling'],
        });

        this.socket.on('connect', () => {
            console.log('Socket.IO connected');
        });

        this.socket.on('disconnect', () => {
            console.log('Socket.IO disconnected');
        });

        this.socket.on('connect_error', (error) => {
            console.error('Socket.IO connection error:', error);
        });

        // Listen for alert events
        this.socket.on('alert', (data: AlertEvent) => {
            console.log('Alert event received:', data);
            this.emit('alert', data);
        });

        // Listen for live occupancy events
        this.socket.on('live occupancy', (data: LiveOccupancyEvent) => {
            console.log('Live occupancy event received:', data);
            this.emit('liveOccupancy', data);
        });
    }

    disconnect(): void {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
            this.listeners.clear();
        }
    }

    on(event: string, callback: Function): void {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        this.listeners.get(event)!.push(callback);
    }

    off(event: string, callback?: Function): void {
        if (!callback) {
            this.listeners.delete(event);
            return;
        }
        const callbacks = this.listeners.get(event);
        if (callbacks) {
            const index = callbacks.indexOf(callback);
            if (index > -1) {
                callbacks.splice(index, 1);
            }
        }
    }

    private emit(event: string, data: any): void {
        const callbacks = this.listeners.get(event);
        if (callbacks) {
            callbacks.forEach(callback => callback(data));
        }
    }

    isConnected(): boolean {
        return this.socket?.connected || false;
    }
}

export const socketService = new SocketService();
export default socketService;
