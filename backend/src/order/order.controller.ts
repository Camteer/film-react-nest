import {
  Controller,
  Post,
  Body,
  ServiceUnavailableException,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDTO } from './dto/order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @Post()
  async createOrder(@Body() orderData: CreateOrderDTO) {
    try {
      return this.orderService.createOrder(orderData);
    } catch (error) {
      throw new ServiceUnavailableException('Ошибка сервера');
    }
  }
}
