import { Controller, Get, Inject } from '@nestjs/common';
import { ClientKafka, EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  private count = 0;

  constructor(@Inject('KAFKA_CLIENT') private client: ClientKafka) {}

  @Get('kafka')
  async publisherKafka() {
    console.log('Emiting...');
    this.client.emit('any', { count: this.count++ });
  }

  @EventPattern('any')
  async consumeKafka(@Payload() data: any) {
    console.log('Received: ');
    console.log(data);
  }
}
