import { IsNotEmpty } from 'class-validator';

export class CheckCartItemDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  readonly partId: string;
}
