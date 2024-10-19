import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ApiService {
  private readonly userHost = process.env.USER_HOST;
  private readonly userPort = process.env.USER_PORT;
  private readonly userUrl = `${this.userHost}:${this.userPort}`;

  constructor(private readonly httpService: HttpService) {}
  async getUserFromApi(userId: string): Promise<any> {
    const url = `http://${this.userUrl}/users/${userId}`;
    const response: AxiosResponse<any> = await lastValueFrom(
      this.httpService.get(url),
    );
    return response.data;
  }
}
