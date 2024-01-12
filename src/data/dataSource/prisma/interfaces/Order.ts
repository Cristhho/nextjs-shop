import { Order, OrderAddress, OrderItem, Product, ProductImage } from '@prisma/client'

type ProductImageUrl = Pick<ProductImage, 'url'>
type DBOrderItem = Pick<OrderItem, 'price'|'quantity'|'size'> & {
  product: Pick<Product, 'title'|'slug'> & {ProductImage: ProductImageUrl[]}
}
export type PrismaOrder = Order & {
  OrderAddress: OrderAddress | null,
  OrderItem: DBOrderItem[]
}

export type SingleOrder = {
  id: string,
  isPaid: boolean,
  OrderAddress: Pick<OrderAddress, 'firstName'|'lastName'>|null
}
