export interface PaginationResponse<T> {
  currentPage: number;
  totalPages: number;
  items: T[];
}

export interface PaginationOptions {
  page?: number;
  take?: number;
}
