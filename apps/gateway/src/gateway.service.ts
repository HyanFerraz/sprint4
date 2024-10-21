import { ProductDto } from '@app/common';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class GatewayService {
  private readonly cacheHost = process.env.CACHE_HOST;
  private readonly cachePort = process.env.CACHE_PORT;
  private readonly cacheUrl = `${this.cacheHost}:${this.cachePort}`;

  constructor(private readonly httpService: HttpService) {}

  async getUser(userId: string): Promise<any> {
    const url = `http://${this.cacheUrl}/cache/users/${userId}`;
    const response: AxiosResponse<any> = await lastValueFrom(
      this.httpService.get(url),
    );
    return response.data;
  }

  async addProductToUser(userId: string, product: ProductDto): Promise<any> {
    const url = `http://${this.cacheUrl}/cache/users/${userId}/products`;
    const response: AxiosResponse<any> = await lastValueFrom(
      this.httpService.patch(url, product),
    );
    return response.data;
  }

  async RemoveProductFromUser(userId: string, productId: string): Promise<any> {
    const url = `http://${this.cacheUrl}/cache/users/${userId}/products/${productId}`;
    const response: AxiosResponse<any> = await lastValueFrom(
      this.httpService.patch(url),
    );
    return response.data;
  }
}
