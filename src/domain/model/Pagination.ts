import { Gender } from '.';

export interface PaginationResponse<T> {
  currentPage: number;
  totalPages: number;
  items: T[];
}

export interface PaginationOptions {
  page?: number;
  take?: number;
}

export interface ProductsPaginationOptions extends PaginationOptions {
  gender?: Gender;
}
