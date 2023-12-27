import { PaginationOptions } from '@/domain/model';
import { Gender } from '@prisma/client';

export interface ProductsPaginationOptions extends PaginationOptions {
  gender?: Gender;
}