import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { AuthService } from './auth.service';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RefreshJWTGuard } from './guards/refresh-jwt.guard';
import { RegistrationGuard } from './guards/registration.guard';
import { LoginGuard } from './guards/login.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @UseGuards(LoginGuard)
  @Post('login')
  async loginUser(@Body() loginUserDto: LoginUserDto, @Res() res: Response) {
    try {
      const user = await this.userService.login(loginUserDto);

      const access = await this.authService.generateAccessToken(user);
      const refresh = await this.authService.generateRefreshToken(
        user._id as string,
      );

      res.status(HttpStatus.OK).json({
        ...access,
        ...refresh,
        username: user.username,
        email: user.email,
      });
    } catch (error) {
      console.error('Error during user login:', error);
      if (error.response) {
        res.status(error.response.statusCode).json({
          errorMessage: error.response.message,
          error: error.response.error,
        });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          errorMessage: 'Internal Server Error',
        });
      }
    }
  }

  @UseGuards(RegistrationGuard)
  @Post('registration')
  async registrationUser(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response,
  ) {
    try {
      const result = await this.userService.registration(createUserDto);

      if (result instanceof Object && 'warningMessage' in result) {
        return res.status(HttpStatus.BAD_REQUEST).json(result);
      }

      res.status(HttpStatus.CREATED).send('User created');
    } catch (error) {
      console.error('Error during user registration:', error);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ errorMessage: 'Internal Server Error' });
    }
  }

  @UseGuards(RefreshJWTGuard)
  @Post('refresh')
  async refreshToken(
    @Body() refreshTokenDto: RefreshTokenDto,
    @Res() res: Response,
  ) {
    const validToken = this.authService.verifyToken(
      refreshTokenDto.refresh_token,
    );
    const user = await this.userService.findOne(refreshTokenDto.username);
    const access = await this.authService.generateAccessToken(user);

    if (validToken?.error) {
      if (validToken?.error === 'jwt expired') {
        const refresh = await this.authService.generateRefreshToken(
          user._id as string,
        );

        res.statusCode = HttpStatus.OK;
        return res.send({ ...access, ...refresh });
      } else {
        res.statusCode = HttpStatus.BAD_REQUEST;
        return res.send({ error: validToken?.error });
      }
    } else {
      res.statusCode = HttpStatus.OK;
      return res.send({
        ...access,
        refresh_token: refreshTokenDto.refresh_token,
      });
    }
  }
}
