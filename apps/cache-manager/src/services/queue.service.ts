import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';

@Injectable()
export class QueueService {
  constructor(
    @InjectQueue('update-db') private readonly updateDbQueue: Queue,
  ) {}

  async enqueueDbUpdate(userId: string, data: any): Promise<void> {
    await this.updateDbQueue.add('update-database', { userId, data });
  }
}
