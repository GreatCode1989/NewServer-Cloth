import { IsNotEmpty, IsOptional } from 'class-validator';

export class AddToCartDto {
  @IsNotEmpty()
  readonly username: string;

  @IsOptional()
  userId?: string;

  @IsNotEmpty()
  readonly partId: string;
}
