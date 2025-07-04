import {
    SubscribeMessage,
    WebSocketGateway,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect,
    MessageBody,
    ConnectedSocket,
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';
  
  @WebSocketGateway({ cors: { origin: '*' } })
  export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

    private server: Server;
    private rooms: Set<string> = new Set();

    afterInit(server: Server) {
      this.server = server; // ✅ Fix here
      console.log('WebSocket Initialized');
    }
  
    handleConnection(client: Socket) {
      console.log(`Client connected: ${client.id}`);
    }
  
    handleDisconnect(client: Socket) {
      console.log(`Client disconnected: ${client.id}`);
    }
  
    @SubscribeMessage('createRoom')
    handleCreateRoom(@ConnectedSocket() client: Socket): void {
      const roomId = `room-${Math.random().toString(36).substr(2, 9)}`;
      this.rooms.add(roomId);
      client.join(roomId);
      console.log(`Room created: ${roomId} by ${client.id}`);
      client.emit('roomCreated', roomId);
    }
  
    // Join room
    @SubscribeMessage('joinRoom')
    handleJoinRoom(@MessageBody() data: { roomId: string }, @ConnectedSocket() client: Socket) {
      if (this.rooms.has(data.roomId)) {
        client.join(data.roomId);
        console.log(`Client ${client.id} joined room ${data.roomId}`);
        client.emit('joinedRoom', data.roomId);
      } else {
        client.emit('roomNotFound', data.roomId);
      }
    }
  
    // Chat inside room
    @SubscribeMessage('message')
    handleMessage(
      @MessageBody() data: { roomId: string; user: string; message: string },
      @ConnectedSocket() client: Socket
    ) {
      client.to(data.roomId).emit('message', {
        user: data.user,
        message: data.message,
      });
    }
  }
  