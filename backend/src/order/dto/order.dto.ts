
export class GetTicketDTO {
  film: string;
  session: string;
  daytime: Date;
  row: number;
  seat: number;
  price: number;
}

export class CreateOrderDTO {
  email: string;
  phone: string;
  tickets: GetTicketDTO[];
}

