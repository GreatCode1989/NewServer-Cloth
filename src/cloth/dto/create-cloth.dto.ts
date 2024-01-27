import { IsNotEmpty } from 'class-validator';

export class CreateClothDto {
  @IsNotEmpty()
  readonly text: string;

  @IsNotEmpty()
  readonly description: string;

  @IsNotEmpty()
  readonly price: number;

  @IsNotEmpty()
  readonly size: number;

  @IsNotEmpty()
  readonly image: number;

  @IsNotEmpty()
  readonly in_stock: number;

  @IsNotEmpty()
  readonly in_shop: boolean;

  @IsNotEmpty()
  readonly popularity: boolean;

  @IsNotEmpty()
  readonly old: boolean;
}
