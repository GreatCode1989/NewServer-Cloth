import { IsNotEmpty } from 'class-validator';

export class DeleteCartDto {
  @IsNotEmpty()
  cartId: string;
}
