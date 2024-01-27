import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class ClothGuard implements CanActivate {
  async canActivate(
    context: ExecutionContext,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const {
      text,
      description,
      price,
      size,
      image,
      in_stock,
      in_shop,
      popularity,
      old,
    } = request.body;

    if (!text) {
      throw new UnauthorizedException('Поле text обязательно');
    }

    if (!description) {
      throw new UnauthorizedException('Поле description обязательно');
    }

    if (!price) {
      throw new UnauthorizedException('Поле price обязательно');
    }

    if (!size) {
      throw new UnauthorizedException('Поле size обязательно');
    }

    if (!image) {
      throw new UnauthorizedException('Поле image обязательно');
    }

    if (!in_stock) {
      throw new UnauthorizedException('Поле in_stock обязательно');
    }

    if (!in_shop) {
      throw new UnauthorizedException('Поле in_shop обязательно');
    }

    if (!popularity) {
      throw new UnauthorizedException('Поле popularity обязательно');
    }

    if (!old) {
      throw new UnauthorizedException('Поле popularity обязательно');
    }

    return true;
  }
}
