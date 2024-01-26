import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RegistrationGuard implements CanActivate {
  async canActivate(
    context: ExecutionContext,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const { username, email, password } = request.body;

    if (!username) {
      throw new UnauthorizedException('Поле username обязательно');
    }

    if (!email) {
      throw new UnauthorizedException('Поле email обязательно');
    }

    if (!password) {
      throw new UnauthorizedException('Поле password обязательно');
    }

    return true;
  }
}
