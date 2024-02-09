import { IsNotEmpty } from 'class-validator';

export class GetCartUserIdDto {
  @IsNotEmpty()
  readonly userId: string;
}
