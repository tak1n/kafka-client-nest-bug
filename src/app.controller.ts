import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka, EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController implements OnModuleInit {
  private count = 0;
  private count2 = 0;

  constructor(@Inject('KAFKA_CLIENT') private client: ClientKafka) {}

  async onModuleInit() {
    await this.client.connect();
  }

  @Get('kafka')
  async publisherKafka() {
    console.log('Emiting...');
    this.client.emit('any', { count: this.count++ });
    this.client.emit('any', { count2: this.count2++ });
  }

  @EventPattern('any')
  async consumeKafka(@Payload() data: any) {
    console.log('Received: ');
    console.log(data);
  }
}
