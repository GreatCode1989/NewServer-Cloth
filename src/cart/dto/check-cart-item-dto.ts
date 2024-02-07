import { IsNotEmpty, IsOptional } from 'class-validator';

export class CheckCartItemDto {
  @IsOptional()
  userId?: string;

  @IsNotEmpty()
  readonly partId: string;
}
