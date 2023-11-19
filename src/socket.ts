// socket.gateway.ts
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  handleEmitSocket({ data, event, to }) {
    if (event === 'message') {
      if (to) {
        this.server.to(to).emit(event, data);
      } else {
        this.server.emit(event, data);
      }
      console.log(data, event, 11111);
    }
    if (event === 'order') {
      if (to) {
        this.server.to(to).emit(event, data);
      } else {
        this.server.emit(event, data);
      }
      console.log(data, event, 22222);
    }
    if (event === 'blockUser') {
      if (to) {
        this.server.to(to).emit(event, data);
      } else {
        this.server.emit(event, data);
      }
      console.log(data, event, 22222);
    }
    if (event === 'deleteOrderItem') {
      if (to) {
        this.server.to(to).emit(event, data);
      } else {
        this.server.emit(event, data);
      }
      console.log(data, event, 22222);
    }
  }

  sendToClient(clientId: string, event: string, data: any) {
    console.log('>>>>', clientId);
    this.server.emit(event, data);
  }

  @SubscribeMessage('message')
  async handleMessage(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: any,
  ) {
    console.log('>>>>', data);

    return this.sendToClient(socket.id, 'message', data);
  }

  @SubscribeMessage('order')
  async handleMessageOrder(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: any,
  ) {
    console.log('>>>>', data);

    return this.sendToClient(socket.id, 'order', data);
  }
  @SubscribeMessage('deleteOrderItem')
  async handleMessageDeleteOrderItem(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: any,
  ) {
    console.log('>>>>', data);

    return this.sendToClient(socket.id, 'deleteOrderItem', data);
  }
  @SubscribeMessage('blockUser')
  async handleMessageBlockUser(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: any,
  ) {
    console.log('>>>>', data);

    return this.sendToClient(socket.id, 'blockUser', data);
  }

  afterInit(socket: Socket): any {}

  async handleConnection(socket: Socket) {
    console.log('connect', socket.id);
  }

  async handleDisconnect(@ConnectedSocket() socket: Socket) {
    console.log('disconnect', socket.id);
  }
}
