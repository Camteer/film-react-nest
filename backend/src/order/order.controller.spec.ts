import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { CreateOrderDTO } from './dto/order.dto';

describe('OrderController', () => {
  let controller: OrderController;
  let service: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [OrderService],
    })
      .overrideProvider(OrderService)
      .useValue({
        createOrder: jest.fn().mockResolvedValue({
          items: [
            {
              film: 'filmId',
              session: 'sessionId',
              daytime: new Date('2025-01-01'),
              row: 1,
              seat: 1,
              price: 100,
            },
          ],
          total: 1,
        }),
      })
      .compile();
    controller = module.get<OrderController>(OrderController);
    service = module.get<OrderService>(OrderService);
  });

  it('.createOrder() ', async () => {
    const orderData: CreateOrderDTO = {
      tickets: [
        {
          film: 'filmId',
          session: 'sessionId',
          daytime: new Date('2025-01-01'),
          row: 1,
          seat: 1,
          price: 100,
        },
      ],
      email: 'test@example.com',
      phone: '+79001234567',
    };
    const orderComplete = await controller.createOrder(orderData);
    const result = {
      items: orderData.tickets,
      total: orderData.tickets.length,
    };
    expect(orderComplete).toEqual(result);
    expect(service.createOrder).toHaveBeenCalledWith(orderData);
  });
});
