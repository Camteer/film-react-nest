export class GetScheduleDTO {
  id: string;
  daytime: Date;
  hall: number;
  rows: number;
  seats: number;
  price: number;
  taken: string[];
}

export class GetFilmDTO {
  id: string;
  rating: number;
  director: string;
  tags: string[];
  image: string;
  cover: string;
  title: string;
  about: string;
  description: string;
  schedule: GetScheduleDTO[];
}

export class GetFilmsDTO {
  total: number;
  items: GetFilmDTO[];
}

export class GetScheduleResDTO {
  total: number;
  items: GetScheduleDTO[];
}
