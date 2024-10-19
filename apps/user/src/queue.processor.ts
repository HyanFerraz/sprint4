import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { UserService } from './user.service';

@Processor('update-db')
export class QueueProcessor extends WorkerHost {
  constructor(private readonly userService: UserService) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    const { userId, data } = job.data;
    await this.userService.updateUserProducts(userId, data);
  }
}
